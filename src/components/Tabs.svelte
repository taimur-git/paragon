<script>
    import { createEventDispatcher } from 'svelte';
    export let items;
    export let activeItem;

    const dispatch = createEventDispatcher();

</script>

<div class="tabs">
    <ul>
        {#each items as item}
            <li on:click={() => dispatch('tabChange', item)}>
                <div class:active={item === activeItem}>{item}</div>
            </li>
        {/each}
    </ul>
</div>

<style>
    /* .tabs {
        margin-bottom: 40px;
    } */
    ul {
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
    }
    li {
        margin: 0 16px;
        font-size: 18px;
        color: white;
        cursor: pointer;
    }
    .active {
        color: #F2D853;
        border-bottom: 2px solid #F2D853;
        padding-bottom: 8px;
    }
</style>