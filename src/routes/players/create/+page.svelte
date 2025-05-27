<script>
  import { enhance } from "$app/forms";
</script>

<h2 class="fw-bold mb-4">➕ Neuen Spieler erstellen</h2>

<form method="POST" use:enhance>
  <div class="mb-3">
    <label class="form-label">Name</label>
    <input name="Name" class="form-control" required />
  </div>
  <div class="mb-3">
    <label class="form-label">Alter</label>
    <input name="Alter" type="number" class="form-control" required />
  </div>
  <div class="mb-3">
    <label class="form-label">Team</label>
    <input name="Team" class="form-control" required />
  </div>
  <div class="mb-3">
    <label class="form-label">Position</label>
    <input name="Position" class="form-control" />
  </div>
  <div class="mb-3">
    <label class="form-label">Lebensstatus</label>
    <select name="Lebensstatus" class="form-select">
      <option>Lebend</option>
      <option>Verstorben</option>
    </select>
  </div>
  <div class="mb-3">
    <label class="form-label">Bild-URL (optional)</label>
    <input name="Image_url" type="url" class="form-control" />
  </div>
  <button type="submit" class="btn btn-primary">✅ Erstellen</button>
  <a href="/players" class="btn btn-secondary ms-2">Zurück</a>
</form>
