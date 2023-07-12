import 'dotenv/config'

// export const load = async () => {
//     return {}
// }

import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, "/login");
	return {
		user
	};
};