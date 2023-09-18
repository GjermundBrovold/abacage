<script>
	import Scoreboard from '../scoreboard/Scoreboard.svelte'
	import newTeams from './gameManager.ts'
	let teams = newTeams(2);

	function createTeams(){
		teams = newTeams();
		console.log(teams);
	}

</script>
<div>
	<h1>Cage</h1>
	<button on:click = {createTeams}>Create Teams</button>
</div>
