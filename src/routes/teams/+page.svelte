<script>
	const { data } = $props();
</script>

<!-- Navigationsleiste oben -->
<div class="d-flex gap-3 mb-4">
  <a href="/" class="btn btn-blue">Home</a>
  <button class="btn btn-light" on:click={() => history.back()}>Zurück</button>
</div>

<h2 class="text-center fw-bold mb-4">🏀 Teamübersicht</h2>

<div class="row gx-4 gy-4">
	{#each data.teams as team}
		<div class="col-sm-6 col-md-4 col-lg-3">
			<div class="card h-100 shadow-sm">
				<div class="card-body">
					<h5 class="card-title">{team.Team}</h5>
					<p class="card-text">
						<strong>Gründungsjahr:</strong> {team["Gründungsjahr"]}<br>
						<strong>CEO:</strong> {team.CEO}<br>
						<strong>Arena:</strong> {team.Arena}<br>
						<strong>Ort:</strong> {team.Ort}<br>
						<strong>Championships:</strong> {team.Championshipsgewinne}<br>
					</p>
					 {#if team.Image_url}
					 <img
    src={team.Image_url}
    alt={team.Team}
    class="img-fluid rounded shadow-sm mb-3"
  />
{:else}
  <img
    src="/images/static/images/Altura.png"
    alt="Kein Bild vorhanden"
    class="img-fluid rounded shadow-sm mb-3"
  />
{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
