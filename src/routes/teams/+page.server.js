import db from '$lib/database.js';

export async function load() {
	const teams = await db.getTeams(); // Funktion kommt gleich
	return { teams };
}
