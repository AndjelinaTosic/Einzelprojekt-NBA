<script>
  const { data } = $props();
</script>

<h2 class="text-center fw-bold mb-4">🏀 Spielerübersicht</h2>

<div class="row gx-4 gy-4">
  {#each data.players as player}
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">{player.Name}</h5>
          <p class="card-text">
            <strong>Team:</strong> {player.Team}<br>
            <strong>Position:</strong> {player.Position}<br>
            <strong>Alter:</strong> {player.Alter}<br>
            <strong>Lebensstatus:</strong> {player.Lebensstatus}
          </p>
        </div>
      </div>
    </div>
  {/each}
</div>
