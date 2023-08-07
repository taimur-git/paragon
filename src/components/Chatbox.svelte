<script>
	import Talk from 'talkjs';
	import { onMount } from 'svelte';

    // @ts-ignore
    let chatboxEl;
	onMount(async () => {
		await Talk.ready;

		// Create users here
		// After `await Talk.ready`

		let user1 = {
			id: '1',
			name: 'Henry Mill',
			email: 'henrymill@example.com',
			photoUrl: 'henry.jpeg',
			welcomeMessage: 'Hello!',
			role: 'default'
		}

        const currentUser = new Talk.User(user1);

		const otherUser = new Talk.User({
			id: '2',
			name: 'Jessica Wells',
			email: 'jessicawells@example.com',
			photoUrl: 'jessica.jpeg',
			welcomeMessage: 'Hello!',
			role: 'default'
		});

		const thirdUser = new Talk.User({
			id: '3',
			name: 'Anas Ishfaque',
			email: 'anas@example.com',
			photoUrl: 'anas.jpeg',
			welcomeMessage: 'Hi!',
			role: 'default'
		});
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
