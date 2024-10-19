async function handleSignIn(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://tempname-backend.onrender.com/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('message').innerText = 'Sign up successful!';
        } else {
            document.getElementById('message').innerText = data.error;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
    
}

async function checkDashboard() {
    const token = localStorage.getItem('token');

    const response = await fetch('https://tempname-backend.onrender.com/api/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.replace('dashboard.html')
    } 
    
}


checkDashboard();