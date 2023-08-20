<script lang="ts">
    import { Calendar } from '@fullcalendar/core';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid'; 
	  import { onMount } from 'svelte';
    // @ts-ignore
    let calendarEl;
    export let workDays: number[];
    export let offDays: number[];
    onMount(() => {
        // @ts-ignore
        const calendar = new Calendar(calendarEl, {
            plugins: [ dayGridPlugin, timeGridPlugin],
            events: [
                {
                    title: 'Weekly Meeting',
                    daysOfWeek: workDays, // 0 is Sunday, 1 is Monday, and so on
                    startTime: '10:00:00', // Set your preferred start time
                    endTime: '11:00:00', // Set your preferred end time
                    // Specify the start date for the recurring event
                    startRecur: '2023-08-21' // Adjust the start date accordingly
                },
                {
                    title: 'off day',
                    daysOfWeek: offDays, // 0 is Sunday, 1 is Monday, and so on
                    // startTime: '12:00:00', // Set your preferred start time
                    // endTime: '11:00:00', // Set your preferred end time
                    // Specify the start date for the recurring event
                    startRecur: '2023-08-21',
                    display: 'background'
                }
                // You can add more recurring events here
            ]
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