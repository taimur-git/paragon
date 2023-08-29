import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { prisma } from '$lib/server/prisma';

test('accept a req', async () => {
    const ads = await prisma.ad.findMany();
    expect(ads).toBeDefined();
});
