import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSEGING_SENDER_ID, APP_ID, MEASUREENT_ID, REALTIME_DATABASE_NAME } from "$env/static/private";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSEGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREENT_ID,
  databaseURL: REALTIME_DATABASE_NAME,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db_Firestore = getFirestore(app);
const db_Realtime = getDatabase(app);
export default { db_Firestore, db_Realtime };

