import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"


export const load: PageServerLoad = async ({ locals }) => {
    try {
        const authUser = await locals.auth.validateUser();
        if (!authUser.user) return redirect(302, "/login");
        
        const id = authUser.user.userId; // Assuming id is the correct authenticated user's ID

        const ads = await prisma.ad.findMany({
            include: {
                user: {
                    include: {
                        institute: true
                    }
                },
                tags: {
                    select: { tag: true }
                }
            },
            where: {
                userid: id // Filter ads based on the authenticated user's ID
            }
        });

        return {
            ads: ads.map((ad) => ({
                ...ad,
                adId: ad.id,
                userid: ad.user.id,
                user: ad.user.name,
                tags: ad.tags.map((tag) => tag.tag.name),
                salary: ad.expectedSalary,
                createdAt: ad.dateCreated.toISOString().split("T")[0],
                lastLogin: ad.user.lastLogin.toISOString().split("T")[0],
                tutorType: ad.typeOfTutor,
                salaryType: ad.salaryType,
                adDescription: ad.description,
                updatedAt: ad.dateUpdated.toISOString().split("T")[0],
                instituteName: ad.user.institute?.name,
            })),
        };
    } catch (error) {
        console.error("Error loading data from Prisma:", error);
        return fail(500, "Internal Server Error");
    }
}




export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const form = await request.formData();
        const ad_Id = form.get("adId");

        await prisma.adTag.deleteMany({
            where: {    
                adId: parseInt(ad_Id),
            },
        });
        
        await prisma.ad.delete({
            where: {    
                id: parseInt(ad_Id),
            },
        });

        throw redirect(302, '/myAds');
	}
};

