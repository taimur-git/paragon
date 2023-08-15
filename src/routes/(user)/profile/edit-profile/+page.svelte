<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
  
	let editedData = {
	  name: data.user?.name || '',
	  email: data.user?.email || '',
	  bio: data.user?.bio || '',
	  phone: data.user?.phone || '',
	  uni: data.user?.uni || '',
	
	};
  </script>

<div class="edit-container">
	<h1>Edit Profile</h1>
	<form on:submit={updateProfile}>

		<div class="profile-info">
			<img src={data.user?.image} alt="Profile Photo" class="profile-photo" />
			<h1>{data.user?.username}</h1>
		  </div>

		<label for="photo">Change Photo:</label>
		<input type="file" id="photo" bind:value={editedData.photo} />

		<label for="name">Name:</label>
		<input type="text" id="name" bind:value={editedData.name} />

		<label for="email">Email:</label>
		<input type="email" id="email" bind:value={editedData.email} />

		<label for="bio">Bio:</label>
		<textarea id="bio" bind:value={editedData.bio}></textarea>

		<label for="phone">Phone Number:</label>
		<input type="tel" id="phone" bind:value={editedData.phone} />

		<!-- <label for="uni">University:</label>
		<input type="uni" id="uni" bind:value={editedData.uni} /> -->

		

		<button type="submit">Save Changes</button>
		
		<button type="button" on:click={() => (window.location.href = '/profile')}>Cancel</button>
	</form>
</div>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
}

.edit-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(to bottom right, #af67e5, #7b3fe5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.edit-container h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.edit-container form {
  display: grid;
  gap: 1.5rem;
}

.edit-container label {
  font-size: 1.1rem;
  color: #fff;
}

.edit-container input[type="text"],
.edit-container input[type="email"],
.edit-container input[type="tel"],
.edit-container textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease;
}

.edit-container input[type="text"]:focus,
.edit-container input[type="email"]:focus,
.edit-container input[type="tel"]:focus,
.edit-container textarea:focus {
  border-color: #3490dc;
}

.edit-container textarea {
  resize: vertical;
}

.edit-container button[type="submit"],
.edit-container button[type="button"] {
  padding: 0.8rem 1.2rem;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-container button[type="submit"] {
  background: linear-gradient(to bottom right, #ff6b6b, #f56040);
  margin-right: 1rem;
}

.edit-container button[type="submit"]:hover {
  background: linear-gradient(to bottom right, #e043e0, #a300b1);
}

.edit-container button[type="button"] {
  background: linear-gradient(to bottom right, #6bb3ff, #4095f5);
}

.edit-container button[type="button"]:hover {
  background: linear-gradient(to bottom right, #51a5ff, #2075d4);
}

.profile-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .profile-photo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }


/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .edit-container {
    padding: 1.5rem;
  }
  
  .edit-container h1 {
    font-size: 2rem;
  }
}
</style>
