<script lang="ts">
    import { writable } from "svelte/store";
    import { playerArray } from "../../firebase/databaseHelpers";
    import { updatePlayer } from './selectedPlayers'
    import Footer from "../Footer.svelte";
	
    import type { playerInterface } from '../player'

    // creates a writable of a playerInterface type
    let pTemp: playerInterface[] = []
    let playersWritable = writable(pTemp);
    let players: playerInterface[];
    // updates players writable on database update
    playerArray.subscribe((arr) => {
        players = arr
        playersWritable.set(arr);
    })

    // don't think this is used
    // export const selectedPlayers: Array<playerInterface> = []

    function addOrRemovePlayer(p: playerInterface) {
        updatePlayer(p);
    }

    // Simple search through name and nickname and updates players
    // This fucks up the select checkbox
    // Might want to change it to a div
    // and rather change the look of the div when player is selected
    function searchPlayers(event: Event & { currentTarget: EventTarget & HTMLInputElement; }) {
        let s: string = event.currentTarget.value.toLowerCase()
        if (s==""){
            playersWritable.set(players)
        }
        let searchedPlayers: playerInterface[] = []
        players.forEach(player => {
            if (player.name.toLowerCase().startsWith(s) || player.nickname.toLowerCase().startsWith(s)){
                searchedPlayers.push(player)
            }
        });
        playersWritable.set(searchedPlayers)
    }
</script>

<div class="wrapper">
    <h1>Add Players</h1>
    <input type="text" on:input={searchPlayers}/>
    <ul class="playerList">
        {#each $playersWritable as player, index}
               <li>
                    <input on:click={() => addOrRemovePlayer(player)} type="checkbox" name="checkbox{index}" id="checkbox{index}">
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

    <div class="anchor-container">
        <a href="/dashboard ">Add players</a>
    </div>
</div>

<Footer></Footer>



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
                    object-fit: cover;
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

    }
    .anchor-container {
        display: grid;
        place-items: center;
        width: 100vw;
        height: 4em;
        margin-bottom: 1em;
        a {
            text-decoration: none;
            border: 3px solid black;
            padding: 1em;
            border-radius: 10000px;
        }
    }
</style>
