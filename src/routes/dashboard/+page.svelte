<script lang='ts'>
	import Scoreboard from '../scoreboard/Scoreboard.svelte'
	import newTeams from './gameManager.ts'

	import { writable } from 'svelte/store';

	let numberOfTeams = 2;
	let teams = writable([]);
	let t = []
	function createTeams(){
		t = newTeams(numberOfTeams);
		teams = writable(t);
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
		{#each $teams as player}
			<li>{player}</li>
		{/each}
	</ul>
</div>
