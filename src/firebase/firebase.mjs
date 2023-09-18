import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { writable } from 'svelte/store';
// import { getProfilePicUrl } from '../puppeteer';

const appSettings = {
	databaseURL: 'https://abacage-v2-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const playersInDB = ref(database, 'players');

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
		playerArray.set(Object.entries(snapshot.val()).map(([id, playerData]) => playerData));
		console.log(Object.entries(snapshot.val()).map(([id, playerData]) => playerData));
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
