import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBR_KBdnMpJbuaRIQ9q6-iJPUdqHxPON-o",
  authDomain: "moodsense-app-c37f0.firebaseapp.com",
  projectId: "moodsense-app-c37f0",
  storageBucket: "moodsense-app-c37f0.appspot.com",
  messagingSenderId: "908644142224",
  appId: "1:908644142224:web:5496b4db8b08c548705c15",
  measurementId: "G-F0E2MF3T9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 