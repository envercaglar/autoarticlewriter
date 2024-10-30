import React from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PenTool, Download } from 'lucide-react';
import { ContentForm } from './components/ContentForm';
import { ContentOutput } from './components/ContentOutput';
import { TopicSuggestions } from './components/TopicSuggestions';
import { ContentHistory } from './components/ContentHistory';
import { AdvancedSettings } from './components/AdvancedSettings';
import { ThemeToggle } from './components/ThemeToggle';
import { SuggestedKeywords } from './components/SuggestedKeywords';
import { Footer } from './components/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { formatContent } from './utils/formatContent';
import { ContentItem } from './types';

const genAI = new GoogleGenerativeAI('AIzaSyBk6HXUsvS3b0p2falE5MDbNWvKQI-Z6hI');

function App() {
  const [topic, setTopic] = React.useState('');
  const [tone, setTone] = React.useState('professional');
  const [length, setLength] = React.useState('medium');
  const [keywords, setKeywords] = React.useState('');
  const [style, setStyle] = React.useState('descriptive');
  const [audience, setAudience] = React.useState('general');
  const [content, setContent] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [history, setHistory] = useLocalStorage<ContentItem[]>('content-history', []);

  const handleKeywordSelect = (keyword: string) => {
    setKeywords((prev) => {
      const keywords = prev.split(',').map((k) => k.trim()).filter(Boolean);
      if (!keywords.includes(keyword)) {
        return [...keywords, keyword].join(', ');
      }
      return prev;
    });
  };

  const generateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Lütfen aşağıdaki konu hakkında bir içerik yaz:
        Konu: ${topic}
        Ton: ${tone}
        Uzunluk: ${length}
        Yazı Stili: ${style}
        Hedef Kitle: ${audience}
        ${keywords ? `Anahtar Kelimeler: ${keywords}` : ''}
        
        İçerik Türkçe olmalı ve SEO dostu olmalıdır. Başlıklar ve alt başlıklar kullan.
        Markdown formatında yanıt ver.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const formattedContent = formatContent(response.text());
      setContent(formattedContent);

      const newItem: ContentItem = {
        id: Date.now().toString(),
        topic,
        tone,
        length,
        content: formattedContent,
        createdAt: new Date().toISOString(),
      };
      setHistory([newItem, ...history.slice(0, 9)]);
    } catch (err) {
      setError('İçerik oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const handleRestoreHistory = (item: ContentItem) => {
    setTopic(item.topic);
    setTone(item.tone);
    setLength(item.length);
    setContent(item.content);
  };

  const exportContent = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ThemeToggle />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <PenTool className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Otomatik İçerik Yazıcı
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Yapay zeka destekli içerik üretimi ile profesyonel metinler oluşturun
          </p>
        </div>

        <div className="flex flex-col items-center">
          <TopicSuggestions onSelectTopic={setTopic} />

          {error && (
            <div className="w-full max-w-2xl bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 p-4 rounded-md mb-8">
              {error}
            </div>
          )}

          <ContentForm
            topic={topic}
            setTopic={setTopic}
            tone={tone}
            setTone={setTone}
            length={length}
            setLength={setLength}
            onSubmit={generateContent}
            isLoading={isLoading}
          />

          <SuggestedKeywords topic={topic} onKeywordSelect={handleKeywordSelect} />

          <AdvancedSettings
            keywords={keywords}
            setKeywords={setKeywords}
            style={style}
            setStyle={setStyle}
            audience={audience}
            setAudience={setAudience}
          />

          <ContentOutput 
            content={content} 
            onExport={exportContent}
          />

          <ContentHistory
            history={history}
            onDelete={handleDeleteHistory}
            onRestore={handleRestoreHistory}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;