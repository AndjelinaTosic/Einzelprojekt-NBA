<script>
  export let team;
</script>

<div class="card h-100 shadow-sm border-0">
  <div class="card-body">
    <h5 class="card-title fw-bold text-primary">{team.Team}</h5>
    <p class="card-text">
      <strong> CEO:</strong> {team.CEO}<br />
      <strong>Arena:</strong> {team.Arena}<br />
      <strong>Ort:</strong> {team.Ort}<br />
      <strong>Championships:</strong> {team.Championshipsgewinne}
    </p>
    <a href={`/quiz/${team.Team.toLowerCase().replace(/\s+/g, "-")}`} class="btn btn-outline-success w-100 mt-2">
      Quiz starten
    </a>
  </div>
  {#if team.Image_url}
    <img src={team.Image_url} alt={team.Team} class="img-fluid rounded-bottom" />
  {:else}
    <img src="/images/static/images/Altura.png" alt="Kein Bild vorhanden" class="img-fluid rounded-bottom" />
  {/if}
</div>
