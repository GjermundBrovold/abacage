<script lang="ts">
    import default_profile_picture from '$lib/images/default.png'

    export let player: {
        name: string;
        nickname: string;
        gamesPLayed: number;
        sessionsPlayed: number;
        score: number;
        pictureUrl: string;
        isAdmin: boolean;
    }

    if (player.pictureUrl == "") {
        player.pictureUrl = default_profile_picture
    }
</script>

<style lang="scss">
    .wrapper {
        display: grid;
        place-items: center;
        width: 100vw;
        height: 100vh;
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                height: 150px;
                aspect-ratio: 1;
                margin: 1em;
            }

            h1 {
                font-size: 3em;
                margin: 0;
            }

            button {
                height: 3em;
                border-radius: 1000px;
                border: 2px solid black;

                :focus {
                    background: gray;
                }
            }
        }
    }
</style>

<div class="wrapper">
    <div class="container">
        <img src="{player.pictureUrl}" alt="{player.name}'s profile pic">
        <h1>{player.nickname}</h1>
        <h2>{player.name}</h2>
		<p>adscølakmdfnjkvh</p>
        {#if player.isAdmin}
            <button>
                Create Session
            </button>
        {/if}
    </div>
</div>
