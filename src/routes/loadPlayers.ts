import {player} from "../firebase/database"
import {app, docSnap} from "../firebase/firebase"


export const load = () => {
    // app.db_Realtime.app.
    
    console.log(docSnap.data)
    
    //let players = JSON.parse(player.toJSON())
  //
    //players.forEach((p: any) => {
    //    console.log(p);
    //});
  }

