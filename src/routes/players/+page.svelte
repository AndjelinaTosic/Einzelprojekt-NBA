<!-- +page.svelte im Runes-Modus -->
<script>
  import { enhance } from "$app/forms";
  import { reactive } from "@sveltejs/runes";

  // Übergabe von Daten im Runes-Mode
  export let data;

  // Suchfeld (nicht unbedingt reaktiv, aber deklarativ)
  let search = "";

  // Lokale, veränderbare Kopie der Spieler
  const players = reactive(() => structuredClone(data.players));

  // Spieler lokal entfernen (nach erfolgreichem DELETE)
  function removePlayer(id) {
    players.set(players().filter(p => p._id !== id));
  }

  // Seite neu laden nach erfolgreichem CREATE
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

<!-- Spieler erstellen -->
<form method="POST" use:enhance={reloadAfterCreate} class="mb-4">
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

<!-- Navigation -->
<div class="d-flex justify-content-start gap-3 mb-4">
  <a href="/" class="btn btn-outline-primary">Home</a>
  <button class="btn btn-outline-secondary" on:click={() => history.back()}>Zurück</button>
</div>

<h2 class="text-center fw-bold mb-4">🏀 Spielerübersicht</h2>

<!-- Spieler-Karten -->
<div class="row gx-4 gy-4">
  {#each players() as player (player._id)}
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">{player.Name}</h5>
          <p class="card-text">
            <strong>Team:</strong> {player.Team}<br />
            <strong>Position:</strong> {player.Position}<br />
            <strong>Alter:</strong> {player.Alter}<br />
            <strong>Lebensstatus:</strong> {player.Lebensstatus}
          </p>

          <!-- Delete-Formular mit Sofort-Reaktion -->
          <form
            method="POST"
            use:enhance={({ result }) => result.then((res) => {
              if (res?.success) removePlayer(player._id);
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

        <!-- Bild mit Fallback -->
        {#if player.Image_url}
          <img src={player.Image_url} alt={player.Name} class="img-fluid rounded-bottom" />
        {:else}
          <img src="/images/placeholder.jpg" alt="Kein Bild vorhanden" class="img-fluid rounded-bottom" />
        {/if}
      </div>
    </div>
  {/each}
</div>
