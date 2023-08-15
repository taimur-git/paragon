<script>

	import { AppShell } from "@skeletonlabs/skeleton";
	import logoLightMode  from "$lib/images/logo_lightmode.png";
</script>

	<header>
		<a href="/">
			<img src={logoLightMode} alt="logo">
		</a>
    </header>
	<!-- Router Slot -->
	<slot />

<style>
	header {
    padding: 0 1rem;

  }
  header a{
    display: block;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }
</style>