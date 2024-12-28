export interface VideoScript {
  title: string;
  sections: {
    type: 'intro' | 'mainPoint' | 'detail' | 'theory' | 'conclusion';
    content: string;
    timestamp?: string;
  }[];
  tags: string[];
  description: string;
}

export interface TitleSuggestion {
  id: string;
  title: string;
  type: 'easter_egg' | 'hidden_detail' | 'fan_theory' | 'breakdown';
}