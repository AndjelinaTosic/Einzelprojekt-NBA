<script>
  // Hole das Spielerobjekt (`player`) aus den übergebenen Props.
  // In SvelteKit 5 im Runes-Modus greift man mit `$props()` auf Props zu.
  // Das `player`-Objekt enthält die Daten eines einzelnen Spielers.
  const { player } = $props();
</script>

<!-- Karte mit Bootstrap-Layout und Farbverlauf -->
<!-- Darstellung des Spielers mit Bild, Infos und Link zur Detailseite -->
<div 
  class="card h-100 border-0 shadow rounded-4 overflow-hidden"
  style="background: linear-gradient(to bottom right, #fdfbfb, #ebedee);"
>

  <!-- Wenn der Spieler ein Bild hat, wird es angezeigt -->
  {#if player.Image_url}
    <!-- Bild des Spielers -->
    <img 
      src={player.Image_url}
      alt={player.Name}
      class="card-img-top object-fit-cover"
      style="height: 220px; object-fit: cover;"
    />
  
  <!-- Wenn kein Bild vorhanden ist, wird ein Platzhalterbild angezeigt -->
  {:else}
    <!-- Platzhalterbild -->
    <img 
      src="/images/Ebene.png"
      alt="Kein Bild vorhanden"
      class="card-img-top object-fit-cover"
      style="height: 220px; object-fit: cover;"
    />
  {/if}

  <!-- Inhalt der Karte (Textinformationen) -->
  <div class="card-body text-dark">
  
    <!-- Spielername als Titel -->
    <h5 class="card-title fw-bold text-primary">{player.Name}</h5>

    <!-- Auflistung der wichtigsten Spielerinfos -->
    <ul class="list-unstyled small">
      <!-- Teamname -->
      <li><strong>Team:</strong> {player.Team}</li>
      <!-- Position des Spielers -->
      <li><strong>Position:</strong> {player.Position}</li>
      <!-- Alter des Spielers -->
      <li><strong>Alter:</strong> {player.Alter}</li>
      <!-- Lebensstatus des Spielers -->
      <li><strong>Status:</strong> {player.Lebensstatus}</li>
    </ul>

    <!-- Button zur Detailseite des Spielers -->
    <a 
      href={`/players/${player._id}`} 
      class="btn btn-outline-primary w-100 mt-2 rounded-pill"
    >
      🔍 Details ansehen
    </a>
    
  </div>
</div>
