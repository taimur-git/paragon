<!-- card.svelte -->
<style>
	/* Use Tailwind CSS classes for styling */
	.m-card {
	  @apply w-full max-w-md border border-gray-300 rounded-md shadow-md card-hover p-4 m-2;
	  background-color: #F0F4FF; /* Change the background color to a light blue shade */
	  border-color: #C4C9FF;
	  /* width: 244px */
	  display: flex; /* Add display:flex to make the container a flex container */
	  flex-direction: column; /* Make the container stack its children vertically */
	  height: 100%; /* Make the container take up the full height of its parent */
	}
  
	/* Center the content within the card */
	.card-content {
	  @apply space-y-4;
	  flex: 1; /* Make the content take up the available vertical space */
	}
  
	/* Ensure the button does not expand the card width */
	.post button {
	  @apply w-full;
	  background-color: #BDB1E7;
	  color: black;
	  transition: background-color 0.3s, color 0.3s;
	}
  
	/* Apply hover effect */
	.post button:hover {
	  background-color: #4C0C74;
	  color: white;
	}
  </style>
  
  <div class="m-card">
	<!-- Use flex layout to vertically align content -->
	<div class="card-content">
	  <h2>
		<slot name="header">Unknown item</slot>
	  </h2>
  
	  <div class="studentLable">
		<slot name="studentLable">Unknown item</slot>
	  </div>
  
	  <div class="rate">
		<slot name="rate">Unknown item</slot>
	  </div>
  
	  <div class="post">
		<slot name="buttons">
		  <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
			See...
		  </button>
		</slot>
	  </div>
	</div>
  </div>
  