import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/lucia";



export const load: PageServerLoad = async ({ locals, params }) => {
	const auth = await locals.auth.validateUser();
	if(auth.user === null) throw redirect(302, "/login");
	const id =  params.profileId;
	
	const user = await prisma.user.findUnique({
		where: {
			authid: id,
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
	// console.log(user);
	// const institute = await prisma.university.findMany();
	// console.log(institute);
	// if (!auth) throw redirect(302, "/login");
	return {
		user
	};
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const { session } = await locals.auth.validateUser();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
	}
};