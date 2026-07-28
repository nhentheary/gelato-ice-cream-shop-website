/**
 * showToast — small animated notification used across pages instead of
 * plain "Added to cart" text (e.g. menu.js, product-details.js).
 * Usage: window.showToast('Strawberry Gelato added to cart', 'success');
 */
(function (window) {
    let container = null;

    function getContainer() {
        if (container && document.body.contains(container)) return container;
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    function showToast(message, type) {
        type = type || 'success';
        const el = document.createElement('div');
        el.className = `toast-notification toast-${type}`;
        const icon = type === 'success' ? 'ti-check' : (type === 'error' ? 'ti-x' : 'ti-info-circle');
        el.innerHTML = `<i class="ti ${icon}"></i><span>${message}</span>`;

        const host = getContainer();
        host.appendChild(el);

        // Force reflow so the enter transition actually plays.
        requestAnimationFrame(() => el.classList.add('show'));

        setTimeout(() => {
            el.classList.remove('show');
            el.classList.add('hide');
            setTimeout(() => el.remove(), 300);
        }, 2600);
    }

    window.showToast = showToast;
})(window);
