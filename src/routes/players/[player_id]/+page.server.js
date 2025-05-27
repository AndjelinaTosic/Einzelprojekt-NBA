import db from "$lib/database.js";
import { error, redirect } from "@sveltejs/kit";

export async function load({ params }) {
  console.log(" Param ID:", params.player_id); // ← Loggen was reinkommt

  const id = params.player_id;

  const player = await db.getPlayer(id);
  console.log(" Gefundener Spieler:", player); // ← Wird was gefunden?

  if (!player) {
    throw error(404, "Spieler nicht gefunden");
  }

   let bio = await db.getBioByName(player.Name); // ✅ Biographie abrufen, nur per Name suchen!
  if (bio && bio._id) {
    bio._id = bio._id.toString(); // ✅ Konvertiere nur für Serialisierung
  }
  return { player, bio }; // ← beides zurückgeben
}

export const actions = {
  delete: async ({ params }) => {
    const id = params.player_id;
    const deletedId = await db.deletePlayer(id);

    if (!deletedId) {
      throw error(500, "Löschen fehlgeschlagen");
    }

 throw redirect(303, "/players?deleted=true");
  }
};