import { useState } from "react";
import { AnalysisResult, TabType } from "@shared/types";
import OverallScore from "./overallScore";
import MetaTags from "./metaTags";
import SearchPreviews from "./searchPreviews";
import SocialPreviews from "./socialPreviews";
import SeoRecommendations from "./seoRecommendations";
import TechnicalDetails from "./technicalDetails";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface AnalysisResultsProps {
  analysis: AnalysisResult;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("metaTags");

  const formatAnalysisTime = (isoString: string) => {
    const date = new Date(isoString);
    return {
      relative: formatDistanceToNow(date, { addSuffix: true }),
      formatted: date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const formattedTime = formatAnalysisTime(analysis.timestamp);
  
  const getDomainFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch (e) {
      return url;
    }
  };

  const domain = getDomainFromUrl(analysis.url);

  return (
    <div className="mb-8" id="analysisResults">
      {/* Results Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">SEO Analysis Results</h2>
          <p className="text-gray-500 mt-1">
            Analysis completed for <span className="font-medium text-gray-700">{domain}</span> • {formattedTime.formatted}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Report
          </Button>
        </div>
      </div>

      {/* Overall Score Panel */}
      <OverallScore score={analysis.score} categories={analysis.categories} />

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium ${
                activeTab === "metaTags"
                  ? "text-primary border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              }`}
              onClick={() => setActiveTab("metaTags")}
            >
              Meta Tags
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium ${
                activeTab === "searchPreviews"
                  ? "text-primary border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              }`}
              onClick={() => setActiveTab("searchPreviews")}
            >
              Search Previews
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium ${
                activeTab === "socialPreviews"
                  ? "text-primary border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              }`}
              onClick={() => setActiveTab("socialPreviews")}
            >
              Social Previews
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium ${
                activeTab === "seoRecommendations"
                  ? "text-primary border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              }`}
              onClick={() => setActiveTab("seoRecommendations")}
            >
              SEO Recommendations
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium ${
                activeTab === "technicalDetails"
                  ? "text-primary border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              }`}
              onClick={() => setActiveTab("technicalDetails")}
            >
              Technical Details
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "metaTags" && <MetaTags metaTags={analysis.metaTags} />}
      {activeTab === "searchPreviews" && <SearchPreviews analysis={analysis} />}
      {activeTab === "socialPreviews" && <SocialPreviews analysis={analysis} />}
      {activeTab === "seoRecommendations" && <SeoRecommendations recommendations={analysis.recommendations} />}
      {activeTab === "technicalDetails" && <TechnicalDetails analysis={analysis} />}
    </div>
  );
}
