<script lang="ts">
    import type { sessionInterfaceDB } from "../../sessionInterface";
    export let session: sessionInterfaceDB;
    export let scores: number[];
    let players = session.players;

</script>

<div>
    <li>
        {session.date}
        <ul>
            {#each players as player, index}
                <li>{player} : {scores[index]}</li>
            {/each}
        </ul>
    </li>
</div>

