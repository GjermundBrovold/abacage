import { updatePlayer } from '../../firebase/databaseHelpers'
import { selectedPlayers } from '../admin/selectedPlayers'

import type {playerInterface} from '../player'	
export let player: playerInterface


// console.log(selectedPlayers);
let players = selectedPlayers;
// let rounds = 0;

// Shuffles an array
// Can be rewritten to take points and etc into account
function shuffle(array: Array<any>) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// something new round something
export function newRound() {
	
}

// returns new teams
export default function newTeams(n : number): playerInterface[][] {
	let numberOfTeams = n
	let playersPerTeam:number = Math.floor(players.length / numberOfTeams);
	let teams: playerInterface[][] = [];

	let shuffled = shuffle(players.slice());

	/*
	* in the array each team is stored in
	* [startIndex, startIndex + playersPerTeam) (end not included)
	* ex
	*			team 1    team 2
	* [p1, p2, p3, p4] => [[p1, p2], [p3, p4]]
	* */
	let startIndex = 0;
	for (let i = 0; i < numberOfTeams; i++) {
		let team = []
		for (let j = 0; j < playersPerTeam; j++){
			let index = startIndex + j;
			team.push(shuffled[index])
		}
		teams.push(team);
		startIndex += playersPerTeam;
	}


	// if there are any players left, it will add one at a time to a team
	let index = 0;

	for (let i = startIndex; i<players.length; i++){
		teams[index].push(shuffled[i]);
		index ++;
	}

	return teams;
}
