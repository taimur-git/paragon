<script lang='ts'>
// @ts-nocheck
    import { enhance } from "$app/forms";
    import type { PageData } from './$types'
	import { AppBar } from "@skeletonlabs/skeleton";
    import logo from '$lib/images/logo.svg';
    export let data:PageData;
</script>



<AppBar>
	<svelte:fragment slot="lead"><a href="/"><img src={logo} alt="Chosma" /></a></svelte:fragment>
	
	<svelte:fragment slot="trail">
        <form method="POST">
            {#if data.user}
            
            <a href="/profile">{data.user.username}</a>
            <!--form use:enhance  method="post">
                <input type="submit" value="Sign out" />
            </form-->
            <button formaction="/logout" type="submit" class="brutal-link">Log Out</button>
            {:else}
                <a href="/register">Register</a>
                <a href="/login">Log In</a>
            {/if}
        </form>
        
        
    </svelte:fragment>
</AppBar>
