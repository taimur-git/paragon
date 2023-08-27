<script lang="ts">
    import { Calendar } from '@fullcalendar/core';
	//import { co, type O } from '@fullcalendar/core/internal-common';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid'; 
	  import { onMount } from 'svelte';
    // @ts-ignore
    let calendarEl;
    
    export let classevents: Object[] = [];

    console.log(classevents);
    onMount(() => {
        // @ts-ignore
        const calendar = new Calendar(calendarEl, {
            plugins: [ dayGridPlugin, timeGridPlugin],
            events: classevents
        });
        calendar.render();
    });
    
</script>

<div class="container">
	<div bind:this={calendarEl} class="fc-day-header fc-widget-header fc-daygrid-day-number"/>
</div>

    
<style>
.container {
    display: grid;

    padding: 2em;
    gap: 1em;
    margin: 0 auto;

    height: 500px;
	width: 900px;
    box-sizing: border-box;
}

.fc-day-header.fc-widget-header {
  color: #500D7A; /* Change to your desired text color */
}

.fc-daygrid-day-number {
  color: #500D7A; /* Change to your desired text color */
}

</style>