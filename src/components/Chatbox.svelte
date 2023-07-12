<script lang="ts">
	import Talk from 'talkjs';
	import { onMount } from 'svelte';
	

   
	export let user1: {
		id: string; 
		name: string;
		email: string;
	};
	export let user2: {
		id: string; 
		name: string;
		email: string;
	};

	 // @ts-ignore
    let chatboxEl;


	onMount(async () => {
		await Talk.ready;

		// Create users here
		// After `await Talk.ready`
		
        const currentUser = new Talk.User({
			id: user1.id,
			name: user1.name,
			email: user1.email
		});

		const otherUser = new Talk.User({
			id: user2.id,
			name: user2.name,
			email: user2.email
		});

		// const thirdUser = new Talk.User({
		// 	id: '3',
		// 	name: 'Anas Ishfaque',
		// 	email: 'anas@example.com',
		// 	photoUrl: 'anas.jpeg',
		// 	welcomeMessage: 'Hi!',
		// 	role: 'default'
		// });
		
		const session = new Talk.Session({
			appId: 'tcaoDSc4',
			me: currentUser
		});

		// After `Talk.ready` and creating users
		const conversationID = Talk.oneOnOneId(currentUser, otherUser);
		const conversation = session.getOrCreateConversation(conversationID);
		conversation.setParticipant(currentUser);
		conversation.setParticipant(otherUser);

		// After creating the conversation
		const chatbox = session.createChatbox();
		chatbox.select(conversation);
		// @ts-ignore
		chatbox.mount(chatboxEl);
		
		
	});
	
</script>

<div class="container">
	<div bind:this={chatboxEl}/>
</div>

    
<style>
.container {
    display: grid;

    padding: 2em;
    gap: 1em;

    height: 500px;
	width: 700px;
    box-sizing: border-box;
}
</style>
