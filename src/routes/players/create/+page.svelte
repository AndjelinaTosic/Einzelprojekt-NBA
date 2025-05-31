<script>
  import { enhance } from "$app/forms";

  // Runes-Modus: keine bind:value notwendig für einfaches HTML-Formular
</script>

<div class="container py-5">
  <!-- Titel -->
  <div class="mb-4">
    <h2 class="fw-bold text-primary">Neuen Spieler hinzufügen</h2>
    <p class="text-muted">
      Fülle die Felder aus, um einen neuen NBA-Spieler zur Datenbank hinzuzufügen.
    </p>
  </div>

  <!-- Formular -->
  <form method="POST" use:enhance class="card shadow-sm p-4 border-0 bg-light rounded-4">
    <div class="row g-4">
      <!-- Name -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">👤 Name</label>
        <input name="Name" class="form-control" placeholder="z. B. Michael Jordan" required />
      </div>

      <!-- Alter -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">🎂 Alter</label>
        <input name="Alter" type="number" min="1" class="form-control" placeholder="z. B. 35" required />
      </div>

      <!-- Team -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">🏀 Team</label>
        <input name="Team" class="form-control" placeholder="z. B. Chicago Bulls" required />
      </div>

      <!-- Position -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">🎯 Position</label>
        <input name="Position" class="form-control" placeholder="z. B. Shooting Guard" />
      </div>

      <!-- Lebensstatus -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">❤️ Lebensstatus</label>
        <select name="Lebensstatus" class="form-select">
          <option selected>Lebend</option>
          <option>Verstorben</option>
        </select>
      </div>

      <!-- Bild-URL -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">🖼️ Bild-URL (optional)</label>
        <input name="Image_url" type="url" class="form-control" placeholder="https://..." />
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-4 d-flex gap-3">
      <button type="submit" class="btn btn-success">✅ Spieler erstellen</button>
      <a href="/players" class="btn btn-outline-secondary">🔙 Zurück</a>
    </div>
  </form>
</div>
