<script>
  import { enhance } from "$app/forms"; // für sofortige Reaktion ohne Reload

  const { data } = $props();

  let search = "";

  // Lokaler Zustand für Spieler
  let players = structuredClone(data.players);

 // Spieler aus der UI entfernen (sofort, ohne Reload)
  function removePlayer(id) {
    console.log("Entferne Spieler mit ID:", id); // ← kannst du beobachten in DevTools
    players = players.filter((p) => p._id !== id);
  }

  // Nach dem Erstellen neu laden (vereinfachte Variante – optional optimierbar)
  function reloadAfterCreate(result) {
    result.then(() => location.reload());
  }
</script>

<form method="GET" class="mb-4 d-flex gap-2">
  <input
    type="text"
    name="q"
    bind:value={search}
    placeholder="Spieler suchen..."
    class="form-control"
  />
  <button type="submit" class="btn btn-primary">Suchen</button>
</form>

<!-- Formular zum Erstellen eines neuen Spielers -->
<!-- use:enhance = ermöglicht serverseitige Verarbeitung ohne Seiten-Reload -->
<!-- reloadAfterCreate = Funktion, die Seite neu lädt, nachdem Spieler erfolgreich erstellt wurde -->
<form method="POST" use:enhance={reloadAfterCreate} class="mb-4">
  <!-- Eingabefeld für das Team des Spielers (Pflichtfeld) -->
  <input name="name" placeholder="Name" required />
  <input name="team" placeholder="Team" required />
  <input name="position" placeholder="Position" required />
  <input name="age" type="number" placeholder="Alter" required />
  <input name="status" placeholder="Lebensstatus" required />
  <input name="image_url" placeholder="Bild-URL (optional)" />
  <button name="intent" value="create" type="submit" class="btn btn-success">
    Spieler erstellen
  </button>
</form>

<!-- Navigation Buttons -->
<div class="d-flex justify-content-start gap-3 mb-4">
  <a href="/" class="btn btn-outline-primary">Home</a>
  <button class="btn btn-outline-secondary" on:click={() => history.back()}
    >Zurück</button
  >
</div>

<h2 class="text-center fw-bold mb-4">🏀 Spielerübersicht</h2>

<!-- Grid für Spielerkarten -->
<div class="row gx-4 gy-4">

  <!--
  Wir verwenden hier `players` (nicht `data.players`), weil wir mit einer 
  lokal veränderbaren Kopie der Daten arbeiten. Diese Kopie wird aktualisiert,
  z. B. wenn ein Spieler gelöscht wird.

  Der Ausdruck `(player._id)` hilft Svelte dabei, jede Karte eindeutig 
  zu identifizieren und effizient zu aktualisieren, ohne das ganze DOM neu zu rendern.
-->
{#each players as player (player._id)}

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

          <!-- 🗑 Löschformular -->
       <form
  method="POST"
  use:enhance={({ result }) =>
    result.then((res) => {
      if (res?.success) {
        removePlayer(player._id);
      }
    })}
>
  <input type="hidden" name="id" value={player._id} />
  <button
    type="submit"
    name="intent"
    value="delete"
    class="btn btn-danger btn-sm mt-2"
  >
    Löschen
  </button>
</form>


        </div>

        <!-- Spielerbild mit Fallback -->
        {#if player.Image_url}
          <img
            src={player.Image_url}
            alt={player.Name}
            class="img-fluid rounded-bottom"
          />
        {:else}
          <img
            src="/images/placeholder.jpg"
            alt="Kein Bild vorhanden"
            class="img-fluid rounded-bottom"
          />
        {/if}
      </div>
    </div>
  {/each}
</div>
