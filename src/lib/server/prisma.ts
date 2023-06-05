import { PrismaClient } from '@prisma/client';
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development'){
    global.prisma = prisma
}

export { prisma }
/*
async function main() {

// ... you will write your Prisma Client queries here
    const user = await prisma.user.create({
        data: {
            name: 'Bob',
            email: 'bob@prisma.io',
        },
    })
        console.log(user)
        
    
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

    */