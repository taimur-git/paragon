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
        const email = form.get('email')?.toString();
        //const name = username; //change this to get name later?
        if(typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string'){
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
                    username
                }
            });
            const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);

            try{
                await prisma.user.create({
                    data: {
                        authid: user.userId,
                        id: user.userId,
                        name: username,
                        email: email,
                        username: username,
                    }
                    
                })
            } catch (err) { 
                console.error(err)
                return fail(500, {message: 'Cannot create user'})
            }
    
            return {
                status: 201
            }


        }
        catch (err) {
            console.error(err)
            return fail(400, { message: 'Could not register user' })
        }
        throw redirect(302, '/login')
    }
}