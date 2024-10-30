import React from 'react';
import { BookOpen, AlertTriangle } from 'lucide-react';

interface LanguageAnalyzerProps {
  content: string;
}

export function LanguageAnalyzer({ content }: LanguageAnalyzerProps) {
  const analyzeReadability = () => {
    const sentences = content.split(/[.!?]+/).filter(Boolean);
    const words = content.split(/\s+/).filter(Boolean);
    const avgWordsPerSentence = words.length / sentences.length;
    
    const suggestions = [];
    
    if (avgWordsPerSentence > 20) {
      suggestions.push('Cümleleriniz çok uzun. Daha kısa cümleler kullanmayı deneyin.');
    }
    
    const paragraphs = content.split('\n\n').filter(Boolean);
    if (paragraphs.some(p => p.split(/\s+/).length > 100)) {
      suggestions.push('Bazı paragraflarınız çok uzun. Paragrafları bölmeyi düşünün.');
    }
    
    return suggestions;
  };

  const suggestions = analyzeReadability();

  if (!content) return null;

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Dil ve Üslup Analizi
        </h3>
      </div>

      {suggestions.length > 0 ? (
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-400">{suggestion}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-green-600 dark:text-green-400">
          İçeriğinizin dil ve üslubu iyi durumda!
        </p>
      )}
    </div>
  );
}