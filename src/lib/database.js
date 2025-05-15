import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("NBAdb"); //  meine eigene Datenbank

//////////////////////////////////////////
// Players
//////////////////////////////////////////

// Get all players
async function getPlayers() {
  let players = [];
  try {
    const collection = db.collection("players");
    const query = {};
    players = await collection.find(query).toArray();
    players.forEach((player) => {
      player._id = player._id.toString(); // ID in String umwandeln
    });
  } catch (error) {
    console.log("Fehler beim Abrufen der Spieler:", error.message);
  }
  return players;
}

// Get player by ID
async function getPlayer(id) {
  let player = null;
  try {
    const collection = db.collection("players");
    const query = { _id: new ObjectId(id) };
    player = await collection.findOne(query);
    if (player) {
      player._id = player._id.toString();
    } else {
      console.log("Kein Spieler mit ID:", id);
    }
  } catch (error) {
    console.log("Fehler bei getPlayer:", error.message);
  }
  return player;
}

// Create player
async function createPlayer(player) {
  try {
    const collection = db.collection("players");
    const result = await collection.insertOne(player);
    return result.insertedId.toString();
  } catch (error) {
    console.log("Fehler bei createPlayer:", error.message);
  }
  return null;
}

// Update player
async function updatePlayer(player) {
  try {
    const id = player._id;
    delete player._id;
    const collection = db.collection("players");
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: player });

    if (result.matchedCount > 0) {
      console.log("Spieler mit ID", id, "wurde aktualisiert.");
      return id;
    } else {
      console.log("Kein Spieler mit ID", id, "gefunden.");
    }
  } catch (error) {
    console.log("Fehler bei updatePlayer:", error.message);
  }
  return null;
}

// Delete player
async function deletePlayer(id) {
  try {
    const collection = db.collection("players");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      console.log("Spieler mit ID", id, "wurde gelöscht.");
      return id;
    } else {
      console.log("Kein Spieler mit ID", id, "gefunden.");
    }
  } catch (error) {
    console.log("Fehler bei deletePlayer:", error.message);
  }
  return null;
}

//////////////////////////////////////////
// Teams
//////////////////////////////////////////

// Get all teams
async function getTeams() {
  let teams = [];
  try {
    const collection = db.collection("teams");
    const query = {};
    teams = await collection.find(query).toArray();
    teams.forEach((team) => {
      team._id = team._id.toString();
    });
  } catch (error) {
    console.log("Fehler beim Abrufen der Teams:", error.message);
  }
  return teams;
}

// Get team by ID
async function getTeam(id) {
  let team = null;
  try {
    const collection = db.collection("teams");
    const query = { _id: new ObjectId(id) };
    team = await collection.findOne(query);
    if (team) {
      team._id = team._id.toString();
    } else {
      console.log("Kein Team mit ID:", id);
    }
  } catch (error) {
    console.log("Fehler bei getTeam:", error.message);
  }
  return team;
}

// Exportieren für SvelteKit
export default {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getTeams,
  getTeam
};
