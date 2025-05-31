
import db from "$lib/database.js";
import { error } from "@sveltejs/kit";
// 🔧 Teamnamen für URL vergleichen
function normalize(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}
export async function load({ params }) {
  const urlTeamname = params.teamname.toLowerCase(); // z. B. "los-angeles-lakers"
  // 🧠 Teams laden
  const teams = await db.getTeams();
  // 🔍 Vergleich nach normalisiertem Namen
  const team = teams.find((t) => normalize(t.Team) === urlTeamname);
  // 🛑 Wenn kein Team gefunden → Log + Fehler
  if (!team) {
    console.log("❌ Kein passendes Team gefunden für:", urlTeamname);
    console.log("👉 Verfügbare Teamnamen:", teams.map((t) => normalize(t.Team)));
    throw error(404, "Team nicht gefunden");
  }
  console.log("✅ Gefundenes Team:", team.Team);
  // 📦 Quizfragen laden
  const quiz = await db.getQuizByTeamname(team.Team);
  if (!quiz || quiz.length === 0) {
    console.log("❌ Keine Quizfragen gefunden für:", team.Team);
    throw error(404, "Keine Quizfragen gefunden");
  }
  return { team, quiz };
}
