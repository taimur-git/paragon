import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
    try {
        const tagIds = await request.json();
        console.log(tagIds);

        // Fetch ads based on the provided tagIds
        const adsWithTag = await prisma.ad.findMany({
            where: {
                tags: {
                    some: {
                        tagId: {
                            in: tagIds
                        }
                    }
                }
            }
        });

        return json(adsWithTag, { status: 200 });
    } catch (error) {
        console.error(error);
        return json({ message: 'Error fetching ads' }, { status: 500 });
    }
};
