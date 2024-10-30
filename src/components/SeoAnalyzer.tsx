import React from 'react';
import { Search, AlertCircle, CheckCircle } from 'lucide-react';

interface SeoAnalyzerProps {
  content: string;
  keywords: string;
}

interface SeoScore {
  score: number;
  suggestions: string[];
}

export function SeoAnalyzer({ content, keywords }: SeoAnalyzerProps) {
  const analyzeSeo = (): SeoScore => {
    const score = {
      score: 0,
      suggestions: [] as string[],
    };

    // Kelime sayısı kontrolü
    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount < 300) {
      score.suggestions.push('İçerik 300 kelimeden az. SEO için daha uzun içerik önerilir.');
    } else {
      score.score += 25;
    }

    // Anahtar kelime yoğunluğu kontrolü
    const keywordList = keywords.split(',').map(k => k.trim().toLowerCase());
    const contentLower = content.toLowerCase();
    let keywordDensity = 0;

    keywordList.forEach(keyword => {
      const regex = new RegExp(keyword, 'g');
      const count = (contentLower.match(regex) || []).length;
      keywordDensity += count;
    });

    const density = (keywordDensity / wordCount) * 100;
    if (density < 0.5) {
      score.suggestions.push('Anahtar kelime yoğunluğu düşük.');
    } else if (density > 2.5) {
      score.suggestions.push('Anahtar kelime yoğunluğu çok yüksek.');
    } else {
      score.score += 25;
    }

    // Başlık kontrolü
    if (content.includes('# ')) {
      score.score += 25;
    } else {
      score.suggestions.push('Ana başlık eksik.');
    }

    // Alt başlık kontrolü
    if (content.includes('## ')) {
      score.score += 25;
    } else {
      score.suggestions.push('Alt başlıklar ekleyin.');
    }

    return score;
  };

  const seoScore = analyzeSeo();

  if (!content) return null;

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          SEO Analizi
        </h3>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${seoScore.score}%` }}
          ></div>
        </div>
        <span className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          {seoScore.score}%
        </span>
      </div>

      {seoScore.suggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            İyileştirme Önerileri:
          </h4>
          {seoScore.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-400">{suggestion}</span>
            </div>
          ))}
        </div>
      )}

      {seoScore.score === 100 && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle className="w-4 h-4" />
          <span>Mükemmel! İçeriğiniz SEO açısından optimize edilmiş.</span>
        </div>
      )}
    </div>
  );
}