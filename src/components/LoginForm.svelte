<form method="POST">
    
    <label class="label">
        <span>Username:</span>
        <input class="input loginInput" type="text" placeholder="username" />
    </label>
				
    <label class="label">
        <span>Password:</span>
        <input class="input loginInput" type="text" placeholder="password" />
    </label>

    <button class="btn variant-filled-primary" type="submit">Log In</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: white;
        padding: 1em 1em;
        border-radius: 1em;
        box-shadow: 0 0 1em rgba(0,0,0,.2);
    }

    .loginInput {
        padding: .3em .5em;
    }
</style>