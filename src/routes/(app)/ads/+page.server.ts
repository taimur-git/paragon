import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ locals }) => {
    try {
    // console.log(logInId.user.userId);
    // const logInId = logInfo.user.userId;

		const tags = await prisma.tag.findMany();
		const ads = await prisma.ad.findMany({
            include: {
              user: {
                include: {
                    institute: true // Include the institute (university) relationship
                }
            }, // Include the user relation
              tags: {
                select: { tag: true } // Include only the tag relation and select the 'tag' field (which is the Tag model)
              } // Include the user relation
            },
            
            // where: {
            //     // Use the selectedTag value to filter the ads
            //     tags: {
            //       some: {
            //         tag: {
            //           name: tagName, // Filter ads with the selected tag
            //         },
            //       },
            //     },
            //   },
          });

          const logInfo  = await locals.auth.validateUser()

          return {
            tags,
            ads: ads.map((ad) => ({
              ...ad,
                adOwner: ad.userid,
                id: ad.id,
                user: ad.user.name, 
                tags: ad.tags.map((tag) => tag.tag.name), 
                salary: ad.expectedSalary,
                createdAt: ad.dateCreated.toISOString().split("T")[0],
                lastLogin: ad.user.lastLogin.toISOString().split("T")[0],
                tutorType: ad.typeOfTutor,
                salaryType: ad.salaryType,
                adDescription: ad.description,
                updateAT: ad.dateUpdated.toISOString().split("T")[0],
                instituteName: ad.user.institute?.name , // Use a default value if no institute is associated
            })),
            logInfo,
          };
	} catch (error) {
		console.error("Error loading data from Prisma:", error);
		return fail(500, "Internal Server Error");
	}
}

// export const actions: Actions = {
// 	enroll: async ({ request, locals }) => {
//     console.log("enrollred");

		// const form = await request.formData();
    //     const salaryType = form.get("salaryType");
    //     const salary  =form.get("salary") ? form.get("salary") : "0";
    //     const expectedSalary = parseInt(salary) ;
    //     const tagIdsString = form.get("tagIds");
    //     //const tagIds = tagIdsString ? tagIdsString.split(',').map(id => ({ id: parseInt(id) })): [];
    //     //console.log(tagIds);
    //     //tagIds = tagIds;
    //     const tagIds = tagIdsString
    //         ? tagIdsString.split(',').map(id => ({
    //             tag: {
    //                 connect: {
    //                 id: parseInt(id),
    //                 },
    //             },
    //             }))
    //         : [];
    //     const typeOfTutor = (form.get("teachingType"));
    //     const description = form.get("description");
    //     const userid = form.get("userid");

    //     const ad = {
    //         userid : userid,
    //         salaryType : salaryType,
    //         expectedSalary : expectedSalary,
    //         typeOfTutor : typeOfTutor,
    //         description : description,

    //         tags : {
    //             create: tagIds
    //         }
    //     }
    //     console.log(ad);

    //     await prisma.ad.create({
    //         data: ad
    //     })

    //     throw redirect(302, '/home');
// 	}
// };