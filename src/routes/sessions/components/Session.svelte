<script lang="ts">
    import type { sessionInterfaceDB } from "../../sessionInterface";
    export let session: sessionInterfaceDB;
    export let scores: number[];
    let players = session.players;

	function calcScore(name: string) {
        let score = 0

        session.matches.forEach(match => {
            let index = match.players[0].indexOf(name)
            if (index >= 0){
                score += match.team1Points
            }
            else if (match.team1Points == 0){
                score += 3
            }
            else if (match.team1Points == 1){
                score += 1
            }
        })

        return score
	}

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

