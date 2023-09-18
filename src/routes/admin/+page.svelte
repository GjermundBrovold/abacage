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
               <li>
                    <input on:click={addOrRemovePlayer(player)} type="checkbox" name="checkbox{index}" id="checkbox{index}">
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


    <a href="/dashboard ">yeah</a>
</div>



<style lang="scss">
    ul {
        list-style: none;
        padding: 0;
        li {
            display: flex;
            margin-bottom: 1em;
            input[type="checkbox"] {
                margin: 0 1em;
            }
            label {
                display: flex;
                img {
                    height: 5em;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    margin-right: 1em;
                }

                .name-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    & > * {
                        margin: 0;
                    }
                    h2 {
                        font-size: 1.25em;
                    }

                    h3 {
                        font-size: 0.75em;
                        font-weight: 100;
                        color: rgba($color: #000000, $alpha: .5);
                    }
                }
            }
        }

        a {

        }
    }
</style>