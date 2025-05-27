<script>
  import { onMount } from "svelte";

  let games = $state([]);
  let loading = $state(true);

  onMount(async () => {
    const res = await fetch("/api/schedule");
    games = await res.json();
    loading = false;
  });

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleString("de-CH", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
</script>

<h2 class="text-center fw-bold my-4">🏀 Kommende NBA-Spiele</h2>

{#if loading}
  <p>Lade Spiele...</p>
{:else if games.length === 0}
  <p>Keine Spiele gefunden.</p>
{:else}
  <div class="list-group">
    {#each games as game}
      <div class="list-group-item">
        <strong>{game.Heimteam} vs {game.Auswärtsteam}</strong><br />
        📅 {formatDate(game.Datum)}<br />
        📍 {game.Ort}<br />
        🏷️ {game.Status}
      </div>
    {/each}
  </div>
{/if}
