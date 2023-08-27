import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";


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
                id: parseInt(params.courseId)   // Filter ads based on the authenticated user's ID
            }
        });

        const joinRequests = await prisma.request.findMany({
            where: {
                adId: parseInt(params.courseId)
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
                adId: parseInt(params.courseId)
            }
        });

        const app_users = await prisma.user.findMany({
            where: {
                id: {
                    in: appointments.map((appointment) => appointment.studentId)
                }
            }
        });

        const workDaysCheckbox = ads.workDays?.split("").map((day) => parseInt(day));
        // console.log(workDays);

        

        let workDays = ads.workDays.split('');
        let workHours = [ads.startTime, ads.endTime];
        let startRecurrence = ads.dateLaunched;

        let classEvent =[{
            title: ads.title,
            daysOfWeek: workDays, // 0 is Sunday, 1 is Monday, and so on
            startTime: workHours[0]+':00', // Set your preferred start time
            endTime: workHours[1]+':00', // Set your preferred end time
            // Specify the start date for the recurring event
            startRecur: startRecurrence // Adjust the start date accordingly
        }];

        return {
            tagOptions,
            adId: ads.id,
            username: ads?.user.name,
            salaryType: ads.salaryType,
            teachingType: ads.typeOfTutor,
            salary: ads.expectedSalary,
            adTitle: ads.title,
            adDescription: ads.description,
            tags:ads.tags.map((tag) => tag.tag.name),
            classEvent: classEvent,
            startTime: ads.startTime,
            endTime: ads.endTime,
            req_users: req_users,
            app_users: app_users,
            numRequests: joinRequests.length,
            numAppointments: appointments.length,
            workDaysCheckbox: workDaysCheckbox,
        };
    } catch (error) {
        console.error("Error loading data from Prisma:", error);
        return fail(500, "Internal Server Error");
    }
}