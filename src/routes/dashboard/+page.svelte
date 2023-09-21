<script lang='ts'>
	import newTeams from './gameManager'

	import { writable } from 'svelte/store';

	import type { playerInterface } from '../player';

	let numberOfTeams: number = 2;
	let pTemp: playerInterface[][] = [];
	let teams = writable(pTemp);
	let t = [];
	function createTeams(){
		t = newTeams(numberOfTeams);
		
		teams.set(t);
		// console.log(t);
	}

	function changeNumber(n: any){
		// console.log(n.target.value)
		numberOfTeams = n.target.value;
	}

</script>
<div>
	<h1>Cage</h1>
	<input type='text' on:change = {changeNumber}/>
	<button on:click = {createTeams}>Create Teams</button>
	<ul>
		{#each $teams as team, index}
			<h3>Team {index+1}</h3>
			{#each team as player}
				<li>{player.nickname}</li>
			{/each}
		{/each}
	</ul>
</div>
