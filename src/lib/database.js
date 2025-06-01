// MongoDB-Client und ObjectId werden importiert
// MongoClient wird benötigt, um eine Verbindung zur MongoDB aufzubauen
// ObjectId erlaubt das Arbeiten mit den speziellen MongoDB-ID-Typen
import { MongoClient, ObjectId } from "mongodb";

// Die MongoDB-Verbindungs-URL wird aus der Umgebungsvariable geladen
// Vorteil: sensibler Zugriff bleibt außerhalb des Codes und ist flexibel konfigurierbar
import { DB_URI } from "$env/static/private";

// Neue Clientinstanz erstellen, die sich mit MongoDB verbinden kann
const client = new MongoClient(DB_URI);

// Asynchrone Verbindung zur Datenbank aufbauen
await client.connect();

// Auswahl der spezifischen Datenbank innerhalb des MongoDB-Clusters
const db = client.db("NBAdb");

//////////////////////////////////////////
// SPIELER-FUNKTIONEN (CRUD für Players)
//////////////////////////////////////////

// Holt alle Spieler aus der Datenbank
// Wird z. B. für die Spielerübersicht verwendet
async function getPlayers() {
  let players = [];
  try {
    // Zugriff auf die Collection „Players“ in der DB
    const collection = db.collection("Players");

    // Alle Dokumente abrufen
    players = await collection.find({}).toArray();

    // ObjectId-Felder in Strings umwandeln, damit Svelte sie anzeigen kann
    players.forEach((player) => {
      player._id = player._id.toString();
    });
  } catch (error) {
    // Fehlerausgabe zur Debugging-Unterstützung
    console.log("Fehler beim Abrufen der Spieler:", error.message);
  }
  return players;
}

// Holt einen bestimmten Spieler über seine ID (Detailansicht)
async function getPlayer(id) {
  let player = null;
  try {
    const collection = db.collection("Players");

    // Die ID wird in eine ObjectId konvertiert, wie sie in MongoDB gespeichert ist
    const query = { _id: new ObjectId(id) };

    // Suche nach genau einem Dokument, das der ID entspricht
    player = await collection.findOne(query);

    // Umwandlung der ObjectId zur sicheren Übergabe an das Frontend
    if (player) {
      player._id = player._id.toString();
    }
  } catch (error) {
    console.log("Fehler bei getPlayer:", error.message);
  }
  return player;
}

// Neuen Spieler anlegen und optional mit Standardbild versehen
async function createPlayer(player) {
  try {
    const collection = db.collection("Players");

    // Wenn kein Bild übergeben wurde, ein Standardbild verwenden
    if (!player.Image_url) {
      player.Image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/LeBron_James_%282019%29.jpg/800px-LeBron_James_%282019%29.jpg";
    }

    // Spieler in Collection einfügen
    const result = await collection.insertOne(player);

    // Rückgabe der eingefügten ID als String
    return result.insertedId.toString();
  } catch (error) {
    console.log("Fehler bei createPlayer:", error.message);
  }
  return null;
}

// Aktualisiert ein Spielerobjekt
// Die ID muss übergeben werden, wird aber vor dem Update entfernt
async function updatePlayer(player) {
  try {
    const id = player._id;
    delete player._id; // ID darf beim Update nicht verändert werden

    const collection = db.collection("Players");

    // Führe das Update mit $set durch, damit nur die Felder überschrieben werden
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: player }
    );

    // matchedCount > 0 bedeutet, dass ein Dokument gefunden und aktualisiert wurde
    if (result.matchedCount > 0) {
      return id;
    }
  } catch (error) {
    console.log("Fehler bei updatePlayer:", error.message);
  }
  return null;
}

// Löscht einen Spieler anhand seiner ID
async function deletePlayer(id) {
  try {
    const collection = db.collection("Players");

    // Führe Löschung durch und prüfe, ob ein Dokument gelöscht wurde
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      return id;
    }
  } catch (error) {
    console.log("Fehler bei deletePlayer:", error.message);
  }
  return null;
}

