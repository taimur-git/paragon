<script>
	import Calender from "../../../components/Calender.svelte";

    let workDays = [1, 3, 5];
    let offDays = [0, 2, 4, 6];
</script>

<h1>My Schedule</h1>
<!-- view a monthly calender -->
<div class="schedule">
    <Calender workDays={workDays} offDays={offDays}/>
</div>

<style>
    h1 {
        margin-top: 1em;
        text-align: center;
    }
    .schedule {
        display: flex;
        justify-content: center;
    }
</style>