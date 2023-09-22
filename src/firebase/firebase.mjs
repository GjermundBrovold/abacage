import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, update } from 'firebase/database';
import { writable } from 'svelte/store';
// import { getProfilePicUrl } from '../puppeteer';
// import type { playerInterface } from '../routes/player'

const appSettings = {
	databaseURL: 'https://abacage-v2-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
export const playersInDB = ref(database, 'players');

export let playerArray = writable([]);

export function getAllPlayers() {
	return playerArray;
}

function getProfilePicUrl(username) {
	return 'https:thumbor.abakus.no/vTeRbni7WlbNvx1nmEbALGOAOSg=/200x200/default_male_avatar.png';
}

// Set up the listener after Firebase initialization
onValue(playersInDB, function (snapshot) {
	if (snapshot.exists()) {
		let players = Object.entries(snapshot.val()).map(([id, playerData]) => {
			return {
				name: playerData.name,
				nickname: playerData.nickname,
				gamesPlayed: playerData.gamesPlayed,
				sessionsPlayed: playerData.sessionsPlayed,
				score: playerData.score,
				profilePictureUrl: playerData.profilePictureUrl,
				isAdmin: playerData.isAdmin,
				abakusUsername: playerData.abakusUsername,
				id: id,
			};
		})
		playerArray.set(players);
		console.log(players);
	} else {
		// Handle the case when there is no data or an error
		console.error('No data found or error occurred');
	}
});

export function addNewPlayer({ fullName, nickname, abakusUsername, isAdmin }) {
	push(playersInDB, {
		name: fullName,
		nickname: nickname,
		abakusUsername: abakusUsername,
		numberOfGamesPlayed: 0,
		numberOfSessionsPlayed: 0,
		score: 0,
		profilePictureUrl: getProfilePicUrl(abakusUsername),
		isAdmin: isAdmin
	});
}


