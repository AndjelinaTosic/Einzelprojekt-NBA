<script>
  // Hole das Team-Objekt aus den übergebenen Props
  // `team` enthält Informationen wie Name, CEO, Arena usw.
  let { team } = $props();
</script>

<!-- Karte für ein NBA-Team mit Textbereich und Bild -->
<div class="card h-100 shadow-sm border-0">

  <!-- Karteninhalt mit Textinformationen -->
  <div class="card-body">

    <!-- Teamname als Titel der Karte -->
    <h5 class="card-title fw-bold text-primary">{team.Team}</h5>

    <!-- Details wie CEO, Arena, Ort und Titel -->
    <p class="card-text">
      <strong> CEO:</strong> {team.CEO}<br />
      <strong>Arena:</strong> {team.Arena}<br />
      <strong>Ort:</strong> {team.Ort}<br />
      <strong>Championships:</strong> {team.Championshipsgewinne}
    </p>

    <!-- Quiz-Button mit dynamischer URL basierend auf dem Teamnamen -->
    <a 
      href={`/quiz/${team.Team.toLowerCase().replace(/\s+/g, "-")}`} 
      class="btn btn-outline-success w-100 mt-2"
    >
      Quiz starten
    </a>
  </div>

  <!-- Bildanzeige: Wenn vorhanden, wird das Team-Bild angezeigt -->
  {#if team.Image_url}
    <img 
      src={team.Image_url} 
      alt={team.Team} 
      class="img-fluid rounded-bottom" 
    />
  
  <!-- Fallback-Bildanzeige, wenn kein Bild vorhanden ist -->
  {:else}
    <img 
      src="/images/static/images/Altura.png" 
      alt="Kein Bild vorhanden" 
      class="img-fluid rounded-bottom" 
    />
  {/if}
</div>
