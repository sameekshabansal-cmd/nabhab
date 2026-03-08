document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newUsername = document.getElementById('new-username').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();

        if (newUsername && newPassword) {
            // Save the new user credentials in localStorage
            localStorage.setItem('username', newUsername);
            localStorage.setItem('password', newPassword);

            alert('Sign-up successful! You can now log in.');
            window.location.href = 'login.html'; // Redirect to the login page
        } else {
            alert('Please fill in all fields.');
        }
    });
});