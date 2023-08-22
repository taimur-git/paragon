
import type { LayoutServerLoad } from './$types'

// export const load: LayoutServerLoad = async ({ locals }) => {
// 	const { session, user } = await locals.auth.validateUser()
// 	return { user }
// }




import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session, user } = await locals.auth.validateUser()
    // const session = await locals.auth.validate()
    // const user  = await locals.auth.validateUser()
    // if (!session) {
    //     throw redirect(302, '/register')
    // }else{
        try{
            const tagType = await prisma.tagType.findMany(
                {
                    include: {
                        tags: true
                    }
                }
            );

            const tagOptions = [];

            tagType.forEach(tagType => {
                const { name: keywords, tags } = tagType;

                tags.forEach(tag => {
                    const label = tag.name;//id !== undefined ? tag.id.toString() : '' ;
                    const value = tag.name;
                    const idValue = tag.id;
                    tagOptions.push({ label, value, keywords, idValue });
                });
            });
            return {tagOptions, user};
        }catch (error) {
            console.error("Error loading data from Prisma:", error);
            return fail(500);
        }
    // }  
	return { user }

}

