<script lang="ts">
    import Talk from 'talkjs';
	import { onMount } from 'svelte';

    export let chatdata;

    let inboxEl;

    onMount(async () => {

        let currentUserId = 0;

        // ad creator
        // let adCreatorObj = {
		// 	id: chatdata[3].id,
		// 	name: chatdata[3].name,
		// 	email: chatdata[3].email,
		// 	welcomeMessage: 'Welcome students!',
		// }

        // students
        const chatUsers = [];
		for (let i = 3; i < chatdata.length; i++) {
            let userObj = {
                id: chatdata[i].id,
                name: chatdata[i].name,
                email: chatdata[i].email,
                welcomeMessage: 'Hello everyone!',
            }
            const chatUser = new Talk.User(userObj);
            if(chatdata[i].id == chatdata[2]) {
                currentUserId = i-3;
            }
            chatUsers.push(chatUser);
        }

		const session = new Talk.Session({
			appId: 'tcaoDSc4',
			me: chatUsers[currentUserId],
		});

        console.log(chatUsers[currentUserId]);
		// Course group conversation
		const group_conversation = session.getOrCreateConversation(chatdata[0].toString());
		// group_conversation.setParticipant(currentUser);

        // One on one conversation with each student and the teacher
        // const oneOnOneConversation = [];
        // for (let i=4; i < chatdata.length; i++) {
        //     oneOnOneConversation.push(session.getOrCreateConversation(chatdata[2].id+chatdata[i].id));
        //     oneOnOneConversation[i-4].setParticipant(currentUser);
        //     oneOnOneConversation[i-4].setParticipant(otherUsers[i-4]);
        // }
        // const dummy_conversation = session.getOrCreateConversation(chatdata[2].id+chatdata[3].id);
        // dummy_conversation.setParticipant(currentUser);
        // dummy_conversation.setParticipant(otherUsers[0]);
        
		for (let i = 0; i < chatUsers.length; i++) {
            group_conversation.setParticipant(chatUsers[i]);
        }

        group_conversation.setAttributes({
            photoUrl: "https://picsum.photos/300",
            subject: chatdata[1]
        });
		// After creating the conversation
		//const chatbox = session.createChatbox();
        const inbox = session.createInbox();
		inbox.select(group_conversation);
		// inbox.select(dummy_conversation);
		// @ts-ignore
		inbox.mount(inboxEl);
    });
    
    //inbox.mount(document.getElementById('inbox-container'));
</script>

<div bind:this={inboxEl} class="h-4/5 mt-2 w-full"></div>



<!-- <section class="card">
    <div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr]">
        
        <div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
            
            <header class="border-b border-surface-500/30 p-4">
                <input class="input" type="search" placeholder="Search..." />
            </header>
            
            <div class="p-4 space-y-4 overflow-y-auto">
                <small class="opacity-50">Contacts</small>
                <ListBox active="variant-filled-primary">
                    {#each data.app_users as person}
                        <ListBoxItem bind:group={currentPerson} name="people" value={person}>
                            <svelte:fragment slot="lead">
                                <Avatar src="https://i.pravatar.cc/?img={person.avatar}" width="w-8" />
                            </svelte:fragment>
                            {person.name}
                        </ListBoxItem>
                    {/each}
                </ListBox>
            </div>
            
            <footer class="border-t border-surface-500/30 p-4">(footer)</footer>
        </div>
        
        <div class="grid grid-row-[1fr_auto]">
            
            <section bind:this={elemChat} class="max-h-[500px] p-4 overflow-y-auto space-y-4">
                {#each messageFeed as bubble}
                    {#if bubble.host === true}
                        <div class="grid grid-cols-[auto_1fr] gap-2">
                            <Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
                            <div class="card p-4 variant-soft rounded-tl-none space-y-2">
                                <header class="flex justify-between items-center">
                                    <p class="font-bold">{bubble.name}</p>
                                    <small class="opacity-50">{bubble.timestamp}</small>
                                </header>
                                <p>{bubble.message}</p>
                            </div>
                        </div>
                    {:else}
                        <div class="grid grid-cols-[1fr_auto] gap-2">
                            <div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
                                <header class="flex justify-between items-center">
                                    <p class="font-bold">{bubble.name}</p>
                                    <small class="opacity-50">{bubble.timestamp}</small>
                                </header>
                                <p>{bubble.message}</p>
                            </div>
                            <Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
                        </div>
                    {/if}
                {/each}
            </section>
            
            <section class="border-t border-surface-500/30 p-4">
                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
                    <button class="input-group-shim">+</button>
                    <textarea
                        bind:value={currentMessage}
                        class="bg-transparent border-0 ring-0"
                        name="prompt"
                        id="prompt"
                        placeholder="Write a message..."
                        rows="1"
                        on:keydown={onPromptKeydown}
                    />
                    <button class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'} on:click={addMessage}>
                        <i class="fa-solid fa-paper-plane" />
                    </button>
                </div>
            </section>
        </div>
    </div>
</section> -->