<script lang="ts">
	import { enhance } from "$app/forms";
</script>


<form  method='POST' use:enhance>
    <hgroup>
        <h1>Register</h1>
        <h3>To post ads, you need an account.</h3>
        
    </hgroup>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" placeholder="Username" required>

    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="Email" required>

    <label for="password">Password</label>
    <input type="password" id="password" name="password" placeholder="Password" required>

    <!--label for="password">Confirm Password</label>
    <input type="password" id="password" name="password" placeholder="Password" required-->

    <!--button type="submit">Register</button-->
    <input type="submit" value="Signup" />
</form>
<p>Already have an account? <a href="/login">Login</a></p>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    hgroup {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    h3 {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 1rem;
    }

    label {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        height: 3rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        padding: 0.5rem;
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 1rem;
    }

    button {
        width: 100%;
        height: 3rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        padding: 0.5rem;
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 1rem;
    }

    a {
        font-size: 1.5rem;
        font-weight: 400;
        color: #000;
    }
</style>