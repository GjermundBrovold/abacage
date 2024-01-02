import type { sessionInterfaceDB, sessionInterface } from '../sessionInterface';
import { getSessionSnapshot } from '../../firebase/sessions';
import { getPlayerSnapshot, getPlayersFromArray } from '../../firebase/databaseHelpers';
import type { playerInterface } from '../player';

// async function getPlayers(session: sessionInterfaceDB): Promise<playerInterface[]>{
//     let players: playerInterface[] = [];
//     return session.players.map(p => {
//         getPlayerSnapshot(p) as Promise<playerInterface>
//     })
// }

export async function load(): Promise<sessionInterface> {
	const session = await getSessionSnapshot();
    console.log(session);
    const player = await getPlayerSnapshot("kaspermj");
	const players: playerInterface[] = getPlayersFromArray(session.players);
	const s: sessionInterface = {
		date: session.date,
		players: players,
		matches: session.matches
	};
	return s;
}
