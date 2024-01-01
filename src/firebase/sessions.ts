import { playersInDB, database, } from "./databaseHelpers";
import type { playerInterface } from "../routes/player";
import { get, ref, set, onValue, update } from "firebase/database";
import type { sessionInterfaceDB, matchInterface } from "../routes/sessionInterface";
import { writable, type Writable } from "svelte/store";

//ref to database under /sessions/
export let sessionsInDB = ref(database, 'sessions')
//Latest sessions registered
export let sessionsArray: sessionInterfaceDB[] = [];
//Writable of sessions / will be updated on changes
export let sessionsWritable: Writable<sessionInterfaceDB[]> = writable(sessionsArray);


// Updates sessions from database
onValue(sessionsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let sessions = Object.entries(snapshot.val()).map((sessionData) => {
            let players = (sessionData[1].players as string[]);
            let session: sessionInterfaceDB = {
                date: sessionData[0],
                players: players,
                matches: [] as matchInterface[]
            }
            return session
        })

        sessionsWritable.set(sessions)
        sessionsArray = sessions
    }
})

//GPT:)
function getDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', // 'numeric', '2-digit'
        month: '2-digit', // 'numeric', '2-digit', 'long', 'short', 'narrow'
        day: '2-digit', // 'numeric', '2-digit'
    };
    const formattedDate = date.toLocaleDateString(undefined, options).replaceAll('/', ':')

    //!!swap with formattedDate, this is only for testing
    console.log(formattedDate);
    return formattedDate;
}

/*
 * Creates session with no matches played on current date
*/
export function createSession(players: playerInterface[]) {
    const formattedDate = getDate();
    let usernames: string[] = []
    players.forEach(p => usernames.push(p.abakusUsername))
    const session: sessionInterfaceDB = {
        date: formattedDate,
        players: usernames,
        matches: [] as matchInterface[]
    }
    const sessionDBRef = ref(database, 'sessions/' + formattedDate)
    set(sessionDBRef, session)
}

/*
 * Updates session
 */
export function updateSession(session: sessionInterfaceDB) {
    const postKey = sessionsInDB.key;
    if (postKey == null) return;

    const updates: any = {}
    updates[session.date] = session
    return update(sessionsInDB, updates)
}

export function addPlayerToSession(session: sessionInterfaceDB, player: playerInterface) {
    session.players.push(player.abakusUsername)
    updateSession(session);
}

export function removePlayerFromSession(session: sessionInterfaceDB, player: playerInterface) {
    session.players.splice(session.players.indexOf(player.abakusUsername), 1)
    updateSession(session)
}


export function getSessionForDate(date: string = getDate()) {
    return ref(database, 'sessions/' + date)
}

export async function getSessionSnapshot(date: string = getDate()) {
    const sessionRef = getSessionForDate(date)
    let noSession: sessionInterfaceDB = {
        date,
        players: [],
        matches: [],
    }
    let session: sessionInterfaceDB = noSession

    await get(sessionRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                session = snapshot.val()
            }
        })
    return session
}
