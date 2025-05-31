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
    return d.toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }

  function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("de-CH", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
</script>
<!-- Navigationsleiste oben -->
<!-- Zurück-Button rechts oben -->
<div class="text-end mt-4 mb-2">
  <button class="btn btn-outline-secondary" onclick={() => history.back()}>Zurück</button>
</div>


<!-- Titel -->
<h2 class="text-center fw-bold my-4">🏀 Kommende NBA-Spiele 🏀</h2>

<!-- 🎥 Großes Video -->
<div class="d-flex justify-content-center mb-4">
  <div style="width: 1350px; max-width: 100%;">
    <div class="ratio ratio-16x9">
      <iframe
        src="https://www.youtube.com/embed/QZ3X6iMkHvw"
        title="NBA Finals 2024"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</div>



{#if loading}
  <p class="text-center">⏳ Lade Spiele...</p>
{:else if games.length === 0}
  <p class="text-center text-muted">❌ Keine Spiele gefunden.</p>
{:else}
  <div class="row g-4">
    {#each games as game}
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body">
            <h5 class="card-title text-primary">
              🏆 {game.Heimteam} <span class="text-muted">vs</span> {game.Auswärtsteam}
            </h5>
            <ul class="list-unstyled mt-3 mb-0">
              <li>📅 <strong>Datum:</strong> {formatDate(game.Datum)}</li>
              <li>⏰ <strong>Zeit:</strong> {formatTime(game.Datum)}</li>
              <li>📍 <strong>Ort:</strong> {game.Ort}</li>
            </ul>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
