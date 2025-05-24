// +page.server.js (Runes-Modus)
import db from "$lib/database.js";
import { redirect } from "@sveltejs/kit";

// ⬇️ Initiales Laden der Daten bei GET-Anfrage
export async function load({ url }) {
  const query = url.searchParams.get("q");

  const players = query
    ? await db.searchPlayersByName(query)
    : await db.getPlayersWithBio();

  return {
    players
  };
}

// ⬇️ Form Actions im Runes-Modus
export const actions = {
  create: async ({ request }) => {
    const form = await request.formData();

    const player = {
      Name: form.get("name"),
      Team: form.get("team"),
      Position: form.get("position"),
      Alter: parseInt(form.get("age")),
      Lebensstatus: form.get("status"),
      Image_url: form.get("image_url")
    };

    await db.createPlayer(player);

    // Wichtig: success zurückgeben für use:enhance → reload bei Erfolg erfolgt clientseitig
    return { success: true };
  },

  delete: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id");

    const deleted = await db.deletePlayer(id);

    return {
      success: !!deleted // success = true wenn erfolgreich gelöscht
    };
  }
};
