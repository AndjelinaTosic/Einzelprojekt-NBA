import db from "$lib/database.js";

export async function load() {
  const players = await db.getPlayers();
  return {
    players
  };
}
