<script>
  // Importiert die `onMount`-Funktion aus Svelte,
  // um Code auszuführen, sobald die Komponente geladen ist
  import { onMount } from "svelte";

  // State-Variable für die Spiel-Daten (initial leer)
  let games = $state([]);

  // State-Variable, um den Ladezustand zu verfolgen (initial true)
  let loading = $state(true);

  // Führt diese Funktion aus, sobald die Komponente ins DOM gemountet wurde
  onMount(async () => {
    // Ruft die API ab, die die Spielplandaten liefert
    const res = await fetch("/api/schedule");

    // Parsed die Antwort als JSON und speichert sie in games
    games = await res.json();

    // Deaktiviert den Ladezustand, sobald die Daten geladen wurden
    loading = false;
  });

  // Hilfsfunktion zur Formatierung des Datums (z. B. 01.06.2025)
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }

  // Hilfsfunktion zur Formatierung der Uhrzeit (z. B. 20:30)
  function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("de-CH", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
</script>

<!-- Zeigt einen Zurück-Button rechts oben -->
<div class="text-end mt-4 mb-2">
  <button class="btn btn-outline-secondary" onclick={() => history.back()}>Zurück</button>
</div>

<!-- Titel der Seite -->
<h2 class="text-center fw-bold my-4">🏀 Kommende NBA-Spiele 🏀</h2>

<!-- Wenn Ladezustand aktiv ist, zeige Ladesymbol -->
{#if loading}
  <p class="text-center">⏳ Lade Spiele...</p>

<!-- Falls keine Spiele gefunden wurden -->
{:else if games.length === 0}
  <p class="text-center text-muted">❌ Keine Spiele gefunden.</p>

<!-- Wenn Spiele vorhanden sind -->
{:else}
  <!-- Flex-Container mit Karten für jedes Spiel -->
  <div class="d-flex flex-wrap justify-content-center gap-4 mb-5">
    {#each games as game}
      <!-- Karte für ein einzelnes Spiel -->
      <div class="card shadow-sm border-0" style="width: 22rem;">
        <div class="card-body">
          <!-- Anzeige der beiden Teams -->
          <h5 class="card-title text-primary">
             {game.Heimteam} <span class="text-muted">vs</span> {game.Auswärtsteam}
          </h5>

          <!-- Auflistung von Datum, Uhrzeit und Ort -->
          <ul class="list-unstyled mt-3 mb-0">
            <li>📅 <strong>Datum:</strong> {formatDate(game.Datum)}</li>
            <li>⏰ <strong>Zeit:</strong> {formatTime(game.Datum)}</li>
            <li>📍 <strong>Ort:</strong> {game.Ort}</li>
          </ul>
        </div>
      </div>
    {/each}
  </div>
{/if}

<!-- Eingebettetes YouTube-Video mit NBA Finals -->
<div class="d-flex justify-content-center mb-5">
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
