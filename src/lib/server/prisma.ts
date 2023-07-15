import { PrismaClient } from '@prisma/client';
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development'){
    global.prisma = prisma
}

export { prisma }














async function seedData(){
    try{
        const subjectsData = [

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
           // { name: 'Others'},
        ];
        for (const subjectData of subjectsData) {
            await prisma.subject.create({
              data: subjectData,
            });
          }
    }catch(e){
        console.log(e);
    }finally{
     //   await prisma.$disconnect();
    }

    try{
        const classesData =  [
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
        ];
        //create classes
        for(const classData of classesData){
            await prisma.class.create({
                data: classData,
            });
        }

    }catch(e){
        console.log(e); 
    }finally{  
    //   await prisma.$disconnect();
    }

    try{
        const boardsData = [
            {name: 'Cambridge'},
            {name: 'Pearson Edexcel'},
        ];
        //create terms
        for(const boardData of boardsData){
            await prisma.board.create({
                data: boardData,
            });
        }
    }catch(e){
        console.log(e);
    }

    try{
        const backgroundsData = [
            {name: 'English Medium'},
            {name: 'Bangla Medium'},
            {name: 'English Version'},
        ];
        //create terms
        for(const backgroundData of backgroundsData){
            await prisma.background.create({
                data: backgroundData,
            });
        }
    }catch(e){
        console.log(e);
    }

    try{
        const educationData = [
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
        //prisma.education.createMany({data: educationData});
    }catch(e){
        console.log(e);
    }

    try{
        const skills = [
            { name: "Photography" },
            { name: "Music" },
            { name: "Programming" },
            { name: "Cooking" },
            { name: "Dancing" },
            { name: "Language" },
           // { name: "Other, specify..."}
        ];
        //prisma.skill.createMany({data: skills});
    }catch(e){
        console.log(e);
    }

    try{
        const programmingSkills = [
            { name: "Low level languages, C, C++, Rust" },
            { name: "High level languages, Python, Java" },
            { name: "Front End Web Development, HTML, CSS, JS" },
            { name: "Back End Web Development, PHP, NodeJS" },
            { name: "Frameworks, React, Agular" },
            { name: "Competitive Programming, Algorithms" },

        ];
        //prisma.programmingSkill.createMany({data: programmingSkills});
    }catch(e){
        console.log(e);
    }

    try{
        const languages = [
            { name: "English" },
            { name: "Bangla" },
            { name: "Hindi" },
            { name: "Arabic" },
            { name: "Spanish" },
            { name: "German" },
            { name: "French" },
            { name: "Chinese" },
        ]
        //prisma.language.createMany({data: languages});
    }catch(e){
        console.log(e);
    }

    try{
        const certifications = [
            { name: "IELTS" },
            { name: "TOEFL" },
            { name: "GRE" },
            { name: "GMAT" },
            { name: "SAT" },
            //{ name: "Others" },
        ]
        //prisma.certification.createMany({data: certifications});
    }catch(e){
        console.log(e);
    }

    try{
        const disabilities = [
            { name: "Learning disabilities" },
            { name: "Emotional and behavioural disorders" },
            { name: "Austism" },
            { name: "Hearing impairment" },
            { name: "Visual impairment" },
            { name: "Physical disabilities" },
            { name: "Speech and language disorders" },
            { name: "Intellectual disabilities" },
        ]
        //prisma.disability.createMany({data: disabilities});
    }catch(e){
        console.log(e);
    }

    try{
        const universities = [
            { name: "University of Dhaka" ,alias: "DU" },
            { name: "Bangladesh University of Engineering and Technology", alias: "BUET" },
            { name: "Bangladesh University of Professionals", alias: "BUP" },
            { name: "United International University", alias: "UIU" },
            { name: "North South University", alias: "NSU" },
            { name: "American International University Bangladesh", alias: "AIUB" },
            { name: "Independent University, Bangladesh", alias: "IUB" },
            { name: "East West University", alias: "EWU" },
            { name: "Daffodil International University", alias: "DIU" },
            { name: "BRAC University", alias: "BRACU" },
            { name: "Ahsanullah University of Science and Technology", alias: "AUST" },
            { name: "University of Asia Pacific", alias: "UAP" },
            { name: "International Islamic University Chittagong", alias: "IIUC" },
            { name: "Chittagong University of Engineering & Technology", alias: "CUET" },
            { name: "Chittagong University", alias: "CU" },
            { name: "Jahangirnagar University", alias: "JU" },
            { name: "Khulna University", alias: "KU" },
            { name: "Rajshahi University", alias: "RU" },
            //{ name: "Others" },
        ]
    }catch(e){
        console.log(e);
    }

}