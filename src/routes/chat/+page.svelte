<script lang="ts">
	import Chatbox from '../../components/Chatbox.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	//logged in user's object
	const user1 = {
		id: data.user.userId,
		name: data.user.username,
		email: data.user.email
		// photoUrl: 'henry.jpeg',
		// welcomeMessage: 'Hello!',
		// role: 'default'
	};

	//fetching another user from authuser table
	async function fetchOneUser() {
		const otherUser = await prisma.authUser.findUnique({
			where: {
				id: 'xjsNrNJ06w3QMaI'
			}
		});

		const user2 = {
			id: otherUser?.id,
			name: otherUser?.name,
			email: otherUser?.email
			// photoUrl: 'jessica.jpeg',
			// welcomeMessage: 'Hello!',
			// role: 'default'
		};

        return user2;
	};

    const user2 = await fetchOneUser();
    
</script>

<section class="container">
	<h2>Chat box</h2>

	<Chatbox {user1} {user2} />
</section>

<style>
	.container {
		display: grid;
		justify-content: center;
		text-align: center;
	}
</style>
