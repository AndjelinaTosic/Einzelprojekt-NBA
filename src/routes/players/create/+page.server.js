import db from "$lib/database.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const player = Object.fromEntries(formData.entries());

    // Typkonvertierung
    player.Alter = Number(player.Alter);

    const id = await db.createPlayer(player);
    if (!id) {
      return { error: "Fehler beim Erstellen" };
    }

    throw redirect(303, "/players?created=true");
  }
};
