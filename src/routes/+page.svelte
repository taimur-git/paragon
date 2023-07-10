<script lang='ts'>

	import teacher from '$lib/images/teacher.svg';
	//import PostAd from '../components/PostAd.svelte';

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>

	
    <img src={teacher} alt="Teacher" class="mx-auto w-1/4 my-8" />

	<h1>A site where students find teachers, and teachers find students.</h1>

	<!--PostAd /-->	
	
</section>

<style>
	
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}


</style>
		