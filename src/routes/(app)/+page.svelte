<script lang='ts'>
	import mainImg from '$lib/images/landingImg.jpg';
	import { goto } from '$app/navigation';

  	let inputChipList = ""; 
	let searchRes = "";

function handleSearchKey(event) {
	if (event.key === "Enter") {
		display_inputChipList();
	}
}

function display_inputChipList(){
	if(inputChipList.length!==0){
		searchRes=inputChipList;
		goto(`/ads/${searchRes}`);
	}
	else{

	}
}

</script>

<svelte:head>
	<title>Paragone</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="mt-20 flex justify-center items-center gap-8">
	<section class="px-4 mx-auto flex flex-col justify-center items-center max-w-sm">
		<h1 class="heroTitle">Find a tutor tailored to your need.</h1>

		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] searchBar">
			<input class="searchInput"  bind:value={inputChipList} type="search" placeholder="Search..." on:keydown={handleSearchKey}/> 
			<button class="variant-filled-secondary searchBtn"  on:click={display_inputChipList}>Search</button>
		</div>

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
	.searchBar{
    /* margin-bottom: 5px; */
    margin-top: 10px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
  }
  .searchInput{
    width: 100%;
    /* margin-left: 10px; */
    /* margin-right: 10px; */
  }
</style>
		