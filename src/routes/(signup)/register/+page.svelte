<script lang="ts">
    import {
    FluidForm,
    TextInput,
    PasswordInput,
	Button,
  } from "carbon-components-svelte";

  import { Stepper, Step, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { redirect } from "@sveltejs/kit";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import type { document } from "postcss";
  
  let signupState:boolean = true;
  let value:number =0 ;
  let basicInfo = {
    username: '',
    email: '',
    password: '',
  };
  
  const handleSignup = async (e: Event) => { 
    e.preventDefault();

    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(basicInfo)
    });

    try{
      const data = await res.json();
      console.log(data);
      if (data.message === 'User created') {
        goto('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  function takeToLandingPg() {
    goto('/');
  }

  $: {
    if (basicInfo.username !== '' && basicInfo.email !== '' && basicInfo.password !== '') {
      signupState = false;
    } else {
      signupState = true;
    }
  }
</script>



<main>

  <div class="signupSteps">
    <Stepper on:complete={handleSignup}>

      <Step>
        <svelte:fragment slot="navigation">
		      <button class="btn variant-ghost-error" on:click={takeToLandingPg}>Back</button>
	      </svelte:fragment>
        <svelte:fragment slot="header">Join as a student or a teacher</svelte:fragment>
        <div class="flex justify-center">
          <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={value} name="justify" value={0}>Student</RadioItem>
            <RadioItem bind:group={value} name="justify" value={1}>Teacher</RadioItem>
          </RadioGroup> 
        </div>
      </Step>

      <Step locked={signupState}>
        <svelte:fragment slot="header">Basic Information</svelte:fragment>
        <div class="flex justify-center">
          <div class="w-full">
                      
              <!-- <FluidForm method="POST"> -->
                  <TextInput bind:value={basicInfo.username} name='username' labelText="User name" placeholder="Enter user name..." required />
                  <TextInput bind:value={basicInfo.email} name='email' type="email" labelText="Email" placeholder="Enter email..." required />
                  <PasswordInput
                    bind:value={basicInfo.password}
                    required
                    name="password"
                    type="password"
                    labelText="Password"
                    placeholder="Enter password..."
                  />
                  <!--Button kind="secondary" type="submit">Register</Button-->
              <!-- </FluidForm> -->
          </div>
        </div>
        
      </Step>

      {#if value==1}
        <Step>
        <svelte:fragment slot="header">Extra Information</svelte:fragment>
          graduation, credentials, biography etc.
        </Step>
      {/if}
      
    </Stepper>

    <p>Already have an account? <a href="/login">Login</a></p>

  </div>
</main>

<style>
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