
import type { LayoutServerLoad } from './$types'

// export const load: LayoutServerLoad = async ({ locals }) => {
// 	const { session, user } = await locals.auth.validateUser()
// 	return { user }
// }




import type { Actions, PageServerLoad } from "./$types"
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



export const actions: Actions = {
	default: async ({ request, locals }) => {
        console.log("Action invoked!");

		const form = await request.formData();
        // const salaryType = form.get("salaryType");
        // const salary  =form.get("salary") ? form.get("salary") : "0";
        // const expectedSalary = parseInt(salary) ;
        const tagIdsString = form.get("tagIds");
        //const tagIds = tagIdsString ? tagIdsString.split(',').map(id => ({ id: parseInt(id) })): [];
        //console.log(tagIds);
        //tagIds = tagIds;
        const tagIds = tagIdsString
            ? tagIdsString.split(',').map(id => ({
                tag: {
                    connect: {
                    id: parseInt(id),
                    },
                },
                }))
            : [];
        // const typeOfTutor = (form.get("teachingType"));
        // const description = form.get("description");
        // const userid = form.get("userid");

        // const ad = {
        //     userid : userid,
        //     salaryType : salaryType,
        //     expectedSalary : expectedSalary,
        //     typeOfTutor : typeOfTutor,
        //     description : description,

        //     tags : {
        //         create: tagIds
        //     }
        // }
        console.log(tagIdsString);

        // await prisma.ad.create({
        //     data: ad
        // })

        // throw redirect(302, '/home');
	}
};


/*
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/lucia";

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, "/login");
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
};*/