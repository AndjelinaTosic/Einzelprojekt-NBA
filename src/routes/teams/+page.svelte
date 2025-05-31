<script>
  import TeamCard from "$lib/components/TeamCard.svelte";
  const { data } = $props();
</script>

<!-- 📦 Container mit Abstand -->
<div class="container py-5">

  <!-- 🔝 Navigation oben rechts -->
  <div class="d-flex justify-content-end gap-3 mb-4">
    <button class="btn btn-outline-secondary" onclick={() => history.back()}>Zurück</button>
  </div>

  <!-- 🏀 Titel -->
  <h2 class="text-center fw-bold mb-5">🏀 Teamübersicht 🏀</h2>

  <!-- 🧱 Karten-Grid -->
  <div class="row gx-4 gy-4">
    {#each data.teams as team}
      <div class="col-sm-6 col-md-4 col-lg-3">
        <TeamCard {team} />
      </div>
    {/each}
  </div>

</div>
