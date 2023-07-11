<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	//$: ({ auth_user } = data)
</script>

<h1>Profile</h1>
<div>
	<p>User id: {data.user}</p>
	<p>User id: {data.user.userId}</p>
	<p>Username: {data.user.username}</p>
</div>