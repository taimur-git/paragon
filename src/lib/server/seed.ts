export { universities, tagTypes , seedData}

export function testDummy(){
    console.log("testDummy");
}

async function seedData(){

    try{
        
        for (const tag of tagTypes){
            console.log(`Creating tagType ${tag.name}`);
            await prisma.tagType.create({
                data: tag
            })
        }
        

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



const universities = [
    { name: "University of Dhaka" ,alias: "DU" },
    { name: "Bangladesh University of Engineering and Technology", alias: "BUET" },
    { name: "Bangladesh University of Professionals", alias: "BUP" },
    { name: "United International University", alias: "UIU" },
    { name: "North South University", alias: "NSU" },
    { name: "American International University Bangladesh", alias: "AIUB" },
    { name: "Independent University, Bangladesh", alias: "IUB" },
    { name: "East West University", alias: "EWU" },
    { name: "Dhaka International University", alias: "DIU" },
    { name: "BRAC University", alias: "BRACU" },
    { name: "Ahsanullah University of Science and Technology", alias: "AUST" },
    { name: "University of Asia Pacific", alias: "UAP" },
    { name: "International Islamic University Chittagong", alias: "IIUC" },
    { name: "Chittagong University of Engineering & Technology", alias: "CUET" },
    { name: "Chittagong University", alias: "CU" },
    { name: "Jahangirnagar University", alias: "JU" },
    { name: "Khulna University", alias: "KU" },
    { name: "Rajshahi University", alias: "RU" },
    { name: "Khulna University of Engineering & Technology", alias: "KUET" },
    { name: "Daffodil International University", alias: "DIU" },
    //{ name: "Others" },
]

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
                { name: 'English Language' },
                { name: 'Bangla Language' },
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
                { name: "Art" },
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
