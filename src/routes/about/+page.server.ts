
//import type {  } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";
export const load: PageServerLoad = async () => {
	return {
		users: await prisma.user.findMany(),
	}
}


export const actions: Actions = {
    createUser: async ({ request }) => {
        const {name, email} = Object.fromEntries(await request.formData()) as {
            //table parameters
            name: string
            email: string
        }

        try{
            await prisma.user.create({
                data: {
                    name,
                    email
                }
            })
        } catch (err) { 
            console.error(err)
            return fail(500, {message: 'cannot create user'})
        }

        return {
            status: 201
        }
    },



    deleteUser: async ({ url }) => {
		const id = url.searchParams.get("id")
		if (!id) {
			return fail(400, { message: "Invalid request" })
		}

		try {
			await prisma.user.delete({
				where: {
					id: Number(id),
				},
			})
		} catch (err) {
			console.error(err)
			return fail(500, {
				message: "Something went wrong deleting user",
			})
		}

		return {
			status: 200,
		}
	},

};