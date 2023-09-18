<script lang='ts'>
	import Scoreboard from '../scoreboard/Scoreboard.svelte'
	import newTeams from './gameManager.ts'

	import { writable } from 'svelte/store';

	let numberOfTeams = 2;
	let teams = writable([]);
	let t = []
	function createTeams(){
		t = newTeams(numberOfTeams);
		//teams = writable(t);
		let temp = [];
		for (let i = 0; i<t.length; i++){
			temp.push(writable(t[i]));
		}
		teams = writable(temp);
		console.log(t);
	}

	function changeNumber(n){
		numberOfTeams = n;
	}

</script>
<div>
	<h1>Cage</h1>
	<input type='text' on:change = {changeNumber}/>
	<button on:click = {createTeams}>Create Teams</button>

	<ul>
		{#each $teams as team}
			<li>Team</li>
			<!--{#each $team as player}
				<li>{player.name}</li>
			{/each}-->
		{/each}
	</ul>
</div>
