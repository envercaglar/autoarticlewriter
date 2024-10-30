import React from 'react';
import { BarChart2, Clock } from 'lucide-react';

interface ContentStatsProps {
  content: string;
}

export function ContentStats({ content }: ContentStatsProps) {
  const wordCount = content.trim().split(/\s+/).length;
  const charCount = content.length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/minute

  if (!content) return null;

  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mt-4">
      <div className="flex items-center">
        <BarChart2 className="w-4 h-4 mr-1" />
        <span>{wordCount} kelime · {charCount} karakter</span>
      </div>
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-1" />
        <span>Tahmini okuma süresi: {readingTime} dakika</span>
      </div>
    </div>
  );
}