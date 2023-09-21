import type { playerInterface } from "../routes/player";
import { playersInDB } from "./firebase";
import { update } from "firebase/database";

function getProfilePicUrl(username:string) {
	return 'https:thumbor.abakus.no/vTeRbni7WlbNvx1nmEbALGOAOSg=/200x200/default_male_avatar.png';
}

export function updatePlayer(player: playerInterface){
  const p = {
	name: player.name,
	nickname: player.nickname,
	gamesPlayed: player.gamesPlayed,
	sessionsPlayed: player.sessionsPlayed,
	score: player.score,
	profilePictureUrl: player.profilePictureUrl,
	isAdmin: player.isAdmin,
	abakusUsername: player.abakusUsername,
	// id: player.id,
  };
  console.log("Player: ", player);
  const postKey = playersInDB.key;
  if (postKey == null) return;

  const updates = {};
  updates[player.id] = p;
  console.log(updates);
  return update(playersInDB, updates);
}
