<script>
    import { goto } from '$app/navigation';
    let targetPage = '/';
    let shown = false;
    export let ad; 

    export function show(adData) {
        ad = adData;
      shown = true;
    }
    export function hide() {
      shown = false;
    }
    export function changePage(adId) {
      goto(targetPage);
    
      shown = false;
    }
  </script>
  
{#if shown}
  <div class="modal-wrapper" on:click={() => hide()} on:keydown={(e) => { if (e.keyCode === 27) hide(); }}>
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
      <div class="button-container">
        <button class="modal-button bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md" on:click={() => hide()}>Cancel</button>
        <button class="modal-button bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md" on:click={() => changePage(ad.adId)}>Confirm</button>
      </div>
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
    justify-content: center;
  }

  .user-image {
    width: 100px; /* Adjust the image size as needed */
    height: 100px;  /* Adjust the image size as needed */
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