import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/lucia";



export const load: PageServerLoad = async ({ locals }) => {
	const auth = await locals.auth.validateUser();
	if(auth.user === null) throw redirect(302, "/login");
	const id =  auth.user.id;
	
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
		include: {
			location: true,
			institute: true,
			credentials: true,
			ads: true,
			//tuitions: true,
			//ratings: true,
		}
	});

	const institute = await prisma.university.findMany();

	if (!auth) throw redirect(302, "/login");
	return {
		user, institute
	};
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const { session } = await locals.auth.validateUser();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie

		// If the request is for the /updateName route, update the user's name.
		if (locals.params.name) {
			const name = locals.params.name;
			const updatedCount = await prisma.user.update({
				where: {
					id: auth.user.userId
				},
				data: {
					name
				}
			});
			if (updatedCount === 1) {
				data.user.name = name;
			}
		}
	},
	edit: async ({ locals }) => {
		const { user } = locals;
		return {
			user
		};
	}
}