<script lang="ts">
	import { getPlayersFromArray } from "../../../firebase/databaseHelpers";
	import type { playerInterface } from "../../player";

    // abakusUsername
	export let name: string;
	export let score: number;

    // can be used to make it look good
    // will be NOUSER if username is wrong
    let player: playerInterface = getPlayersFromArray([name])[0];

</script>

<li>
	{player.nickname} : {name} : {score}
</li>
