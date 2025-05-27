import db from "$lib/database.js";

export async function GET() {
  try {
    const games = await db.getUpcomingGamesNBA();
    return new Response(JSON.stringify(games), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Fehler beim Abrufen des Spielplans" }), {
      status: 500
    });
  }
}
