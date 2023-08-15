<script lang=ts>
	import { Avatar } from "@skeletonlabs/skeleton";
    //import { Ratings } from '@skeletonlabs/skeleton';
    //import type { PageData } from './$types'
    //export let data:PageData;
</script>

<div class=" block card card-hover p-4 overflow-hidden">
    
        <Avatar src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />

        <h1>
            Tutor Name
        </h1>
        <h2>
            <span class="chip variant-filled">Tutor Subject</span>
        </h2>
        <h3>
            Tutor Rate
        </h3>
        <!--Ratings value={3.5} max={5}>
            <svelte:fragment slot="empty">(icon)</svelte:fragment>
            <svelte:fragment slot="half">(icon)</svelte:fragment>
            <svelte:fragment slot="full">(icon)</svelte:fragment>
        </Ratings-->
    <div class="btn-group variant-filled">
        <button>
            View Details
        </button>
        <button>
            Message
        </button>
        <button>
            Book Now
        </button>
    </div>
</div>

