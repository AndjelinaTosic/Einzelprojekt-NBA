// Datenbankzugriff importieren
import db from "$lib/database.js";

// SvelteKit load-Funktion für die Teams-Seite
export async function load() {
  try {
    // Teams aus MongoDB abrufen
    const teams = await db.getTeams();

    // Debug-Ausgabe in der Konsole
    console.log("teams:", teams);

    // Teams an das Page-Template zurückgeben
    return { teams };
  } catch (error) {
    // Fehlerbehandlung (verhindert error 500 ohne Meldung)
    console.error("Fehler beim Laden der Teams:", error);
    return { teams: []}; // Leeres Fallback
  }
}
