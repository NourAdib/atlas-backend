import * as dotenv from 'dotenv';
dotenv.config();

import { getStorage } from 'firebase-admin/storage';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

const serviceAccount = JSON.parse(process.env?.FIREBASE_PRIVATE_KEY);

const firebaseConfig = {
  credential: credential.cert(serviceAccount),
  storageBucket: 'atlas-6183a.appspot.com'
};

initializeApp(firebaseConfig);

export const storage = getStorage();
export const bucket = getStorage().bucket();

module.exports = { bucket, storage };
