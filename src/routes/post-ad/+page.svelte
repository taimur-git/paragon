
<script lang="ts">
    import {
    Form,
    TextInput,
	Button,
	MultiSelect,
	ComboBox,
	NumberInput,
	RadioButtonGroup,
	RadioButton,
  } from "carbon-components-svelte";

  import { onMount, setContext } from "svelte";
  //let selectedEducationLevel: number;

  let showSalaryInput: boolean = false;

  let showClassSelect: boolean = false;
  let showBoardSelect: boolean = false;
  let showAcademiaSelect: boolean = false;
  let showOtherSkillsSelect: boolean = false;
  let showSpecialSelect: boolean = false;
  let showOtherSkillsDescription: boolean = false;


  let showMusicSelect: boolean = false;
  let showProgrammingSelect: boolean = false;
  let showLanguageSelect: boolean = false;

  let englishMedium: boolean = false;
  let banglaMedium: boolean = false;


  function handleEducationLevelChange(event: { detail: { selectedIds: string | string[]; }; }){
    //console.log(event.detail.selectedIds);
    let ids = event.detail.selectedIds;
        //School is selected
        showClassSelect = ids.includes("1");
        //O-Level or A-Level is selected
        showBoardSelect = ids.includes("4")||ids.includes("5");
    
  }
  function changeForm(event: { detail: { selectedId: string; }; }){
    let id = event.detail.selectedId;
    showAcademiaSelect = id == "0";
    showOtherSkillsSelect = id == "1";
    showSpecialSelect = id == "2";
  }
  function removeForm(){
    showAcademiaSelect = false;
    showSpecialSelect = false;
    showOtherSkillsSelect = false;
  }
  function removeAll(){
    showClassSelect = false;
    showBoardSelect = false;
  }
  function otherDescriptionShow(event: { detail: { selectedId: string; }; }){
    let id = event.detail.selectedId;
    showOtherSkillsDescription = id == "6";
    showMusicSelect = id == "1";
    showProgrammingSelect = id == "2";
    showLanguageSelect = id == "5";
  }
    function otherDescriptionHide(){
        showOtherSkillsDescription = false;
    }
    function handleSalaryInput(event: { detail: { selectedId: string; }; }){
        //console.log(event.detail);
        showSalaryInput = event.detail != "2";
    }
    function changeLevels(event: { detail: { selectedIds: string | string[]; }; }){
        banglaMedium = event.detail.selectedIds.includes("2");
        englishMedium = event.detail.selectedIds.includes("0");
        
        if( banglaMedium && englishMedium || !(banglaMedium || englishMedium) ){
            //show all
            educationitems = defaultItems;
        }else{
            if(banglaMedium){
                //dont show id 4 and 5
                educationitems = defaultItems.filter(item => item.id != "4" && item.id != "5");
            }
            if(englishMedium){
                //dont show id 2 and 3
                educationitems = defaultItems.filter(item => item.id != "2" && item.id != "3");
            }
        }
        
    }
    function removeLevels(){
        //showClassSelect = false;
        //showBoardSelect = false;
        banglaMedium = false;
        englishMedium = false;
    }

    let defaultItems = [
                        { id: "0", text: "Kindergarten" },
                        { id: "1", text: "School" },
                        { id: "2", text: "SSC" },
                        { id: "3", text: "HSC" },
                        { id: "4", text: "O-Level" },
                        { id: "5", text: "A-Level" },
                        { id: "6", text: "University Admission Test" },
                        { id: "7", text: "Bachelors" },
                        { id: "8", text: "Masters" },
                        { id: "9", text: "Certifications" },
                        { id: "10", text: "Others" },
                    ];
        let educationitems = defaultItems;

        let subjects = [
                        { id: '1', text: 'Mathematics' },
                        { id: '2', text: 'Further Mathematics' },
                        { id: '3', text: 'Sciences'},
                        { id: '4', text: 'Physics' },
                        { id: '5', text: 'Chemistry' },
                        { id: '6', text: 'Biology'},
                        { id: '7', text: 'English' },
                        { id: '8', text: 'Bangla' },
                        { id: '9', text: 'ICT'},
                        { id: '10', text: 'Religious Studies' },
                        { id: '11', text: 'History' },
                        { id: '12', text: 'Geography'},
                        { id: '13', text: 'Economics' },
                        { id: '14', text: 'Accounting' },
                        { id: '15', text: 'Business Studies'},
                        { id: '16', text: 'Commerce' },
                        { id: '17', text: 'Statistics' },
                        { id: '18', text: 'Psychology'},
                        { id: '19', text: 'Sociology' },
                        { id: '20', text: 'Law' },
                        { id: '21', text: 'Computer Science'},
                        { id: '22', text: 'Programming' },
                        { id: '23', text: 'Music' },
                        { id: '24', text: 'Art'},
                        { id: '25', text: 'Physical Education' },
                        { id: '26', text: 'Health and Social Care' },
                        { id: '27', text: 'Design and Technology'},
                        { id: '28', text: 'Food and Nutrition' },
                        { id: '29', text: 'Home Economics' },
                        { id: '30', text: 'Others'},
                        
                        ];
    
