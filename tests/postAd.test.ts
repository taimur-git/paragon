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
];
const ads = [
    {
      userid: "7c4Q1RfvQCMOmzm",
      salaryType: "negotiable",
      typeOfTutor: "offline",
      description: "lorem ipsum",
      title: "Geometry Tutor",
      workDays: "[5,6]",
      startTime: now.toString(),
      endTime: now.toString(),
      tags: {
          create: tags
      }
    } ,
    {
      userid: "7c4Q1RfvQCMOmzm",
    salaryType: "weekly",
    expectedSalary: 100,
    typeOfTutor: "online",
    description: "dolor imet",
    title: "Guitar Tutor",
    workDays: "[2]",
    startTime: now.toString(),
    endTime: now.toString(),
    },
    {
      userid: "7c4Q1RfvQCMOmzm",
    salaryType: "monthly",
    expectedSalary: 1000,
    typeOfTutor: "both",
    description: "sit amet",
    title: "Piano Tutor"
    },
     {
      userid: "doesn't exist"
    },
];

    ads.forEach(ad => {
      test(`post an Ad, ${ad.title}`, async () => {

        const postReq = await prisma.ad.create({
            data: ad
        })

        expect(postReq).toBeDefined();
    });
  });
  