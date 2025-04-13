import { useState } from 'react';
import { AnalysisResult } from '@shared/types';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';


export function useAnalysis() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      setIsAnalyzing(true);
      const response = await apiRequest('POST', '/api/analyze', { url });
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysis(data.results);
      setIsAnalyzing(false);
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: `Error analyzing URL: ${error.message}`,
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  });

  const analyzeUrl = (url: string) => {
    analyzeMutation.mutate(url);
  };

  return {
    analysis,
    isAnalyzing,
    analyzeUrl
  };
}
