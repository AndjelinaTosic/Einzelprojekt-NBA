<script>
	const { teams } = $props();
</script>

<h2 class="text-center fw-bold mb-4">🏀 Teamübersicht</h2>

<div class="row gx-4 gy-4">
	{#each teams as team}
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
				</div>
			</div>
		</div>
	{/each}
</div>
