<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<div class="profile_theme relative">
    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile image" class="absolute -bottom-10 left-24 rounded-full w-28"/>
</div>

<div class="mt-24 flex justify-center items-center gap-3">
    <div class="mx-1 p-4 shadow-[0px_1px_20px_0.5px_#00000024] rounded-md basis-1/5">
        <h1>Basic Information</h1>
        <p>email: {data.user?.email}</p>
        <p>phone: {data.user?.phone}</p>
    </div>
    <div class="mx-3 p-4 shadow-[0px_1px_20px_0.5px_#00000024] basis-3/5">
        <h1>{data.user?.name}</h1>
        <p>{data.user?.bio}</p>
    </div>
    
</div>

<style>
    .profile_theme {
        width: 100%;
        height: 240px;
        background-color: #000;
    }
</style>