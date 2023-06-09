import { auth } from "$lib/server/lucia";
import { fail, redirect} from '@sveltejs/kit'
import type { Actions, PageServerLoad } from "./$types";



export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (session) {
        throw redirect(302, '/')
    }  
    return {};
}

export const actions: Actions = {
    default: async ({ request , locals }) => {
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');
        const email = form.get('email');
        const name = username; //change this to get name later?
        if(typeof username !== 'string' || typeof password !== 'string'){
            return fail(400, {message: 'Invalid request'});
        }
        try{
            const user = await auth.createUser({
                primaryKey: {
                    providerId: 'username',
                    providerUserId: username,
                    password
                },
                attributes: {
                    username,
                    email,
                    name,
                }
            });
            const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
        }
        catch (err) {
            console.error(err)
            return fail(400, { message: 'Could not register user' })
        }
        throw redirect(302, '/login')

/*
        const { name, username, password } = Object.fromEntries(await request.formData()) as Record<
            string,
            string
            >
        try {
            await auth.createUser({
                primaryKey: {
                    providerId: 'username',
                    providerUserId: username,
                    password
                },
                attributes: {
                    name,
                    username
                }
            })
        }
        catch (err) {
            console.error(err)
            return fail(400, { message: 'Could not register user' })
        }
        throw redirect(302, '/login')*/
    }
}