</script>


<div class="flex justify-center">
    <div class="w-full sm:w-3/5 md:w-1/3 ">
        <h1 class="text-2xl font-bold mb-2.5">Post Your Ad</h1>

        <h1 class="text-lg font-normal mb-4">It is recommended to finish your <a href='/profile'>Profile</a> before posting an ad.</h1>

        <Form method="POST" >

            <RadioButtonGroup legendText="Expected salary plan" selected="2" 
            on:change={handleSalaryInput} name="salaryPlan"
            >
                <RadioButton labelText="BDT/Week" value="0" />
                <RadioButton labelText="BDT/Month" value="1" />
                <RadioButton labelText="Negotiable" value="2" />
            </RadioButtonGroup>
            {#if showSalaryInput}

                <NumberInput light label="Expected salary in BDT"
                min={0}
                invalidText="Salary cannot be lower than 0" 
                value={0} name="salary"/>
            {/if}

                <ComboBox
                titleText="Who is your target audience? (If you wish to teach more than one, please post another separate ad)"
                placeholder="Select your student audience"
                items={[
                    { id: "0", text: "Students in academia" },
                    { id: "1", text: "Students looking for other skills" },
                    { id: "2", text: "Students with special needs" },
                ]}
                on:select={changeForm}
                on:clear={removeForm}
                name="audience"
                />

            {#if showAcademiaSelect}
                    <MultiSelect
                    titleText="Background"
                    label="Select education background you are willing to teach"
                    items={[
                        { id: "0", text: "English Medium" },
                        { id: "1", text: "English Version" },
                        { id: "2", text: "Bangla Medium" },
                    ]}
                    on:select={changeLevels}
                    on:clear={removeLevels}
                    name="background"
                    />



                    <MultiSelect
                    titleText="Education Level"
                    label="Select level of education you are willing to teach"

                    
                    items={educationitems}
                    
                    on:select={handleEducationLevelChange}
                    on:clear={removeAll}
                    name="level"
                    />
                    
                    {#if showClassSelect}
                        
                    <MultiSelect
                        titleText="Grade"
                        label="Select grades you are willing to teach"
                        items={[
                        { id: '1', text: 'Grade I' },
                        { id: '2', text: 'Grade II' },
                        { id: '3', text: 'Grade III' },
                        { id: '4', text: 'Grade IV'},
                        { id: '5', text: 'Grade V' },
                        { id: '6', text: 'Grade VI' },
                        { id: '7', text: 'Grade VII' },
                        { id: '8', text: 'Grade VIII'},
                        { id: '9', text: 'Grade IX' },
                        { id: '10', text: 'Grade X' },
                        ]}
                        name="grade"
                    />
                    {/if}
                    

                    {#if showBoardSelect}
                        
                    <MultiSelect
                        titleText="Education Board"
                        label="Select education board you are acquainted with"
                        items={[
                        { id: '1', text: 'Pearson Edexcel' },
                        { id: '2', text: 'Cambridge' },
                        ]}
                        name="board"
                    />
                    {/if}

                    <MultiSelect
                        titleText="Subjects"
                        label="Select subjects you will teach"
                        items={subjects}    
                        name="subjects"                    
                    />

            {/if}
            {#if showOtherSkillsSelect}
                <ComboBox
                titleText="Skills you are experienced in. (If you have more, please post another separate ad)"
                placeholder="Select the skill that will be displayed in your ad"
                items={[
                    { id: "0", text: "Photography" },
                    { id: "1", text: "Music" },
                    { id: "2", text: "Programming" },
                    { id: "3", text: "Cooking" },
                    { id: "4", text: "Dancing" },
                    { id: "5", text: "Language" },
                    { id: "6", text: "Other, specify..."}
                ]}
                on:select={otherDescriptionShow}
                on:clear={otherDescriptionHide}
                name="skill"
                />
                {#if showOtherSkillsDescription}
                    <TextInput name='skillsDescription' labelText="Specify the skill you will teach" placeholder="Enter skill description..." required />
                {/if}

                {#if showMusicSelect}
                    <MultiSelect
                    titleText="Instruments you are proficient in:"
                    label="Select all instruments that apply:"
                    items={[
                        { id: "0", text: "Guitar" },
                        { id: "1", text: "Piano" },
                        { id: "2", text: "Violin" },
                        { id: "3", text: "Drums" },
                        { id: "4", text: "Flute" },
                        { id: "5", text: "Saxophone" },
                    ]}
                    name="instruments"
                    />
                {/if}

                {#if showProgrammingSelect}
                    <MultiSelect
                    titleText="Field of programming you are proficient in:"
                    label="Select all that apply:"
                    items={[
                        { id: "0", text: "Low level languages, C, C++, Rust" },
                        { id: "1", text: "High level languages, Python, Java" },
                        { id: "2", text: "Front End Web Development, HTML, CSS, JS" },
                        { id: "3", text: "Back End Web Development, PHP, NodeJS" },
                        { id: "4", text: "Frameworks, React, Agular" },
                        { id: "5", text: "Competitive Programming, Algorithms" },

                    ]}
                    name="programming"
                    />
                {/if}
                {#if showLanguageSelect}
                    <MultiSelect
                    titleText="Languages you are proficient in:"
                    label="Select all that apply:"
                    items={[
                        { id: "0", text: "English" },
                        { id: "1", text: "Bangla" },
                        { id: "2", text: "Hindi" },
                        { id: "3", text: "Arabic" },
                        { id: "4", text: "Spanish" },
                        { id: "5", text: "German" },
                        { id: "6", text: "French" },
                        { id: "7", text: "Chinese" },
                        
                        
                    ]}
                    name="languages"
                    />
                {/if}  


            {/if}
            {#if showSpecialSelect}
                <MultiSelect
                titleText="What disabilities are you able to work with?"
                label="Pick all that apply."
                items={[
                    { id: "0", text: "Learning disabilities" },
                    { id: "1", text: "Emotional and behavioural disorders" },
                    { id: "2", text: "Austism" },
                    { id: "3", text: "Hearing impairment" },
                    { id: "4", text: "Visual impairment" },
                    { id: "5", text: "Physical disabilities" },
                    { id: "6", text: "Speech and language disorders" },
                    { id: "7", text: "Intellectual disabilities" },
                ]}
                name="disabilities"
                />
            {/if}


            <Button kind="secondary" type="submit">Post Ad</Button>
        </Form>
        


    </div>
</div>