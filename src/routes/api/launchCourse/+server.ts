import { json } from '@sveltejs/kit';

export const PUT = async ({ request }) => {
    const launch_req = await request.json();

    const adId = launch_req.adId;
    // console.log(typeof userId);
    console.log(adId);
    try{
        // Date object
        const date = new Date();

        let currentDay= String(date.getDate()).padStart(2, '0');

        let currentMonth = String(date.getMonth()+1).padStart(2,"0");

        let currentYear = date.getFullYear();

        // we will display the date as DD-MM-YYYY 

        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

        await prisma.ad.update({
            data: {
                isLaunched: true,
                dateLaunched: currentDate
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