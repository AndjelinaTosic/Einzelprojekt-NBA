<script>
  let { data } = $props();
  const player = data.player;
  const bio = data.bio;
</script>

<h2 class="text-center fw-bold mt-4 mb-3">{player.Name}</h2>

<div class="container mb-4">
  <div class="row">
    <div class="col-md-6">
      {#if player.Image_url}
        <img
          src={player.Image_url}
          alt={player.Name}
          class="img-fluid rounded shadow"
        />
      {/if}
    </div>
    <div class="col-md-6">
      <p><strong>Team:</strong> {player.Team}</p>
      <p><strong>Position:</strong> {player.Position}</p>
      <p><strong>Alter:</strong> {player.Alter}</p>
      <p><strong>Lebensstatus:</strong> {player.Lebensstatus}</p>
      <hr />
    </div>
  </div>
</div>

{#if bio}
  <div class="alert alert-info">
    <strong>Biografie:</strong> {bio.Biographie}
  </div>
{:else}
  <div class="alert alert-warning">
    Keine Biografie vorhanden.
  </div>
{/if}


<div class="mb-5">
  <a href="/players" class="btn btn-secondary">Zurück zur Übersicht</a>
</div>
<form method="POST" action="?/delete" class="mt-3">
  <button
    class="btn btn-danger"
    type="submit"
    onclick={(e) => {
      if (!confirm("Willst du diesen Spieler wirklich löschen?")) {
        e.preventDefault(); // Formular absenden abbrechen!
      }
    }}
  >
    🗑️ Spieler löschen
  </button>
</form>
