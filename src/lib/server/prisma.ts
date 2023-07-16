import { PrismaClient } from '@prisma/client';
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development'){
    global.prisma = prisma
}

export { prisma }


import { universities, tagTypes } from './seed';

seedData();

async function seedData(){

    try{
        /*
        for (const tag of tagTypes){
            console.log(`Creating tagType ${tag.name}`);
            await prisma.tagType.create({
                data: tag
            })
        }
        */

        for (const uni of universities){
            console.log(`Creating uni ${uni.name}`);
            await prisma.university.create({
                data: uni
            })
        }


    }catch(err){
        console.error(err)
    }

}
