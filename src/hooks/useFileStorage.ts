import { useState, useEffect } from 'react';

interface FileStorage {
    [key: string]: File;
}

export function useFileStorage(storageKey: string) {
    const [files, setFiles] = useState<FileStorage>({});

    // Carregar arquivos do localStorage na inicialização
    useEffect(() => {
        const savedFiles = localStorage.getItem(storageKey);
        if (savedFiles) {
            try {
                const parsedFiles = JSON.parse(savedFiles);
                const restoredFiles: FileStorage = {};
                
                // Restaurar arquivos do localStorage
                Object.keys(parsedFiles).forEach(key => {
                    const fileData = parsedFiles[key];
                    if (fileData.name && fileData.data) {
                        // Converter base64 de volta para File
                        const byteCharacters = atob(fileData.data);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const file = new File([byteArray], fileData.name, { type: fileData.type });
                        restoredFiles[key] = file;
                    }
                });
                
                setFiles(restoredFiles);
            } catch (error) {
                console.error('Erro ao restaurar arquivos:', error);
            }
        }
    }, [storageKey]);

    const saveFile = (key: string, file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            const fileData = {
                name: file.name,
                type: file.type,
                data: base64
            };
            
            setFiles(prev => {
                const newFiles = { ...prev, [key]: file };
                
                // Salvar no localStorage
                const filesToSave = { ...prev };
                filesToSave[key] = file;
                
                const serializedFiles: any = {};
                Object.keys(filesToSave).forEach(k => {
                    if (k === key) {
                        serializedFiles[k] = fileData;
                    } else {
                        // Para outros arquivos, manter dados existentes se já estão no localStorage
                        const existing = localStorage.getItem(storageKey);
                        if (existing) {
                            const parsed = JSON.parse(existing);
                            if (parsed[k]) {
                                serializedFiles[k] = parsed[k];
                            }
                        }
                    }
                });
                
                localStorage.setItem(storageKey, JSON.stringify(serializedFiles));
                return newFiles;
            });
        };
        reader.readAsDataURL(file);
    };

    const removeFile = (key: string) => {
        setFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[key];
            
            // Atualizar localStorage
            const existing = localStorage.getItem(storageKey);
            if (existing) {
                const parsed = JSON.parse(existing);
                delete parsed[key];
                localStorage.setItem(storageKey, JSON.stringify(parsed));
            }
            
            return newFiles;
        });
    };

    const clearAll = () => {
        setFiles({});
        localStorage.removeItem(storageKey);
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