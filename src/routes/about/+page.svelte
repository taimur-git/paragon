<script lang>
	/*
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	
	import Header from './Header.svelte';
	*/
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
//import type { TableSource } from '@skeletonlabs/skeleton';
/** @type {import('./$types').PageData} */
export let data;

	$: ({ users } = data)
	

	let valueSingle = 'users';
	

</script>



<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<form action='?/createUser' method='POST'>
	<input type='text' name='name'/>
	<input type='text' name='email'/>
	<button type='submit'>Create User</button>
</form>


<!--p>
	{user.name} | {user.email}
</p>
<form action="?/deleteUser&id={user.id}" method="POST">
	<button type="submit">Delete user</button>
</form-->


<ListBox>
	{#each users as user}
	<ListBoxItem bind:group={valueSingle} name="medium" value="{user.id}">
		{user.name} | {user.email}
		<form action="?/deleteUser&id={user.id}" method="POST">
			<button type="submit">Delete user</button>
		</form>
	</ListBoxItem>
	{/each}
</ListBox>


<style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
/*
	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
	*/
</style>
