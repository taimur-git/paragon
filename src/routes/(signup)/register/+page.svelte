<script lang="ts">
    import {
    FluidForm,
    TextInput,
    PasswordInput,
	Button,
  } from "carbon-components-svelte";

  import { Stepper, Step, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
  import logoLightMode  from "$lib/images/logo_lightmode.png";
  let value:number =0 ;
</script>



<header>
    <a href="/">
        <img src={logoLightMode} alt="logo">
    </a>
</header>
<main>
  <div class="signupSteps">
    <Stepper>
      <Step>
        <svelte:fragment slot="header">Join as a student or a teacher</svelte:fragment>
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
          <RadioItem bind:group={value} name="justify" value={0}>Student</RadioItem>
	<RadioItem bind:group={value} name="justify" value={1}>Teacher</RadioItem>
        </RadioGroup>

        <!--svelte:fragment slot="navigation">
		<button class="btn variant-filled-secondary" >Home</button>
	</svelte:fragment-->

      </Step>
      <Step>
        <svelte:fragment slot="header">Basic Information</svelte:fragment>
        <div class="flex justify-center">
    <div class="w-full">
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
            <!--Button kind="secondary" type="submit">Register</Button-->
        </FluidForm>
        

    </div>
</div>
        
      </Step>
      {#if value==1}
        <Step on:complete={}>
        <svelte:fragment slot="header">(header)</svelte:fragment>
        (content)
      </Step>
      {/if}
      
      <!-- ... -->
    </Stepper>
    <p>Already have an account? <a href="/login">Login</a></p>
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