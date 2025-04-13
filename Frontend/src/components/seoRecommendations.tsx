import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

interface SeoRecommendationsProps {
  recommendations: {
    critical: string[];
    important: string[];
    suggested: string[];
  };
}

export default function SeoRecommendations({ recommendations }: SeoRecommendationsProps) {
  const { critical, important, suggested } = recommendations;
  
  const hasRecommendations = critical.length > 0 || important.length > 0 || suggested.length > 0;
  
  if (!hasRecommendations) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellent SEO Implementation</h3>
            <p className="text-gray-600 max-w-md">
              Your website has excellent SEO implementation! We couldn't find any recommendations to improve your SEO.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 mb-8">
      {critical.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Critical Issues
            </CardTitle>
            <CardDescription>
              These issues significantly impact your SEO performance and should be fixed immediately
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {critical.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {important.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              Important Improvements
            </CardTitle>
            <CardDescription>
              These issues are important to fix for better SEO performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {important.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3 bg-amber-50 p-3 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {suggested.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2 text-blue-600">
              <CheckCircle className="h-5 w-5" />
              Suggested Optimizations
            </CardTitle>
            <CardDescription>
              These optimizations can help improve your SEO further
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {suggested.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3 bg-blue-50 p-3 rounded-md">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
