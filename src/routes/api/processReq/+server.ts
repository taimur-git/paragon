import { json } from '@sveltejs/kit';
import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit"
import { goto } from '$app/navigation';


export const POST = async ({ request, locals }) => {

    const session = await locals.auth.validate();

    if (!session) {
        console.log("No session found");
        // throw redirect(302, '/register')
        // goto('/register');
        return json( {message:  'No session found'}, { status: 200 });

    }else{
        const joinReq = await request.json();
        
        const adId = joinReq.id;
        const teacherId = joinReq.userid;
        const ad = joinReq;
        const students  = await locals.auth.validateUser();

        try{
            const checkif_req = await prisma.request.findMany({
                where: { 
                    AND: [
                        {adId: adId},
                        {userId: students.user.userId}
                    ]
                },
            })

            const checkif_app = await prisma.appointment.findMany({
                where: { 
                    AND: [
                        {adId: adId},
                        {studentId: students.user.userId}
                    ]
                },
            })

            // console.log(checkif);
            // console.log(students.user.userId);
            // console.log(adId);

            if(checkif_req.length===0 && checkif_app.length===0){
                try{
                    await prisma.request.create({
                        data: {
                            adId: adId,
                            userId: students.user.userId,
                            // ad: ad,
                            // user: student,
                            // username: username,
                        }
                        
                    })
                } catch (err) { 
                    console.error(err);
                    return json({ message: 'Cannot create user' }, { status: 500 });
                } 
            }
        
            else{
                // reqResponse.message =;
                if(checkif_app.length!==0){
                    return json( {message:  'Already appointed'}, { status: 201 });
                }
                else if(checkif_req.length!==0){
                    return json( {message:  'Already requested'}, { status: 201 });
                }

            }

        }
        catch (err) {
            console.error(err)
            return json({ message: 'Cannot create auth user' }, { status: 500 });
        }

        return json({ message: 'Requested' }, { status: 201 });
    }
}