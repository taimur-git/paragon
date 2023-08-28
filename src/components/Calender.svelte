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

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>