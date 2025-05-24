import db from "$lib/database.js";
import { redirect } from "@sveltejs/kit";

// ⬇️ Die Seite lädt initial die Daten (Spieler mit optionalem Suchbegriff)
export async function load({ url }) {
  // ⌨️ Suche nach Spielern, falls ein Suchbegriff über die URL kommt (?q=Name)
  const query = url.searchParams.get("q");

  const players = query
    ? await db.searchPlayersByName(query) // Falls Suche aktiv: gefiltert
    : await db.getPlayersWithBio();       // Sonst: alle Spieler mit Biografie

  return { players };
}

// 📩 POST-Aktionen wie Spieler erstellen oder löschen
export const actions = {
  // ✅ Spieler erstellen
  create: async ({ request }) => {
    // Formular-Daten auslesen
    const form = await request.formData();
    const player = {
      Name: form.get("name"),
      Team: form.get("team"),
      Position: form.get("position"),
      Alter: parseInt(form.get("age")),
      Lebensstatus: form.get("status"),
      Image_url: form.get("image_url")
    };

    // Spieler in MongoDB speichern
    await db.createPlayer(player);

    // ⬅️ Erfolgsantwort an den Client zurückgeben (ohne Seite neu zu laden)
    return { success: true };
  },

  // 🗑 Spieler löschen
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id");

    // Löschen des Spielers in der DB
    const success = await db.deletePlayer(id);

    // Rückgabe an use:enhance (Client löscht das UI-Element sofort)
    return { success };
  }


};
