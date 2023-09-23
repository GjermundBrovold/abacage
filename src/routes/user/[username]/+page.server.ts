import type { playerInterface } from '../../player';
import { get, child } from 'firebase/database';
import { playersInDB } from '../../../firebase/firebase.mjs';
import { getPlayer } from '../../../firebase/databaseHelpers';
import { writable } from 'svelte/store';

interface slug {username: string};

export async function load({params}): playerInterface {
    let noUser = {
        name: "NOUSER",
        nickname: "NOUSER",
        gamesPlayed: 0,
        sessionsPlayed: 0,
        score: 0,
        profilePictureUrl: "https://thumbor.abakus.no/SwaJhsB_Z7eIpcZS1QPVxcy2_-g=/200x200/8010C634A27B4FADB2D_8dHhL92.jpeg",
        isAdmin: false,
        abakusUsername: "NOUSER",
        id: "NOUSER"
    }

    let player: playerInterface = noUser;
    await get(getPlayer(params.username))
        .then((snapshot) => {
            if (snapshot.exists()) {
                player = snapshot.val();
            } else {
                console.log("No data available");
            }
            return player; // Return player here
        })
        .catch((error) => {
            console.error(error);
            return player; // Return player in case of an error
        });
    return player
}
