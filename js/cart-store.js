/**
 * CartStore — single source of truth for the shopping cart.
 * Every page includes this file BEFORE its own page script.
 * The cart itself lives in localStorage as an array of items, so it
 * survives page navigation and browser refreshes, and stays in sync
 * across every page (including the badge in the navbar).
 */
(function (window) {
    const STORAGE_KEY = 'gelatoCartItems';

    function getItems() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const items = raw ? JSON.parse(raw) : [];
            return Array.isArray(items) ? items : [];
        } catch (e) {
            return [];
        }
    }

    function saveItems(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        updateBadge();
        // Let any page listening know the cart changed (same tab).
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items } }));
    }

    function getCount() {
        return getItems().reduce((sum, item) => sum + (parseInt(item.qty, 10) || 0), 0);
    }

    function updateBadge() {
        const badge = document.getElementById('cartBadge') || document.querySelector('.cart-badge');
        if (!badge) return;
        const count = getCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }

    // Briefly bounces the cart badge — called whenever an item is added, so the
    // "🛒 1 → 2" change actually catches the eye instead of updating silently.
    function bumpBadge() {
        const badge = document.getElementById('cartBadge') || document.querySelector('.cart-badge');
        if (!badge) return;
        badge.classList.remove('bump');
        // Force reflow so re-adding the class restarts the animation.
        void badge.offsetWidth;
        badge.classList.add('bump');
    }

    // Adds a product to the cart, merging quantity if it's already there.
    // product = { id, title, price, img }, price may be a number or a "$4.50" string.
    function addItem(product, qty) {
        qty = parseInt(qty, 10) || 1;
        const price = typeof product.price === 'number'
            ? product.price
            : parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 0;

        const items = getItems();
        const existing = items.find(i => String(i.id) === String(product.id));
        if (existing) {
            existing.qty += qty;
        } else {
            items.push({
                id: product.id,
                title: product.title,
                price: price,
                img: product.img || '',
                qty: qty
            });
        }
        saveItems(items);
        bumpBadge();
        return items;
    }

    function removeItem(id) {
        const items = getItems().filter(i => String(i.id) !== String(id));
        saveItems(items);
        return items;
    }

    function setQty(id, qty) {
        qty = Math.max(1, parseInt(qty, 10) || 1);
        const items = getItems();
        const item = items.find(i => String(i.id) === String(id));
        if (item) item.qty = qty;
        saveItems(items);
        return items;
    }

    function clearCart() {
        saveItems([]);
    }

    window.CartStore = {
        getItems,
        saveItems,
        getCount,
        updateBadge,
        bumpBadge,
        addItem,
        removeItem,
        setQty,
        clearCart
    };

    // Keep the badge correct as soon as the page loads...
    document.addEventListener('DOMContentLoaded', updateBadge);
    // ...and when the cart changes in another tab/window.
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) updateBadge();
    });
})(window);
