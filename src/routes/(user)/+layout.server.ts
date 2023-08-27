import type { LayoutServerLoad } from './$types'
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"


export const load: LayoutServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    const authUser  = await locals.auth.validateUser()
    const userid = authUser.user.userId;
    if (!session) {
        throw redirect(302, '/register')
    }else{
        try{
            //user_app is an array of appointments
            const user_app = await prisma.appointment.findMany({
                where: {
                    studentId: userid
                },
            });

            let has_app = false;
            if(user_app.length > 0){
                has_app = true;
            }
            console.log(has_app);
            return {has_app};
        }catch (error) {
            console.error("Error loading data from Prisma:", error);
            return fail(500);
        }
    }  

}

