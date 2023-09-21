<script lang="ts">
    import { writable } from "svelte/store";
    import { playerArray } from "../../firebase/firebase.mjs";
    import { updatePlayer } from './selectedPlayers'
    import Footer from "../Footer.svelte";
	
    import type { playerInterface } from '../player'

    let pTemp: playerInterface[] = []
    let players = writable(pTemp);
    playerArray.subscribe((arr) => {
        players = writable(arr);
    })

    export const selectedPlayers: Array<playerInterface> = []

    function addOrRemovePlayer(p: playerInterface) {
        updatePlayer(p);
    }
</script>

<div class="wrapper">
    <h1>Add Players</h1>
    <ul class="playerList">
        {#each $players as player, index}
               <li>
                    <input on:change={() => addOrRemovePlayer(player)} type="checkbox" name="checkbox{index}" id="checkbox{index}">
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
