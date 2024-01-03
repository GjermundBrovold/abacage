<script lang="ts">
	import { writable } from 'svelte/store';
	import { sessionsWritable, getSessionSnapshot } from '../../firebase/sessions';
	import type { sessionInterfaceDB, matchInterface } from '../sessionInterface';
	import Session from './components/Session.svelte';
	let sTemp: sessionInterfaceDB[] = [];
    let scores: number[][] = []

	let sessions = writable(sTemp);
	sessionsWritable.subscribe((arr: sessionInterfaceDB[]) => {
		sTemp = arr.slice();
		sessions.set(sTemp);
        scores = arr.map(session => getScoreArray(session))
	});

	function getScoreArray(session: sessionInterfaceDB) {
		const sums: number[] = Array(session.players.length).fill(0);

		session.matches.forEach((match) => {
			let team1: number[];
			let team2: number[];
			switch (match.team1Points) {
				case 3:
					team1 = match.players[0].map((player) => session.players.indexOf(player));
					team1.forEach((index) => (sums[index] += 3));
					break;

				case 1:
					team1 = match.players[0].map((player) => session.players.indexOf(player));
					team1.forEach((index) => (sums[index] += 1));
					team2 = match.players[1].map((player) => session.players.indexOf(player));
					team2.forEach((index) => (sums[index] += 1));
					break;

				case 0:
					team2 = match.players[1].map((player) => session.players.indexOf(player));
					team2.forEach((index) => (sums[index] += 1));
					break;

				default:
					break;
			}
		});
        return sums
	}
</script>

<div>
	<ul>
		{#each $sessions as session, index}
			<Session {session} scores={getScoreArray(session)} />
		{/each}
	</ul>
</div>
