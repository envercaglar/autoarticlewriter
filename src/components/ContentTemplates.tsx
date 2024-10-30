import React from 'react';
import { FileText, Mail, MessageSquare, ShoppingBag, Newspaper } from 'lucide-react';

interface Template {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  structure: string;
}

const templates: Template[] = [
  {
    id: 'blog',
    icon: <FileText className="w-5 h-5" />,
    title: 'Blog Yazısı',
    description: 'SEO dostu, bilgilendirici blog içeriği',
    structure: '# [Ana Başlık]\n\n## Giriş\n\n## Ana Bölüm\n\n## Sonuç'
  },
  {
    id: 'product',
    icon: <ShoppingBag className="w-5 h-5" />,
    title: 'Ürün Açıklaması',
    description: 'İkna edici ürün tanıtım metni',
    structure: '# [Ürün Adı]\n\n## Özellikler\n\n## Faydalar\n\n## Teknik Detaylar'
  },
  {
    id: 'social',
    icon: <MessageSquare className="w-5 h-5" />,
    title: 'Sosyal Medya',
    description: 'Etkileşim yaratan sosyal medya içeriği',
    structure: '📢 [Ana Mesaj]\n\n🔍 Detaylar\n\n#hashtag1 #hashtag2'
  },
  {
    id: 'email',
    icon: <Mail className="w-5 h-5" />,
    title: 'E-posta',
    description: 'Profesyonel e-posta içeriği',
    structure: 'Konu: [E-posta Konusu]\n\nSayın [İsim],\n\nİçerik\n\nSaygılarımla,'
  },
  {
    id: 'news',
    icon: <Newspaper className="w-5 h-5" />,
    title: 'Haber Yazısı',
    description: 'Haber formatında içerik',
    structure: '# [Haber Başlığı]\n\n## Spot\n\n## Detaylar\n\n## Arka Plan'
  }
];

interface ContentTemplatesProps {
  onSelect: (template: Template) => void;
}

export function ContentTemplates({ onSelect }: ContentTemplatesProps) {
  return (
    <div className="w-full max-w-2xl mb-8">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        İçerik Şablonları
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
              {template.icon}
            </div>
            <div className="ml-4 text-left">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {template.title}
              </h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}