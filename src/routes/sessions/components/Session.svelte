<script lang="ts">
    import type { sessionInterfaceDB } from "../../sessionInterface";
    export let session: sessionInterfaceDB;
    let players = session.players;
</script>

<div>
    <li>
        {session.date}
        <ul>
            {#each players as player}
                <li>{player}</li>
            {/each}
        </ul>
    </li>
</div>

