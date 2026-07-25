document.addEventListener('DOMContentLoaded', () => {
    if (window.CartStore) window.CartStore.updateBadge();

    // Already logged in? No need to register again.
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

    const form = document.getElementById('registerForm');
    const message = document.getElementById('registerMessage');

    function showMessage(text, type) {
        message.textContent = text;
        message.className = 'auth-form-message ' + type;
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('registerPhone').value;
            const address = document.getElementById('registerAddress').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                showMessage('Passwords do not match.', 'error');
                return;
            }

            if (!window.AuthStore) {
                showMessage('Something went wrong. Please refresh and try again.', 'error');
                return;
            }

            const result = window.AuthStore.register({
                firstName, lastName, email, phone, address, password
            });

            if (!result.success) {
                showMessage(result.message, 'error');
                return;
            }

            showMessage('Account created! Redirecting to your account...', 'success');
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 600);
        });
    }
});
