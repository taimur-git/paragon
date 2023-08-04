<script lang="ts">
    import {
    FluidForm,
    TextInput,
    PasswordInput,
	Button,
  } from "carbon-components-svelte";
</script>


<div class="flex justify-center">
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
</div>