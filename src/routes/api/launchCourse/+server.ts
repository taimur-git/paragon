import { json } from '@sveltejs/kit';

export const PUT = async ({ request }) => {
    const launch_req = await request.json();

    const adId = launch_req.adId;
    // console.log(typeof userId);
    console.log(adId);
    try{

        

        await prisma.ad.update({
            data: {
                isLaunched: true
            },
            where: {
                id: adId
            }
        })
    } catch (err) { 
        console.error(err);
        return json({ message: 'Cannot launch the course' }, { status: 500 });
    }

    return json({ message: 'course launched' }, { status: 201 });


}