let rounds = 0;
export let numberOfTeams:number = 2;
let players = [
];

for (let i = 0; i < 11; i++) {
	players.push({
		name:'Per',
		score:i,
	})
	
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

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
	console.log(players);
	let playersPerTeam:number = Math.floor(players.length / numberOfTeams);
	console.log(playersPerTeam);
	let teams = [];
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


	console.log("Number of extra");
	console.log(players.length - numberOfTeams*playersPerTeam);
	let index = 0;
	for (let i = startIndex; i<players.length; i++){
		console.log("extra");
		console.log(shuffled[i]);
		teams[index].push(shuffled[i]);
		index ++;
	}

	return teams;
	}
