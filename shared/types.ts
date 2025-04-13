export interface MetaTag {
  name: string;
  content: string;
  status: 'success' | 'warning' | 'error';
}

export interface CategoryScore {
  name: string;
  score: number;
  percentage: number;
  status: 'success' | 'warning' | 'error';
}

export interface AnalysisResult {
  url: string;
  score: number;
  timestamp: string;
  metaTags: {
    title: {
      content: string;
      length: number;
      status: 'success' | 'warning' | 'error';
      feedback: string[];
    };
    description: {
      content: string;
      length: number;
      status: 'success' | 'warning' | 'error';
      feedback: string[];
    };
    ogTags: MetaTag[];
    twitterTags: MetaTag[];
    otherTags: MetaTag[];
  };
  categories: {
    metaTags: CategoryScore;
    content: CategoryScore;
    performance: CategoryScore;
  };
  recommendations: {
    critical: string[];
    important: string[];
    suggested: string[];
  };
}

export type TabType = 'metaTags' | 'searchPreviews' | 'socialPreviews' | 'seoRecommendations' | 'technicalDetails';
