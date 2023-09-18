
import {playerArray} from '../../firebase/firebase.mjs'

let players = []
playerArray.subscribe((arr) => {
	players = arr;
})


let rounds = 0;
export let numberOfTeams:number = 2;

function shuffle(array) {
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

export function newRound() {
	
}

export default function newTeams() {
	let playersPerTeam:number = Math.floor(players.length / numberOfTeams);
	let teams = [];
	let playerCopy = []
	for (let i = 0; i<players; i++){
		playerCopy.push(players[i]);
	}
	let shuffled = shuffle(players.slice());

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


	let index = 0;
	for (let i = startIndex; i<players.length; i++){
		teams[index].push(shuffled[i]);
		index ++;
	}

	return teams;
	}
