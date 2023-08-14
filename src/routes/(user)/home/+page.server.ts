import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"

export const load: PageServerLoad = async () => {
    try {

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


          return {
            tags,
            ads: ads.map((ad) => ({
              ...ad,
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
          };
	} catch (error) {
		console.error("Error loading data from Prisma:", error);
		return fail(500, "Internal Server Error");
	}
}