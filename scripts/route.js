async function fetchDashboardData() {
    const token = localStorage.getItem('token');

    const response = await fetch('https://tempname-backend.onrender.com/api/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Include token in request
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        console.error('Failed to fetch dashboard data:', response);
        window.location.replace('signin.html')
    }
}


// Call the function
fetchDashboardData();
