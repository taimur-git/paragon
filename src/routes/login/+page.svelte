<script>

    import {
    FluidForm,
    TextInput,
    PasswordInput,
	Button,
  } from "carbon-components-svelte";
</script>
<div class="flex justify-center">
    <div class="w-full sm:w-3/5 md:w-1/3 ">
        <h1 class="text-2xl font-bold mb-2.5">Login</h1>
        <h1 class="text-lg font-normal mb-4">Enter your credentials to login.</h1>
        <FluidForm method="POST" >

            <TextInput name='username' labelText="User name" placeholder="Enter user name..." required />

            <PasswordInput
            required
            name="password"
            type="password"
            labelText="Password"
            placeholder="Enter password..."
            />
            <Button kind="secondary" type="submit">Log In</Button>
        </FluidForm>

        <p>Don't have an account? <a href="/register">Register</a></p>

    </div>
  </div>
  