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
        <form method="POST" class="form">

            <TextInput  name='username' labelText="User name" placeholder="Enter user name..." required />

            <PasswordInput
            required
            name="password"
            type="password"
            labelText="Password"
            placeholder="Enter password..."
            />
            <button class="btn btn-sm variant-filled-secondary" type="submit">Log In</button>
        </form>

        <p>Don't have an account? <a href="/register">Register</a></p>

    </div>
</div>

<style>
    .form{
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #fff;
        box-shadow: 0 0 0.5rem rgba(0,0,0,0.1);
    }
    .form input{
        margin-bottom: 1rem;
    }
    .form button{
        margin-top: 1rem;
    }
</style>
  