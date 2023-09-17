<script lang="ts">
import { writable } from 'svelte/store';
import ScoreboardItem from './ScoreboardItem.svelte'

let players = writable([
	{
		name:"Kasper",
		nickname:"Kæsp",
		score:100,
	},
	{
		name:"Per",
		nickname:"Pær",
		score:190,
	},
	{
		name:"Gjermund",
		nickname:"Top G",
		score:200,
	},
	{
		name:"Kasper",
		nickname:"Kæsp",
		score:100,
	},
	{
		name:"Per",
		nickname:"Pær",
		score:190,
	},
	{
		name:"Gjermund",
		nickname:"Top G",
		score:200,
	},
	{
		name:"Kasper",
		nickname:"Kæsp",
		score:100,
	},
	{
		name:"Per",
		nickname:"Pær",
		score:190,
	},
	{
		name:"Gjermund",
		nickname:"Top G",
		score:200,
	}
]);

export let isLive: boolean;

</script>

{#if isLive}
	<header class="subheader">
		<h2>Topplisten</h2>
		<div class="live-container">
			<i class="live-icon"></i>
			Live
		</div>
	</header>
{/if}



<ul>
	{#each $players as player}
		<ScoreboardItem {player} />
	{/each}
</ul>

<style lang="scss">
	@keyframes blinking {  
		from { opacity: 1; }
		to { opacity: 0; }
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
