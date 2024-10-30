import React from 'react';
import { Settings2 } from 'lucide-react';

interface AdvancedSettingsProps {
  keywords: string;
  setKeywords: (keywords: string) => void;
  style: string;
  setStyle: (style: string) => void;
  audience: string;
  setAudience: (audience: string) => void;
}

export function AdvancedSettings({
  keywords,
  setKeywords,
  style,
  setStyle,
  audience,
  setAudience,
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <Settings2 className="w-4 h-4 mr-1" />
        Gelişmiş Ayarlar
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Anahtar Kelimeler
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Virgülle ayırarak girin..."
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Yazı Stili
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            >
              <option value="descriptive">Betimleyici</option>
              <option value="narrative">Hikayeleştirici</option>
              <option value="analytical">Analitik</option>
              <option value="persuasive">İkna Edici</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Hedef Kitle
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            >
              <option value="general">Genel</option>
              <option value="professional">Profesyonel</option>
              <option value="technical">Teknik</option>
              <option value="academic">Akademik</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}