/**
 * AuthStore — single source of truth for user accounts, sessions and orders.
 * Every page includes this file (after cart-store.js) so account state stays
 * in sync across every page, the same way CartStore keeps the cart in sync.
 *
 * NOTE: This is a front-end only demo. Accounts, passwords and orders are
 * saved in the browser's localStorage — there is no real server or database,
 * so this should not be treated as a secure production login system.
 */
(function (window) {
    const USERS_KEY = 'gelatoUsers';
    const SESSION_KEY = 'gelatoSession';
    const ORDERS_KEY = 'gelatoOrders';

    // ---------- low level helpers ----------
    function readJSON(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            const value = raw ? JSON.parse(raw) : fallback;
            return value;
        } catch (e) {
            return fallback;
        }
    }

    function writeJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function notifyChange() {
        window.dispatchEvent(new CustomEvent('authChanged'));
    }

    function getUsers() {
        const users = readJSON(USERS_KEY, []);
        return Array.isArray(users) ? users : [];
    }

    function saveUsers(users) {
        writeJSON(USERS_KEY, users);
    }

    function normalizeEmail(email) {
        return String(email || '').trim().toLowerCase();
    }

    function findUserByEmail(email) {
        const target = normalizeEmail(email);
        return getUsers().find(u => normalizeEmail(u.email) === target) || null;
    }

    // Strips the password before handing a user object back to page code.
    function sanitize(user) {
        if (!user) return null;
        const { password, ...safe } = user;
        return safe;
    }

    // ---------- session ----------
    function getSessionEmail() {
        return localStorage.getItem(SESSION_KEY);
    }

    function setSessionEmail(email) {
        if (email) {
            localStorage.setItem(SESSION_KEY, normalizeEmail(email));
        } else {
            localStorage.removeItem(SESSION_KEY);
        }
    }

    function isLoggedIn() {
        return !!getSessionEmail() && !!findUserByEmail(getSessionEmail());
    }

    function getCurrentUser() {
        const email = getSessionEmail();
        if (!email) return null;
        return sanitize(findUserByEmail(email));
    }

    // ---------- validation ----------
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
    }

    // ---------- register / login / logout ----------
    // data = { firstName, lastName, email, phone, address, password }
    function register(data) {
        const firstName = String(data.firstName || '').trim();
        const lastName = String(data.lastName || '').trim();
        const email = normalizeEmail(data.email);
        const phone = String(data.phone || '').trim();
        const address = String(data.address || '').trim();
        const password = String(data.password || '');

        if (!firstName || !lastName) return { success: false, message: 'Please enter your first and last name.' };
        if (!isValidEmail(email)) return { success: false, message: 'Please enter a valid email address.' };
        if (password.length < 6) return { success: false, message: 'Password must be at least 6 characters.' };
        if (findUserByEmail(email)) return { success: false, message: 'An account with this email already exists. Try logging in instead.' };

        const user = {
            id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
            firstName,
            lastName,
            email,
            phone,
            address,
            password, // demo only — never store real passwords in plain text in production
            joinedAt: new Date().toISOString()
        };

        const users = getUsers();
        users.push(user);
        saveUsers(users);
        setSessionEmail(email);
        notifyChange();

        return { success: true, user: sanitize(user) };
    }

    function login(email, password) {
        const user = findUserByEmail(email);
        if (!user || user.password !== String(password || '')) {
            return { success: false, message: 'Incorrect email or password.' };
        }
        setSessionEmail(user.email);
        notifyChange();
        return { success: true, user: sanitize(user) };
    }

    function logout() {
        setSessionEmail(null);
        notifyChange();
    }

    // updates = { firstName, lastName, phone, address } — email is not editable here
    function updateProfile(updates) {
        const email = getSessionEmail();
        if (!email) return { success: false, message: 'You need to be logged in.' };

        const users = getUsers();
        const user = users.find(u => normalizeEmail(u.email) === email);
        if (!user) return { success: false, message: 'Account not found.' };

        if (updates.firstName !== undefined) user.firstName = String(updates.firstName).trim();
        if (updates.lastName !== undefined) user.lastName = String(updates.lastName).trim();
        if (updates.phone !== undefined) user.phone = String(updates.phone).trim();
        if (updates.address !== undefined) user.address = String(updates.address).trim();

        saveUsers(users);
        notifyChange();
        return { success: true, user: sanitize(user) };
    }

    function changePassword(currentPassword, newPassword) {
        const email = getSessionEmail();
        if (!email) return { success: false, message: 'You need to be logged in.' };

        const users = getUsers();
        const user = users.find(u => normalizeEmail(u.email) === email);
        if (!user) return { success: false, message: 'Account not found.' };
        if (user.password !== String(currentPassword || '')) {
            return { success: false, message: 'Current password is incorrect.' };
        }
        if (String(newPassword || '').length < 6) {
            return { success: false, message: 'New password must be at least 6 characters.' };
        }

        user.password = String(newPassword);
        saveUsers(users);
        return { success: true };
    }

    // ---------- orders ----------
    function getAllOrders() {
        const orders = readJSON(ORDERS_KEY, []);
        return Array.isArray(orders) ? orders : [];
    }

    // order = { items, subtotal, discount, fee, total, fulfillmentType, address, paymentMethod, customerName, customerPhone }
    function saveOrder(order) {
        const orders = getAllOrders();
        const email = getSessionEmail();

        const record = Object.assign({}, order, {
            id: 'ORD-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toISOString(),
            owner: email || null, // null = guest order, kept on this device only
            status: 'Processing'
        });

        orders.unshift(record);
        writeJSON(ORDERS_KEY, orders);
        return record;
    }

    // Orders for the logged in user, or guest orders placed on this device.
    function getOrdersForCurrentUser() {
        const email = getSessionEmail();
        return getAllOrders().filter(o => (email ? o.owner === email : !o.owner));
    }

    window.AuthStore = {
        register,
        login,
        logout,
        isLoggedIn,
        getCurrentUser,
        updateProfile,
        changePassword,
        saveOrder,
        getOrdersForCurrentUser
    };
})(window);
