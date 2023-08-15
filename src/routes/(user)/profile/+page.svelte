<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import AdModal from '../../../components/AdModal.svelte';

	export let data: PageData;
	//$: ({ auth_user } = data)
	let institutes = data.institute;

	async function updateName(e: any) {
		//idk how to do this.
		let name = e.target.value;
		let res = await fetch(`?/updateName&name=${name}`);
		let data = await res.json();
		console.log(data);
	}
</script>

<div class="profile-container">
	<div class="profile-section">
		<h1 class="text-4xl font-bold text-center text-primary-500">
			@{data.user?.username}'s Page
		</h1>
		<div class="profile-avatar-container"> <!-- New container div -->
			<Avatar src="invalid-image.jpg" initials="AB" class="profile-avatar" />
		</div>
	</div>

	<div class="profile-section-detail">
		<!-- Profile details -->
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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Profile section */
.profile-section {
  flex: 0 0 calc(50% - 1rem); /* Medium-sized box */
  padding: 2rem;
  background: linear-gradient(to bottom right, #9C27B0, #673AB7); /* Purple gradient */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 8px;
  margin-right: 1rem;
}

.profile-avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.profile-section-detail {
  flex: 0 0 calc(50% - 1rem); /* Medium-sized box */
  padding: 2rem;
  background: linear-gradient(to bottom right, #9575CD, #673AB7); /* Purple gradient */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Profile details */
.profile-detail {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
}

.detail-label {
  font-weight: bold;
  color: #666666;
}

/* Edit button */
.edit-button {
  text-align: center;
  margin-top: 2rem;
}

.edit-button button {
  padding: 0.5rem 1rem;
  background-color: #3490dc;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button button:hover {
  background-color: #2779bd;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
  }
  
  .profile-section, .profile-section-detail {
    flex: 1; /* Take up full width on smaller screens */
    margin: 1rem;
  }
}
</style>