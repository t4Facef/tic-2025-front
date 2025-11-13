import { useState, useRef, useEffect } from "react";
import { useBarreiras } from "../../hooks/useBarreiras";
import { useAdminAuth } from "../../hooks/useAuth";

interface SmartBarreiraInputProps {
  onAdd: (descricao: string, isNew: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function SmartBarreiraInput({
  onAdd,
  placeholder = "Digite para buscar ou criar nova barreira...",
  disabled = false
}: SmartBarreiraInputProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { isAdmin } = useAdminAuth();
  const { 
    loading, 
    error,
    buscarSimilares, 
    criarBarreira
  } = useBarreiras();

  // Filtrar opções baseado na busca
  const filteredOptions = buscarSimilares(search);

  // Verificar se deve mostrar opção de criar nova
  const shouldShowCreate = search.trim() && 
    !filteredOptions.some(barreira => barreira.descricao.toLowerCase() === search.toLowerCase().trim());

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.trim()) {
      setIsOpen(true);
    }
  };

  const handleSelectExisting = (descricao: string) => {
    onAdd(descricao, false);
    setSearch('');
    setIsOpen(false);
  };

  const handleCreateNew = async () => {
    if (!isAdmin) {
      alert('Apenas administradores podem criar novas barreiras');
      return;
    }
    
    const descricao = search.trim();
    
    if (!descricao) return;
    
    setIsCreating(true);
    
    try {
      const novaBarreira = await criarBarreira(descricao);
      
      if (novaBarreira) {
        onAdd(novaBarreira.descricao, true);
        
        // Feedback visual de sucesso
        setSearch('');
        setIsOpen(false);
      }
    } catch (err) {
      console.error('Erro ao criar barreira:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (filteredOptions.length > 0) {
        // Se há opções filtradas, seleciona a primeira
        handleSelectExisting(filteredOptions[0].descricao);
      } else if (shouldShowCreate) {
        // Se não há opções mas o termo é válido, cria nova
        handleCreateNew();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input de busca */}
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsOpen(true)}
            disabled={disabled || loading}
            className="w-full px-3 py-2 lg:px-4 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm lg:text-base"
            placeholder={loading ? "Carregando..." : placeholder}
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          )}
        </div>

        {/* Botão dinâmico */}
        {search.trim() && (
          <button
            onClick={() => {
              if (filteredOptions.length > 0) {
                handleSelectExisting(filteredOptions[0].descricao);
              } else if (shouldShowCreate) {
                handleCreateNew();
              }
            }}
            disabled={loading}
            className={`px-4 py-2 lg:px-6 lg:py-2 rounded-lg flex items-center space-x-1 lg:space-x-2 transition-colors text-sm lg:text-base whitespace-nowrap
              ${shouldShowCreate 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            {shouldShowCreate ? (
              <span>Criar Nova</span>
            ) : (
              <span>Adicionar</span>
            )}
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && search.trim() && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg max-h-48 overflow-y-auto rounded-lg z-10 mt-1">
          {error && (
            <div className="p-3 text-red-500 text-sm border-b border-gray-200">
              {error}
            </div>
          )}
          
          {/* Opções existentes */}
          {filteredOptions.length > 0 && (
            <>
              <div className="px-3 py-2 bg-gray-50 text-xs text-gray-600 font-medium border-b border-gray-200">
                Barreiras existentes:
              </div>
              {filteredOptions.slice(0, 5).map((barreira) => (
                <div
                  key={barreira.id}
                  onClick={() => handleSelectExisting(barreira.descricao)}
                  className="p-3 hover:bg-blue-50 cursor-pointer text-blue-700 text-sm border-b border-gray-100 last:border-b-0 transition-colors flex items-center"
                >
                  <span className="font-medium">{barreira.descricao}</span>
                </div>
              ))}
              {filteredOptions.length > 5 && (
                <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-b border-gray-200">
                  ... e mais {filteredOptions.length - 5} opções
                </div>
              )}
            </>
          )}
          
          {/* Opção para criar nova */}
          {shouldShowCreate && (
            <div 
              onClick={isAdmin && !isCreating ? handleCreateNew : () => {
                if (!isAdmin) alert('Apenas administradores podem criar novas barreiras');
              }}
              className={`p-3 cursor-pointer text-sm border-t-2 transition-colors ${
                isAdmin && !isCreating
                  ? 'hover:bg-green-50 text-green-700 border-green-200' 
                  : 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center">
                {isCreating && (
                  <div className="mr-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                  </div>
                )}
                <div>
                  <div className="font-medium">
                    {isCreating 
                      ? 'Criando...' 
                      : isAdmin 
                        ? `Criar nova: "${search.trim()}"` 
                        : 'Criar nova barreira'
                    }
                  </div>
                  <div className={`text-xs ${
                    isAdmin ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {isCreating 
                      ? 'Aguarde, salvando a nova barreira...'
                      : isAdmin 
                        ? 'Esta barreira não existe ainda. Clique para criar.'
                        : 'Apenas administradores podem criar novas barreiras.'
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Estado vazio */}
          {!loading && filteredOptions.length === 0 && !shouldShowCreate && (
            <div className="p-4 text-center text-gray-500 text-sm">
              {search ? "Nenhuma barreira encontrada" : "Digite para buscar barreiras"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}