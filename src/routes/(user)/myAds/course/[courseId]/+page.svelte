<script lang="ts">
	import Calender from '../../../../../components/Calender.svelte';
	import CourseChat from '../../../../../components/CourseChat.svelte';
    import GeneralCourseInfo from '../../../../../components/GeneralCourseInfo.svelte';
    import Tabs from '../../../../../components/Tabs.svelte';
    import type { PageData } from './$types';
    

    export let data: PageData;
    let items = ['General', 'Schedule', 'Chat'];
	let activeItem = items[0];

    const tabChange = (event) => {
		activeItem = event.detail;
	}

    //schedule
    const classEvents = data.classEvent;
    // console.log(classEvents);

    //chat
    const chatdata = data.chatdata;
    console.log(chatdata);
</script>

<div class="course_theme">
    <Tabs {activeItem} {items} on:tabChange={tabChange}/>
</div>

{#if activeItem === 'General'}
    <GeneralCourseInfo data={data}/>
{:else if activeItem === 'Schedule'}
    <Calender classevents={classEvents}/>
{:else if activeItem === 'Chat'}
    <CourseChat chatdata={chatdata}/>
{/if}

<style>
    .course_theme {
        background:linear-gradient(360deg,rgba(0, 0, 0, 0.9), rgba(88, 86, 86, 0.5)), url('$lib/images/course_theme_demo.jpg'), no-repeat;
        background-size: cover;
        background-position: center;
        height: 21vh;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
</style>