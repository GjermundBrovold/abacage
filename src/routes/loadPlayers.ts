//import player from '../firebase/database.ts'
import cagersRef from '../firebase/firebase.ts'
import firestore from 'firebase/firestore'

export function load(){
	console.log(cagersRef);
	cagersRef.listDocuments().then(documentRefs => {
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
}
