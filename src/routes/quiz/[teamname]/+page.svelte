<script>
  const { data } = $props();
  let current = $state(0);
  let selected = $state("");
  let score = $state(0);
  let finished = $state(false);
  let showAnswer = $state(false);

  const questions = data.quiz;

  function check() {
    showAnswer = true;
    if (selected === questions[current].correctAnswer) {
      score++;
    }
  }

  function next() {
    showAnswer = false;
    if (current + 1 < questions.length) {
      current++;
      selected = "";
    } else {
      finished = true;
    }
  }
</script>

<!-- 🧠 Container mit Abstand -->
<div class="container py-5">

  <!-- 🔝 Navigation oben rechts -->
  <div class="d-flex justify-content-end gap-3 mb-4">
    <a href="/teams" class="btn btn-outline-secondary">Zurück zu Teams</a>
  </div>

  <!-- 🎯 Titel -->
  <h2 class="text-center fw-bold mb-4">Quiz über {data.team.Team}</h2>

  {#if !finished}
    <div class="card shadow-sm border-0 p-4 rounded-4 bg-light-subtle">
      <h5 class="mb-3">{questions[current].question}</h5>

      {#each questions[current].options as opt}
        <div class="form-check mb-2">
          <label
            class="form-check-label d-block p-2 rounded border"
            class:bg-success-subtle={showAnswer && opt === questions[current].correctAnswer}
            class:bg-danger-subtle={showAnswer && opt === selected && opt !== questions[current].correctAnswer}
          >
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

      {#if showAnswer}
        {#if selected === questions[current].correctAnswer}
          <div class="mt-3 alert alert-success">✅ Richtig!</div>
        {:else}
          <div class="mt-3 alert alert-danger">
            ❌ Falsch. Richtig wäre: <strong>{questions[current].correctAnswer}</strong>
          </div>
        {/if}
      {/if}

      <div class="mt-4">
        {#if !showAnswer}
          <button class="btn btn-primary w-100" onclick={check} disabled={!selected}>
            Antwort prüfen
          </button>
        {:else}
          <button class="btn btn-success w-100" onclick={next}>
            Weiter
          </button>
        {/if}
      </div>
    </div>
  {:else}
    <div class="alert alert-success text-center fs-5 mt-4">
      🎉 Du hast <strong>{score}</strong> von <strong>{questions.length}</strong> Fragen richtig beantwortet!
    </div>
  {/if}

</div>
