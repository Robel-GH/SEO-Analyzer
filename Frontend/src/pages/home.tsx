import UrlInput from "../components/urlInput";
import AnalysisResults from "../components/analysisResults";
import { useState } from "react";
import { AnalysisResult } from "@shared/types";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest('POST', '/api/analyze', { url });
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysis(data.results);
      setIsLoading(false);
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: `Error analyzing URL: ${error.message}`,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  });

  const handleAnalyze = (url: string) => {
    setIsLoading(true);
    analyzeMutation.mutate(url);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
      {analysis && (
        <AnalysisResults analysis={analysis} />
      )}
    </main>
  );
}
