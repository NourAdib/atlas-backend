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

  /**
   * Removes the avatar of a user
   * @param imageId the id of the image to be removed
   * @param userId the id of the user
   */
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

  /**
   * Upload post image
   * @description This function is used to upload a new avatar image
   * @param image the image to be uploaded
   * @param userId the id of the user
   * @param postId the id of the post
   * @returns the image id, url and expiry date
   */
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

  /**
   * deleting the an image form a post by id
   * @param imageId the id of the image to be removed
   * @param userId the id of the user
   * @param postId the id of the post
   */
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

  /**
   * get the signed url of an image
   * @param userId the id of the user
   * @param imageId the id of the image
   * @returns the url and expiry date of the image
   */
  async getSignedURL(userId: string, imageId: string) {
    // The name of the object for which you want a signed URL
    const fileName = `users/${userId}/avatars/${imageId}.png`;
    let imageUrl = '';

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

          imageUrl = url;
        }
      });
    return { url: imageUrl, expiryDate: this.expiryDate };
  }

  /**
   * get the signed url of an image from a post
   * @param imageId the id of the image to be removed
   * @param userId the id of the user
   * @param postId the id of the post
   * @returns the url and expiry date of the image
   */
  async getPostImageSignedURL(imageId: any, userId: string, postId: string) {
    const fileName = `users/${userId}/posts/${postId}/${imageId}.png`;

    let imageUrl = '';
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

          imageUrl = url;
        }
      });
    return { url: imageUrl, expiryDate: this.expiryDate };
  }

  /**
   * get the signed url of an image from a memory
   * @param imageId the id of the image to be removed
   * @param userId the id of the user
   * @param memoryId the id of the memory
   * @returns the url and expiry date of the image
   */
  async getMemoryImageSignedURL(imageId: any, userId: string, memoryId: string) {
    const fileName = `users/${userId}/memories/${memoryId}/${imageId}.png`;

    let imageUrl = '';
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

          imageUrl = url;
        }
      });
    return { url: imageUrl, expiryDate: this.expiryDate };
  }

  /**
   * uploading a memory image
   * @param image the image to be uploaded
   * @param userId the id of the user
   * @param memoryId the id of the memory
   * @returns the image id, url and expiry date
   */
  async uploadMemoryImage(image: any, userId: string, memoryId: string) {
    const imageId = uuidv4();

    const file = bucket.file(`users/${userId}/memories/${memoryId}/${imageId}.png`);

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
   * deleting the an image form a memory by id
   * @param imageId the id of the image to be removed
   * @param userId the id of the user
   * @param memoryId the id of the memory
   */
  async deleteMemoryImage(imageId: any, userId: string, memoryId: string) {
    const fileName = `users/${userId}/memories/${memoryId}/${imageId}.png`;

    await storage
      .bucket(process.env.FIREBASE_BUCKET_NAME)
      .file(fileName)
      .delete()
      .catch((err) => {
        throw err;
      });
  }
}
