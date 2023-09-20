<script lang='ts'>
	import newTeams from './gameManager'

	import { writable } from 'svelte/store';

	let numberOfTeams = 2;
	let teams;
	let t = []
	function createTeams(){
		t = newTeams(numberOfTeams);
		//teams = writable(t);
		let temp = [];
		for (let i = 0; i<t.length; i++){
			temp.push(writable(t[i]));
		}
		teams = writable(t);
		console.log(t);
	}

	function changeNumber(n: any){
		console.log(n.type)
		numberOfTeams = n;
	}

</script>
<div>
	<h1>Cage</h1>
	<input type='text' on:change = {changeNumber}/>
	<button on:click = {createTeams}>Create Teams</button>
</div>
