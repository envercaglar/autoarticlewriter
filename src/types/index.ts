export interface ContentItem {
  id: string;
  topic: string;
  tone: string;
  length: string;
  content: string;
  createdAt: string;
}

export interface TopicSuggestion {
  category: string;
  topics: string[];
}