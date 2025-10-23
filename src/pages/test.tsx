import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { API_BASE_URL } from "../config/api";
import GenericBlueButton from "../components/buttons/generic_blue_button";

type TipoArquivo = 'CURRICULO' | 'LAUDO' | 'FOTO';

interface Documentos {
  curriculo: string | null;
  laudo: string | null;
  foto: string | null;
}

export default function TestPage() {
  const { user, token, role } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tipoArquivo, setTipoArquivo] = useState<TipoArquivo>('FOTO');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [documentos, setDocumentos] = useState<Documentos | null>(null);
  const [loadingDocs, setLoadingDocs] = useState(false);
  
  const isCompany = role === 'EMPRESA';

  const uploadDocumento = async (file: File, tipo: TipoArquivo, userId: number) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tipo', tipo);
    
    if (isCompany) {
      formData.append('empresaId', userId.toString());
    } else {
      formData.append('candidatoId', userId.toString());
    }

    const endpoint = isCompany ? '/api/arquivos/upload' : '/api/arquivos/upload';
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    return await response.json();
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?.id) {
      setResult('Selecione um arquivo e faça login');
      return;
    }

    setUploading(true);
    try {
      const response = await uploadDocumento(selectedFile, tipoArquivo, user.id);
      setResult(`Sucesso: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`Erro: ${error}`);
    } finally {
      setUploading(false);
    }
  };

  const fetchDocumentos = async () => {
    if (!user?.id) {
      setResult('Faça login para buscar documentos');
      return;
    }

    setLoadingDocs(true);
    try {
      const endpoint = isCompany 
        ? `/api/arquivos/empresa/${user.id}/documentos`
        : `/api/arquivos/candidato/${user.id}/documentos`;
        
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setDocumentos(data);
      setResult('Documentos carregados com sucesso!');
    } catch (error) {
      setResult(`Erro ao buscar documentos: ${error}`);
      setDocumentos(null);
    } finally {
      setLoadingDocs(false);
    }
  };

  const downloadDocumento = (tipo: TipoArquivo) => {
    if (!user?.id) return;
    if (isCompany) {
      window.open(`${API_BASE_URL}/api/arquivo/empresa/${user.id}/${tipo.toLowerCase()}/download`, '_blank');
    } else {
      window.open(`${API_BASE_URL}/api/arquivos/candidato/${user.id}/${tipo.toLowerCase()}/download`, '_blank');
    }
  };

  const viewDocumento = (tipo: TipoArquivo) => {
    if (!user?.id) return;
    if (isCompany) {
      window.open(`${API_BASE_URL}/api/arquivo/empresa/${user.id}/${tipo.toLowerCase()}/view`, '_blank');
    } else {
      window.open(`${API_BASE_URL}/api/arquivos/candidato/${user.id}/${tipo.toLowerCase()}/view`, '_blank');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Teste de Upload - {isCompany ? 'Empresa' : 'Candidato'}</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de Arquivo:</label>
          <select 
            value={tipoArquivo} 
            onChange={(e) => setTipoArquivo(e.target.value as TipoArquivo)}
            className="w-full p-2 border rounded"
          >
            {!isCompany && <option value="CURRICULO">Currículo</option>}
            {!isCompany && <option value="LAUDO">Laudo</option>}
            <option value="FOTO">{isCompany ? 'Logo da Empresa' : 'Foto'}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Arquivo:</label>
          <input 
            type="file" 
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded"
          />
        </div>

        {!uploading && selectedFile ? (
          <GenericBlueButton 
            color={3} 
            size="md" 
            onClick={handleUpload}
          >
            Enviar Arquivo
          </GenericBlueButton>
        ) : (
          <div className="p-2 bg-gray-300 text-gray-500 rounded text-center">
            {uploading ? 'Enviando...' : 'Selecione um arquivo'}
          </div>
        )}

        {!loadingDocs ? (
          <GenericBlueButton 
            color={2} 
            size="md" 
            onClick={fetchDocumentos}
          >
            Buscar Meus Documentos
          </GenericBlueButton>
        ) : (
          <div className="p-2 bg-gray-300 text-gray-500 rounded text-center">
            Buscando...
          </div>
        )}

        {documentos && (
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h3 className="font-medium mb-4">Meus Documentos:</h3>
            
            <div className="space-y-4">
              {!isCompany && (
                <>
                  <div className="border-b pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Currículo: {documentos.curriculo ? '✅' : '❌'}</span>
                    </div>
                    {documentos.curriculo && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => viewDocumento('CURRICULO')}
                          className="text-green-600 hover:text-green-800 text-sm underline"
                        >
                          Visualizar
                        </button>
                        <button 
                          onClick={() => downloadDocumento('CURRICULO')}
                          className="text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          Baixar
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-b pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Laudo: {documentos.laudo ? '✅' : '❌'}</span>
                    </div>
                    {documentos.laudo && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => viewDocumento('LAUDO')}
                            className="text-green-600 hover:text-green-800 text-sm underline"
                          >
                            Visualizar
                          </button>
                          <button 
                            onClick={() => downloadDocumento('LAUDO')}
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            Baixar
                          </button>
                        </div>
                        <iframe 
                          src={`${API_BASE_URL}/api/arquivos/candidato/${user?.id}/laudo/view`}
                          className="w-full h-40 border rounded"
                          title="Visualização do Laudo"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{isCompany ? 'Logo' : 'Foto'}: {documentos.foto ? '✅' : '❌'}</span>
                </div>
                {documentos.foto && (
                  <div className="flex gap-2 mb-3">
                    <button 
                      onClick={() => viewDocumento('FOTO')}
                      className="text-green-600 hover:text-green-800 text-sm underline"
                    >
                      Visualizar
                    </button>
                    <button 
                      onClick={() => downloadDocumento('FOTO')}
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      Baixar
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {documentos.foto && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">{isCompany ? 'Logo da Empresa:' : 'Foto de Perfil:'}</h4>
                <img 
                  src={isCompany 
                    ? `${API_BASE_URL}/api/arquivo/empresa/${user?.id}/foto/view`
                    : `${API_BASE_URL}/api/arquivos/candidato/${user?.id}/foto/view`
                  }
                  alt={isCompany ? 'Logo da empresa' : 'Foto de perfil'}
                  className="w-32 h-32 object-cover rounded-lg border"
                  onError={(e) => {
                    console.log('Erro ao carregar imagem');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-medium mb-2">Resultado:</h3>
            <p className="text-sm">{result}</p>
          </div>
        )}

        {user?.id && (
          <div className="mt-6 p-4 bg-green-50 rounded">
            <h3 className="font-medium mb-4">Teste de Visualização Direta:</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Foto (tag img):</h4>
                <img 
                  src={`${API_BASE_URL}/api/arquivos/candidato/${user.id}/foto/view`}
                  alt="Foto teste"
                  className="w-24 h-24 object-cover rounded border"
                  onLoad={() => console.log('Imagem carregada com sucesso!')}
                  onError={(e) => {
                    console.log('Erro ao carregar imagem teste');
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjEyIiB5PSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzY2NzI4NSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Currículo (iframe):</h4>
                <iframe 
                  src={`${API_BASE_URL}/api/arquivos/candidato/${user.id}/curriculo/view`}
                  className="w-full h-32 border rounded bg-white"
                  title="Teste Currículo"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Laudo (iframe):</h4>
                <iframe 
                  src={`${API_BASE_URL}/api/arquivos/candidato/${user.id}/laudo/view`}
                  className="w-full h-32 border rounded bg-white"
                  title="Teste Laudo"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

