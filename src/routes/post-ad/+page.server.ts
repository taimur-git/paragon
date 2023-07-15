import { auth } from "$lib/server/lucia";
import { fail, redirect} from '@sveltejs/kit'
import type { Actions, PageServerLoad } from "./$types";



export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (!session) {
        throw redirect(302, '/register')
    }  
    return {};
}


export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
        
        //return request;

        
/*const salaryPlan = form.get("salaryPlan");
        console.log(form.get("salaryPlan"));
		if (typeof username !== "string" || typeof password !== "string")
			return fail(400);
		try {
			const key = await auth.useKey("username", username, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch {
			// invalid username/password
            return fail(400, { message: 'Could not login user' });
		}
        */
	}
};

