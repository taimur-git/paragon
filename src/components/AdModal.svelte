<script lang="ts">
	import { goto } from "$app/navigation";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";

  let targetPage = '/';
  let shown = false;
  let logInId;
  export let ad; 
  export let currentPage; // Add this prop to determine the current page

  const error_toast_req: ToastSettings = {
      message: "You have already requested for this ad!",
      background: "variant-filled-error"
  }
  const error_toast_app: ToastSettings = {
      message: "You are already appointed in this course!",
      background: "variant-filled-error"
  }
  const req_toast: ToastSettings = {
      message: "Your request has been sent successfully!",
      background: "variant-filled-success"
  }
  
  export function show(adData,selectedCardId,logInfo=null) {
      ad = adData;
    shown = true;
    selectedCardId.cardId=ad.id;
    logInId=logInfo.user.userId;
  }
  export function hide() {
    shown = false;
  }
  export async function sendReq(ad) {
    shown = false;

    const res = await fetch('/api/processReq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ad)
  });

  try{
    const data = await res.json();
    console.log(data.message);
    if(data.message == "No session found"){
      // alert("Request Sent Successfully");
      goto('/register');
    }
    else if(data.message == "Already requested"){
      toastStore.trigger(error_toast_req);
    }
    else if(data.message == "Already appointed"){
      toastStore.trigger(error_toast_app);
    }
    else if(data.message == "Requested"){
      toastStore.trigger(req_toast);
    }

    } catch (err) {
      console.log(err);
    }
  }

</script>

{#if currentPage == "home" && shown}
<!-- {#if shown} -->
  <div class="modal-wrapper" on:click={() => hide()} on:keydown={(e) => { if (e.keyCode === 27) hide(); }}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal rounded-md" on:click={(e) => { e.stopPropagation(); }}>       
      <div class="modal-content">

        <div class="user-image">
          <!-- <img src={ad.userImage} alt="User" class="user-image" /> -->
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"  class="user-image"  />
        </div>

        <div class="user-info">
            <h3>AD Details</h3>
            <p class="user-name">{ad.user}</p>
            <p>Rate: {ad.salary==0? "Negotiable":ad.salary}</p>
            <p>Salary Type: {ad.salaryType}</p>
            <p>Course: {ad.tags.join(', ')}</p>
            <p>Upload: {ad.createdAt}</p>
            <p>Tuition System: {ad.tutorType ? ad.tutorType : ''}</p>
            <p>Institution: {ad.instituteName ? ad.instituteName: ' '}</p>
        </div>
      </div>
      <p>Last Login: {ad.lastLogin}</p>
      <p>Description: {ad.adDescription ? ad.adDescription : ''}</p>
      <div class="button-container">
        <button class="modal-button bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md" on:click={() => hide()}>Cancel</button>
        {#if ad.userid != logInId}
          <button class="modal-button bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md" on:click={() => sendReq(ad)}>Join</button>
        {/if}

      </div>
    </div>
  </div>
{/if}

{#if currentPage == "myAds" && shown}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-wrapper" on:click={() => hide()} on:keydown={(e) => { if (e.keyCode === 27) hide(); }}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal rounded-md" on:click={(e) => { e.stopPropagation(); }}>       
      <div class="modal-content">

        <div class="user-image">
          <img src={ad.userImage} alt="User" class="user-image" />
        </div>

        <div class="user-info">
            <h3>AD Details</h3>
            <p class="user-name">{ad.user}</p>
            <p>Rate: {ad.salary}</p>
            <p>Salary Type: {ad.salaryType}</p>
            <p>Course: {ad.tags.join(', ')}</p>
            <p>Upload: {ad.createdAt}</p>
            <p>Tuition System: {ad.tutorType ? ad.tutorType : ''}</p>
            <p>Institution: {ad.instituteName ? ad.instituteName: ' '}</p>
        </div>
      </div>
      <p>Last Login: {ad.lastLogin}</p>
      <p>Description: {ad.adDescription ? ad.adDescription : ''}</p>
    </div>
  </div>
{/if}

<style>
  .modal-wrapper {
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .modal {
    background-color: white;
    max-width: 40vw;
    padding: 1rem;
    margin: 15% auto;
    /* border-radius: 2.5%; */
  }

  .modal-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .user-image {
    width: 150px; /* Adjust the image size as needed */
    height: 150px;  /* Adjust the image size as needed */
    object-fit: cover;
    border-radius: 1%;
  }
  .user-name {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .modal-button {
    margin-left: 1rem;
    cursor: pointer;
    border: none;
    background-color: #BDB1E7;
    color: black;
    padding: 0.5rem 1rem;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
  }

  .modal-button:hover {
    background-color: #4C0C74;
    color: white; 
  }
</style>