<script>
import firebaseConfig from "../firebase/firebase"
import { initializeApp } from "firebase/app";
import {player} from "../firebase/database"
import {app, docSnap, } from "../firebase/firebase"

const app1 = initializeApp(firebaseConfig);

export const load = () => {
    // app.db_Realtime.app.
    
    console.log(docSnap.data)
    
    //let players = JSON.parse(player.toJSON())
  //
    //players.forEach((p: any) => {
    //    console.log(p);
    //});
  }
    import Header from "./Header.svelte";
    import Scoreboard from "./Scoreboard/Scoreboard.svelte";
    import Footer from "./Footer.svelte";
</script>

<div>
    <Header />
    <Scoreboard />
    <Footer />
</div>