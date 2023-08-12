<script lang='ts'>
// @ts-nocheck
    import { enhance } from "$app/forms";
    import type { PageData } from './$types'
	import { AppBar, modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
    import logo from '$lib/images/logo.svg';
	import LoginForm from "./LoginForm.svelte";
    export let data:PageData;

    const openLoginModal = () => {
       
        // import MyCustomComponent from '...';

        const modalComponent: ModalComponent = {
            // Pass a reference to your custom component
            ref: LoginForm,
            // Add the component properties as key/value pairs
            props: { background: 'bg-red-500' },
            // Provide a template literal for the default component slot
            slot: '<p>My custom component</p>'
        };
        
        const modal: ModalSettings = {
            type: 'component',
            component: modalComponent,
        }

        modalStore.trigger(modal);
    }
</script>



<AppBar class='bg-transparent'>
	<svelte:fragment slot="lead"><a href="/"><img src={logo} alt="Chosma" /></a></svelte:fragment>
	
	<svelte:fragment slot="trail">
        <!-- <form method="POST"> -->
            {#if data.user}
                <a href="/profile">{data.user.username}</a>
                <button formaction="/logout" type="submit" class="brutal-link">Log Out</button>
            {:else}
                <a href="/register" class="font-medium btn btn-sm variant-filled-secondary">Register</a>
                <button class="font-medium btn btn-sm variant-filled-primary" on:click={()=>openLoginModal()}>Log In</button>
            {/if}
        <!-- </form> -->
        
        
    </svelte:fragment>
</AppBar>
