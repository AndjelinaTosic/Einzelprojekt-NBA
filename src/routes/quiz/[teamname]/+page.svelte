<script>
  // Extrahiere die vom Server gelieferten Daten (Team- und Quizdaten)
  const { data } = $props();

  // Initialisiere den Index der aktuellen Frage auf 0
  let current = $state(0);

  // Variable für die aktuell vom Benutzer gewählte Antwort
  let selected = $state("");

  // Zähler für richtige Antworten
  let score = $state(0);

  // Gibt an, ob das Quiz abgeschlossen wurde
  let finished = $state(false);

  // Gibt an, ob die richtige Antwort angezeigt werden soll
  let showAnswer = $state(false);

  // Hole alle Quizfragen aus den geladenen Daten
  const questions = data.quiz;

  // Prüft, ob die aktuelle Antwort korrekt ist
  function check() {
    // Setze showAnswer auf true, um die Lösung anzuzeigen
    showAnswer = true;

    // Wenn die Antwort korrekt ist, erhöhe den Punktestand
    if (selected === questions[current].correctAnswer) {
      score++;
    }
  }

  // Funktion zum Wechsel zur nächsten Frage oder zum Beenden des Quiz
  function next() {
    // Lösung nicht mehr anzeigen
    showAnswer = false;

    // Falls noch Fragen vorhanden sind, zur nächsten springen
    if (current + 1 < questions.length) {
      current++;
      // Auswahl zurücksetzen
      selected = "";
    } else {
      // Wenn keine weiteren Fragen vorhanden sind, Quiz beenden
      finished = true;
    }
  }
</script>

<!-- Container für das gesamte Quiz mit vertikalem Abstand -->
<div class="container py-5">

  <!-- Bereich mit Zurück-Link oben rechts -->
  <div class="d-flex justify-content-end gap-3 mb-4">
    <a href="/teams" class="btn btn-outline-secondary">Zurück zu Teams</a>
  </div>

  <!-- Titel des Quiz mit Teamnamen -->
  <h2 class="text-center fw-bold mb-4">Quiz über {data.team.Team}</h2>

  <!-- Zeige Quiz nur, wenn es noch nicht abgeschlossen ist -->
  {#if !finished}

    <!-- Karte mit der aktuellen Frage und Antwortmöglichkeiten -->
    <div class="card shadow-sm border-0 p-4 rounded-4 bg-light-subtle">

      <!-- Zeige die aktuelle Frage -->
      <h5 class="mb-3">{questions[current].question}</h5>

      <!-- Wiederhole alle Antwortoptionen als Radio-Buttons -->
       <!-- Färbung grün, wenn die Antwort korrekt ist und Lösung angezeigt wird -->
        <!-- Färbung rot, wenn die gewählte Antwort falsch war -->
      {#each questions[current].options as opt}
        <div class="form-check mb-2">
          <label
            class="form-check-label d-block p-2 rounded border"

            
            class:bg-success-subtle={showAnswer && opt === questions[current].correctAnswer}

            class:bg-danger-subtle={showAnswer && opt === selected && opt !== questions[current].correctAnswer}
          >
            <!-- Radiobutton zur Auswahl einer Antwort -->
            <input
              class="form-check-input me-2"
              type="radio"
              bind:group={selected}
              value={opt}
              disabled={showAnswer}
            />
            {opt}
          </label>
        </div>
      {/each}

      <!-- Feedback-Abschnitt: Richtig oder Falsch -->
      {#if showAnswer}
        {#if selected === questions[current].correctAnswer}
          <!-- Nachricht bei richtiger Antwort -->
          <div class="mt-3 alert alert-success">✅ Richtig!</div>
        {:else}
          <!-- Nachricht bei falscher Antwort mit richtiger Lösung -->
          <div class="mt-3 alert alert-danger">
            ❌ Falsch. Richtig wäre: <strong>{questions[current].correctAnswer}</strong>
          </div>
        {/if}
      {/if}

      <!-- Button: Entweder „Antwort prüfen“ oder „Weiter“ -->
      <div class="mt-4">
        {#if !showAnswer}
          <!-- Prüft die aktuelle Antwort -->
          <button class="btn btn-primary w-100" onclick={check} disabled={!selected}>
            Antwort prüfen
          </button>
        {:else}
          <!-- Wechselt zur nächsten Frage -->
          <button class="btn btn-success w-100" onclick={next}>
            Weiter
          </button>
        {/if}
      </div>
    </div>

  {:else}

    <!-- Abschlussanzeige mit Punktestand -->
    <div class="alert alert-success text-center fs-5 mt-4">
      🎉 Du hast <strong>{score}</strong> von <strong>{questions.length}</strong> Fragen richtig beantwortet!
    </div>
  {/if}

</div>
