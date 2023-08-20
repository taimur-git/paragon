import { json } from "@sveltejs/kit";

export const DELETE = async ({ request, locals, params }) => {
    const adId = params.adId;

    try {
        await prisma.adTag.deleteMany({
            where: {    
                adId: parseInt(adId),
            },
        });
        
        await prisma.ad.delete({
            where: {    
                id: parseInt(adId),
            },
        });
    } catch (error) {
        console.error("Error loading data from Prisma:", error);
        return json({ message: 'Internal Server Error' }, { status: 500 });
    }

    return json({ message: 'Ad deleted' }, { status: 200 });
}
