<script lang="ts">
	import { Form } from 'carbon-components-svelte';
  import type { PageData } from './$types';
	import { goto } from '$app/navigation';
  import mapboxgl from 'mapbox-gl';
	export let data: PageData;

  
  
	let editedData = {
	  name: data.user?.name || '',
	  email: data.user?.email || '',
	  bio: data.user?.bio || '',
	  phone: data.user?.phone || '',
    photo: data.user?.image || '',
	};
  

  // function backToProfile(){
  //   goto(`/profile`);
  // }
  // async function updateProfile(event) {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append('name', editedData.name);
  //   formData.append('email', editedData.email);
  //   formData.append('bio', editedData.bio);
  //   formData.append('phone', editedData.phone);
  //   formData.append('photo', editedData.photo); // Append the selected photo file

  //   try {
  //     const response = await fetch('/uploadProfilePhoto', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       // Update the user's profile with the new photo URL
  //       const updateResponse = await fetch('/updateProfile', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           photo: responseData.url,
  //         }),
  //       });
  //       // ... update the UI or do further processing ...
  //       return true;
  //       } 
  //       else throw Error("Couldn't upload image");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

</script>

<div class="edit-container">
	<h1>Edit Profile</h1>
	<Form method="POST">

		<div class="profile-info">
			<img src={data.user?.image} alt="Profile Photo" class="profile-photo" />
			<h1>{data.user?.username}</h1>
		  </div>
    <div class = "info">
		<label style="padding: 2%" for="photo">Change Photo:</label>
		<input type="file" id="photo" bind:value={editedData.photo} />

		<label style="padding: 2%" for="name">Name:</label>
		<input type="text" id="name" bind:value={editedData.name} name="username"/>

		<label style="padding: 2%" for="email">Email:</label>
		<input type="email" id="email" bind:value={editedData.email} name="email" />

		<label style="padding: 2%" for="bio">Bio:</label>
		<textarea id="bio" bind:value={editedData.bio} name="bio"></textarea>

		<label style="padding: 2%" for="phone">Phone Number:</label>
		<input type="tel" id="phone" bind:value={editedData.phone} name="phone"/>
		
    <input type="hidden" name="userid" value={data.id} />
    </div>
    <div class="location-info">
          <label style="padding: 2%" for="location">Location:</label>
          <input type="text" id="location" placeholder="Search your location" bind:value={editedData.location} on:input={() => getGeocode(editedData.location)}/>
    </div>
    <div class="button-container">
		<button type="submit" class="action-button">Save Changes</button>
		
		<button type="button" class="action-button" on:click={() => (window.location.href = '/profile')}>Cancel</button>
    </div>
	</Form>
</div>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.edit-container {
  max-width: 600px;
  margin: 4rem auto;
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
  margin-top: 3%;
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

  .action-button{
    width: 100%;
  }


@media screen and (max-width: 768px) {
  .edit-container {
    padding: 1.5rem;
  }
  
  .edit-container h1 {
    font-size: 2rem;
  }
}
</style>