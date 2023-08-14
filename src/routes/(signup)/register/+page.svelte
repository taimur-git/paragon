<script lang="ts">
    import {
    FluidForm,
    TextInput,
    PasswordInput,
	Button,
  } from "carbon-components-svelte";

  import { Stepper, Step } from '@skeletonlabs/skeleton';
  import logoLightMode  from "$lib/images/logo_lightmode.png";
</script>


<!-- <div class="flex justify-center">
    <div class="w-full sm:w-3/5 md:w-1/3 ">
        <h1 class="text-2xl font-bold mb-2.5">Register</h1>
        <h1 class="text-lg font-normal mb-4">To post ads, you need an account.</h1>
                
        <FluidForm method="POST" >
            <TextInput name='username' labelText="User name" placeholder="Enter user name..." required />
            <TextInput name='email' type="email" labelText="Email" placeholder="Enter email..." required />
            <PasswordInput
              required
              name="password"
              type="password"
              labelText="Password"
              placeholder="Enter password..."
            />
            <Button kind="secondary" type="submit">Register</Button>
        </FluidForm>
        <p>Already have an account? <a href="/login">Login</a></p>

    </div>
</div> -->
<header>
    <a href="/">
        <img src={logoLightMode} alt="logo">
    </a>
</header>
<main>
  <div class="signupSteps">
    <Stepper>
      <Step>
        <svelte:fragment slot="header">(header)</svelte:fragment>
        (content)
      </Step>
      <Step>
        <svelte:fragment slot="header">(header)</svelte:fragment>
        (content)
      </Step>
      <Step>
        <svelte:fragment slot="header">(header)</svelte:fragment>
        (content)
      </Step>
      <!-- ... -->
    </Stepper>
  </div>
</main>

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

  main {
    margin: 0 auto;
  }

  .signupSteps {
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1em;
  }
</style>