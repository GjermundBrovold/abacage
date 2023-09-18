let player: {
	name: string;
	nickname: string;
	gamesPLayed: number;
	sessionsPlayed: number;
	score: number;
	profilePictureUrl: string;
	isAdmin: boolean;
}
export const selectedPlayers:Array<typeof player> = []

export function updatePlayer(p: typeof player){
	if (selectedPlayers.indexOf(p) != -1) {
		console.log("removed: " + p.name);
		selectedPlayers.splice(selectedPlayers.indexOf(p), 1)
	} else {
		console.log("added: " + p.name);
		selectedPlayers.push(p)
	}

}
