<script lang="ts">
    import type { sessionInterfaceDB } from "../../sessionInterface";
	import Player from "./Player.svelte";
    export let session: sessionInterfaceDB;
    export let scores: number[];
    let players = session.players;

</script>

<div>
    <li>
        {session.date}
        <ul>
            {#each players as player, index}
                <Player name={player} score={scores[index]}/>
            {/each}
        </ul>
    </li>
</div>

