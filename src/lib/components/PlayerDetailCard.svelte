<script>
  // Hole die Props `player` und `bio`, die vom Server übergeben werden
  // `player` enthält die Spielerinformationen, `bio` enthält ggf. die Biografie
  let { player, bio } = $props();
</script>

<!-- Hauptcontainer für das Spielerprofil mit zwei Spalten (Bild + Details) -->
<div class="row g-5 align-items-start">

  <!-- Linke Spalte für das Spielerbild -->
  <div class="col-md-5 text-center">
    
   <!-- Fallback-Bild, wenn kein Bild vorhanden -->
    {#if player.Image_url}
      
      <!--  Bild des Spielers mit Styling-->
      <img
        src={player.Image_url}
        alt={player.Name}
        class="img-fluid rounded-4 border shadow-lg"
        style="max-height: 400px; object-fit: cover;"
      />
    
    {:else}
    <!-- Fallback-Bild, wenn kein Bild vorhanden ist-->
      <img
        src="/images/Ebene.png"
        alt="Kein Bild"
        class="img-fluid rounded-4 border shadow-lg"
        style="max-height: 400px; object-fit: cover;"
      />
    {/if}
  </div>

  <!-- Rechte Spalte mit Spielerinformationen -->
  <div class="col-md-7">

    <!-- Karte mit Spielerinformationen (Team, Position, Alter, Status) -->
    <div class="card shadow-sm border-0 rounded-4 p-4">
      
            <!--Überschrift für den Detailbereichn -->
      <h4 class="text-dark fw-semibold mb-3">Spielerdetails</h4>

     <!--Auflistung der einzelnen Informationen -->
      <ul class="list-unstyled fs-5">
        <li><strong>Team:</strong> {player.Team}</li>
        <li><strong>Position:</strong> {player.Position}</li>
        <li><strong>Alter:</strong> {player.Alter}</li>
        <li><strong>Status:</strong> {player.Lebensstatus}</li>
      </ul>
    </div>
  </div>
</div>

<!-- Bereich für die Biografie des Spielers -->
{#if bio}
  
 <!-- Wenn eine Biografie vorhanden ist, zeige sie in einer Karte an-->
  <div class="card bg-light border-0 shadow-sm rounded-4 p-4 mt-4">
    <h5 class="fw-bold mb-3">Biografie</h5>
    <p class="mb-0">{bio.Biographie}</p>
  </div>

{:else}
  
  <!--Wenn keine Biografie vorhanden ist, zeige eine Warnung-->
  <div class="alert alert-warning shadow-sm rounded-3 mt-4">
    ⚠️ Keine Biografie vorhanden.
  </div>
{/if}
