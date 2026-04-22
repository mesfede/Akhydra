import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfigData from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
  measurementId: firebaseConfigData.measurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Use initializeFirestore to enable forceLongPolling which helps with connectivity in some environments
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, (firebaseConfigData as any).firestoreDatabaseId);

export default app;