//////////////////////////////////////////
// TEAM-FUNKTIONEN (CRUD für Teams)
//////////////////////////////////////////

// Holt alle Teams aus der Datenbank für Übersichtsseite
async function getTeams() {
  let teams = [];
  try {
    const collection = db.collection("Teams");

    // Abruf aller Teamdokumente
    teams = await collection.find({}).toArray();

    // ID-Konvertierung in Strings für das Frontend
    teams.forEach((team) => {
      team._id = team._id.toString();
    });
  } catch (error) {
    console.log("Es gibt einen Fehler beim Abrufen der Teams:", error.message);
  }
  return teams;
}

// Holt ein einzelnes Team anhand der ID
async function getTeam(id) {
  let team = null;
  try {
    const collection = db.collection("Teams");
    const query = { _id: new ObjectId(id) };

    // Suche nach passendem Teamdokument
    team = await collection.findOne(query);

    if (team) {
      team._id = team._id.toString();
    }
  } catch (error) {
    console.log("Fehler bei getTeam:", error.message);
  }
  return team;
}

//////////////////////////////////////////
// BIOGRAFIE-FUNKTION (optional zu Spielern)
//////////////////////////////////////////

// Sucht nach einem Biografie-Dokument auf Basis des Spielernamens
// Der Name muss exakt übereinstimmen, aber Groß-/Kleinschreibung wird ignoriert
export async function getBioByName(name) {
  const bio = await db.collection("BioPlayers").findOne({
    Name: { $regex: new RegExp(`^${name}$`, "i") } // i = case-insensitive
  });
  return bio;
}

//////////////////////////////////////////
// SCHEDULE (Spiele aus externer API)
//////////////////////////////////////////

// Zugriff auf den API-Schlüssel aus der .env-Datei für die balldontlie-API
import { BALDONTLIE_API_KEY } from "$env/static/private";

// Holt eine Liste von geplanten Spielen für die nächsten 20 Tage
async function getUpcomingGamesNBA() {
  // Erzeuge heutiges Datum im ISO-Format yyyy-mm-dd
  const now = new Date();
  const start = now.toISOString().split("T")[0];

  // Enddatum 20 Tage später berechnen
  const endDate = new Date();
  endDate.setDate(now.getDate() + 20);
  const end = endDate.toISOString().split("T")[0];

  // Erstelle API-Endpunkt-URL mit Start-/Enddatum und Limitierung
  const url = `https://api.balldontlie.io/v1/games?start_date=${start}&end_date=${end}&per_page=20`;

  // Anfrage mit API-Key senden
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${BALDONTLIE_API_KEY}`,
    },
  });

  // Antwort in JSON umwandeln
  const json = await res.json();

  // Rückgabe in eigenem, einfacherem Format für UI-Komponenten
  return json.data.map(g => ({
    Heimteam: g.home_team.full_name,
    Auswärtsteam: g.visitor_team.full_name,
    Datum: g.date,
    Ort: g.home_team.city,
    Status: g.status || "Geplant", // Fallback, falls kein Status vorhanden
  }));
}

//////////////////////////////////////////
// QUIZ-FUNKTION (Fragen pro Team)
//////////////////////////////////////////

// Holt alle Fragen, die zum angegebenen Team gehören (Name wird via Regex abgeglichen)
export async function getQuizByTeamname(teamname) {
  const collection = db.collection("quizfragen");

  // Suche nach Dokumenten mit team: exakter Name (case-insensitive)
  const quiz = await collection
    .find({ team: { $regex: new RegExp("^" + teamname + "$", "i") } })
    .toArray();

  // IDs in Strings umwandeln für das Frontend (z. B. als Schlüssel für listen)
  quiz.forEach((q) => {
    if (q._id) q._id = q._id.toString();
  });

  return quiz;
}

//////////////////////////////////////////
// ALLES EXPORTIEREN
//////////////////////////////////////////

// Zentraler Export aller Funktionen, damit sie in Routen, Komponenten oder APIs verwendet werden können
export default {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getTeams,
  getTeam,
  getBioByName,
  getUpcomingGamesNBA,
  getQuizByTeamname
};
