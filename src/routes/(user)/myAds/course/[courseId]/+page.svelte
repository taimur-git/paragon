<script lang="ts">
	import Calender from '../../../../../components/Calender.svelte';
    import GeneralCourseInfo from '../../../../../components/GeneralCourseInfo.svelte';
    import Tabs from '../../../../../components/Tabs.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    let items = ['General', 'Schedule', 'Chat'];
	let activeItem = items[0];

    const tabChange = (event) => {
		activeItem = event.detail;
	}

    const classEvents = data.classEvent;
    console.log(classEvents);

</script>

<div class="course_theme">
    <Tabs {activeItem} {items} on:tabChange={tabChange}/>
</div>

{#if activeItem === 'General'}
    <GeneralCourseInfo {data}/>
{:else if activeItem === 'Schedule'}
    <Calender classevents={classEvents}/>
{:else if activeItem === 'Chat'}
    <h1>Chat</h1>
{/if}