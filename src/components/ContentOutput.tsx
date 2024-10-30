import React from 'react';
import { Copy, Check, Download, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ContentStats } from './ContentStats';

interface ContentOutputProps {
  content: string;
  onExport: () => void;
}

export function ContentOutput({ content, onExport }: ContentOutputProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareContent = async () => {
    try {
      await navigator.share({
        title: 'İçerik Paylaşımı',
        text: content,
      });
    } catch (error) {
      console.error('Paylaşım hatası:', error);
    }
  };

  if (!content) return null;

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Oluşturulan İçerik
          </h3>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Kopyalandı
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Kopyala
                </>
              )}
            </button>
            <button
              onClick={onExport}
              className="flex items-center px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <Download className="w-4 h-4 mr-1" />
              İndir
            </button>
            {navigator.share && (
              <button
                onClick={shareContent}
                className="flex items-center px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Paylaş
              </button>
            )}
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <ContentStats content={content} />
      </div>
    </div>
  );
}