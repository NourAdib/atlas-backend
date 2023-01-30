import { bucket, storage } from './firebase-admin.service';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { GetSignedUrlConfig } from '@google-cloud/storage';

/**
 * Firebase Storage Service
 * @description This service is used to upload, delete and get signed urls for images
 */
@Injectable()
export class FirebaseStorageService {
  /**
   * Expiry date for signed urls
   * @description This is the expiry date for the signed urls, which is 6 days from now
   */
  expiryDate = Date.now() + 6 * 24 * 60 * 60 * 1000;

  /**
   * Upload Avatar
   * @description This function is used to upload a new avatar image
   * @param image the image to be uploaded
   * @param userId the id of the user
   * @returns the image id, url and expiry date
   */
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

  /**
   * Update the user avatar
   * @param image the image to be uploaded
   * @param previousImageId the id of the previous image
   * @param userId the id of the user
   * @returns the image id, url and expiry date of the new image
   */
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

    await storage
      .bucket(process.env.FIREBASE_BUCKET_NAME)
      .file(fileName)
      .exists()
      .then(async (exists) => {
        if (exists[0]) {
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
      });
    return { url: '', expiryDate: this.expiryDate };
  }

  async getPostImageSignedURL(imageId: any, userId: string, postId: string) {
    const fileName = `users/${userId}/posts/${postId}/${imageId}.png`;

    await storage
      .bucket(process.env.FIREBASE_BUCKET_NAME)
      .file(fileName)
      .exists()
      .then(async (exists) => {
        if (exists[0]) {
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
        } else {
        }
      });
    return { url: '', expiryDate: this.expiryDate };
  }
}
