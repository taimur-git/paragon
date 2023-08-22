<script lang='ts'>

// import { writable } from 'svelte/store';



	//import teacher from '$lib/images/teacher.svg';
	import mainImg from '$lib/images/landingImg.jpg';
	//import { Button, ButtonSet, ImageLoader, InlineLoading, Link } from 'carbon-components-svelte';
	//import PostAd from '../components/PostAd.svelte';



	import { Autocomplete, InputChip } from "@skeletonlabs/skeleton";
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { Button, Form } from 'carbon-components-svelte';

  import { onMount, setContext } from "svelte";
	import { goto } from '$app/navigation';
  //let selectedEducationLevel: number;

//   export const fetchedData = writable(null);

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
//   let id = data.user.user.userId;
  let tagOptions: AutocompleteOption[] = data.tagOptions;//data;
 // console.log(data);


 const handleSearch = async (e: Event) => { 
    e.preventDefault();

    const res = await fetch('/api/searchAd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idList,inputChipList)
    });

	try{
		const data = await res.json();
		console.log(data);
		// if (data.message === 'Success') {
		// 	// goto('/login');
		// 	console.log("Success");
		// }
		goto('/ads');

	}catch(err){
		console.log(err);
	}
    // try{
    //   const data = await res.json();
    //   console.log(data);
    //   if (data.message === 'User created') {
    //     goto('/login');
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

let hide_tags: boolean = true;

	function hideTags() {
		hide_tags = true;
	}
	function showTags() {
		hide_tags = false;
	}

</script>

<svelte:head>
	<title>Paragone</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- <section> -->

	<!--ImageLoader fadeIn class="mx-auto w-1/4 my-8"
	src={teacher}
>
  <svelte:fragment slot="loading">
    <InlineLoading />
  </svelte:fragment>
  <svelte:fragment slot="error">An error occurred.</svelte:fragment>
</ImageLoader -->

    <!-- <img src={teacher} alt="Teacher" class="mx-auto w-1/4 my-8" />

	<h1>A site where students find teachers, and teachers find students.</h1>

	
	<ButtonSet>
		<Button href="/listings"  kind="secondary">
			Search Teachers
		</Button>
		<Button href="/post-ad" kind="secondary">	
			Post an Ad
		</Button>
	  </ButtonSet> -->
	

<!-- </section> -->

<div class="mt-20 flex justify-center items-center gap-8">
	<section class="px-4 mx-auto flex flex-col justify-center items-center max-w-sm">
		<h1 class="heroTitle">Find a tutor tailored to your need.</h1>
		
<!-- <div class="input-group input-group-divider grid-cols-[1fr_auto] ">
	<input type="search" placeholder="Search..." class="p-2"/>
	<button class="px-1 variant-filled-secondary">Search</button>
</div> -->
<!-- <div class="input-group input-group-divider grid-cols-[1fr_auto] "> -->
<!-- <Form  method="POST"> -->
<InputChip bind:input={inputChip} bind:value={inputChipList} name="chips"
 on:focus={hideTags} 
on:input={showTags} 
/>
<!-- <button class="px-1 variant-filled-secondary">Search</button> -->
<!-- </div> -->

<input type="hidden" name="tags" value={inputChipList} />
<input type="hidden" name="tagIds" value={idList} />
<input type="hidden" name="tags" value={inputChipList} />

<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1" class:hidden={hide_tags}>
	<Autocomplete 
		bind:input={inputChip}
		options={tagOptions}
		denylist={inputChipList}
		on:selection={onInputChipSelect}
	/>

</div>

<Button kind="secondary" type="submit" on:click={handleSearch}>Search...</Button>


<!-- </Form> -->



		
	</section>
	<section class="mx-auto ">
		<img src={mainImg} class="BubbleImg --stroke" alt="student and teacher">
	</section>
</div>
  


<style>
	
	.BubbleImg {
		border-radius: 50%;
		width: 580px;
		box-shadow: 
		0 0 0 2.5px #067434,
		0 0 0 5px #09AF4E,
		0 0 0 15px #B1FBD0,
		0 0 0 20px #D8FDE8,
		0 0 0 25px #ECFEF3;
	}
	.heroTitle {
		font-size: 3.5rem;
		font-weight: 900;
		text-align: center;
		margin-bottom: 1em;
	}
	/* section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	} */

</style>
		