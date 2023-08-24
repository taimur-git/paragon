import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const appointmentRequest = await request.json();

    const userId = appointmentRequest.userId;
    const adId = appointmentRequest.adId;
    // console.log(typeof userId);
    // console.log(adId);
    try{
        await prisma.appointment.create({
            data: {
                studentId: userId,
                adId: adId
            }  
        })

        await prisma.request.deleteMany({
            where: {
                userId: userId,
                adId: adId
            }
        });
    } catch (err) { 
        console.error(err);
        return json({ message: 'Cannot create appointment' }, { status: 500 });
    }

    return json({ message: 'appointment created' }, { status: 201 });


}