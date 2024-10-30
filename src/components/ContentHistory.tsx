import React from 'react';
import { History, Trash2 } from 'lucide-react';
import { ContentItem } from '../types';

interface ContentHistoryProps {
  history: ContentItem[];
  onDelete: (id: string) => void;
  onRestore: (item: ContentItem) => void;
}

export function ContentHistory({ history, onDelete, onRestore }: ContentHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          İçerik Geçmişi
        </h3>
      </div>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex justify-between items-start"
          >
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {item.topic}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(item.createdAt).toLocaleDateString('tr-TR')} · {item.tone} · {item.length}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onRestore(item)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Yeniden Yükle
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}