import { MetaTag } from "@shared/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, AlertTriangleIcon, XIcon, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MetaTagsProps {
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
}

export default function MetaTags({ metaTags }: MetaTagsProps) {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
    });
  };

  const getStatusBadge = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'warning':
        return <Badge className="bg-amber-100 text-amber-800">Good</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
    }
  };

  const getFeedbackIcon = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
          <CheckIcon className="text-green-500 text-xs" />
        </div>;
      case 'warning':
        return <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center mr-3">
          <AlertTriangleIcon className="text-amber-500 text-xs" />
        </div>;
      case 'error':
        return <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3">
          <XIcon className="text-red-500 text-xs" />
        </div>;
    }
  };

  const getTagsStatusBadge = (tags: MetaTag[], important: string[]) => {
    const foundCount = tags.filter(tag => tag.status === 'success' && important.includes(tag.name)).length;
    const totalImportant = important.length;
    
    if (foundCount === totalImportant) {
      return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
    } else if (foundCount > 0) {
      return <Badge className="bg-amber-100 text-amber-800">Partial</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Missing</Badge>;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Title Tag Analysis */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Title Tag</h3>
                <p className="text-gray-500 text-sm">Critical for search engines and user click-through</p>
              </div>
              <div className="flex items-center">
                {getStatusBadge(metaTags.title.status)}
              </div>
            </div>

            <div className="bg-gray-50 rounded-md p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Current Title</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:text-primary/90 text-sm font-medium flex items-center gap-1"
                  onClick={() => copyToClipboard(metaTags.title.content)}
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
              </div>
              <div className="font-mono text-sm rounded bg-gray-50 text-gray-800 break-all">
                {metaTags.title.content || "No title tag found"}
              </div>
            </div>

            <div className="space-y-3">
              {metaTags.title.feedback.map((feedback, index) => (
                <div key={index} className="flex items-center">
                  {getFeedbackIcon(feedback.includes('Optimal') ? 'success' : feedback.includes('too short') || feedback.includes('too long') ? 'warning' : 'error')}
                  <p className="text-sm text-gray-600">{feedback}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meta Description Analysis */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Meta Description</h3>
                <p className="text-gray-500 text-sm">Important for search snippets and CTR</p>
              </div>
              <div className="flex items-center">
                {getStatusBadge(metaTags.description.status)}
              </div>
            </div>

            <div className="bg-gray-50 rounded-md p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Current Description</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:text-primary/90 text-sm font-medium flex items-center gap-1"
                  onClick={() => copyToClipboard(metaTags.description.content)}
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
              </div>
              <div className="font-mono text-sm rounded bg-gray-50 text-gray-800 break-all">
                {metaTags.description.content || "No meta description found"}
              </div>
            </div>

            <div className="space-y-3">
              {metaTags.description.feedback.map((feedback, index) => (
                <div key={index} className="flex items-center">
                  {getFeedbackIcon(feedback.includes('Good length') ? 'success' : feedback.includes('too short') || feedback.includes('too long') ? 'warning' : feedback.includes('Missing call-to-action') ? 'warning' : 'error')}
                  <p className="text-sm text-gray-600">{feedback}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* OG Tags */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Open Graph Tags</h3>
                <p className="text-gray-500 text-sm">For social media sharing</p>
              </div>
              <div className="flex items-center">
                {getTagsStatusBadge(metaTags.ogTags, ['og:title', 'og:description', 'og:image', 'og:url'])}
              </div>
            </div>

            <div className="space-y-3">
              {metaTags.ogTags.map((tag, index) => (
                <div key={index} className="flex items-start">
                  {tag.status === 'success' ? (
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckIcon className="text-green-500 text-xs" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5">
                      <XIcon className="text-red-500 text-xs" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-700">{tag.name}</p>
                    <p className="text-xs text-gray-500 break-all">{tag.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Twitter Tags */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Twitter Card Tags</h3>
                <p className="text-gray-500 text-sm">For Twitter sharing</p>
              </div>
              <div className="flex items-center">
                {getTagsStatusBadge(metaTags.twitterTags, ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'])}
              </div>
            </div>

            <div className="space-y-3">
              {metaTags.twitterTags.map((tag, index) => (
                <div key={index} className="flex items-start">
                  {tag.status === 'success' ? (
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckIcon className="text-green-500 text-xs" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5">
                      <XIcon className="text-red-500 text-xs" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-700">{tag.name}</p>
                    <p className="text-xs text-gray-500 break-all">{tag.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Other Key Meta Tags */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Other Meta Tags</h3>
                <p className="text-gray-500 text-sm">Additional important tags</p>
              </div>
              <div className="flex items-center">
                {getTagsStatusBadge(metaTags.otherTags, ['viewport', 'robots', 'canonical', 'language'])}
              </div>
            </div>

            <div className="space-y-3">
              {metaTags.otherTags.map((tag, index) => (
                <div key={index} className="flex items-start">
                  {tag.status === 'success' ? (
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckIcon className="text-green-500 text-xs" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5">
                      <XIcon className="text-red-500 text-xs" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-700">{tag.name}</p>
                    <p className="text-xs text-gray-500 break-all">{tag.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
