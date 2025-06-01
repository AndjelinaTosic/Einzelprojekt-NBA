<script>
  // Reaktive Variable `open`, gesteuert durch $state (Runes-Modus von SvelteKit)
  // Sie bestimmt, ob das mobile Menü (Hamburger-Menü) ein- oder ausgeklappt ist.
  let open = $state(false);
</script>

<!-- Bootstrap-Navigationsleiste -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
  <!-- Branding-Element: Link zur Startseite mit Emoji -->
  <a class="navbar-brand fw-bold" href="/">🏀 NBA Legends</a>

  <!-- Hamburger-Menü-Button (sichtbar auf kleinen Bildschirmen) -->
  <button
    class="navbar-toggler"                 
    type="button"                          
    onclick={() => (open = !open)}         
    aria-controls="navbarNav"              
    aria-expanded={open}                   
    aria-label="Toggle navigation"         
  >
    <span class="navbar-toggler-icon"></span> <!-- Icon mit drei horizontalen Strichen -->
  </button>

  <!-- Ein- oder ausgeklapptes Menü, abhängig vom Wert von `open` -->
  <div class={"collapse navbar-collapse" + (open ? " show" : "")} id="navbarNav">
    <!-- "collapse navbar-collapse" ist Standard bei Bootstrap -->
    <!-- Wenn `open == true`, wird zusätzlich "show" angehängt und das Menü sichtbar -->
    <ul class="navbar-nav ms-auto"> <!-- Navigationsliste; ms-auto sorgt für rechtsbündig -->
      <li class="nav-item">
        <a class="nav-link" href="/">Home</a> <!-- Link zur Startseite -->
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/players">Spieler</a> <!-- Link zur Spieler-Seite -->
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/teams">Teams</a> <!-- Link zur Team-Seite -->
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/schedule">Spielplan</a> <!-- Link zur Schedule-Seite -->
      </li>
    </ul>
  </div>
</nav>

<style>
  /* Stil für das Branding/Logo */
  .navbar-brand {
    font-size: 1.3rem; /* Schriftgröße etwas größer */
  }

  /* Standard-Linkstil in der Navigationsleiste */
  .nav-link {
    font-weight: 500; /* Halbfett */
    color: #fff;      /* Weißer Text */
  }

  /* Hover-Effekt für Links: Unterstrichen */
  .nav-link:hover {
    text-decoration: underline;
  }

  /* Wenn Bildschirmbreite kleiner als 992px ist: Abstand oben für ausgeklapptes Menü */
  @media (max-width: 992px) {
    .navbar-collapse {
      margin-top: 1rem;
    }
  }
</style>
