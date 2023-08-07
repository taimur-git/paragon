<script lang='ts'>

	import teacher from '$lib/images/teacher.svg';
	import { Button, ButtonSet, ImageLoader, InlineLoading, Link } from 'carbon-components-svelte';
	//import PostAd from '../components/PostAd.svelte';

</script>

<svelte:head>
	<title>Home</title>
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

<div class="flex">
	<div class="w-1/2 h-screen pattern">
	  <!-- Content for the left div -->
	  <div class="text-center">
		<h1 class="text-3xl font-bold mb-4">Find a teacher</h1>
		<div class="flex items-center">
		  <input type="text" placeholder="Search for a teacher" class="border p-2 rounded-l-md focus:outline-none">
		  <button class="bg-blue-500 text-white px-4 rounded-r-md">Search</button>
		</div>
		</div>
	</div>
	<div class="w-1/2">
		<img src={teacher} alt="Teacher" class="h-screen object-cover" />
	  <!--img src="your-image-source.jpg" alt="Your Image" class=""-->
	</div>
  </div>
  


<style>
	.pattern {
		background: linear-gradient(45deg , #4494f4 10%,transparent 11%, transparent 89% , #4494f4 90%),linear-gradient(135deg , #4494f4 10%,transparent 11%, transparent 89% , #4494f4 90%),radial-gradient(circle, transparent 25%, #94c6ef  26%),linear-gradient(0deg, transparent 44%, #4494f4 45%, #4494f4 55%, transparent 56%), linear-gradient(90deg, transparent 44%, #4494f4 45%, #4494f4 55%, transparent 56%);
        background-size: 3em 3em;
        background-color: #94c6ef;
        opacity: 1
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}


</style>
		