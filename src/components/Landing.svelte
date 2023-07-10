<script>

	import { AppBar } from "@skeletonlabs/skeleton";
    import logo from '$lib/images/logo.svg';
    import teacher from '$lib/images/teacher.svg';
</script>



<AppBar>
	<svelte:fragment slot="lead"><img src={logo} alt="Chosma" /></svelte:fragment>
	
	<svelte:fragment slot="trail">
        <a href="/register">Register</a>
        <a href="/login">Log In</a>
    </svelte:fragment>
</AppBar>
<div class="flex">
    <img src={teacher} alt="Teacher" class="mx-auto w-1/4 my-8" />

    
</div>