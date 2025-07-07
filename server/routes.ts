import type { Express, Request } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { insertPhotoSchema } from "@shared/schema";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded images
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    next();
  });
  app.use('/uploads', express.static(uploadsDir));

  // Get all photos
  app.get("/api/photos", async (req, res) => {
    try {
      const photos = await storage.getAllPhotos();
      res.json(photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).json({ message: "Failed to fetch photos" });
    }
  });

  // Upload photo
  app.post("/api/photos", upload.single('photo'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No photo file provided" });
      }

      const file = req.file;
      const fileExtension = path.extname(file.originalname) || '.jpg';
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExtension}`;
      const filepath = path.join(uploadsDir, filename);

      // Process image with sharp - resize and optimize
      await sharp(file.buffer)
        .resize(800, 800, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 85 })
        .toFile(filepath);

      const photoData = {
        filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size.toString(),
      };

      const validatedData = insertPhotoSchema.parse(photoData);
      const photo = await storage.createPhoto(validatedData);

      res.status(201).json(photo);
    } catch (error) {
      console.error('Error uploading photo:', error);
      if (error instanceof Error && error.message.includes('validation')) {
        res.status(400).json({ message: "Invalid photo data" });
      } else {
        res.status(500).json({ message: "Failed to upload photo" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
