import { PrismaClient } from '@prisma/client';
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development'){
    global.prisma = prisma
}

export { prisma }

export async function createTagType(name: string){
    try{
        await prisma.tagType.create({
            data: {
                name: name
            }
        })
        return true;
    }catch(err){
        console.error(err)
        return false;
    }
}
//import { universities, tagTypes , seedData} from './seed';

//seedData();


