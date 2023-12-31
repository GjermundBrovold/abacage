import { writable } from "svelte/store";
import type { playerInterface } from "../routes/player";
// import { database, playersInDB } from "./firebase.mjs";
import { ref, update, set, onValue, get, getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const appSettings = {
    databaseURL: 'https://abacage-v2-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(appSettings);
export const database = getDatabase(app);
export const playersInDB = ref(database, 'players');
// export const playersInDB = ref(database, 'players');
let pTemp: playerInterface[] = []
export let playerArray = writable(pTemp)

function getProfilePicUrl() {
    return 'https:thumbor.abakus.no/vTeRbni7WlbNvx1nmEbALGOAOSg=/200x200/default_male_avatar.png';
}

// moved from mjs file
onValue(playersInDB, function (snapshot) {
    if (snapshot.exists()){
        let players = Object.entries(snapshot.val()).map((playerData) => playerData[1] as playerInterface)
        playerArray.set(players)
        console.log(players)
    }
})

export function updatePlayer(player: playerInterface){
    const p = {
        name: player.name,
        nickname: player.nickname,
        gamesPlayed: player.gamesPlayed,
        sessionsPlayed: player.sessionsPlayed,
        score: player.score,
        profilePictureUrl: player.profilePictureUrl ? player.profilePictureUrl != "" : getProfilePicUrl(),
        isAdmin: player.isAdmin,
        abakusUsername: player.abakusUsername,
    };
    const postKey = playersInDB.key;
    if (postKey == null) return;

    const updates: any = {};
    updates[player.abakusUsername] = p;
    console.log("Updated player", player)
    return update(playersInDB, updates);
}

export function addNewPlayer(player: playerInterface){
    const p = {
        name: player.name,
        nickname: player.nickname,
        gamesPlayed: 0,
        sessionsPlayed: 0,
        score: player.score,
        profilePictureUrl: player.profilePictureUrl,
        isAdmin: player.isAdmin,
        abakusUsername: player.abakusUsername,
        // id: player.id,
    };
    const dbRef = ref(database, 'players/'+player.abakusUsername);
    set(dbRef, p);
}

export function getPlayer(username: string){
    const playerRef = ref(database, 'players/' + username)
    return playerRef
}

export async function getPlayerSnapshot(username: string){
    const playerRef = getPlayer(username);
    let noUser: playerInterface = {
        name: "NOUSER",
        nickname: "NOUSER",
        gamesPlayed: 0,
        sessionsPlayed: 0,
        score: 0,
        profilePictureUrl: "",
        isAdmin: false,
        abakusUsername: "",
    }
    let player: playerInterface = noUser;

    await get(playerRef)
    .then((snapshot) => {
        if (snapshot.exists())
        player = snapshot.val();

    })
    return player;
}

export async function getPlayers (usernames: string[]){
    let players: playerInterface[] = [];
    usernames.forEach(name => getPlayerSnapshot(name).then(p => players.push(p)))
    return players;
}
