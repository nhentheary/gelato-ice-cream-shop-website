document.addEventListener('DOMContentLoaded', () => {
    if (window.CartStore) window.CartStore.updateBadge();

    const guardState = document.getElementById('guardState');
    const dashboardState = document.getElementById('dashboardState');

    // ---------- Auth guard: bounce guests to the login page ----------
    if (!window.AuthStore || !window.AuthStore.isLoggedIn()) {
        if (guardState) guardState.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 900);
        return;
    }

    if (dashboardState) dashboardState.style.display = 'block';

    const user = window.AuthStore.getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // ---------- Populate sidebar profile ----------
    const initials = ((user.firstName || '?')[0] || '').toUpperCase() + ((user.lastName || '')[0] || '').toUpperCase();
    document.getElementById('sidebarAvatar').textContent = initials || 'G';
    document.getElementById('sidebarName').textContent = `${user.firstName} ${user.lastName}`.trim();
    document.getElementById('sidebarEmail').textContent = user.email;

    // ---------- Populate "My Account" form ----------
    document.getElementById('accFirstName').value = user.firstName || '';
    document.getElementById('accLastName').value = user.lastName || '';
    document.getElementById('accEmail').value = user.email || '';
    document.getElementById('accPhone').value = user.phone || '';
    document.getElementById('accAddress').value = user.address || '';

    // ---------- Sidebar tab switching ----------
    const navButtons = document.querySelectorAll('.sidebar-nav-btn[data-panel]');
    const panels = document.querySelectorAll('.dashboard-panel');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-panel');
            panels.forEach(p => p.classList.toggle('active', p.id === targetId));

            if (targetId === 'orderHistoryPanel') renderOrders();
            if (targetId === 'wishlistPanel') renderWishlist();
        });
    });

    // ---------- My Account: save changes ----------
    const accountForm = document.getElementById('accountForm');
    const accountMessage = document.getElementById('accountMessage');

    function showAccountMessage(text, type) {
        accountMessage.textContent = text;
        accountMessage.className = 'account-form-message ' + type;
    }

    if (accountForm) {
        accountForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const result = window.AuthStore.updateProfile({
                firstName: document.getElementById('accFirstName').value,
                lastName: document.getElementById('accLastName').value,
                phone: document.getElementById('accPhone').value,
                address: document.getElementById('accAddress').value
            });

            if (!result.success) {
                showAccountMessage(result.message, 'error');
                return;
            }

            showAccountMessage('Your info has been updated.', 'success');

            const updated = result.user;
            const newInitials = ((updated.firstName || '?')[0] || '').toUpperCase() + ((updated.lastName || '')[0] || '').toUpperCase();
            document.getElementById('sidebarAvatar').textContent = newInitials || 'G';
            document.getElementById('sidebarName').textContent = `${updated.firstName} ${updated.lastName}`.trim();
        });
    }

    // ---------- Order History ----------
    const orderList = document.getElementById('orderList');

    function renderOrders() {
        if (!orderList) return;
        const orders = window.AuthStore.getOrdersForCurrentUser();

        if (!orders.length) {
            orderList.innerHTML = `
                <div class="empty-state">
                    <i class="ti ti-package"></i>
                    <p>You haven't placed any orders yet.</p>
                    <a href="menu.html" class="btn btn-primary" style="margin-top:14px;">Browse the Menu</a>
                </div>
            `;
            return;
        }

        orderList.innerHTML = orders.map(order => {
            const date = new Date(order.date);
            const dateStr = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
            const items = Array.isArray(order.items) ? order.items : [];
            const itemsSummary = items.map(i => `${i.title} x${i.qty}`).join(', ') || 'No items';
            const total = typeof order.total === 'number' ? order.total.toFixed(2) : order.total;

            return `
                <div class="order-card">
                    <div class="order-card-top">
                        <div>
                            <div class="order-id">${order.id}</div>
                            <div class="order-date">${dateStr}</div>
                        </div>
                        <span class="order-status-badge">${order.status || 'Processing'}</span>
                    </div>
                    <div class="order-items-summary">${itemsSummary}</div>
                    <div class="order-card-bottom">
                        <span style="font-size:12px; color: var(--text-sub-dark);">${order.fulfillmentType === 'pickup' ? 'Store Pick-up' : 'Home Delivery'}</span>
                        <span class="order-total">$${total}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderOrders();

    // ---------- Wishlist ----------
    const wishlistList = document.getElementById('wishlistList');

    function renderWishlist() {
        if (!wishlistList || !window.WishlistStore) return;
        const items = window.WishlistStore.getItems();

        if (!items.length) {
            wishlistList.innerHTML = `
                <div class="empty-state">
                    <i class="ti ti-heart"></i>
                    <p>You haven't saved any favorites yet.</p>
                    <a href="menu.html" class="btn btn-primary" style="margin-top:14px;">Browse the Menu</a>
                </div>
            `;
            return;
        }

        wishlistList.innerHTML = items.map(item => `
            <div class="wishlist-card" data-id="${item.id}">
                <img src="${item.img}" alt="${item.title}" class="wishlist-item-img">
                <div class="wishlist-item-details">
                    <h4 class="wishlist-item-title">${item.title}</h4>
                    <span class="wishlist-item-price">${typeof item.price === 'number' ? '$' + item.price.toFixed(2) : item.price}</span>
                </div>
                <div class="wishlist-item-actions">
                    <button type="button" class="wishlist-move-to-cart-btn" data-id="${item.id}">
                        <i class="ti ti-shopping-cart-plus"></i> Add to Cart
                    </button>
                    <button type="button" class="wishlist-remove-btn" data-id="${item.id}" aria-label="Remove from wishlist">
                        <i class="ti ti-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        wishlistList.querySelectorAll('.wishlist-remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.WishlistStore.remove(id);
                renderWishlist();
            });
        });

        wishlistList.querySelectorAll('.wishlist-move-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const item = items.find(i => String(i.id) === String(id));
                if (item && window.CartStore) {
                    window.CartStore.addItem(item, 1);
                    if (window.showToast) window.showToast(`${item.title} added to cart`, 'success');
                }
            });
        });
    }

    // ---------- Settings: change password ----------
    const passwordForm = document.getElementById('passwordForm');
    const passwordMessage = document.getElementById('passwordMessage');

    function showPasswordMessage(text, type) {
        passwordMessage.textContent = text;
        passwordMessage.className = 'account-form-message ' + type;
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const current = document.getElementById('currentPassword').value;
            const next = document.getElementById('newPassword').value;
            const confirm = document.getElementById('confirmNewPassword').value;

            if (next !== confirm) {
                showPasswordMessage('New passwords do not match.', 'error');
                return;
            }

            const result = window.AuthStore.changePassword(current, next);
            if (!result.success) {
                showPasswordMessage(result.message, 'error');
                return;
            }

            showPasswordMessage('Password updated successfully.', 'success');
            passwordForm.reset();
        });
    }

    // ---------- Log out ----------
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.AuthStore.logout();
            window.location.href = 'index.html';
        });
    }
});
