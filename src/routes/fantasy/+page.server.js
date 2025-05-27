import db from "$lib/database.js";  // 💾 Holt Zugriff auf deine MongoDB-Funktionen

// 🔁 Läuft auf dem Server und wird automatisch ausgeführt, wenn jemand die Seite lädt
export async function load() {
  const players = await db.getPlayers(); // 🏀 Holt alle Spieler aus MongoDB
  const teams = await db.getTeams();     // 🏟️ Holt alle Teams aus MongoDB

  return { players, teams };             // 📦 Diese Daten kommen dann als `data` bei $props() im Frontend an
}
