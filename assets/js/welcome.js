// Wait for DOM to be loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    // Selecting the necessary DOM elements
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signUpForm = document.querySelector('.sign-up-container form');
    const signInForm = document.querySelector('.sign-in-container form');
    const googleButtons = document.querySelectorAll('.social-container .social');

    if (!signUpForm || !signInForm) {
        console.error('Required form elements not found');
        return;
    }

    // API base URL
    const API_BASE_URL = 'http://localhost:3000';

    // Show toast message function
    const showToast = (message, isError = false) => {
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'error' : 'success'}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    // Handle Google Sign In
    async function handleGoogleSignIn(e) {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            showToast(`Welcome ${user.displayName || user.email}!`);
            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }));
            // Redirect to home page
            window.location.href = 'index.html';
        } catch (error) {
            showToast(error.message, true);
        }
    }

    // Handle registration
    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = signUpForm.querySelector('input[type="email"]').value;
        const password = signUpForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = signUpForm.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            showToast('Passwords do not match!', true);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                showToast('Registration successful! Please login.');
                container.classList.remove('right-panel-active');
                signUpForm.reset();
            } else {
                showToast(data.message, true);
            }
        } catch (error) {
            showToast('An error occurred during registration.', true);
            console.error('Registration error:', error);
        }
    });

    // Handle login
    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = signInForm.querySelector('input[type="email"]').value;
        const password = signInForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                showToast('Login successful!');
                
                // Redirect to home page after successful login
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 1000);
            } else {
                showToast(data.message, true);
            }
        } catch (error) {
            showToast('An error occurred during login.', true);
            console.error('Login error:', error);
        }
    });

    // Event Listeners for panel switching
    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }

    // Event Listeners for Google Sign In buttons
    googleButtons.forEach(button => {
        button.addEventListener('click', handleGoogleSignIn);
    });
});
