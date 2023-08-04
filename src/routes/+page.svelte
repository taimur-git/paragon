<script lang='ts'>

	import teacher from '$lib/images/teacher.svg';
	import { Button, ButtonSet, ImageLoader, InlineLoading, Link } from 'carbon-components-svelte';
	//import PostAd from '../components/PostAd.svelte';

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>

	<!--ImageLoader fadeIn class="mx-auto w-1/4 my-8"
	src={teacher}
>
  <svelte:fragment slot="loading">
    <InlineLoading />
  </svelte:fragment>
  <svelte:fragment slot="error">An error occurred.</svelte:fragment>
</ImageLoader -->

    <img src={teacher} alt="Teacher" class="mx-auto w-1/4 my-8" />

	<h1>A site where students find teachers, and teachers find students.</h1>

	
	<ButtonSet>
		<Button href="/listings"  kind="secondary">
			Search Teachers
		</Button>
		<Button href="/post-ad" kind="secondary">	
			Post an Ad
		</Button>
	  </ButtonSet>
	
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
		