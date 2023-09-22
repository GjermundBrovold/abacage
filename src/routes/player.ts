/*
 * Player type that will be used in the project
 * can be updated
 */


interface playerInterface{
	name: string;
	nickname: string;
	gamesPlayed: number;
	sessionsPlayed: number;
	score: number;
	profilePictureUrl: string;
	isAdmin: boolean;
	abakusUsername: string;
	id: number;
};

export type {playerInterface};
