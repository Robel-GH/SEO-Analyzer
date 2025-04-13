import { CategoryScore } from "@shared/types";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, AlertTriangleIcon, XIcon } from "lucide-react";

interface OverallScoreProps {
  score: number;
  categories: {
    metaTags: CategoryScore;
    content: CategoryScore;
    performance: CategoryScore;
  };
}

export default function OverallScore({ score, categories }: OverallScoreProps) {
  // Calculate the stroke-dashoffset for the progress ring
  // The circumference of the circle is 2 * PI * radius
  // For a circle with radius 54, the circumference is 339.29
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  const getCategoryIcon = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckIcon className="text-green-500 text-xl" />;
      case 'warning':
        return <AlertTriangleIcon className="text-amber-500 text-xl" />;
      case 'error':
        return <XIcon className="text-red-500 text-xl" />;
    }
  };

  const getCategoryBgColor = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-amber-50';
      case 'error':
        return 'bg-red-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const scoreColor = getScoreColor(score);

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <div className="relative inline-flex items-center justify-center">
              {/* SVG Circle for Score */}
              <svg className="w-48 h-48" viewBox="0 0 120 120">
                <circle 
                  className="text-gray-100" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="none" 
                  cx="60" 
                  cy="60" 
                  r="54" 
                />
                <circle 
                  className={scoreColor}
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="none" 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className={`text-4xl font-bold text-gray-900`}>
                  {score}
                </span>
                <span className="text-gray-500 mt-1">Overall Score</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 md:pl-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">SEO Health Overview</h3>
            <p className="text-gray-600 mb-4">
              {score >= 80 
                ? "Your site is performing well in most SEO aspects. Keep up the good work and address any minor issues for optimal performance."
                : score >= 60
                ? "Your site is doing well in several areas, but there are opportunities for improvement. Focus on fixing critical issues to enhance your SEO performance."
                : "Your site needs significant SEO improvements. Address the critical issues first to improve your search visibility and user experience."
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(categories).map((category) => (
                <div key={category.name} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${getCategoryBgColor(category.status)} flex items-center justify-center mr-3`}>
                      {getCategoryIcon(category.status)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.percentage}% Complete</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
