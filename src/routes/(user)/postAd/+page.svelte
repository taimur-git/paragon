
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

  import { onMount, setContext } from "svelte";
  //let selectedEducationLevel: number;
let salaryPlan = "negotiable";
let teachingPlan = "both";

  let showSalaryInput: boolean = false;
  function handleSalaryInput(event: { detail: { selectedId: string; }; }){
        //console.log(event.detail);
        salaryPlan = event.detail;
        showSalaryInput = event.detail != "negotiable";
        
    }
  let inputChip = '';
  let inputChipList: string[] = []; //grab from backend
  let idList: number[] = [];
  function onInputChipSelect(event: any): void {
		//console.log('onInputChipSelect', event.detail);
		if (inputChipList.includes(event.detail.value) === false) {
			inputChipList = [...inputChipList, event.detail.value];
            idList = [...idList, event.detail.idValue];
			inputChip = '';
		}
	}

  export let data: PageData;
  let id = data.user.user.userId;
  let tagOptions: AutocompleteOption[] = data.tagOptions;//data;
 // console.log(data);

</script>


<div class="flex justify-center">
    <div class="w-full sm:w-3/5 md:w-1/3 ">
        <h1 class="text-2xl font-bold mb-2.5">Post Your Ad</h1>

        <h1 class="text-lg font-normal mb-4">It is recommended to finish your <a href='/profile'>Profile</a> before posting an ad.</h1>

        <Form method="POST" >
<!-- 
  expectedSalary Int? //per week or per month or negotiable
  salaryType String? //per week or per month  or negotiable
-->
            <RadioButtonGroup legendText="Expected salary plan" selected="negotiable" 
            on:change={handleSalaryInput} name="salaryPlan"
            >
                <RadioButton labelText="BDT/Week" value="weekly" />
                <RadioButton labelText="BDT/Month" value="monthly" />
                <RadioButton labelText="Negotiable" value="negotiable" />
            </RadioButtonGroup>
            <input type="hidden" name="salaryType" value={salaryPlan} />
            {#if showSalaryInput}

                <NumberInput light label="Expected salary in BDT"
                min={0}
                invalidText="Salary cannot be lower than 0" 
                value={0} name="salary"/>
            {/if}


            <RadioButtonGroup legendText="How are you able to teach?" selected="both" 
             name="teachingPlan" on:change={e => teachingPlan = e.detail.value}
            >
                <RadioButton labelText="Online" value="online" />
                <RadioButton labelText="Offline" value="offline" />
                <RadioButton labelText="Both" value="both" />
            </RadioButtonGroup>
            <input type="hidden" name="teachingType" value={teachingPlan} />

            <textarea class="textarea" name="description" rows="4" placeholder="Enter a description for your ad (optional)." />


            <p>Input the Tags you wish to put in your ad.</p>
            <p class='italic text-xs'>It is recommended to not mix up different ads with each other, if needed please post more than one ad.</p>
            
            
            <InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" />
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

            <input type = "hidden" name="userid" value="{id}" />

					
            <Button kind="secondary" type="submit">Post Ad</Button>
        </Form>
        


    </div>
</div>