<script>
	import Talk from 'talkjs';
	import { onMount } from 'svelte';

    let chatboxEl;
	onMount(async () => {
		await Talk.ready;

		// Create users here
		// After `await Talk.ready`

        const currentUser = new Talk.User({
			id: '1',
			name: 'Henry Mill',
			email: 'henrymill@example.com',
			photoUrl: 'henry.jpeg',
			welcomeMessage: 'Hello!',
			role: 'default'
		});

		const otherUser = new Talk.User({
			id: '2',
			name: 'Jessica Wells',
			email: 'jessicawells@example.com',
			photoUrl: 'jessica.jpeg',
			welcomeMessage: 'Hello!',
			role: 'default'
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
		chatbox.mount(this.chatboxEl);
		
		
	});

	
</script>

<div class="container">
	<div bind:this={chatboxEl}/>
</div>

    
<!-- <style>
.container {
    display: grid;

    padding: 2em;
    gap: 1em;

    height: 100%;
    box-sizing: border-box;
}
</style> -->
