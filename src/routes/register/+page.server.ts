import { auth } from "$lib/server/lucia";
import { fail, redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from "../about/$types";
import type { StringLiteralType } from "typescript";
// import type { Action, PageServerLoad } ''
/** @type {import('./$types').Action} */
/** @type {import('./$types').PageServerLoad} */


export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (session) {
        throw redirect(302, '/')
    }  
}

export const actions: Actions = {
    default: async ({ request }) => {
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
        throw redirect(302, '/login')
    }
}