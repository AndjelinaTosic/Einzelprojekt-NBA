<script>
  let open = $state(false);
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
  <a class="navbar-brand fw-bold" href="/">🏀 NBA Legends</a>
  <button
    class="navbar-toggler"
    type="button"
    onclick={() => (open = !open)}
    aria-controls="navbarNav"
    aria-expanded={open}
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class={"collapse navbar-collapse" + (open ? " show" : "")} id="navbarNav">
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/players">Spieler</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/teams">Teams</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/schedule">Spielplan</a>
      </li>
    </ul>
  </div>
</nav>

<style>
  .navbar-brand {
    font-size: 1.3rem;
  }

  .nav-link {
    font-weight: 500;
    color: #fff;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 992px) {
    .navbar-collapse {
      margin-top: 1rem;
    }
  }
</style>
