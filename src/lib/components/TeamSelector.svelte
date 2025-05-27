<script>
  let { teams = [], selectedTeam = $bindable(), onChange } = $props();
</script>

<div 
class="mb-4">
  <label for="teamSelect" class="form-label fw-bold">Wähle dein Team:</label>
  <select
    id="teamSelect"
    bind:value={selectedTeam}
    class="form-select"
    onchange={onChange}
  >
    <option value="">-- Bitte wählen --</option>
    {#each teams as team}
      <option value={team.Team}>{team.Team}</option>
    {/each}
  </select>
</div>
