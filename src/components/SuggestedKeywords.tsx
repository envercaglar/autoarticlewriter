import React from 'react';
import { Tag } from 'lucide-react';

interface SuggestedKeywordsProps {
  topic: string;
  onKeywordSelect: (keyword: string) => void;
}

const KEYWORD_CATEGORIES = {
  'teknoloji': ['dijital', 'inovasyon', 'yazılım', 'donanım', 'yapay zeka', 'bulut bilişim'],
  'sağlık': ['beslenme', 'egzersiz', 'wellness', 'yaşam tarzı', 'mental sağlık'],
  'iş': ['girişimcilik', 'yönetim', 'liderlik', 'strateji', 'pazarlama'],
  'eğitim': ['öğrenme', 'gelişim', 'beceri', 'eğitim teknolojileri', 'uzaktan eğitim']
};

export function SuggestedKeywords({ topic, onKeywordSelect }: SuggestedKeywordsProps) {
  const getRelevantKeywords = () => {
    const category = Object.entries(KEYWORD_CATEGORIES).find(([key]) => 
      topic.toLowerCase().includes(key)
    );
    return category ? category[1] : [];
  };

  const keywords = getRelevantKeywords();

  if (keywords.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Tag className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Önerilen Anahtar Kelimeler
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <button
            key={keyword}
            onClick={() => onKeywordSelect(keyword)}
            className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
}