import * as dotenv from 'dotenv';
dotenv.config();

import { getStorage } from 'firebase-admin/storage';
import { getMessaging } from 'firebase-admin/messaging';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

/**
 * This is the service account key for the firebase project
 */
const serviceAccount = JSON.parse(process.env?.FIREBASE_PRIVATE_KEY.toString());

/**
 * This is the firebase config for the firebase project
 */
const firebaseConfig = {
  credential: credential.cert(serviceAccount),
  storageBucket: 'atlas-6183a.appspot.com'
};

/**
 * Initialize the firebase admin app
 */
initializeApp(firebaseConfig);

/**
 * Export the firebase admin storage and messaging
 */
export const storage = getStorage();
export const bucket = getStorage().bucket();
export const messaging = getMessaging();

module.exports = { bucket, storage, messaging };
