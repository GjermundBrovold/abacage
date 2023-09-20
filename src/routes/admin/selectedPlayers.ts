import type { playerInterface } from "../player";
export const selectedPlayers:Array<playerInterface> = []

export function updatePlayer(p: playerInterface){
	if (selectedPlayers.indexOf(p) != -1) {
		console.log("removed: " + p.name);
		selectedPlayers.splice(selectedPlayers.indexOf(p), 1)
	} else {
		console.log("added: " + p.name);
		selectedPlayers.push(p)
	}

}
