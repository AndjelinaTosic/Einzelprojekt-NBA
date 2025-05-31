<script>
  import PlayerDetailCard from "$lib/components/PlayerDetailCard.svelte";

  let { data } = $props();
  const player = data.player;
  const bio = data.bio;
</script>

<h2 class="text-center fw-bold my-5 display-5 text-primary">{player.Name}</h2>

<div class="container mb-5">
  <PlayerDetailCard {player} {bio} />
</div>

<!-- 🔘 Aktionen -->
<div class="container mb-5 d-flex flex-wrap gap-3">
  <a href="/players" class="btn btn-outline-primary">🔙 Zurück zur Übersicht</a>

  <form method="POST" action="?/delete" class="d-inline">
    <button
      class="btn btn-danger"
      type="submit"
      onclick={(e) => {
        if (!confirm("Willst du diesen Spieler wirklich löschen?")) {
          e.preventDefault();
        }
      }}
    >
      🗑️ Spieler löschen
    </button>
  </form>
</div>
