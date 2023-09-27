export interface matchInterface {
	players: string[][];
	team1Win: boolean;
}

export interface sessionInterface {
	date: string;
	players: string[];
	matches: matchInterface[];
}
