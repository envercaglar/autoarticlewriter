import React from 'react';
import { Wand2 } from 'lucide-react';

interface ContentFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  tone: string;
  setTone: (tone: string) => void;
  length: string;
  setLength: (length: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function ContentForm({
  topic,
  setTopic,
  tone,
  setTone,
  length,
  setLength,
  onSubmit,
  isLoading,
}: ContentFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full max-w-2xl">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Konu
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder="İçerik konusunu girin..."
          required
        />
      </div>

      <div>
        <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Ton
        </label>
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        >
          <option value="professional">Profesyonel</option>
          <option value="casual">Günlük</option>
          <option value="friendly">Samimi</option>
          <option value="formal">Resmi</option>
        </select>
      </div>

      <div>
        <label htmlFor="length" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Uzunluk
        </label>
        <select
          id="length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        >
          <option value="short">Kısa (250 kelime)</option>
          <option value="medium">Orta (500 kelime)</option>
          <option value="long">Uzun (1000 kelime)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            İçerik Oluşturuluyor...
          </div>
        ) : (
          <>
            <Wand2 className="w-5 h-5 mr-2" />
            İçerik Oluştur
          </>
        )}
      </button>
    </form>
  );
}