/**
 * WishlistStore — single source of truth for saved/favourited products.
 * Mirrors the CartStore pattern: plain localStorage array, shared across
 * every page (menu grid hearts, product details, and the account page).
 */
(function (window) {
    const STORAGE_KEY = 'gelatoWishlistItems';

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
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { items } }));
    }

    function isSaved(id) {
        return getItems().some(i => String(i.id) === String(id));
    }

    // product = { id, title, price, img, category }
    function add(product) {
        const items = getItems();
        if (!items.some(i => String(i.id) === String(product.id))) {
            items.push({
                id: product.id,
                title: product.title,
                price: product.price,
                img: product.img || '',
                category: product.category || ''
            });
            saveItems(items);
        }
        return items;
    }

    function remove(id) {
        const items = getItems().filter(i => String(i.id) !== String(id));
        saveItems(items);
        return items;
    }

    // Adds if absent, removes if present. Returns the new saved state (true/false).
    function toggle(product) {
        if (isSaved(product.id)) {
            remove(product.id);
            return false;
        }
        add(product);
        return true;
    }

    window.WishlistStore = {
        getItems,
        isSaved,
        add,
        remove,
        toggle
    };
})(window);
