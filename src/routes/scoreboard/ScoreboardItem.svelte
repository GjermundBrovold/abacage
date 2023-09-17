<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import default_profile_picture from '$lib/images/default.png'
	
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
	
	export let pictureUrl = default_profile_picture;
</script>
	
	<li>
		<img src={pictureUrl} alt="{player.name}'s profile picture" />
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
			padding-right: 1em;
			
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
