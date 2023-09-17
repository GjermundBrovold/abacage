import { initializeApp, getApp, getApps} from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSEGING_SENDER_ID, APP_ID, MEASUREENT_ID, REALTIME_DATABASE_NAME } from "$env/static/private";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";


export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSEGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREENT_ID,
  databaseURL: REALTIME_DATABASE_NAME,
};
console.log(firebaseConfig.databaseURL);
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db_Firestore = getFirestore(app);
const db_Realtime = getDatabase(app);

export const cagersRef = collection(db_Firestore, "cagers");
console.log(cagersRef);
cagersRef.get().listDocuments().then(documentRefs => {
  return firestore.getAll(...documentRefs);
  }).then(documentSnapshots => {
    for (let documentSnapshot of documentSnapshots){
      if (documentSnapshot.exists){
        console.log(documentSnapshot.id);
      }
      else{
        console.log("fant ikke ${documentSnapshot.id}")
      }
    }
})


//const docRef = doc(db_Firestore, "cagers");
//export const docSnap = await getDoc(docRef);


export { db_Firestore, db_Realtime};



