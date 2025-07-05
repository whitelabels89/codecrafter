import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameStateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Game state routes
  app.get("/api/game-state/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const gameState = await storage.getGameState(userId);
      
      if (!gameState) {
        return res.status(404).json({ message: "Game state not found" });
      }
      
      res.json(gameState);
    } catch (error) {
      res.status(500).json({ message: "Failed to get game state" });
    }
  });

  app.post("/api/game-state", async (req, res) => {
    try {
      const validatedData = insertGameStateSchema.parse(req.body);
      const gameState = await storage.createGameState(validatedData);
      res.status(201).json(gameState);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid game state data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create game state" });
      }
    }
  });

  app.put("/api/game-state/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const gameState = await storage.updateGameState(id, updates);
      
      if (!gameState) {
        return res.status(404).json({ message: "Game state not found" });
      }
      
      res.json(gameState);
    } catch (error) {
      res.status(500).json({ message: "Failed to update game state" });
    }
  });

  app.delete("/api/game-state/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteGameState(id);
      
      if (!success) {
        return res.status(404).json({ message: "Game state not found" });
      }
      
      res.json({ message: "Game state deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete game state" });
    }
  });

  // Generate new level
  app.post("/api/generate-level", async (req, res) => {
    try {
      const { level } = req.body;
      const commands = ['kanan', 'maju', 'kiri', 'mundur'];
      const sequenceLength = Math.min(3 + level, 6);
      
      const codeSequence = [];
      for (let i = 0; i < sequenceLength; i++) {
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        codeSequence.push(randomCommand);
      }
      
      res.json({ codeSequence });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate level" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
