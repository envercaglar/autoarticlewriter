import React from 'react';
import { Lightbulb } from 'lucide-react';
import { topicSuggestions } from '../data/suggestions';

interface TopicSuggestionsProps {
  onSelectTopic: (topic: string) => void;
}

export function TopicSuggestions({ onSelectTopic }: TopicSuggestionsProps) {
  return (
    <div className="w-full max-w-2xl mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Konu Önerileri
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topicSuggestions.map((suggestion) => (
          <div key={suggestion.category} className="space-y-2">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">
              {suggestion.category}
            </h4>
            <ul className="space-y-1">
              {suggestion.topics.map((topic) => (
                <li key={topic}>
                  <button
                    onClick={() => onSelectTopic(topic)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}