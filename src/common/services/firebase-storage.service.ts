import { bucket, storage } from './firebase-admin.service';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { GetSignedUrlConfig } from '@google-cloud/storage';

@Injectable()
export class FirebaseStorageService {
  expiryDate = Date.now() + 60 * 1000; // 7 Days from now

  async uploadAvatar(image: any, userId: string) {
    const imageId = uuidv4();

    const file = bucket.file(`users/${userId}/avatars/${imageId}.png`);

    await file.save(image);

    const urlOptions: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: this.expiryDate
    };

    const [url] = await file.getSignedUrl(urlOptions);

    return { imageId: imageId, url: url, expiryDate: this.expiryDate };
  }

  async updateAvatar(image: any, previousImageId: string, userId: string) {
    await this.deleteAvatar(previousImageId, userId);

    const file = bucket.file(`users/${userId}/avatars/${previousImageId}.png`);

    await file.save(image);

    const urlOptions: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: this.expiryDate
    };

    const [url] = await file.getSignedUrl(urlOptions);

    return { url: url, expiryDate: this.expiryDate };
  }

  async deleteAvatar(imageId: any, userId: string) {
    const fileName = `users/${userId}/avatars/${imageId}.png`;

    await storage
      .bucket(process.env.FIREBASE_BUCKET_NAME)
      .file(fileName)
      .delete()
      .catch((err) => {
        throw err;
      });
  }

  async uploadPostImage(image: any, userId: string, postId: string) {
    const imageId = uuidv4();

    const file = bucket.file(`users/${userId}/posts/${postId}/${imageId}.png`);

    await file.save(image);

    const urlOptions: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: this.expiryDate
    };

    const [url] = await file.getSignedUrl(urlOptions);

    return { imageId: imageId, url: url, expiryDate: this.expiryDate };
  }

  async deletePostImage(imageId: any, userId: string, postId: string) {
    const fileName = `users/${userId}/posts/${postId}/${imageId}.png`;

    await storage
      .bucket(process.env.FIREBASE_BUCKET_NAME)
      .file(fileName)
      .delete()
      .catch((err) => {
        throw err;
      });
  }

  async getSignedURL(userId: string, imageId: string) {
    // The name of the object for which you want a signed URL
    const fileName = `users/${userId}/avatars/${imageId}.png`;

    const urlOptions: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: this.expiryDate
    };

    // Get a signed URL that allows temporary access to the object
    const [url] = await storage
      .bucket(process.env.FIREBASE_BUCKET_NAME)
      .file(fileName)
      .getSignedUrl(urlOptions);

    return { url: url, expiryDate: this.expiryDate };
  }

  async getPostImageSignedURL(imageId: any, userId: string, postId: string) {
    const fileName = `users/${userId}/posts/${postId}/${imageId}.png`;

    const urlOptions: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: this.expiryDate
    };

    // Get a signed URL that allows temporary access to the object
    const [url] = await storage
      .bucket(process.env.FIREBASE_BUCKET_NAME)
      .file(fileName)
      .getSignedUrl(urlOptions);

    return { url: url, expiryDate: this.expiryDate };
  }
}
