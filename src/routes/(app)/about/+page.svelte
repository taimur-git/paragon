<script >
// @ts-nocheck

	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	//import type { PageData } from './$types';
	import { enhance } from '$app/forms';
/** @type {import('./$types').PageData} */
export let data;//: PageData;
	$: ({ users } = data)
	
	let valueSingle = 'users';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<form action='?/createUser' method='POST' use:enhance>
	<input type='text' name='name'/>
	<input type='text' name='email'/>
	<button type='submit'>Create User</button>
</form>

<ListBox>
	{#each users as user}
	<ListBoxItem bind:group={valueSingle} name="medium" value="{user.id}">
		{user.name} | {user.email}
		<form action="?/deleteUser&id={user.id}" method="POST" use:enhance>
			<button type="submit">Delete user</button>
		</form>
	</ListBoxItem>
	{/each}
</ListBox>


<style>

</style>
