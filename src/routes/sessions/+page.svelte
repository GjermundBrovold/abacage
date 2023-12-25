<script lang="ts">
	import { writable } from "svelte/store";
	import { sessionsWritable } from "../../firebase/sessions";
    import type { sessionInterface, matchInterface } from "../sessionInterface";
    let sTemp: sessionInterface[] = [];

    let sessions = writable(sTemp);
    sessionsWritable.subscribe((arr:sessionInterface[]) => {
        sTemp = arr.slice();
        console.log(sTemp)
        sessions.set(sTemp);
    })
</script>
<div>
    <ul>
    {#each $sessions as session, index}
        <li>
            {session.date}
            <ul>
            {#each session.players as playerName}
                <li>{playerName}</li>
            {/each}
            </ul>
        </li>
    {/each}
    </ul>
</div>
