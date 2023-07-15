import { PrismaClient } from '@prisma/client';
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development'){
    global.prisma = prisma
}

export { prisma }


/*
async function seedData(){

    try{

        
        const tagTypes = [

            {
                name: "Skills",
                description: "Skills like programming, drawing, singing etc.",
                adFormString: "skills",
                tags: {
                    create: [
                        { name: "Photography" },
                        { name: "Music" },
                        { name: "Art" },
                        { name: "Programming" },
                        { name: "Cooking" },
                        { name: "Dancing" },
                        { name: "Language" },
                       // { name: "Other, specify..."}
                    ]
                }
            },
			
			{
                name: "Languages",
                description: "Languages like English, Bangla, French etc.",
                tags: {
                    create: [
                        { name: "English" },
                        { name: "Bangla" },
                        { name: "Hindi" },
                        { name: "Arabic" },
                        { name: "Spanish" },
                        { name: "German" },
                        { name: "French" },
                        { name: "Chinese" },
                    ]
                }
            },

        ];



        for (const tag of tagTypes){
            console.log(`Creating tagType ${tag.name}`);
            await prisma.tagType.create({
                data: tag
            })
        }


    }catch(err){
        console.error(err)
    }

}
*/
