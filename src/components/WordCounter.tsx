import React from 'react';

interface WordCounterProps {
  content: string;
}

export function WordCounter({ content }: WordCounterProps) {
  const wordCount = content.trim().split(/\s+/).length;
  const charCount = content.length;

  if (!content) return null;

  return (
    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
      {wordCount} kelime · {charCount} karakter
    </div>
  );
}