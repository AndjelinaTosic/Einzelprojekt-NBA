<script>

  let { player, selected = false, onSelect } = $props();
</script>

<div
 class="card h-100 shadow-sm position-relative"
  class:border-success={selected}
  onclick={() => onSelect(player._id)}
  role="button"
  tabindex="0"
  aria-pressed={selected}
>
  {#if selected}
    <span class="position-absolute top-0 end-0 badge bg-success m-2">✔</span>
  {/if}

  <img
    src={player.Image_url || "/images/Ebene.png"}
    alt={player.Name}
    class="d-block mx-auto rounded mt-2"
    style="height: 100px; width: 100px; object-fit: cover;"
  />

  <div class="card-body text-center py-2">
    <h6 class="card-title mb-1">{player.Name}</h6>
    <p class="mb-1"><strong>Team:</strong> {player.Team}</p>
    <p class="mb-1"><strong>Position:</strong> {player.Position}</p>
  </div>
</div>
