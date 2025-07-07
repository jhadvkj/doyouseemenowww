import { photos, type Photo, type InsertPhoto } from "@shared/schema";

export interface IStorage {
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  getAllPhotos(): Promise<Photo[]>;
}

export class MemStorage implements IStorage {
  private photos: Map<number, Photo>;
  private currentId: number;

  constructor() {
    this.photos = new Map();
    this.currentId = 1;
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = this.currentId++;
    const photo: Photo = {
      ...insertPhoto,
      id,
      uploadedAt: new Date(),
    };
    this.photos.set(id, photo);
    return photo;
  }

  async getAllPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values()).sort(
      (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
    );
  }
}

export const storage = new MemStorage();
