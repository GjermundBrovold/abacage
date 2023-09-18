<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	export let player: {
		name: string;
		nickname: string;
		gamesPLayed: number;
		sessionsPlayed: number;
		score: number;
		pictureUrl: string;
		isAdmin: boolean;
	}
	
	console.log(player.pictureUrl);
	
</script>
	
	<li>
		<img src={player.pictureUrl} alt="{player.name}'s profile picture" />
		<div class="container">
			<div class='name-container'>
				<div class='nickname'>{player.nickname}</div>
				<div class='name'>{player.name}</div>
			</div>
			<div class='score'>{player.score}</div>
		</div>
	</li>



<style lang="scss">
	li {
		display: flex;
		align-items: center;
		margin: 1em;

		img {
			height: 4em;
			aspect-ratio: 1;
			margin-right: 1em;
			border-radius: 50%;
		}


		.container {
			display: flex;
			justify-content: space-between;
    		align-items: center;
			width: -webkit-fill-available;	

			.name-container {
				display: flex;
				flex-direction: column;
				
				.nickname {
					font-size: 1.5em;
				}
	
				.name {
					font-size: .75em;
					color: rgba($color: #000, $alpha: .4);
				}
			}

			.score {
				font-size: 1.5em;
			}
		}
	}


</style>
