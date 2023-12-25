<script lang='ts'>
	import newTeams from './gameManager'

	import { writable } from 'svelte/store';
	import { updatePlayer, addNewPlayer } from '../../firebase/databaseHelpers';

	import type { playerInterface } from '../player';
	import { createSession } from '../../firebase/sessions';
	import { selectedPlayers } from '../admin/selectedPlayers';
    console.log("A")

	let numberOfTeams: number = 2;

	// creates a writable with a 2d playerinterface array
	// type is spesified for it to work in the each loop
	let pTemp: playerInterface[][] = [];
	let teams = writable(pTemp);

	// teams, not in a writable for easier access
	let t: playerInterface[][] = [];
	function createTeams(){
		t = newTeams(numberOfTeams);
		
		teams.set(t);
		// console.log(t);
	}

	// takes in an event, don't know type name => any
	function changeNumber(n: any){
		// console.log(n.target.value)
		numberOfTeams = n.target.value;
		// let player: playerInterface = {
		// 	name: "Chris",
		// 	nickname: "Toffeloffen",
		// 	gamesPlayed: 0,
		// 	sessionsPlayed: 0,
		// 	score: 20,
		// 	profilePictureUrl: "https://thumbor.abakus.no/SwaJhsB_Z7eIpcZS1QPVxcy2_-g=/200x200/8010C634A27B4FADB2D_8dHhL92.jpeg",
		// 	isAdmin: false,
		// 	abakusUsername: "Chrisern",
		// 	id: 10
		//
		// }
		// addNewPlayer(player);
	}

	function addPointsForWin(team: number){

        console.log(t);
		t[team].forEach(player => {
			// win is 3 points
			console.log(player.score);
			player.score += 3;
            console.log("Updating:")
			console.log(player.score);
			updatePlayer(player);
		});
	}

	function sessionTest(){
		createSession(selectedPlayers)
	}



</script>
<div>
	<h1>Cage</h1>
	<input type='text' on:change = {changeNumber}/>
	<button on:click = {createTeams}>Create Teams</button>
	<button on:click = {()=>addPointsForWin(0)}>Team 1 win</button>
	<button on:click = {()=>sessionTest()}>Create session</button>
	<ul>
		<!--
		Loops over the teams writable
		$ is means it will be updated when teams change
		-->
		{#each $teams as team, index}
			<h3>Team {index+1}</h3>
			{#each team as player}
				<li>{player.nickname}</li>
			{/each}
		{/each}
	</ul>
</div>
