<script lang="ts" type="module">
import ScoreboardItem from './ScoreboardItem.svelte'
import { playerArray } from '../../firebase/firebase.mjs'
import { writable } from 'svelte/store';
import type { playerInterface } from '../player';

let pTemp: playerInterface[] = []
let players = writable(pTemp)

playerArray.subscribe((arr) => {
	let copy: playerInterface[] = arr.slice()
	copy.sort((a, b) => b.score - a.score)
	players.set(copy)
})

</script>

{#if true}
	<header class="subheader">
		<h2>Highscores</h2>
		<div class="live-container">
			<i class="live-icon"></i>
			Live
		</div>
	</header>
{/if}



<ul>
	{#each $players as player, index}
		<div class="wrapper">
			<div class="rank-container">
				<div class="rank">{index + 1}</div>
			</div>
			<ScoreboardItem {player} />
		</div>
	{/each}
	
	

</ul>

<style lang="scss">
	@keyframes blinking {  
		from { opacity: 1; }
		to { opacity: 0; }
	}

	.wrapper {
		display: flex;
    	align-items: center;
		.rank-container {
			font-size: 1.5em;
			width: 10vw;
			display: grid;
			place-items: center;
		}
	}


	.subheader {
		display: flex;
		justify-content: space-between;
		margin: 1em;
		h2 {
			font-size: 3rem;
			margin: 0;
		}
		.live-container {
			display: flex;
			align-items: center;
			.live-icon{
				height: 10px;
				aspect-ratio: 1;
				border-radius: 50%;
				background: red;
				margin-right: .25em;
				animation: blinking 1s cubic-bezier(.5, 0, 1, 1) infinite alternate; 
			}
		}
	}

	ul {
		min-height: 65vh;
		padding: 0;
		> :global(:nth-child(-n+3)) {
			:global(img) {
				height: 6em;
			}

			:global(.nickname) {
				font-size: 2.5em !important; 
			}

			:global(.name) {
				font-size: 1.25em !important; 
			}
		}
	}

	
</style>
