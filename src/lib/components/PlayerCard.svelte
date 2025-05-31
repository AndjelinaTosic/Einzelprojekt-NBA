<script>
  const { player } = $props();
</script>

<div class="card h-100 border-0 shadow rounded-4 overflow-hidden" style="background: linear-gradient(to bottom right, #fdfbfb, #ebedee);">
  <!-- Spielerbild -->
  {#if player.Image_url}
    <img src={player.Image_url} alt={player.Name} class="card-img-top object-fit-cover" style="height: 220px; object-fit: cover;" />
  {:else}
    <img src="/images/Ebene.png" alt="Kein Bild vorhanden" class="card-img-top object-fit-cover" style="height: 220px; object-fit: cover;" />
  {/if}

  <!-- Inhalt -->
  <div class="card-body text-dark">
    <h5 class="card-title fw-bold text-primary">{player.Name}</h5>
    <ul class="list-unstyled small">
      <li>🏀 <strong>Team:</strong> {player.Team}</li>
      <li>🧍 <strong>Position:</strong> {player.Position}</li>
      <li>🎂 <strong>Alter:</strong> {player.Alter}</li>
      <li>🩺 <strong>Status:</strong> {player.Lebensstatus}</li>
    </ul>

    <a href={`/players/${player._id}`} class="btn btn-outline-primary w-100 mt-2 rounded-pill">
      🔍 Details ansehen
    </a>
  </div>
</div>
