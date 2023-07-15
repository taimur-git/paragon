import { PrismaClient } from '@prisma/client';
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development'){
    global.prisma = prisma
}

export { prisma }


async function seedData(){

    try{
        const tagTypes = [
            {
                name: "Subjects",
                description: "",
                adFormString: "",
                tuitionFormString: "",
                tags: {
                    create: [
                        { name: 'Mathematics' },
                        { name: 'Further Mathematics' },
                        { name: 'Sciences'},
                        { name: 'Physics' },
                        { name: 'Chemistry' },
                        { name: 'Biology'},
                        { name: 'English' },
                        { name: 'Bangla' },
                        { name: 'ICT'},
                        { name: 'Religious Studies' },
                        { name: 'History' },
                        { name: 'Geography'},
                        { name: 'Economics' },
                        { name: 'Accounting' },
                        { name: 'Business Studies'},
                        { name: 'Commerce' },
                        { name: 'Statistics' },
                        { name: 'Psychology'},
                        { name: 'Sociology' },
                        { name: 'Law' },
                        { name: 'Computer Science'},
                        { name: 'Programming' },
                        { name: 'Music' },
                        { name: 'Art'},
                        { name: 'Physical Education' },
                        { name: 'Health and Social Care' },
                        { name: 'Design and Technology'},
                        { name: 'Food and Nutrition' },
                        { name: 'Home Economics' },
                    ]
                }
            },
            {
                name: "Classes",
                description: "",
                adFormString: "",
                tuitionFormString: "",
                tags: {
                    create: [
                        {name: 'Grade I'},
                        {name: 'Grade II'},
                        {name: 'Grade III'},
                        {name: 'Grade IV'},
                        {name: 'Grade V'},
                        {name: 'Grade VI'},
                        {name: 'Grade VII'},
                        {name: 'Grade VIII'},
                        {name: 'Grade IX'},
                        {name: 'Grade X'},
                        {name: 'Grade XI'},
                        {name: 'Grade XII'},
                    ]
                }
            },
            {
                name: "Boards",
                description: "Education Boards, like Cambridge, IB, Edexcel etc.",
                tags: {
                    create: [
                        {name: 'Cambridge'},
                        {name: 'Pearson Edexcel'},
                        {name: 'IB'},
                    ]
                }
            },
            {   
                name: "Background",
                description: "Background like english medium, bangla medium, english version.",
                tags: {
                    create: [
                        {name: 'English Medium'},
                        {name: 'Bangla Medium'},
                        {name: 'English Version'},
                    ]
                }
            },
            {
                name: "Education Level",
                description: "Education level like O/A Level, SSC/HSC, Primary, KG etc.",
                tags: {
                    create: [
                        { name: "Kindergarten" },
                        { name: "School" },
                        { name: "SSC" },
                        { name: "HSC" },
                        { name: "O-Level" },
                        { name: "A-Level" },
                        { name: "University Admission Test" },
                        { name: "Bachelors" },
                        { name: "Masters" },
                        { name: "Certifications" },
                        //{ name: "Others" },
                    ]
                },
            },
            {
                name: "Skills",
                description: "Skills like programming, drawing, singing etc.",
                tags: {
                    create: [
                        { name: "Photography" },
                        { name: "Music" },
                        { name: "Programming" },
                        { name: "Cooking" },
                        { name: "Dancing" },
                        { name: "Language" },
                       // { name: "Other, specify..."}
                    ]
                }
            },
            {
                name: "Programming Skills",
                description: "Programming skills like C, C++, Java, Python etc.",
                tags: {
                    create: [
                        { name: "Low level languages, C, C++, Rust" },
                        { name: "High level languages, Python, Java" },
                        { name: "Front End Web Development, HTML, CSS, JS" },
                        { name: "Back End Web Development, PHP, NodeJS" },
                        { name: "Frameworks, React, Agular" },
                        { name: "Competitive Programming, Algorithms" },
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
            {
                name: "Music",
                description: "Music like Guitar, Piano, Violin etc.",
                tags: {
                    create: [
                        { name: "Guitar" },
                        { name: "Piano" },
                        { name: "Violin" },
                        { name: "Drums" },
                        { name: "Flute" },
                        { name: "Saxophone" },
                        { name: "Tabla" },
                        { name: "Harmonium" },
                        { name: "Singing" },
                    ]
                }
            },
            {
                name: "Certifications",
                description: "Certifications like IELTS, TOEFL, GRE etc.",
                tags: {
                    create: [
                        { name: "IELTS" },
                        { name: "TOEFL" },
                        { name: "GRE" },
                        { name: "GMAT" },
                        { name: "SAT" },
                        //{ name: "Others" },
                    ]
                }
            },
            {
                name: "Disabilities",
                description: "Disabilities like Autism, ADHD, Dyslexia etc.",
                tags: {
                    create: [
                        { name: "Learning disabilities" },
                        { name: "Emotional and behavioural disorders" },
                        { name: "Austism" },
                        { name: "Hearing impairment" },
                        { name: "Visual impairment" },
                        { name: "Physical disabilities" },
                        { name: "Speech and language disorders" },
                        { name: "Intellectual disabilities" },
                    ]
                }
            },


        ];


        for (const tagType of tagTypes){
            await prisma.tagType.create({
                data: tagType
            })
        }


    }catch(err){
        console.error(err)
    }
}

