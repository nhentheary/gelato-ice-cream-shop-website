document.addEventListener('DOMContentLoaded', () => {
    if (window.CartStore) window.CartStore.updateBadge();

    // Already logged in? No need to be on the login page.
    if (window.AuthStore && window.AuthStore.isLoggedIn()) {
        window.location.href = 'account.html';
        return;
    }

    // Password show/hide toggles
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', () => {
            const input = document.getElementById(icon.getAttribute('data-target'));
            if (!input) return;
            const showing = input.type === 'text';
            input.type = showing ? 'password' : 'text';
            icon.className = 'ti toggle-password ' + (showing ? 'ti-eye' : 'ti-eye-off');
        });
    });

    const form = document.getElementById('loginForm');
    const message = document.getElementById('loginMessage');

    function showMessage(text, type) {
        message.textContent = text;
        message.className = 'auth-form-message ' + type;
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!window.AuthStore) {
                showMessage('Something went wrong. Please refresh and try again.', 'error');
                return;
            }

            const result = window.AuthStore.login(email, password);
            if (!result.success) {
                showMessage(result.message, 'error');
                return;
            }

            showMessage('Logged in! Redirecting to your account...', 'success');
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 600);
        });
    }
});
