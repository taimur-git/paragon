import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
// import fs from "fs";
export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    const user = await locals.auth.validateUser()
    if (!session) {
        throw redirect(302, '/register')
    } else {
        try {
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
            return { tagOptions, user };
        } catch (error) {
            console.error("Error loading data from Prisma:", error);
            return fail(500);
        }
    }

}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const salaryType = form.get("salaryType");
        const salary = form.get("salary") ? form.get("salary") : "0";
        const expectedSalary = parseInt(salary);
        const tagIdsString = form.get("tagIds");

        const workDays = form.getAll("workDays[]");
        const startTime = form.get("startTime");
        const endTime = form.get("endTime");

        const classDays: String = workDays.join('');
        
        // const theme_img_name = form.get("files[0]") as string;

        // const decodedThemeImg = atob(theme_img_name);

        // const theme_img_Buffer = Buffer.from(decodedThemeImg, 'base64');
        // console.log(theme_img_Buffer);

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
        const typeOfTutor = form.get("teachingType");
        console.log(typeOfTutor);
        const title = form.get("title");
        const description = form.get("description");
        const userid = form.get("userid");

        const ad = {
            userid: userid,
            salaryType: salaryType,
            expectedSalary: expectedSalary,
            typeOfTutor: typeOfTutor,
            description: description,
            title: title,
            workDays: classDays,
            startTime: startTime.toString(),
            endTime: endTime.toString(),
            tags: {
                create: tagIds
            }
        }
        console.log(ad);
        
        await prisma.ad.create({
            data: ad
        })


        throw redirect(302, '/home');
    }
};

