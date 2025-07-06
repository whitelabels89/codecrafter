import express, { type Express } from "express";
import path from "path";
import fs from "fs";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit", 
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve("dist/public");
  
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the frontend build! Expected it to be at ${distPath}, but that path does not exist.`
    );
  }

  app.use(express.static(distPath));
  
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}