import { useState, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Digite aqui...", 
  label 
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const applyMarkdown = (syntax: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    if (selectedText) {
      const beforeText = value.substring(0, start);
      const afterText = value.substring(end);
      let formattedText = '';
      
      switch(syntax) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
      }
      
      onChange(beforeText + formattedText + afterText);
    }
  };

  const insertList = (type: 'ul' | 'ol') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeText = value.substring(0, start);
    const afterText = value.substring(start);
    const listText = type === 'ul' 
      ? '\n- Item 1\n- Item 2\n- Item 3\n'
      : '\n1. Item 1\n2. Item 2\n3. Item 3\n';
    
    onChange(beforeText + listText + afterText);
  };

  // Converte Markdown para HTML
  const markdownToHtml = (markdown: string): string => {
    return markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      .replace(/((<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="space-y-2">
      <label className="block text-blue3 font-medium">
        {label}
      </label>
      
      <div className="border border-gray-300 rounded-lg">
        {/* Toolbar */}
        <div className="flex justify-between items-center p-2 bg-gray-100 border-b border-gray-300">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => applyMarkdown('bold')}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-50 font-bold"
              title="Negrito (**texto**)"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => applyMarkdown('italic')}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-50 italic"
              title="Itálico (*texto*)"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => applyMarkdown('underline')}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-50 underline"
              title="Sublinhado"
            >
              U
            </button>
            <div className="border-l mx-2"></div>
            <button
              type="button"
              onClick={() => insertList('ul')}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
              title="Lista (- item)"
            >
              •
            </button>
            <button
              type="button"
              onClick={() => insertList('ol')}
              className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
              title="Lista numerada (1. item)"
            >
              1.
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3 py-1 border rounded hover:bg-gray-50 text-sm ${
              showPreview ? 'bg-blue3 text-white' : 'bg-white'
            }`}
            title="Alternar preview"
          >
            {showPreview ? 'Editar' : 'Preview'}
          </button>
        </div>

        <div className="flex h-48">
          {/* Editor */}
          <div className={showPreview ? 'w-1/2' : 'w-full'}>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={`${placeholder}\n\nDicas:\n**negrito** *itálico*\n- lista\n1. numerada`}
              className="w-full h-full p-3 border-0 resize-none focus:outline-none focus:ring-0 rounded-bl-lg"
            />
          </div>
          
          {/* Preview */}
          {showPreview && (
            <div className="w-1/2 border-l border-gray-300 bg-gray-50">
              <div className="h-full p-3 overflow-auto prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        Use: **negrito** *itálico* - lista 1. numerada
      </p>
    </div>
  );
}