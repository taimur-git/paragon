<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import AdModal from '../../../components/AdModal.svelte';

	export let data: PageData;
	let institutes = data.institute;

	async function updateName(e: any) {

		let name = e.target.value;
		let res = await fetch(`?/updateName&name=${name}`);
		let data = await res.json();
		console.log(data);
	}
</script>

<body>   
<div class="profile-container">
	<div class="profile-section">
		<h1 class="text-4xl font-bold text-center text-primary-500">
			@{data.user?.username}'s Page
		</h1>
		<div class="profile-avatar-container">
			<Avatar src="invalid-image.jpg" initials="AB" class="profile-avatar" />
		</div>
	</div>

	<div class="profile-section-detail">
		<p class="profile-detail mail">
			<span class="detail-label">Email:</span>
			{data.user?.email}
		</p>
		<p class="profile-detail date">
			<span class="detail-label">Date Joined:</span>
			{data.user?.dateJoined}
		</p>
		<p class="profile-detail name">
			<span class="detail-label">Full Name:</span>
			{data.user?.name}
		</p>
		<p class="profile-detail bio">
			<span class="detail-label">Bio:</span>
			{data.user?.bio}
		</p>
		<p class="profile-detail phone">
			<span class="detail-label">Phone Number:</span>
			{data.user?.phone}
		</p>
		<p class="profile-detail uni">
			<span class="detail-label">University:</span>
			{data.user?.institute?.name}
		</p>

		<div class="edit-button">
			<a data-sveltekit-reload href="profile/edit-profile">
				<button>Edit Profile</button>
			</a>
		</div>
	</div>
</div>

</body>




<style>
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}
/* make a good loking profile with purple gradient */
body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #d0b7ff, #eee0ff);
    }
    /* header styling */
    .profile-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background: linear-gradient(to bottom right, #af67e5, #7b3fe5);
        border-radius: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    .profile-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .profile-section h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: #fff;
    }
    .profile-avatar-container {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 1rem;
    }
    .profile-avatar {
        width: 100%;
        height: 100%;
    }
    .profile-section-detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .profile-detail {
        font-size: 1.1rem;
        color: #fff;
        margin-bottom: 0.5rem;
    }
    .profile-detail span {
        font-weight: bold;
    }
    .edit-button {
        margin-top: 1rem;
    }
    .edit-button button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        background-color: #fff;
        color: #7b3fe5;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .edit-button button:hover {
        background-color: #7b3fe5;
        color: #fff;
    }
    .edit-button button:focus {
        outline: none;
    }
    .edit-button button:active {
        transform: scale(0.98);
    }
    @media screen and (max-width: 768px) {
        .profile-container {
            padding: 1.5rem;
        }
        .profile-section h1 {
            font-size: 2rem;
        }
    }
</style>
