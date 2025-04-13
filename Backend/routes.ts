import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertAnalysisSchema } from "@shared/schema";
import { analyzeSEO } from "./services/seoAnalyzer";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefixed with /api
  
  // Analyze a URL
  app.post("/api/analyze", async (req: Request, res: Response) => {
    try {
      const urlSchema = z.object({
        url: z.string().url(),
      });
      
      const validatedData = urlSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid URL format",
          errors: validatedData.error.errors
        });
      }
      
      const { url } = validatedData.data;
      
      // Check if we have a recent analysis for this URL
      const existingAnalysis = await storage.getAnalysisByUrl(url);
      
      // If found and created within the last hour, return it
      if (existingAnalysis) {
        const createdTime = new Date(existingAnalysis.created_at).getTime();
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        
        if (createdTime > oneHourAgo) {
          return res.json(existingAnalysis);
        }
      }
      
      // Otherwise, perform a new analysis
      const analysisResult = await analyzeSEO(url);
      
      if (!analysisResult) {
        return res.status(500).json({ message: "Failed to analyze the URL" });
      }
      
      // Create a new analysis record
      const newAnalysis = await storage.createAnalysis({
        url,
        results: analysisResult,
        score: analysisResult.score,
        created_at: new Date().toISOString(),
      });
      
      return res.json(newAnalysis);
    } catch (error) {
      console.error("Error analyzing URL:", error);
      return res.status(500).json({ message: "Failed to analyze the URL" });
    }
  });
  
  // Get recent analyses
  app.get("/api/recent", async (_req: Request, res: Response) => {
    try {
      const recentAnalyses = await storage.listRecentAnalyses(5);
      return res.json(recentAnalyses);
    } catch (error) {
      console.error("Error fetching recent analyses:", error);
      return res.status(500).json({ message: "Failed to fetch recent analyses" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
