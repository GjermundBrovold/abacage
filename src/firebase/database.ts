import { getDatabase, ref, set, onValue } from "firebase/database";

const db = getDatabase();


const player = ref(db, 'players/');

export { player };
