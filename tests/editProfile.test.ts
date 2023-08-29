import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { prisma } from '$lib/server/prisma';

test('Update users profile', async () => {
    const updated_user = await prisma.user.update({
        data: {
            // username: username,
            name: "Test",
            // email: email,
            bio: "Test bio",
            phone: "0190000000",
        },
        where: {
            id: "vgZ2ncMmT4FvLJU",
    
        }
    })
    
    expect(updated_user).toBeDefined();
});




