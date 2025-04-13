import { AnalysisResult } from "@shared/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyBlock, dracula } from "react-code-blocks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TechnicalDetailsProps {
  analysis: AnalysisResult;
}

export default function TechnicalDetails({ analysis }: TechnicalDetailsProps) {
  // Helper function to format JSON for display
  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };

  // Create HTML meta tag code
  const generateMetaTagsHtml = () => {
    const { title, description, ogTags, twitterTags, otherTags } = analysis.metaTags;
    
    let html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    
    // Add title
    if (title.content) {
      html += `  <title>${title.content}</title>\n`;
    }
    
    // Add description
    if (description.content) {
      html += `  <meta name="description" content="${description.content}">\n`;
    }
    
    // Add OG tags
    ogTags.forEach(tag => {
      if (tag.content && tag.content !== "Not found") {
        html += `  <meta property="${tag.name}" content="${tag.content}">\n`;
      }
    });
    
    // Add Twitter tags
    twitterTags.forEach(tag => {
      if (tag.content && tag.content !== "Not found") {
        html += `  <meta name="${tag.name}" content="${tag.content}">\n`;
      }
    });
    
    // Add other tags
    otherTags.forEach(tag => {
      if (tag.content && tag.content !== "Not found") {
        if (tag.name === 'canonical') {
          html += `  <link rel="canonical" href="${tag.content}">\n`;
        } else if (tag.name === 'language') {
          // Language is an HTML attribute, not a meta tag
        } else {
          html += `  <meta name="${tag.name}" content="${tag.content}">\n`;
        }
      }
    });
    
    html += `  <!-- Other head elements -->\n</head>\n<body>\n  <!-- Page content -->\n</body>\n</html>`;
    
    return html;
  };

  return (
    <div className="grid grid-cols-1 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Technical Implementation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="html" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="html">HTML Implementation</TabsTrigger>
              <TabsTrigger value="json">JSON-LD</TabsTrigger>
              <TabsTrigger value="raw">Raw Analysis Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="html" className="p-0">
              <div className="rounded-md overflow-hidden">
                <CopyBlock
                  text={generateMetaTagsHtml()}
                  language="html"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Copy this HTML code to implement all the meta tags correctly on your site. Add it to the <code>&lt;head&gt;</code> section of your page.
              </p>
            </TabsContent>
            
            <TabsContent value="json" className="p-0">
              <div className="rounded-md overflow-hidden">
                <CopyBlock
                  text={`{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${analysis.metaTags.title.content}",
  "description": "${analysis.metaTags.description.content}",
  "url": "${analysis.url}"
}`}
                  language="json"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                This is a basic JSON-LD schema for your website. For more advanced schemas, consider adding specific types like Organization, LocalBusiness, Product, etc.
              </p>
            </TabsContent>
            
            <TabsContent value="raw" className="p-0">
              <div className="rounded-md overflow-hidden">
                <CopyBlock
                  text={formatJson(analysis)}
                  language="json"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                This is the raw analysis data from our system. You can use this for debugging or to integrate with other tools.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Implementation Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="title-tag" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                checked={analysis.metaTags.title.status !== 'error'}
                readOnly
              />
              <label htmlFor="title-tag" className="ml-2 block text-sm text-gray-700">
                Implement title tag
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="meta-description" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                checked={analysis.metaTags.description.status !== 'error'}
                readOnly
              />
              <label htmlFor="meta-description" className="ml-2 block text-sm text-gray-700">
                Implement meta description
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="og-tags" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                checked={analysis.metaTags.ogTags.filter(tag => tag.status === 'success').length >= 4}
                readOnly
              />
              <label htmlFor="og-tags" className="ml-2 block text-sm text-gray-700">
                Implement Open Graph tags
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="twitter-tags" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                checked={analysis.metaTags.twitterTags.filter(tag => tag.status === 'success').length >= 3}
                readOnly
              />
              <label htmlFor="twitter-tags" className="ml-2 block text-sm text-gray-700">
                Implement Twitter Card tags
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="canonical" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                checked={analysis.metaTags.otherTags.find(tag => tag.name === 'canonical')?.status === 'success'}
                readOnly
              />
              <label htmlFor="canonical" className="ml-2 block text-sm text-gray-700">
                Set canonical URL
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="robots" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                checked={analysis.metaTags.otherTags.find(tag => tag.name === 'robots')?.status === 'success'}
                readOnly
              />
              <label htmlFor="robots" className="ml-2 block text-sm text-gray-700">
                Configure robots meta tag
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="viewport" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                checked={analysis.metaTags.otherTags.find(tag => tag.name === 'viewport')?.status === 'success'}
                readOnly
              />
              <label htmlFor="viewport" className="ml-2 block text-sm text-gray-700">
                Set viewport for mobile optimization
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
