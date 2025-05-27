<script>
  // 📦 Wir müssen `state` importieren, damit unsere Daten "reaktiv" sind (also automatisch die Anzeige aktualisieren)
  import { onMount } from "svelte";
  import { state } from "$app/runes";

  // 🎁 Daten, die vom Server kommen (Spieler & Teams aus der Datenbank)
 const { data } = $props(); // ✅ Hier kommen die `players` und `teams` aus dem load() rein

  // 📌 Diese drei "states" verändern sich – und wenn sie sich ändern, wird automatisch das UI neu gezeichnet
  const selectedTeam = state("");        // Das ausgewählte Team (String)
  const selectedPlayers = state([]);     // Die IDs der 5 ausgewählten Spieler (Array)
  const savedTeam = state(null);         // Das gespeicherte Team (Objekt oder null)

  // 👆 Spieler wird ein- oder abgewählt, wenn auf die Karte geklickt wird
  function togglePlayer(playerId) {
    // Wenn Spieler schon drin → rausnehmen
    if ($selectedPlayers.includes(playerId)) {
      $selectedPlayers = $selectedPlayers.filter(id => id !== playerId);
    }
    // Wenn weniger als 5 Spieler drin sind → hinzufügen
    else if ($selectedPlayers.length < 5) {
      $selectedPlayers = [...$selectedPlayers, playerId];
    }
  }

  // 💾 Speichert das aktuelle Team im Browser (lokal, nicht in der Datenbank)
  function saveFantasyTeam() {
    // 🔒 Nur speichern, wenn 5 Spieler und ein Team ausgewählt wurden
    if ($selectedPlayers.length !== 5 || !$selectedTeam) {
      alert("❗ Bitte genau 5 Spieler und ein Team auswählen.");
      return;
    }

    const team = {
      teamName: $selectedTeam,
      players: $selectedPlayers
    };

    // 📦 Speichern im localStorage (Browser-Speicher)
    localStorage.setItem("fantasyTeam", JSON.stringify(team));
    $savedTeam = team;
    alert("✅ Dein Team wurde gespeichert!");
  }

  // 🚀 Wenn die Seite geladen wird, prüfen wir, ob im localStorage schon ein gespeichertes Team liegt
  onMount(() => {
    const stored = localStorage.getItem("fantasyTeam");
    if (stored) {
      $savedTeam = JSON.parse(stored); // gespeichertes Team ins reaktive State setzen
    }
  });
</script>

<!-- 🏀 FANTASY TEAM UI -->
<h2 class="text-center fw-bold my-4">🏀 Dein Fantasy-Team</h2>

<!-- TEAM AUSWÄHLEN -->
<div class="mb-4">
  <label for="teamSelect" class="form-label fw-bold">Wähle dein Team:</label>
  <select id="teamSelect" bind:value={$selectedTeam} class="form-select">
    <option value="">-- Bitte wählen --</option>
    {#each data.teams as team}
      <option value={team.Team}>{team.Team}</option>
    {/each}
  </select>
</div>

<!-- VORSCHAU DER GEWÄHLTEN SPIELER -->
{#if $selectedPlayers.length > 0}
  <div class="mb-3">
    <h5>👥 Aktuell ausgewählte Spieler:</h5>
    <ul>
      {#each $selectedPlayers as id}
        <li>{data.players.find(p => p._id === id)?.Name || "Unbekannt"}</li>
      {/each}
    </ul>
  </div>
{/if}

<!-- SPIELER AUSWÄHLEN (KLICK-KARTEN) -->
<h4 class="mt-4 mb-2">Wähle bis zu 5 Spieler:</h4>
<div class="row gx-3 gy-3">
  {#each data.players as player}
    <div class="col-6 col-sm-4 col-md-2">
      <div
        class="card h-100 shadow-sm position-relative"
        class:border-success={$selectedPlayers.includes(player._id)}
        onclick={() => togglePlayer(player._id)}
        role="button"
        tabindex="0"
        style="cursor: pointer;"
      >
        <!-- ✅ Häkchen wenn Spieler ausgewählt ist -->
        {#if $selectedPlayers.includes(player._id)}
          <span class="position-absolute top-0 end-0 badge bg-success m-2">✔</span>
        {/if}

        <!-- SPIELERBILD -->
        <img
          src={player.Image_url || "/images/Ebene.png"}
          alt={player.Name}
          class="d-block mx-auto rounded mt-2"
          style="height: 100px; width: 100px; object-fit: cover;"
        />

        <!-- SPIELER-INFOS -->
        <div class="card-body text-center py-2">
          <h6 class="card-title mb-1">{player.Name}</h6>
          <p class="mb-1"><strong>Team:</strong> {player.Team}</p>
          <p class="mb-1"><strong>Position:</strong> {player.Position}</p>
        </div>
      </div>
    </div>
  {/each}
</div>

<!-- ZUSAMMENFASSUNG DER AUSWAHL -->
<hr class="my-4" />
<h5>🎯 Auswahl:</h5>
<p><strong>Team:</strong> {$selectedTeam}</p>
<p><strong>Spieler:</strong> {$selectedPlayers.length} / 5</p>

<!-- BUTTON ZUM SPEICHERN -->
<button class="btn btn-primary mt-3" onclick={saveFantasyTeam}>
  💾 Fantasy-Team speichern
</button>

<!-- ANGEZEIGTES GESPEICHERTES TEAM -->
{#if $savedTeam}
  <hr class="my-4" />
  <h4>🔐 Gespeichertes Team:</h4>
  <p><strong>Team:</strong> {$savedTeam.teamName}</p>
  <ul>
    {#each $savedTeam.players as id}
      <li>{data.players.find(p => p._id === id)?.Name || "?"}</li>
    {/each}
  </ul>
{/if}
