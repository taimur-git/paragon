<script lang="ts">
	import { Avatar } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";

	export let data: PageData;
	//$: ({ auth_user } = data)
	let institutes = data.institute;

	async function submit() {
		let name = document.getElementById("name").value;
        let bio = document.getElementById("bio").value;
        let phone = document.getElementById("phone").value;
        let university = document.getElementById("university").value;

        
		const res = await fetch("/edit", {
			method: "POST",
			body: JSON.stringify({
				name,
				bio,
				phone,
				university
			}),
		});

		if (res.status === 200) {
			alert("Your information has been updated!");
			window.location.href = "/";
		}
	}
</script>

<div class='m-10 md:m-4 p-1 md:p-2'>
	<h1>Edit Account</h1>
	<Avatar src="invalid-image.jpg" 
	initials="AB" 
	border="border-4 border-surface-300-600-token hover:!border-primary-500"
	cursor="cursor-pointer"/>
	<p>Email: {data.user?.email}</p>
	<p>Date Joined: {data.user?.dateJoined}</p>

	<p>Full Name: <input type="text" id="name" value={data.user?.name} /></p>
	<p>Bio: <input type="text" id="bio" value={data.user?.bio} /></p>
	<p>Phone Number: <input type="text" id="phone" value={data.user?.phone} /></p>
	<p>University: <select id="university">
		{#each institutes as institute}
		<option value={institute.id}>{institute.name}</option>
		{/each}
	</select>
	</p>
	<button on:click={submit}>Submit</button>


</div>