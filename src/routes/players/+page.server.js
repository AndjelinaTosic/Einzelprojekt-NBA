// +page.server.js (Runes-Modus)
import db from "$lib/database.js";

//Initiales Laden der Daten bei GET-Anfrage
export async function load() {
const players = await db.getPlayers();
  return {players};
}