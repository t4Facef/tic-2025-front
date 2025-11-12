import { useState, useEffect } from 'react';

interface FileStorage {
    [key: string]: File;
}

export function useFileStorage(storageKey: string) {
    const [files, setFiles] = useState<FileStorage>({});

    // Carregar apenas metadados pequenos do localStorage na inicialização
    useEffect(() => {
        const savedFileNames = localStorage.getItem(`${storageKey}_names`);
        if (savedFileNames) {
            try {
                // Verificar se há arquivos salvos
            } catch (error) {
                console.error('Erro ao verificar arquivos salvos:', error);
                // Limpar dados corrompidos
                localStorage.removeItem(`${storageKey}_names`);
            }
        }
    }, [storageKey]);

    const saveFile = (key: string, file: File) => {
        setFiles(prev => {
            const newFiles = { ...prev, [key]: file };
            
            // Salvar apenas metadados no localStorage para arquivos pequenos
            try {
                const fileNames = JSON.parse(localStorage.getItem(`${storageKey}_names`) || '{}');
                fileNames[key] = {
                    name: file.name,
                    type: file.type,
                    size: file.size
                };
                localStorage.setItem(`${storageKey}_names`, JSON.stringify(fileNames));
            } catch (error) {
                console.warn('Não foi possível salvar metadados do arquivo:', error);
                // Se localStorage falhar, continua sem ele
            }
            
            return newFiles;
        });
    };

    const removeFile = (key: string) => {
        setFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[key];
            
            // Remover metadados do localStorage
            try {
                const fileNames = JSON.parse(localStorage.getItem(`${storageKey}_names`) || '{}');
                delete fileNames[key];
                localStorage.setItem(`${storageKey}_names`, JSON.stringify(fileNames));
            } catch (error) {
                console.warn('Erro ao remover metadados:', error);
            }
            
            return newFiles;
        });
    };

    const clearAll = () => {
        setFiles({});
        localStorage.removeItem(`${storageKey}_names`);
        // Limpar chaves antigas que podem estar causando problemas
        localStorage.removeItem(storageKey);
        localStorage.removeItem('candidateFiles'); // Limpar dados antigos específicos
    };

    const hasFile = (key: string) => {
        return !!files[key];
    };

    const getFile = (key: string) => {
        return files[key];
    };

    return {
        files,
        saveFile,
        removeFile,
        clearAll,
        hasFile,
        getFile
    };
}