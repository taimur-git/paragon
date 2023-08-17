<script>
	import Calender from "../../../components/Calender.svelte";
</script>

<h1>My Schedule</h1>
<!-- view a monthly calender -->
<div class="schedule">
    <Calender />
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