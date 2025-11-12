import { useState, useRef, useEffect } from "react";
import { useAcessibilidades } from "../../hooks/useAcessibilidades";

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function TagSelector({
  selectedTags,
  onChange,
  placeholder = "Digite para buscar ou criar...",
  disabled = false
}: TagSelectorProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateConfirm, setShowCreateConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { 
    loading, 
    error,
    buscarSimilares, 
    criarAcessibilidade 
  } = useAcessibilidades();

  // Filtrar opções baseado na busca e tags já selecionadas
  const filteredOptions = buscarSimilares(search).filter(
    acc => !selectedTags.includes(acc.nome)
  );

  // Verificar se deve mostrar opção de criar nova
  const shouldShowCreate = search.trim() && 
    !filteredOptions.some(acc => acc.nome.toLowerCase() === search.toLowerCase().trim());

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.trim()) {
      setIsOpen(true);
    }
  };

  const handleSelectTag = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      onChange([...selectedTags, tagName]);
    }
    setSearch('');
    setIsOpen(false);
  };

  const handleCreateNew = async () => {
    const nome = search.trim();
    
    if (!nome) return;
    
    const novaAcessibilidade = await criarAcessibilidade(nome);
    
    if (novaAcessibilidade && !selectedTags.includes(novaAcessibilidade.nome)) {
      onChange([...selectedTags, novaAcessibilidade.nome]);
    }
    
    setSearch('');
    setIsOpen(false);
    setShowCreateConfirm(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (filteredOptions.length > 0) {
        // Se há opções filtradas, seleciona a primeira
        handleSelectTag(filteredOptions[0].nome);
      } else if (shouldShowCreate) {
        // Se não há opções mas o termo é válido, cria nova
        if (showCreateConfirm) {
          handleCreateNew();
        } else {
          setShowCreateConfirm(true);
        }
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setShowCreateConfirm(false);
    }
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCreateConfirm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input de busca */}
      <div className="inline-flex items-center bg-blue1 px-4 py-2 rounded-xl font-medium border border-blue2 w-full">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsOpen(true)}
          disabled={disabled || loading}
          className="bg-transparent border-none outline-none placeholder-blue3 text-blue3 w-full font-medium"
          placeholder={loading ? "Carregando..." : placeholder}
        />
        {loading && (
          <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue3"></div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 w-full bg-white border border-blue2 shadow-lg max-h-48 overflow-y-auto rounded-lg z-10 mt-1">
          {error && (
            <div className="p-3 text-red-500 text-sm border-b border-gray-200">
              {error}
            </div>
          )}
          
          {/* Opções existentes */}
          {filteredOptions.map((acessibilidade) => (
            <div
              key={acessibilidade.id}
              onClick={() => handleSelectTag(acessibilidade.nome)}
              className="p-3 hover:bg-blue1 cursor-pointer text-blue3 text-sm border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <span className="font-medium">{acessibilidade.nome}</span>
            </div>
          ))}
          
          {/* Opção para criar nova */}
          {shouldShowCreate && (
            <div 
              onClick={() => setShowCreateConfirm(true)}
              className="p-3 hover:bg-green-50 cursor-pointer text-green-700 text-sm border-t-2 border-green-200 transition-colors"
            >
              <div className="flex items-center">
                <span className="mr-2">✨</span>
                <div>
                  <span className="font-medium">Criar nova: "{search}"</span>
                  <div className="text-xs text-green-600">
                    Clique para adicionar como nova acessibilidade
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Confirmação de criação */}
          {showCreateConfirm && shouldShowCreate && (
            <div className="p-3 bg-yellow-50 border-t-2 border-yellow-200">
              <div className="text-sm text-yellow-800 mb-2">
                <strong>Confirmar criação de nova acessibilidade?</strong>
              </div>
              <div className="text-xs text-yellow-700 mb-3">
                Será criado: "<strong>{search.trim()}</strong>"
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCreateNew}
                  className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
                >
                  ✓ Criar
                </button>
                <button
                  onClick={() => setShowCreateConfirm(false)}
                  className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors"
                >
                  ✗ Cancelar
                </button>
              </div>
            </div>
          )}
          
          {/* Estado vazio */}
          {!loading && filteredOptions.length === 0 && !shouldShowCreate && (
            <div className="p-4 text-center text-gray-500 text-sm">
              {search ? "Nenhuma acessibilidade encontrada" : "Digite para buscar acessibilidades"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}