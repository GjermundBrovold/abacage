import type { playerInterface } from "../player";

// stores players in current session
// will be replaced by a call to the database
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

export function isSelected(p: playerInterface): boolean {
	return selectedPlayers.indexOf(p) >= 0;
}

export function getPlayers() { return selectedPlayers }
