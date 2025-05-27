<script>
  import { enhance } from "$app/forms";
  let { data } = $props();
  const players = data.players;

  let search = $state(""); 
  let selectedPosition = $state("Alle");
  let selectedTeam = $state("Alle");
  let selectedStatus = $state("Alle");

// Hilfsfunktionen: Alle einzigartigen Werte aus Daten extrahieren
  const unique = (array, key) => [...new Set(array.map(p => p[key]))];
  const positions = ["Alle", ...unique(players, "Position")];
  const teams = ["Alle", ...unique(players, "Team")];
  const statuses = ["Alle", ...unique(players, "Lebensstatus")];
</script>


<!-- Suchfeld zum Filtern -->
<div class="mb-3">
  <input
    type="text"
    bind:value={search}
    placeholder="🔍 Name suchen..."
    class="form-control"
  />
</div>

<!-- 🔘 Filter Dropdowns -->
<div class="d-flex gap-3 mb-4 flex-wrap">
  <select bind:value={selectedPosition} class="form-select">
    {#each positions as pos}
      <option value={pos}>{pos}</option>
    {/each}
  </select>

  <select bind:value={selectedTeam} class="form-select">
    {#each teams as team}
      <option value={team}>{team}</option>
    {/each}
  </select>

  <select bind:value={selectedStatus} class="form-select">
    {#each statuses as status}
      <option value={status}>{status}</option>
    {/each}
  </select>
</div>
<a href="/players/create" class="btn btn-success mb-4">
  ➕ Spieler erstellen
</a>
<!-- Navigation  home und zurück button-->
<div class="d-flex justify-content-start gap-3 mb-4">
  <a href="/" class="btn btn-outline-primary">Home</a>
  <button class="btn btn-outline-secondary" onclick={() => history.back()}
    >Zurück</button
  >
</div>

<h2 class="text-center fw-bold mb-4">🏀 Spielerübersicht</h2>

<!-- Spieler-Karten -->
<div class="row gx-4 gy-4">
  {#each players.filter(p =>
  p.Name.toLowerCase().includes(search.toLowerCase()) &&
  (selectedPosition === "Alle" || p.Position === selectedPosition) &&
  (selectedTeam === "Alle" || p.Team === selectedTeam) &&
  (selectedStatus === "Alle" || p.Lebensstatus === selectedStatus)
) as player (player._id)}
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">{player.Name}</h5>
          <p class="card-text">
            <strong>Team:</strong>
            {player.Team}<br />
            <strong>Position:</strong>
            {player.Position}<br />
            <strong>Alter:</strong>
            {player.Alter}<br />
            <strong>Lebensstatus:</strong>
            {player.Lebensstatus}
          </p>
          <!-- Innerhalb der Card-Body: Details-Button -->
<a href={`/players/${player._id}`} class="btn btn-outline-info btn-sm mt-2">
  Details ansehen
</a>
        </div>

        <!-- Bild mit Fallback -->
        {#if player.Image_url}
          <img
            src={player.Image_url}
            alt={player.Name}
            class="img-fluid rounded-bottom"
          />
        {:else}
          <img
            src="/images/Ebene.png"
            alt="Kein Bild vorhanden"
            class="img-fluid rounded-bottom"
          />
        {/if}
      </div>
    </div>
  {/each}
</div>
