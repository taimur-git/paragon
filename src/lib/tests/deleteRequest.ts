import { json } from '@sveltejs/kit';

export function deleteRequest = async ({ request }) => {
    const del_request = await request.json();
    
    const userId = del_request.userId;
    const adId = del_request.adId;
    try{
        await prisma.request.deleteMany({
            where: {
                userId: userId,
                adId: adId
            }
        });
    } catch (err) { 
        console.error(err);
        return json({ message: 'Cannot delete join request' }, { status: 500 });
    }

    return json({ message: 'join request deleted' }, { status: 201 });


}