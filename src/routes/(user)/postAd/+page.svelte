<script lang="ts">
	import { Autocomplete, InputChip } from '@skeletonlabs/skeleton';
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
	let hide_tags = true;
</script>


	<h1 id="edit_title">Post Ad</h1>
	<Form method="POST">

		<div class="image-container">
			<img src={theme_demo_pic} alt="Image" id="course_theme_img">
			<label for="file-input" class="upload-button variant-filled-surface btn-icon-lg">
			  <input type="file" id="file-input" style="display: none;">
			</label>
		  </div>
		  
	<div class="ad_info">
		<div class="general_info">
			<div class="title_info">
				<label for="title">Title:</label>
				<input type="text" name="title" id="title" class="input" placeholder="Enter a title">
			</div>
			<div class="description_info">
				<label for="description">Description:</label>
				<textarea
				class="textarea"
				name="description"
				rows="4"
				placeholder="Enter a description for your ad (optional)."
			/>
			</div>
			<div class="tag_info">
				<label for="tags">Tags:</label>
				<InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" />
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
			</div>
		</div>
		<div class="class_info">
			<div class="salary_classMode_info">
				<div class="salary_info">
					<RadioButtonGroup
						legendText="Expected salary plan"
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
					<RadioButtonGroup
						legendText="How are you able to teach?"
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
			</div>
			<div class="classTime_info">
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
					<div class="flex gap-1">
						<label for="startTime">start:</label>
						<input type="time" name="startTime" id="startTime" value={data.startTime}>

						<label for="endTime">end:</label>
						<input type="time" name="endTime" id="endTime" value={data.endTime}>
					</div>
				</div>
				<div class="action_btns">
					<button class="btn btn-lg variant-form-material">save</button>
					<button class="btn btn-lg variant-filled-surface">launch🚀</button>
				</div>
			</div>
		</div>
	</div>
</Form>

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

	.theme_box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70%;
		height: 350px;
		/* background-color: #f9f8f8; */
		border-radius: 5px;
	}

	.theme_btn {
		position: absolute;
		bottom: 1.5em;
		right: 7.5em;	
	}

	#theme_btn:hover {
		background-color: #ab9be6;
	}

	#course_theme_img {
		width: 400px;
		/* height: 60%; */
		object-fit: cover;
		border-radius: 10px;
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
		margin-left: auto;
		margin-right: auto;
		/* position: relative; */
	}

	#edit_title {
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		margin: 1rem 0;
		border-bottom: 1px solid #a18cad;
		padding-bottom: .5rem;
	}

	.ad_info {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.general_info {
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

	.classMode_info {
		border-bottom: 1px solid #a18cad;
		padding-bottom: .5em;
	}

	.image-container {
	position: relative;
	display: inline-block;
	width: 100%;
	}

	.upload-button {
	position: absolute;
	bottom: 0;
	right: 30em;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	}

	.upload-button::before {
	content: "\002B"; /* Unicode plus symbol */
	font-size: 20px;
	color: #ffffff;
	}

	
</style>