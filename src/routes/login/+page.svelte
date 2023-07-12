<script>
	import { enhance } from '$app/forms';
	import Card from '../../components/Card.svelte';
</script>

<div class="flex justify-center">
	<div class="w-full sm:w-3/5 md:w-1/3">
		<form method="POST" use:enhance>
			<hgroup>
				<h1 class="text-2xl font-bold mb-2.5">Login</h1>
				<h1 class="text-lg font-normal mb-4">Enter your credentials to login.</h1>
			</hgroup>
			<label for="username">Username</label>
			<input type="text" id="username" name="username" placeholder="Username" required />
			<label for="password">Password</label>
			<input type="password" id="password" name="password" placeholder="Password" required />
			<button type="submit" class="brutal-link">Login</button>
		</form>
		<p>Don't have an account? <a href="/register">Register</a></p>
	</div>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	hgroup {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	label {
		font-size: 1.5rem;
		font-weight: 400;
		margin-bottom: 0.5rem;
	}

	input {
		width: 100%;
		height: 3rem;
		border: 1px solid #ccc;
		padding: 0.5rem;
		font-size: 1.5rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}
</style>
