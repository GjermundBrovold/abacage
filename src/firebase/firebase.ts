import { initializeApp, getApp, getApps} from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSEGING_SENDER_ID, APP_ID, MEASUREENT_ID, REALTIME_DATABASE_NAME } from "$env/static/private";
// import { collection, doc, setDoc, getDoc } from "firebase/firestore";


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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const playersInDB = ref(database, "cagers");

onValue(playersInDB, function(snapshot){
  console.log(snapshot);
})

//cagersRef.get().then(documentRefs => {
//  return firestore.getAll(...documentRefs);
//  }).then(documentSnapshots => {
//    for (let documentSnapshot of documentSnapshots){
//      if (documentSnapshot.exists){
//        console.log(documentSnapshot.id);
//      }
//      else{
//        console.log("fant ikke ${documentSnapshot.id}")
//      }
//    }
//})


//const docRef = doc(db_Firestore, "cagers");
//export const docSnap = await getDoc(docRef);


// export { db_Firestore, db_Realtime};



