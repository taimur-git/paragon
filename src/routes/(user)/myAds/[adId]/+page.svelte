<script lang="ts">
	import { Autocomplete, InputChip } from "@skeletonlabs/skeleton";
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
  import type { AutocompleteOption } from '@skeletonlabs/skeleton';
  import type { PageData } from './$types';
  export let data: PageData;
   let id = data.adId;

  // import { onMount, setContext } from "svelte";

  //let selectedEducationLevel: number;
let salaryPlan = data.salaryType;
let teachingPlan = data.teachingType;

// $: ({ ads } = data);

  let showSalaryInput: boolean = false;
  function handleSalaryInput(event: { detail: { selectedId: string; }; }){
        //console.log(event.detail);
        salaryPlan = event.detail;
        showSalaryInput = event.detail != "negotiable";
        
    }
  function handleTeachingPlaneInput(event: { detail: { selectedId: string; }; }){
        //console.log(event.detail);
        teachingPlan = event.detail;
        
    }
  let inputChip = '';
  let inputChipList: string[] = []; //grab from backend
  let idList: number[] = [];
  function onInputChipSelect(event: any): void {
    if (!inputChipList.includes(event.detail.value)) {
        inputChipList = [...inputChipList, event.detail.value];
        idList = [...idList, event.detail.idValue];
        inputChip = '';
    }
}


    // let adId = params.adId;

  // let tagOptions: AutocompleteOption[] = data.tagOptions;//data;
  let tagOptions: AutocompleteOption[] = data.tagOptions.filter(option => !data.tags.includes(option.value));

 // console.log(data);

</script>


<div class="flex justify-center myads_content">
    <div class="w-full sm:w-3/5 md:w-1/3 " id="popup">
        <!-- <h1 class="text-2xl font-bold mb-2.5">Post Your {data.teachingType}</h1> -->

        <!-- <h1 class="text-lg font-normal mb-4">It is recommended to finish your <a href='/profile'>Profile</a> before posting an ad.</h1> -->

        <Form method="POST" >

            <RadioButtonGroup legendText="Expected salary plan"  selected={data.salaryType}
            on:change={handleSalaryInput} name="salaryPlan"
            >
                <RadioButton labelText="BDT/Week" value="weekly" />
                <RadioButton labelText="BDT/Month" value="monthly" />
                <RadioButton labelText="Negotiable" value="negotiable" />
            </RadioButtonGroup>
            <input type="hidden" name="salaryType" value={salaryPlan} />
            {#if showSalaryInput || (data.salaryType === 'weekly' || data.salaryType === 'monthly')}
              <!-- {#if (salaryPlan !== 'negotiable') } -->
                <NumberInput light label="Expected salary in BDT"
                  min={0}
                  invalidText="Salary cannot be lower than 0" 
                  value={data.salary} name="salary"/>
                <!-- {/if} -->
            {/if}


            <RadioButtonGroup legendText="How are you able to teach?" selected={data.teachingType}
            on:change={handleTeachingPlaneInput} name="teachingPlan"
            >
                <RadioButton labelText="Online" value="online" />
                <RadioButton labelText="Offline" value="offline" />
                <RadioButton labelText="Both" value="both" />
            </RadioButtonGroup>
            <input type="hidden" name="teachingType" value={teachingPlan} />

            <textarea class="textarea" name="description" rows="4" value={data.adDescription} placeholder="Enter a description for your ad (optional)." />


            <p>Input the Tags you wish to put in your ad.</p>
            <p class='italic text-xs'>It is recommended to not mix up different ads with each other, if needed please post more than one ad.</p>
            
            
            <InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" />
            {#each data.tags as tag}
              <div class="chip">
                  {tag}
              </div>
          {/each}
            <input type="hidden" name="tags" value={inputChipList} />
            <input type="hidden" name="tagIds" value={idList} />
            <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
                <Autocomplete 
                    bind:input={inputChip}
                    options={tagOptions}
                    denylist={inputChipList}
                    on:selection={onInputChipSelect}
                />
            </div>

            <input type = "hidden" name="ad_Id" value="{id}" />
            <!-- <input type = "hidden" name="userid" value="{adId}" /> -->

					
            <Button kind="secondary" type="submit">Update</Button>
        </Form>
        


    </div>
</div> 

<style>
  .myads_content{
    padding-top: 3rem;
     width: 100vw;
    height: 100vh;
    background: #666666;

  }
  #popup{
    padding: 1rem;
    position: absolute;
    background: #eee;
  }
  #popup:target{
    display: block;

  }
</style>