import { playersInDB, database, } from "./databaseHelpers";
import type { playerInterface } from "../routes/player";
import { get, ref, set, update } from "firebase/database";
import type { sessionInterface, matchInterface } from "../routes/sessionInterface";

export let sessionsInDB = ref(database, 'sessions')

function getDate(): string{
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', // 'numeric', '2-digit'
    month: '2-digit', // 'numeric', '2-digit', 'long', 'short', 'narrow'
    day: '2-digit', // 'numeric', '2-digit'
  };
  const formattedDate = date.toLocaleDateString(undefined, options).replaceAll('/', ':')
  
  //!!swap with formattedDate, this is only for testing
  return "25:09:2023"
}

export function createSession(players: playerInterface[]){
  const formattedDate = getDate();
  let usernames: string[] = []
  players.forEach(p => usernames.push(p.abakusUsername))
  const session: sessionInterface = {
    date: formattedDate,
    players: usernames,
    matches: [] as matchInterface[]
  }
  const sessionDBRef = ref(database, 'sessions/' + formattedDate)
  set(sessionDBRef, session)
}

export function updateSession(session: sessionInterface){
  const postKey = sessionsInDB.key;
  if (postKey == null) return;

  const updates: any = {}
  updates[session.date] = session
  return update(sessionsInDB, updates)
}

export function addPlayerToSession(session: sessionInterface, player: playerInterface){
  session.players.push(player.abakusUsername)
  updateSession(session);
}

export function removePlayerFromSession(session: sessionInterface, player: playerInterface){
  session.players.splice(session.players.indexOf(player.abakusUsername),1)
  updateSession(session)
}


export function getSession(date: string = getDate()){
  return ref(database, 'sessions/' + date)
}

export async function getSessionSnapshot(date: string = getDate()){
  const sessionRef = getSession(date)
  let noSession: sessionInterface = {
    date,
    players: [],
    matches: [],
  }
  let session: sessionInterface = noSession

  await get(sessionRef)
  .then((snapshot) => {
    if (snapshot.exists())
      session = snapshot.val()
  })
  return session
}
