import { photos, type Photo, type InsertPhoto } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export interface IStorage {
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  getAllPhotos(): Promise<Photo[]>;
}

export class DatabaseStorage implements IStorage {
  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const [photo] = await db
      .insert(photos)
      .values(insertPhoto)
      .returning();
    return photo;
  }

  async getAllPhotos(): Promise<Photo[]> {
    return await db
      .select()
      .from(photos)
      .orderBy(desc(photos.uploadedAt));
  }
}

export const storage = new DatabaseStorage();
