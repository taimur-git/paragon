import { test, expect } from 'vitest';
import { prisma } from '$lib/server/prisma';

const adIdsToDelete = [38, 39, 40, 41]; 

for (const adId of adIdsToDelete) {
    test(`delete ad with id ${adId}`, async () => {
        const deleteReq = await prisma.request.deleteMany({
            where: {
                adId: adId,
            },
        });

        const appointment = await prisma.appointment.deleteMany({
            where: {
                adId: adId,
            },
        });

        const adTag = await prisma.adTag.deleteMany({
            where: {
                adId: adId,
            },
        });

        const ad = await prisma.ad.delete({
            where: {
                id: adId,
            },
        });

        expect(deleteReq).toBeDefined();
        expect(appointment).toBeDefined();
        expect(adTag).toBeDefined();
        expect(ad).toBeDefined();
    });
}
