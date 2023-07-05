<form method="POST">
    <hgroup>
        <h1>Login</h1>
        <h3>Enter your credentials to login.</h3>
    </hgroup>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" placeholder="Username" required>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" placeholder="Password" required>
    <button type="submit">Login</button>
</form>
<p>Don't have an account? <a href="/register">Register</a></p>
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
        border: none;
        border-radius: 0.5rem;
        background-color: #000;
        color: #fff;
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 1rem;
    }

    a {
        color: #000;
        font-size: 1.5rem;
        font-weight: 400;
    }
</style>