async function handleSignIn(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://tempname-backend.onrender.com/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store the JWT token in localStorage or sessionStorage
            localStorage.setItem('token', data.token); 
            document.getElementById('message').innerText = 'Sign in successful!';
            // Redirect to dashboard or another page if needed
            setTimeout(window.location.replace("dashboard.html"),5000)
        } else {
            document.getElementById('message').innerText = data.error;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
}
