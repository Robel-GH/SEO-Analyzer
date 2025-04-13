import { AnalysisResult } from "@shared/types";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SearchPreviewsProps {
  analysis: AnalysisResult;
}

export default function SearchPreviews({ analysis }: SearchPreviewsProps) {
  const getURLForPreview = (url: string) => {
    try {
      const urlObj = new URL(url);
      return `${urlObj.hostname}${urlObj.pathname !== '/' ? urlObj.pathname : ''}`;
    } catch (e) {
      return url;
    }
  };

  const truncateString = (str: string, length: number) => {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  };

  return (
    <div className="grid grid-cols-1 gap-6 mb-8">
      {/* Google Search Preview */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Google Search Preview</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                {analysis.metaTags.title.content || "No title available"}
              </div>
              <div className="text-sm text-green-700 mb-1">
                {getURLForPreview(analysis.url)}
              </div>
              <div className="text-sm text-gray-600">
                {analysis.metaTags.description.content || "No description available"}
              </div>
            </div>
          </div>
          
          <Alert variant="warning" className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-sm text-amber-700">
              Note: This is a simulation of how your page might appear in Google search results. Actual display may vary.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      {/* Mobile Search Preview */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Mobile Search Preview</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <div className="max-w-xs mx-auto">
              <div className="text-base text-blue-600 hover:underline cursor-pointer mb-1">
                {truncateString(analysis.metaTags.title.content || "No title available", 40)}
              </div>
              <div className="text-xs text-green-700 mb-1">
                {getURLForPreview(analysis.url).split('/')[0]} › {getURLForPreview(analysis.url).split('/')[1] || ''}
              </div>
              <div className="text-xs text-gray-600">
                {truncateString(analysis.metaTags.description.content || "No description available", 80)}
              </div>
            </div>
          </div>
          
          <Alert variant="info" className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-sm text-blue-700">
              Mobile search results often truncate titles and descriptions. Keep your most important information at the beginning.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
