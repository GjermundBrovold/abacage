<script lang="ts">
	import { writable } from "svelte/store";
	import { sessionsWritable, getSessionSnapshot } from "../../firebase/sessions";
    import type { sessionInterfaceDB, matchInterface } from "../sessionInterface";
    import Session from './components/Session.svelte'
    let sTemp: sessionInterfaceDB[] = [];

    let sessions = writable(sTemp);
    sessionsWritable.subscribe((arr:sessionInterfaceDB[]) => {
        sTemp = arr.slice();
        sessions.set(sTemp);
    })

    function test() { 
        console.log("TEST")
        getSessionSnapshot().then((session) => console.log(session));
    }

</script>
<div>
    <ul>
    {#each $sessions as session}
        <Session {session}/>
    {/each}
    </ul>
    <button on:click={() => test()}>Test</button>
</div>
