<style>
	.m-card {
		width: 400px;
		border: 1px solid #aaa;
		border-radius: 4px;
		box-shadow: 4px 4px 12px rgba(0,0,0,0.4);
		padding: 1em;
		margin: 0 0 1em 0;
	}

</style>

<div class="m-card">
	<h2>
		<slot name="header">
			Unknown item
		</slot>
	</h2>

	<div class="studentLable">
		<slot name="studentLable">
			Unknown item
		</slot>
	</div>

	<div class="rate">
		<slot name="rate">
			Unknown item
		</slot>
	</div>
	<div class="post">
		<slot name="post">
			<button>Post</button>
		</slot>
	</div>
	
</div>