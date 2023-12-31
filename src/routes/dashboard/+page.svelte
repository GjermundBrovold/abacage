<script lang="ts">
	import newTeams from './gameManager';

	import { writable } from 'svelte/store';
	import { updatePlayer, addNewPlayer, getPlayerSnapshot } from '../../firebase/databaseHelpers';

	import type { playerInterface } from '../player';
	import { createSession, updateSession } from '../../firebase/sessions';
	import { selectedPlayers } from '../admin/selectedPlayers';
	import type { sessionInterfaceDB, matchInterface, sessionInterface } from '../sessionInterface';
	export let data: sessionInterfaceDB;
	let playersArray: playerInterface[] = [];

	// current session stored
	let session: sessionInterface = {
		date: data.date,
		//will be updated when playersArray is updated
		players: playersArray,
		matches: data.matches != undefined ? data.matches : ([] as matchInterface[])
	};

	//let scoreboard: number[][] = [];
	let scoreboard: Map<string, number[]> = new Map();

	//updates session
	data.players.forEach((name) =>
		getPlayerSnapshot(name).then((p) => {
			playersArray.push(p);
			let row: number[] = Array(session.matches.length).fill(0);
			scoreboard.set(p.name, row);
		})
	);

	let numberOfTeams: number = 2;
	let matches: matchInterface[] = [];
	let currentMatch: matchInterface;

	// creates a writable with a 2d playerinterface array
	// type is spesified for it to work in the each loop
	let pTemp: playerInterface[][] = [];
	let teams = writable(pTemp);

	// teams, not in a writable for easier access
	let t: playerInterface[][] = [];
	function createTeams() {
		t = newTeams(session.players, numberOfTeams);

		teams.set(t);
		let p: string[][] = t.map((team) => team.map((p) => p.nickname));
		currentMatch = {
			players: p,
			team1Points: 0
		};
		console.log(currentMatch);
	}

	// takes in an event, don't know type name => any
	function changeNumber(n: any) {
		// console.log(n.target.value)
		numberOfTeams = n.target.value;
	}

	function addPointsForWin(team: number) {
		console.log(t);
		t[team].forEach((player) => {
			// win is 3 points
			player.score += 3;
			updatePlayer(player);
		});
		currentMatch.team1Points = 3;
		if (session.matches == undefined) {
			session.matches = [];
		}
		session.matches.push(currentMatch);
		let sDB: sessionInterfaceDB = {
			date: session.date,
			players: session.players.map((p) => p.name),
			matches: session.matches
		};
		updateSession(sDB);

		scoreboard.forEach((row, name) => {
			let temp: playerInterface[] = [];
			let won = t[team].find((p) => p.name == name);
			let score: number = (won != undefined) ? 3 : 0;
			row.push(score);
		});
		console.log(scoreboard);
	}


    function printScoreboard(){
        scoreboard.forEach((row, name) => {
            console.log(name + ":", row)
        })
    }
</script>

<div>
	<h1>Cage</h1>
	<input type="number" on:change={changeNumber} value="2" />
	<button on:click={createTeams}>Create Teams</button>
	<button on:click={() => addPointsForWin(0)}>Team 1 win</button>
	<button on:click={() => printScoreboard()}>Scoreboard</button>
	<ul>
		<!--
		Loops over the teams writable
		$ is means it will be updated when teams change
		-->
		{#each $teams as team, index}
			<h3>Team {index + 1}</h3>
			{#each team as player}
				<li>{player.nickname}</li>
			{/each}
		{/each}
	</ul>
</div>
