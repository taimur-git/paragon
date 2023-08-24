<script lang="ts">
	import { Autocomplete, FileDropzone, InputChip } from '@skeletonlabs/skeleton';
	import {
		Form,
		TextInput,
		Button,
		MultiSelect,
		ComboBox,
		NumberInput,
		RadioButtonGroup,
		RadioButton
	} from 'carbon-components-svelte';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import theme_demo_pic from '$lib/images/course_theme_demo.jpg';
	import { onMount, setContext } from 'svelte';
	//let selectedEducationLevel: number;
	let salaryPlan = 'negotiable';
	let teachingPlan = 'both';

	let showSalaryInput: boolean = false;
	function handleSalaryInput(event: { detail: { selectedId: string } }) {
		//console.log(event.detail);
		salaryPlan = event.detail;
		showSalaryInput = event.detail != 'negotiable';
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
	let tagOptions: AutocompleteOption[] = data.tagOptions; //data;
	// console.log(data);
	let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
	// let weekDays = ['0', '1', '2', '3', '4', '5', '6'];

	let hide_tags: boolean = true;

	function hideTags() {
		hide_tags = true;
	}
	function showTags() {
		hide_tags = false;
	}

	let selectedFile = null;
	let previewUrl = null;
	let hide_uploadZone = false;
	let files: FileList;
  	const handleFileChange = (event) => {
		console.log(files[0]);
		selectedFile = files[0];
		hide_uploadZone = true;
		previewUrl = URL.createObjectURL(selectedFile);
  	};

	const removeImg = () => {
		URL.revokeObjectURL(previewUrl); // Revoke the object URL to free up memory
		selectedFile = null;
		hide_uploadZone = false;
	}

</script>


<h1 id="edit_title">Post Ad</h1>
<Form method="POST">
	<div class="ad_info">
		<!-- <div class="w-3/5 h-4/5">
			<label for="theme">Theme:</label>
			<div class:hidden={hide_uploadZone}>
				<FileDropzone name="files" on:change={handleFileChange} bind:files={files}>
					<svelte:fragment slot="lead">
						<svg xmlns="http://www.w3.org/2000/svg" class="mx-auto" width="36px" height="36px" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"/></svg>
					</svelte:fragment>
					<svelte:fragment slot="message">Upload a theme image</svelte:fragment>
					<svelte:fragment slot="meta">jpg/svg/png</svelte:fragment>
				</FileDropzone>
			</div>
			
		
			{#if selectedFile}
				<div class="image_container">
					<img src={previewUrl} alt="Uploaded Image" id="course_theme_img"/>
					<button class="btn-icon btn-icon-sm variant-filled-error absolute -top-1.5 -right-1.5" on:click={removeImg}>X</button>
				</div>
				
			{/if}
		</div> -->
		
		<label for="title">Title:</label>
		<input type="text" name="title" id="title" class="input" placeholder="Enter a title">
		
		<label for="description">Description:</label>
		<textarea
		class="textarea"
		name="description"
		rows="4"
		placeholder="Enter a description for your ad (optional)."
		/>
		
		<label for="tags">Tags:</label>
		<InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" on:focus={hideTags} 
		on:input={showTags}/>
		<input type="hidden" name="tags" value={inputChipList} />
		<input type="hidden" name="tagIds" value={idList} />
		<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" class:hidden={hide_tags} tabindex="-1">
			<Autocomplete
				bind:input={inputChip}
				options={tagOptions}
				denylist={inputChipList}
				on:selection={onInputChipSelect}
				
			/>
		</div>
		
		<div class="salary_info">
			<p>Expected salary plan:</p>
			<RadioButtonGroup
				selected={data.salaryType}
				on:change={handleSalaryInput}
				name="salaryPlan"
			>
				<RadioButton labelText="BDT/Week" value="weekly" />
				<RadioButton labelText="BDT/Month" value="monthly" />
				<RadioButton labelText="Negotiable" value="negotiable" />
			</RadioButtonGroup>
			<input type="hidden" name="salaryType" value={salaryPlan} />
			{#if showSalaryInput || data.salaryType === 'weekly' || data.salaryType === 'monthly'}
				<NumberInput
					light
					label="Expected salary in BDT"
					min={0}
					invalidText="Salary cannot be lower than 0"
					value={data.salary}
					name="salary"
				/>
			{/if}
		</div>
		<div class="classMode_info">
			<p>How would you like to teach?</p>
			<RadioButtonGroup
				selected={data.teachingType}
				on:change={(e) => (teachingPlan = e.detail.value)}
				name="teachingPlan"
			>
				<RadioButton labelText="Online" value="online" />
				<RadioButton labelText="Offline" value="offline" />
				<RadioButton labelText="Both" value="both" />
			</RadioButtonGroup>
			<input type="hidden" name="teachingType" value={teachingPlan} />
		</div>
		
		<div class="workDays_info">
			<p>Select days you want to take the class:</p>
			<div class="flex gap-1">
				{#each weekDays as day}
					<input type="checkbox" id={day} name="workDays[]" value={weekDays.indexOf(day)}>
					<label class="checkboxLabel" for={day}>{day}</label>
				{/each}
			</div>
		</div>
		<div class="classTime_info">
			<p>Set the class time:</p>
			<div class="flex gap-1 items-center justify-center">
				<label class="my-auto" for="startTime">start:</label>
				<input type="time" name="startTime" id="startTime" value={data.startTime}>
		
				<label class="my-auto" for="endTime">end:</label>
				<input type="time" name="endTime" id="endTime" value={data.endTime}>
			</div>
		</div>
		<input type="hidden" name="userid" value={id} />
		
		<div class="postBtn">
			<button class="btn btn-lg variant-filled-primary mx-4 w-50 " type="submit">Post Ad</button>
		</div>
	</div>
</Form>

<!-- <div class="ad_info">
	<div class="general_info">
		<div class="title_info">
			
		</div>
		<div class="description_info">
			
		</div>
		<div class="tag_info">
			
		</div>
	</div>
	<div class="class_info">
		<div class="salary_classMode_info">
			
		</div>
		<div class="classTime_info">
			
		</div>
	</div>
</div> -->


<!-- <div class="flex justify-center">
	<div class="w-full sm:w-3/5 md:w-1/3">
		<h1 class="text-2xl font-bold mb-2.5">Post Your Ad</h1>

		<h1 class="text-lg font-normal mb-4">
			It is recommended to finish your <a href="/profile">Profile</a> before posting an ad.
		</h1>

		<Form method="POST">
			
			<RadioButtonGroup
				legendText="Expected salary plan"
				selected="negotiable"
				on:change={handleSalaryInput}
				name="salaryPlan"
			>
				<RadioButton labelText="BDT/Week" value="weekly" />
				<RadioButton labelText="BDT/Month" value="monthly" />
				<RadioButton labelText="Negotiable" value="negotiable" />
			</RadioButtonGroup>
			<input type="hidden" name="salaryType" value={salaryPlan} />
			{#if showSalaryInput}
				<NumberInput
					light
					label="Expected salary in BDT"
					min={0}
					invalidText="Salary cannot be lower than 0"
					value={0}
					name="salary"
				/>
			{/if}

			<RadioButtonGroup
				legendText="How are you able to teach?"
				selected="both"
				name="teachingPlan"
				on:change={(e) => (teachingPlan = e.detail.value)}
			>
				<RadioButton labelText="Online" value="online" />
				<RadioButton labelText="Offline" value="offline" />
				<RadioButton labelText="Both" value="both" />
			</RadioButtonGroup>
			<input type="hidden" name="teachingType" value={teachingPlan} />

			<p>Select days you want to take the class:</p>
            <div class="flex gap-1">
                {#each weekDays as day}
                    <input type="checkbox" id={day} name="workDays[]" value={weekDays.indexOf(day)}>
                    <label class="checkboxLabel" for={day}>{day}</label>
                {/each}
            </div>
            
			<p>Set the class time:</p>
			<div class="flex gap-1">
				<label for="startTime">start:</label>
				<input type="time" name="startTime" id="startTime">

				<label for="endTime">end:</label>
				<input type="time" name="endTime" id="endTime">
			</div>
			<textarea
				class="textarea"
				name="description"
				rows="4"
				placeholder="Enter a description for your ad (optional)."
			/>

			<p>Input the Tags you wish to put in your ad.</p>
			<p class="italic text-xs">
				It is recommended to not mix up different ads with each other, if needed please post more
				than one ad.
			</p>

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

			<input type="hidden" name="userid" value={id} />

			<Button kind="secondary" type="submit">Post Ad</Button>
		</Form>
	</div>
</div> -->

<style>
    .checkboxLabel {
		display: inline-block;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		border-radius: 50px; /* Make it round */
		padding: 10px 20px;
		margin: 5px;
		cursor: pointer;
    }
        
    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"]:checked + .checkboxLabel {
        background-color: #390957;
        color: white;
        border-color: #390957;
    }

	input[type="time"]  {
		background-color: #E7E8FF;
		border-radius: 5px;
	}

	/* .theme_box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70%;
		height: 350px;
		background-color: #f9f8f8;
		border-radius: 5px;
	}

	.theme_btn {
		position: absolute;
		bottom: 1.5em;
		right: 7.5em;	
	} */

	/* #theme_btn:hover {
		background-color: #ab9be6;
	} */

	#course_theme_img {
		width: 400px;
		/* height: 60%; */
		object-fit: cover;
		border-radius: 10px;
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
		margin-left: auto;
		margin-right: auto;
	}

	#edit_title {
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		margin: 1rem 1rem;
		border-bottom: 1px solid #a18cad;
		padding-bottom: .5rem;
	}

	.ad_info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		align-items: flex-start;
		width: 50%;
		margin-left: auto;
		margin-right: auto;
	}

	.ad_info > label {
		margin-bottom: .5em;
		margin-top: .9em;
	}
	/* .general_info {
		display: flex;
		flex-direction: column;
		width: 50%;
		border-right: 1px solid #a18cad;
		padding: .5em 1em;
	}

	.class_info {
		width: 50%;
		padding: .5em 1em;
	}

	.class_info > * {
		margin-bottom: 1em;
	} */

	.classMode_info {
		/* border-bottom: 1px solid #a18cad; */
		padding-bottom: .5em;
	}

	.image_container {
		position: relative;
		display: inline-block;
	}

	.postBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1em;
	}

	label {
		font-weight: semi-bold;
		font-size: large;
		margin-bottom: 1em;
	}

	.classTime_info > p {
		padding-bottom: 1em;
	}
</style>