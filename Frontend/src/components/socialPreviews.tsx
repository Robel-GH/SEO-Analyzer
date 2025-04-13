import { AnalysisResult } from "@shared/types";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SocialPreviewsProps {
  analysis: AnalysisResult;
}

export default function SocialPreviews({ analysis }: SocialPreviewsProps) {
  // Function to find a specific tag by name
  const findTag = (tags: { name: string; content: string }[], name: string) => {
    return tags.find(tag => tag.name === name)?.content || "Not available";
  };

  // Get OG values
  const ogTitle = findTag(analysis.metaTags.ogTags, 'og:title');
  const ogDescription = findTag(analysis.metaTags.ogTags, 'og:description');
  const ogImage = findTag(analysis.metaTags.ogTags, 'og:image');
  const ogUrl = findTag(analysis.metaTags.ogTags, 'og:url');

  // Get Twitter values
  const twitterTitle = findTag(analysis.metaTags.twitterTags, 'twitter:title');
  const twitterDescription = findTag(analysis.metaTags.twitterTags, 'twitter:description');
  const twitterImage = findTag(analysis.metaTags.twitterTags, 'twitter:image');
  const twitterCard = findTag(analysis.metaTags.twitterTags, 'twitter:card');
  const twitterSite = findTag(analysis.metaTags.twitterTags, 'twitter:site');

  // Fallback to meta title/description if OG/Twitter values are not available
  const metaTitle = analysis.metaTags.title.content;
  const metaDescription = analysis.metaTags.description.content;

  // Get domain name for display
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Facebook Preview */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Facebook Preview</h3>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-200 h-48 w-full flex items-center justify-center text-gray-500">
              {ogImage !== "Not available" ? (
                <img 
                  src={ogImage} 
                  alt="OG Image" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://via.placeholder.com/1200x630/EEEEEE/999999?text=No+Image+Available";
                  }}
                />
              ) : (
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p>No Open Graph image found</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-white">
              <div className="text-gray-500 text-xs uppercase mb-1">{domain}</div>
              <h4 className="text-base font-medium text-gray-900 mb-1">{ogTitle !== "Not available" ? ogTitle : metaTitle}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{ogDescription !== "Not available" ? ogDescription : metaDescription}</p>
            </div>
          </div>
          
          <Alert variant="warning" className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-sm text-amber-700">
              Facebook uses Open Graph meta tags for rich link previews. {ogImage === "Not available" ? "Missing og:image will result in a less engaging preview." : ""}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      {/* Twitter Preview */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Twitter Preview</h3>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-200 h-48 w-full flex items-center justify-center text-gray-500">
              {twitterImage !== "Not available" ? (
                <img 
                  src={twitterImage} 
                  alt="Twitter Image" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://via.placeholder.com/1200x600/EEEEEE/999999?text=No+Image+Available";
                  }}
                />
              ) : (
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p>No Twitter image found</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-white">
              <div className="text-gray-500 text-xs mb-1">{domain}</div>
              <h4 className="text-base font-medium text-gray-900 mb-1">{twitterTitle !== "Not available" ? twitterTitle : metaTitle}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{twitterDescription !== "Not available" ? twitterDescription : metaDescription}</p>
            </div>
          </div>
          
          <Alert variant="warning" className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-sm text-amber-700">
              Twitter uses Twitter Card meta tags. Current card type: {twitterCard !== "Not available" ? twitterCard : "None (will fall back to basic link)"}.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      {/* LinkedIn Preview */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">LinkedIn Preview</h3>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-200 h-48 w-full flex items-center justify-center text-gray-500">
              {ogImage !== "Not available" ? (
                <img 
                  src={ogImage} 
                  alt="LinkedIn Image" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://via.placeholder.com/1200x630/EEEEEE/999999?text=No+Image+Available";
                  }}
                />
              ) : (
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p>No image found</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-white">
              <h4 className="text-base font-medium text-gray-900 mb-1">{ogTitle !== "Not available" ? ogTitle : metaTitle}</h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-1">{ogDescription !== "Not available" ? ogDescription : metaDescription}</p>
              <div className="text-gray-500 text-xs">{domain}</div>
            </div>
          </div>
          
          <Alert variant="warning" className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-sm text-amber-700">
              LinkedIn uses Open Graph meta tags. Ensure og:image dimensions are at least 1200×630 pixels for best results.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
