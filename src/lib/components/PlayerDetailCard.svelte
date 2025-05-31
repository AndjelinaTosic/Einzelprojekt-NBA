<script>
  export let player;
  export let bio;
</script>

<!-- 🧾 Spielerprofil -->
<div class="row g-5 align-items-start">
  <!-- 📸 Bild -->
  <div class="col-md-5 text-center">
    {#if player.Image_url}
      <img
        src={player.Image_url}
        alt={player.Name}
        class="img-fluid rounded-4 border shadow-lg"
        style="max-height: 400px; object-fit: cover;"
      />
    {:else}
      <img
        src="/images/Ebene.png"
        alt="Kein Bild"
        class="img-fluid rounded-4 border shadow-lg"
        style="max-height: 400px; object-fit: cover;"
      />
    {/if}
  </div>

  <!-- 📋 Details -->
  <div class="col-md-7">
    <div class="card shadow-sm border-0 rounded-4 p-4">
      <h4 class="text-dark fw-semibold mb-3">Spielerdetails</h4>
      <ul class="list-unstyled fs-5">
        <li>🏀 <strong>Team:</strong> {player.Team}</li>
        <li>🎯 <strong>Position:</strong> {player.Position}</li>
        <li>🎂 <strong>Alter:</strong> {player.Alter}</li>
        <li>❤️ <strong>Status:</strong> {player.Lebensstatus}</li>
      </ul>
    </div>
  </div>
</div>

<!-- 📚 Biografie -->
{#if bio}
  <div class="card bg-light border-0 shadow-sm rounded-4 p-4 mt-4">
    <h5 class="fw-bold mb-3">Biografie</h5>
    <p class="mb-0">{bio.Biographie}</p>
  </div>
{:else}
  <div class="alert alert-warning shadow-sm rounded-3 mt-4">
    ⚠️ Keine Biografie vorhanden.
  </div>
{/if}
