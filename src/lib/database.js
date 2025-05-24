// MongoDB-Client und ObjectId werden importiert
import { MongoClient, ObjectId } from "mongodb";

// Die MongoDB-Verbindungs-URL wird aus der .env-Datei geladen
import { DB_URI } from "$env/static/private";

// Verbindung zur MongoDB-Datenbank herstellen
const client = new MongoClient(DB_URI);
await client.connect();

// Zugriff auf die Datenbank "NBAdb"
const db = client.db("NBAdb");

//////////////////////////////////////////
// SPIELER-FUNKTIONEN
//////////////////////////////////////////

// Holt alle Spieler aus der Collection "Players"
async function getPlayers() {
  let players = [];
  try {
    const collection = db.collection("Players");
    players = await collection.find({}).toArray();

    // Die MongoDB-IDs in Strings umwandeln für Svelte
    players.forEach((player) => {
      player._id = player._id.toString();
    });
  } catch (error) {
    console.log("Fehler beim Abrufen der Spieler:", error.message);
  }
  return players;
}

// Holt einen einzelnen Spieler anhand seiner ID
async function getPlayer(id) {
  let player = null;
  try {
    const collection = db.collection("Players");
    const query = { _id: new ObjectId(id) };
    player = await collection.findOne(query);

    if (player) {
      player._id = player._id.toString();
    }
  } catch (error) {
    console.log("Fehler bei getPlayer:", error.message);
  }
  return player;
}

// Fügt einen neuen Spieler ein
async function createPlayer(player) {
  try {
    const collection = db.collection("Players");

    // Falls kein Bild vorhanden ist, wird ein Standardbild verwendet
    if (!player.Image_url) {
      player.Image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/LeBron_James_%282019%29.jpg/800px-LeBron_James_%282019%29.jpg";
    }

    const result = await collection.insertOne(player);
    return result.insertedId.toString();
  } catch (error) {
    console.log("Fehler bei createPlayer:", error.message);
  }
  return null;
}

// Aktualisiert einen vorhandenen Spieler anhand seiner ID
async function updatePlayer(player) {
  try {
    const id = player._id;
    delete player._id;

    const collection = db.collection("Players");
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: player });

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
// TEAM-FUNKTIONEN
//////////////////////////////////////////

// Holt alle Teams aus der Collection "Teams"
async function getTeams() {
  let teams = [];
  try {
    const collection = db.collection("Teams");
    teams = await collection.find({}).toArray();

    // MongoDB-IDs in Strings umwandeln
    teams.forEach((team) => {
      team._id = team._id.toString();
    });
  } catch (error) {
    console.log("Fehler beim Abrufen der Teams:", error.message);
  }
  return teams;
}

// Holt ein einzelnes Team anhand der ID
async function getTeam(id) {
  let team = null;
  try {
    const collection = db.collection("Teams");
    const query = { _id: new ObjectId(id) };
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
// BIOGRAFIE-FUNKTION
//////////////////////////////////////////

// Diese Funktion holt alle Spieler aus der Collection "Players"
// und ergänzt sie mit Biografie-Informationen aus der Collection "BioPlayers"
async function getPlayersWithBio() {
  try {
    // Zugriff auf die beiden Collections
    const playersCollection = db.collection("Players");
    const bioCollection = db.collection("BioPlayers");

    // Alle Spieler aus der Datenbank abrufen
    const players = await playersCollection.find({}).toArray();

    // Für jeden Spieler versuchen, eine passende Biografie zu finden
    for (let player of players) {
      const bio = await bioCollection.findOne({ Name: player.Name });

      // Wenn eine Biografie existiert → übernehmen,
      // sonst einen Standardtext verwenden
      player.Biographie = bio?.Biographie || "Keine Biografie verfügbar";

      // MongoDB-IDs in Strings umwandeln für Svelte-Kompatibilität
      player._id = player._id.toString();
    }

    // Spieler mit zugehöriger Biografie zurückgeben
    return players;

  } catch (error) {
    // Bei einem Fehler leere Liste zurückgeben und Fehler melden
    console.error("Fehler bei getPlayersWithBio:", error.message);
    return [];
  }
}


// Sucht Spieler nach Name (Teil-Suche, nicht Case-Sensitive)
async function searchPlayersByName(name) {
  try {
    const collection = db.collection("Players");
    const query = {
      Name: { $regex: new RegExp(name, "i") } // "i" = ignore case
    };
    const players = await collection.find(query).toArray();
    players.forEach(p => p._id = p._id.toString());
    return players;
  } catch (error) {
    console.log("Fehler bei searchPlayersByName:", error.message);
    return [];
  }
}


//////////////////////////////////////////
// ALLES EXPORTIEREN
//////////////////////////////////////////

export default {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getTeams,
  getTeam,
  getPlayersWithBio,
  searchPlayersByName  
};
