import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { X, ArrowRight, Loader2 } from "lucide-react";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function UrlInput({ onAnalyze, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (input: string): boolean => {
    // Basic URL validation
    let urlToCheck = input.trim();
    
    // Add protocol if missing
    if (!/^https?:\/\//i.test(urlToCheck)) {
      urlToCheck = "https://" + urlToCheck;
    }
    
    try {
      new URL(urlToCheck);
      setError("");
      return true;
    } catch (e) {
      setError("Please enter a valid URL");
      return false;
    }
  };

  const handleAnalyze = () => {
    if (validateUrl(url)) {
      let urlToAnalyze = url.trim();
      
      // Add protocol if missing
      if (!/^https?:\/\//i.test(urlToAnalyze)) {
        urlToAnalyze = "https://" + urlToAnalyze;
      }
      
      onAnalyze(urlToAnalyze);
    }
  };

  const clearUrl = () => {
    setUrl("");
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  const exampleUrls = [
    "facebook.com",
    "shopify.com", 
    "github.com"
  ];

  return (
    <Card className="bg-white shadow-sm mb-8">
      <CardContent className="p-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Analyze any website for SEO optimization
          </h2>
          <div className="flex items-stretch">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <Input
                type="text"
                placeholder="Enter a URL to analyze (e.g., https://example.com)"
                className="w-full pl-10 pr-12 py-6 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {url && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearUrl}
                    className="h-8 w-8 text-gray-400 hover:text-gray-600"
                    title="Clear URL"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !url.trim()}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-6 rounded-r-md font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <div className="flex flex-wrap mt-4 text-sm gap-2">
            {exampleUrls.map((exampleUrl) => (
              <Button
                key={exampleUrl}
                variant="outline"
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600"
                onClick={() => setUrl(exampleUrl)}
              >
                Example: {exampleUrl}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
