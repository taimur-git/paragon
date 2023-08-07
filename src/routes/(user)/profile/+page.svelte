<script lang="ts">
	import { Avatar } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";

	export let data: PageData;
	//$: ({ auth_user } = data)
	let institutes = data.institute;

	async function updateName(e: any) {
		//idk how to do this.
		let name = e.target.value;
		let res = await fetch(`?/updateName&name=${name}`);
		let data = await res.json();
		console.log(data);
	}
</script>


<div class='m-10 md:m-4 p-1 md:p-2'>
	<h1>@{data.user?.username}'s Page</h1>
	<Avatar src="invalid-image.jpg" 
	initials="AB" 
	border="border-4 border-surface-300-600-token hover:!border-primary-500"
	cursor="cursor-pointer"/>
	<p>Email: {data.user?.email}</p>
	<p>Date Joined: {data.user?.dateJoined}</p>

	<p>Full Name: {data.user?.name}</p>
	<!--input value="{data.user?.name}"  type="text" on:blur={updateName}/-->
	<p>Bio: {data.user?.bio}</p>
	<p>Phone Number: {data.user?.phone}</p>
	<p>University: {data.user?.institute?.name}</p>

	<!--This should go to the edit page.-->
	<select>
		{#each institutes as institute}
		<option value={institute.id}>{institute.name}</option>
		{/each}
	</select>

<a href="/edit">Edit</a>


</div>