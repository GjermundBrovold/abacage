<!-- Vise spesifikk bruker -->
<script lang='ts'>
    import Footer from '../../Footer.svelte';
import type { playerInterface } from '../../player';

    // don't change name; it won't work ¯\_(ツ)_/¯
    export let data: playerInterface;
    let player = data;

    let averageScorePerSession = 0
    let averageScorePerGame = 0

    if (player.gamesPlayed != 0) {
        averageScorePerSession = player.score / player.sessionsPlayed;
        averageScorePerGame = player.score / player.gamesPlayed;
    }

    let winRatio = (averageScorePerGame / 3) * 100;
</script>

<body>
    <header>    
        <!-- alt="{players first name}'s profile pic" or "{players first name}' profile pic" if first names ends with 's' -->
        <img src={player.profilePictureUrl} alt="{player.name.split(" ")[0][player.name.split(" ")[0].length - 1] === 's' ? `${player.name.split(" ")[0]}' profile pic` : `${player.name.split(" ")[0]}'s profile pic`}">
        <h1>{player.nickname}</h1>
        <h2>{player.name}</h2>
    </header>
    
    <main>
        <div class="stat-wrapper top-left">
            <p class="stat-title">Games played</p>
            <p class="stat">{player.gamesPlayed}</p>
        </div>
        <div class="stat-wrapper top-right">
            <p class="stat-title">Sessions played</p>
            <p class="stat">{player.sessionsPlayed}</p>
        </div>
        <div class="stat-wrapper bottom-left">
            <p class="stat-title">Total score</p>
            <p class="stat">{player.score}</p>
        </div>
        <div class="stat-wrapper bottom-right">
            <p class="stat-title">Average score</p>
            <p class="stat">{averageScorePerSession.toFixed(1)}</p>
        </div>
        <div class="stat-wrapper hero">
            <p class="stat-title">Cage score</p>
            <p class="stat">{winRatio.toFixed(1)}%</p>
        </div>
    </main>

    <Footer></Footer>
</body>



<style lang="scss">
    body {
        background: var(--color-bg-0);
    }

    header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 2em;

        img {
            width: 200px;
            aspect-ratio: 1;
            border-radius: 50%;
        }

        h1 {
            font-size: 2em;
            margin: 1.25em 0 0;
        }
        
        h2 {
            font-size: 1.5em;
            margin:  0 0 .25em 0;
            color: gray;
        }
    }

    main {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two columns */
        grid-template-rows: repeat(3, 1fr);    /* Two rows */
        gap: .5em;                             /* Gap between grid items */
        margin: 0 2em 4em;
        grid-template-areas:
            "hero hero"
            "top-left top-right"
            "bottom-left bottom-right";
    
    .stat-wrapper {
        background-color: var(--color-bg-1);
        text-align: center;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1.25em;
    
        p {
            margin: 0;
        }

        .stat-title {
            font-size: 1em;
            color: gray;
        }

        .stat {
            font-size: 2em;
        }
    }

    .top-left {
        grid-area: top-left;
    }

    .top-right {
        grid-area: top-right;
    }

    .bottom-left {
        grid-area: bottom-left;
    }

    .bottom-right {
        grid-area: bottom-right;
    }

    .hero {
        grid-area: hero;
    }

    }

    
</style>
