<script>
  import { enhance } from "$app/forms";
  import PlayerCard from "$lib/components/PlayerCard.svelte";

  let { data } = $props();
  const players = data.players;

  let search = $state("");
  let selectedPosition = $state("Position");
  let selectedTeam = $state("Team");
  let selectedStatus = $state("Lebensstatus");

  const unique = (array, key) => [...new Set(array.map(p => p[key]))];
  const positions = ["Position", ...unique(players, "Position")];
  const teams = ["Team", ...unique(players, "Team")];
  const statuses = ["Lebensstatus", ...unique(players, "Lebensstatus")];
</script>

<!-- Seite Container mit Top-Margin -->
<div class="container mt-5">

  <!-- 🔝 Navigation oben rechts -->
  <div class="d-flex justify-content-end gap-2 mb-3">
    <button class="btn btn-outline-secondary" onclick={() => history.back()}>Zurück</button>
  </div>

  <!-- 🧠 Filterüberschrift -->
  <div class="mb-4">
    <h4 class="fw-bold">🔎 Spieler filtern</h4>
    <p class="text-muted">
      Verwende die Filter, um Spieler nach Name, Position, Team oder Lebensstatus einzugrenzen.
    </p>
  </div>

  <!-- 🔍 Moderne Filterleiste -->
  <div class="card shadow-sm p-4 mb-5 border-0 rounded-4" style="background: #f8f9fa;">
    <div class="row gy-3 gx-4 align-items-center">

      <!-- Suchfeld -->
      <div class="col-md-3">
        <div class="input-group">
          <span class="input-group-text bg-white">🔍</span>
          <input
            type="text"
            bind:value={search}
            placeholder="Name suchen..."
            class="form-control"
          />
        </div>
      </div>

      <!-- Position Filter -->
      <div class="col-md-3">
        <select bind:value={selectedPosition} class="form-select">
          {#each positions as pos}
            <option value={pos}>{pos}</option>
          {/each}
        </select>
      </div>

      <!-- Team Filter -->
      <div class="col-md-3">
        <select bind:value={selectedTeam} class="form-select">
          {#each teams as team}
            <option value={team}>{team}</option>
          {/each}
        </select>
      </div>

      <!-- Lebensstatus Filter -->
      <div class="col-md-3">
        <select bind:value={selectedStatus} class="form-select">
          {#each statuses as status}
            <option value={status}>{status}</option>
          {/each}
        </select>
      </div>

    </div>
  </div>

  <!-- ➕ Spieler erstellen Button & Beschreibung -->
  <div class="mb-4">
    <a href="/players/create" class="btn btn-success"> Spieler erstellen</a>
    <p class="text-muted mt-2">
      Du kannst hier einen neuen Spieler mit allen relevanten Informationen zur Datenbank hinzufügen.
    </p>
  </div>

  <!-- Titel -->
  <h2 class="text-center fw-bold mb-4">🏀 Spielerübersicht 🏀</h2>

  <!-- Spieler-Karten -->
  <div class="row gx-4 gy-4">
    {#each players.filter(p =>
      p.Name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedPosition === "Position" || p.Position === selectedPosition) &&
      (selectedTeam === "Team" || p.Team === selectedTeam) &&
      (selectedStatus === "Lebensstatus" || p.Lebensstatus === selectedStatus)
    ) as player (player._id)}
      <div class="col-sm-6 col-md-4 col-lg-3">
        <PlayerCard {player} />
      </div>
    {/each}
  </div>
</div>
