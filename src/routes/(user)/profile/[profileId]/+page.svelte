<script lang="ts">
    import { each } from 'svelte/internal';
import type { PageData } from './$types';
    export let data: PageData;
</script>

<div class="profile_theme relative">
    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile image" class="absolute -bottom-10 left-24 rounded-full w-28"/>
</div>

<div class="mt-24 flex justify-center items-center gap-3">
    <div class="mx-1 p-4 shadow-[0px_1px_20px_0.5px_#00000024] rounded-md basis-1/5">
        <h1>Basic Information</h1>
        <p>Email: {data.user?.email}</p>
        <!-- <p>Phone: {data.user?.phone}</p> -->
        <p>Phone: {data.user?.phone ? data.user.phone:"N/A"}</p>
        <p>Study: {data.user?.institute ? data.user.institute.name:""}</p>

    </div>
    <div class="mx-3 p-4 shadow-[0px_1px_20px_0.5px_#00000024] basis-3/5">
        <h1>{data.user?.name}</h1>
        <p>{data.user?.bio ? data.user.bio:""}</p>
        <p>Total ad: {data.user?.ads ? data.user.ads.length:""}</p>
        <span class="course_details">Course Details</span>
        {#each data.user?.ads as adOfUser}
            <p class="titleOfCourse">{adOfUser.title ? adOfUser.title:"Course"}</p>  
        {/each} 
        <p>Credentials : {data.user?.credentials }</p>
        <p>Location: {data.user?.location ? data.user.location:"N/A"}</p>
        <p>Joining date: {data.user?.lastLogin.toISOString().split("T")[0]}</p>

    </div>
    
</div>
<!-- <div class="mx-3 p-4 shadow-[0px_1px_20px_0.5px_#00000024] basis-3/5">
    <h2>Course details</h2>
    
</div> -->

<style>
    .profile_theme {
        width: 100%;
        height: 240px;
        background-color: #000;
    }
    .course_details{
        font-weight: 600;
        font-size: 1rem;
    }
    .titleOfCourse{
        margin-left: 1rem;
    }
</style>