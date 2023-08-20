<!-- card.svelte -->
<style>
	.m-card {
	  @apply w-full max-w-md border border-gray-300 rounded-md shadow-md card-hover p-4 m-2;
	  background-color: #F0F4FF;
	  border-color: #C4C9FF;
	  display: flex;
	  flex-direction: column;
	  /* justify-content: space-around; */
	  height: 200px;
	  width: 18rem;
	}
  
	.card-content {
	  @apply space-y-4;
	}
  
	.post button {
	  @apply w-full;
	  background-color: #BDB1E7;
	  color: black;
	  transition: background-color 0.3s, color 0.3s;
	}
  
	.post button:hover {
	  background-color: #4C0C74;
	  color: white;
	}
</style>
  
<div class="m-card">
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
