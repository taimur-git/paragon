import { test, expect } from 'vitest';
import { prisma } from '$lib/server/prisma';
import { now } from 'svelte/internal';

const tags = [
    {
      tag: {
        connect: {
          id: 9,
        },
      },
    },
    {
      tag: {
        connect: {
          id: 22,
        },
      },
    },
  ]
const ad = {
    userid: "7c4Q1RfvQCMOmzm",
    salaryType: "negotiable",
    expectedSalary: 100,
    typeOfTutor: "offline",
    description: "lorem ipsum",
    title: "Geometry Tutor",
    workDays: "[5,6]",
    startTime: now.toString(),
    endTime: now.toString(),
    tags: {
        create: tags
    }
}

    test(`post an Ad`, async () => {
        const postReq = await prisma.ad.create({
            data: ad
        })

        expect(postReq).toBeDefined();
    });