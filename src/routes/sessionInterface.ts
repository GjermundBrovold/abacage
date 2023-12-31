import type { playerInterface } from "./player";

export interface matchInterface {
	players: string[][];
	team1Points: number;
}

export interface sessionInterfaceDB {
	date: string;
	players: string[];
	matches: matchInterface[];
}

export interface sessionInterface {
	date: string;
	players: playerInterface[];
	matches: matchInterface[];
}
