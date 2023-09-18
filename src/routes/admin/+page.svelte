<script lang="ts">
	import { writable } from "svelte/store";
    import { playerArray } from "../../firebase/firebase.mjs";
	
    let player: {
		name: string;
		nickname: string;
		gamesPLayed: number;
		sessionsPlayed: number;
		score: number;
		profilePictureUrl: string;
		isAdmin: boolean;
	}

    let players = writable([])
    playerArray.subscribe((arr) => {
        players = writable(arr)
    })

    export let selectedPlayers:Array<typeof player> = []

    function addOrRemovePlayer(p: typeof player) {
        if (selectedPlayers.indexOf(p) != -1) {
            console.log("removed: " + p.name);
            selectedPlayers.splice(selectedPlayers.indexOf(p), 1)
        } else {
            console.log("added: " + p.name);
            selectedPlayers.push(p)
        }
        console.log(selectedPlayers);
    }
</script>

<div class="wrapper">
    <h1>Add Players</h1>
    <ul>
        {#each $players as player, index}
               <li on:click={addOrRemovePlayer(player)}>
                    <input type="checkbox" name="checkbox{index}" id="checkbox{index}">
                    <label for="checkbox{index}">
                        <img src="{player.profilePictureUrl}" alt="{player.nickname}'s profile pic">
                        <div class="name-container">
                            <h2>{player.nickname}</h2>
                            <h3>{player.name}</h3>
                        </div>
                    </label>
               </li> 
        {/each}
    </ul>

    <a href="/dashboard">yeah</a>
</div>



<style lang="scss">
    ul {
        list-style: none;
        li {
            display: flex;
            input {

            }
            label {
                display: flex;
                img {
                    height: 100px;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    margin-right: 1em;
                }

                .name-container {
                    display: flex;
                    flex-direction: column;
                    h2 {

                    }

                    h3 {

                    }
                }
            }
        }
    }
</style>