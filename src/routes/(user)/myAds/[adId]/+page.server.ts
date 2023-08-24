import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import type { RequestHandler } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ locals,params }) => {
    try {
        const authUser = await locals.auth.validateUser();
        if (!authUser.user) return redirect(302, "/login");

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
        
        const id = authUser.user.userId; // Assuming id is the correct authenticated user's ID

        const ads = await prisma.ad.findUnique({
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
                id: parseInt(params.adId)   // Filter ads based on the authenticated user's ID
            }
        });

        const joinRequests = await prisma.request.findMany({
            where: {
                adId: parseInt(params.adId)
            }
        });

        // console.log(joinRequests.length);

        const req_users = await prisma.user.findMany({
            where: {
                id: {
                    in: joinRequests.map((request) => request.userId)
                }
            }
        });

        const appointments = await prisma.appointment.findMany({
            where: {
                adId: parseInt(params.adId)
            }
        });

        const app_users = await prisma.user.findMany({
            where: {
                id: {
                    in: appointments.map((appointment) => appointment.studentId)
                }
            }
        });
        return {
            tagOptions,
            adId: ads.id,
            username: ads?.user.name,
            salaryType: ads.salaryType,
            teachingType: ads.typeOfTutor,
            salary: ads.expectedSalary,
            adDescription: ads.description,
            tags:ads.tags.map((tag) => tag.tag.name),
            req_users: req_users,
            app_users: app_users,
            numRequests: joinRequests.length,
            numAppointments: appointments.length,
        };
    } catch (error) {
        console.error("Error loading data from Prisma:", error);
        return fail(500, "Internal Server Error");
    }
}

export const actions: Actions = {
	default: async ({ request, locals,params }) => {
		const form = await request.formData();
        const salaryType = form.get("salaryType");
        const salary  =form.get("salary") ? form.get("salary") : "0";
        const expectedSalary = parseInt(salary) ;
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
        const typeOfTutor = (form.get("teachingType"));
        const description = form.get("description");
        const ad_Id = form.get("ad_Id");

        const ad = {
            salaryType : salaryType,
            expectedSalary : expectedSalary,
            typeOfTutor : typeOfTutor,
            description : description,

            tags : {
                create: tagIds
            }
        }
        console.log(ad);

        await prisma.ad.update({
            where: {    
                id: parseInt(params.adId) ,
            },
            data: ad
        });

        throw redirect(302, '/myAds');
	}

    
};
