// Authentication check for member pages
// Include this script on all member-only pages

(async function() {
    try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();

        if (!data.authenticated) {
            // User is not authenticated - redirect to login
            const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
            window.location.href = `/login.html?redirect=${currentUrl}`;
        } else {
            // User is authenticated - show member content
            console.log('User authenticated:', data.email);
            
            // Add user info to page if elements exist
            const userEmailElements = document.querySelectorAll('.user-email');
            userEmailElements.forEach(el => {
                el.textContent = data.email;
            });
        }
    } catch (error) {
        console.error('Auth check error:', error);
        // Redirect to login on error
        window.location.href = '/login.html';
    }
})();

// Logout function for member pages
async function logout() {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST'
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = '/index.html';
        }
    } catch (error) {
        console.error('Logout error:', error);
        // Redirect anyway
        window.location.href = '/index.html';
    }
}
