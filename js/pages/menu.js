document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    const paginationContainer = document.getElementById('paginationContainer');
    const catTabs = document.querySelectorAll('.cat-tab');
    const searchInput = document.getElementById('menuSearchInput');
    const searchClearBtn = document.getElementById('menuSearchClear');
    if (window.CartStore) window.CartStore.updateBadge();

    const productsData = (window.ProductsData && window.ProductsData.all) || [];

    let currentCategory = 'best-sellers';
    let currentPage = 1;
    let searchQuery = '';
    const itemsPerPage = 5;

    function getMatchedProducts() {
        const q = searchQuery.trim().toLowerCase();

        if (q) {
            // While searching, look across every category (unless a specific
            // category tab is active) so "Chocolate" finds Chocolate Chip,
            // Chocolate Shake, Chocolate Dip Cone, etc. wherever they live.
            const pool = currentCategory === 'all'
                ? productsData
                : productsData.filter(item => item.category === currentCategory);

            return pool.filter(item =>
                item.title.toLowerCase().includes(q) ||
                (item.desc && item.desc.toLowerCase().includes(q))
            );
        }

        if (currentCategory === 'all') return productsData;
        return productsData.filter(item => item.category === currentCategory);
    }

    function skeletonCardHTML() {
        return `
            <div class="product-card skeleton-card">
                <div class="skeleton-block skeleton-img"></div>
                <div class="skeleton-block skeleton-line" style="width: 70%;"></div>
                <div class="skeleton-block skeleton-line" style="width: 40%;"></div>
                <div class="skeleton-block skeleton-line" style="width: 55%;"></div>
                <div class="skeleton-block skeleton-btn"></div>
            </div>
        `;
    }

    function showSkeleton(count) {
        if (!productsGrid) return;
        productsGrid.innerHTML = Array.from({ length: count }).map(skeletonCardHTML).join('');
        if (paginationContainer) paginationContainer.style.display = 'none';
    }

    function badgeHTML(product) {
        if (product.isNew) return `<span class="card-badge badge-new">New</span>`;
        if (product.isBestSeller) return `<span class="card-badge badge-best-seller"><i class="ti ti-flame"></i> Best Seller</span>`;
        return '';
    }

    function renderProducts() {
        if (!productsGrid) return;
        const matchedProducts = getMatchedProducts();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentProducts = matchedProducts.slice(startIndex, startIndex + itemsPerPage);

        let htmlContent = '';
        if (currentProducts.length === 0) {
            htmlContent = `
                <div class="no-results-state">
                    <i class="ti ti-mood-sad"></i>
                    <p>No treats match${searchQuery ? ` "<strong>${searchQuery}</strong>"` : ' this category'}.</p>
                    <span>Try a different flavor, or browse another category.</span>
                </div>
            `;
        } else {
            currentProducts.forEach(product => {
                const saved = window.WishlistStore ? window.WishlistStore.isSaved(product.id) : false;
                htmlContent += `
                    <div class="product-card" data-category="${product.category}">
                        ${badgeHTML(product)}
                        <button class="wishlist-btn ${saved ? 'active' : ''}" data-id="${product.id}" aria-label="Save to Wishlist" aria-pressed="${saved}">
                            <i class="ti ${saved ? 'ti-heart-filled' : 'ti-heart'}"></i>
                        </button>
                        <button class="quick-view-btn" data-id="${product.id}" aria-label="Quick view ${product.title}">
                            <i class="ti ti-eye"></i> Quick View
                        </button>
                        <a href="product-details.html?id=${product.id}" class="product-img-box" aria-label="View ${product.title} details">
                            <img src="${product.img}" alt="${product.title}">
                        </a>
                        <div class="product-details">
                            <h4 class="product-name">
                                <a href="product-details.html?id=${product.id}" style="text-decoration: none; color: inherit;">${product.title}</a>
                            </h4>
                            <div class="product-rating">
                                ${product.star ? '<i class="ti ti-star-filled"></i>' : '<i class="ti ti-star"></i>'}
                                <span class="rating-count">${product.rating}</span>
                            </div>
                            <div class="price-row">
                                <span class="current-price">${product.price}</span>
                            </div>
                            <button class="add-to-cart-btn" data-id="${product.id}">
                                <i class="ti ti-shopping-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        productsGrid.innerHTML = htmlContent;
        attachWishlistEvents();
        attachAddToCartEvents();
        attachQuickViewEvents();
        renderPagination(matchedProducts.length);
    }

    // Small delay before rendering so category/search changes feel like they're
    // loading fresh results, with skeleton cards standing in meanwhile.
    function renderWithLoadingState() {
        showSkeleton(Math.min(itemsPerPage, 5));
        setTimeout(renderProducts, 350);
    }

    function renderPagination(totalMatchedItems) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalMatchedItems / itemsPerPage);

        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }

        paginationContainer.style.display = 'flex';

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.innerText = i;
            pageBtn.className = `sub-tab ${i === currentPage ? 'active' : ''}`;

            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
                window.scrollTo({ top: productsGrid.offsetTop - 100, behavior: 'smooth' });
            });

            paginationContainer.appendChild(pageBtn);
        }
    }

    function attachWishlistEvents() {
        if (!productsGrid) return;
        const wishlistButtons = productsGrid.querySelectorAll('.wishlist-btn');
        wishlistButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const productId = btn.getAttribute('data-id');
                const product = productsData.find(p => String(p.id) === String(productId));
                if (!product || !window.WishlistStore) return;

                const nowSaved = window.WishlistStore.toggle(product);
                btn.classList.toggle('active', nowSaved);
                btn.setAttribute('aria-pressed', nowSaved);
                btn.querySelector('i').className = `ti ${nowSaved ? 'ti-heart-filled' : 'ti-heart'}`;

                if (window.showToast) {
                    window.showToast(nowSaved ? `${product.title} added to wishlist` : `${product.title} removed from wishlist`, 'info');
                }
            });
        });
    }

    function attachAddToCartEvents() {
        if (!productsGrid) return;
        const cartButtons = productsGrid.querySelectorAll('.add-to-cart-btn');
        cartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();

                if (btn.classList.contains('added')) {
                    window.location.href = 'cart.html';
                    return;
                }

                const productId = btn.getAttribute('data-id');
                const product = productsData.find(p => String(p.id) === String(productId));
                if (product && window.CartStore) {
                    window.CartStore.addItem(product, 1);
                    if (window.showToast) window.showToast(`${product.title} added to cart`, 'success');
                }

                btn.classList.add('added');
                btn.innerHTML = `<i class="ti ti-check"></i> Added`;
            });
        });
    }

    // ==========================================
    // Quick View Modal
    // ==========================================
    const quickViewOverlay = document.getElementById('quickViewOverlay');
    const quickViewClose = document.getElementById('quickViewClose');
    let quickViewProduct = null;

    function openQuickView(product) {
        quickViewProduct = product;
        document.getElementById('quickViewImg').src = product.img;
        document.getElementById('quickViewImg').alt = product.title;
        document.getElementById('quickViewTitle').textContent = product.title;
        document.getElementById('quickViewPrice').textContent = product.price;
        document.getElementById('quickViewDesc').textContent = product.desc || '';
        document.getElementById('quickViewRating').innerHTML = `
            ${product.star ? '<i class="ti ti-star-filled"></i>' : '<i class="ti ti-star"></i>'}
            <span class="rating-count">${product.rating}</span>
        `;
        document.getElementById('quickViewFullDetails').href = `product-details.html?id=${product.id}`;

        const addBtn = document.getElementById('quickViewAddToCart');
        addBtn.classList.remove('added');
        addBtn.innerHTML = `<i class="ti ti-shopping-cart-plus"></i> Add to Cart`;

        if (quickViewOverlay) quickViewOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeQuickView() {
        if (quickViewOverlay) quickViewOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    function attachQuickViewEvents() {
        if (!productsGrid) return;
        productsGrid.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const productId = btn.getAttribute('data-id');
                const product = productsData.find(p => String(p.id) === String(productId));
                if (product) openQuickView(product);
            });
        });
    }

    if (quickViewClose) quickViewClose.addEventListener('click', closeQuickView);
    if (quickViewOverlay) {
        quickViewOverlay.addEventListener('click', (e) => {
            if (e.target === quickViewOverlay) closeQuickView();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeQuickView();
    });

    const quickViewAddToCart = document.getElementById('quickViewAddToCart');
    if (quickViewAddToCart) {
        quickViewAddToCart.addEventListener('click', () => {
            if (!quickViewProduct || !window.CartStore) return;
            window.CartStore.addItem(quickViewProduct, 1);
            if (window.showToast) window.showToast(`${quickViewProduct.title} added to cart`, 'success');
            quickViewAddToCart.classList.add('added');
            quickViewAddToCart.innerHTML = `<i class="ti ti-check"></i> Added`;
        });
    }

    // ==========================================
    // Category Tabs
    // ==========================================
    catTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            catTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.getAttribute('data-category');
            currentPage = 1;
            renderWithLoadingState();
        });
    });

    // ==========================================
    // Product Search Box (Highest Priority feature)
    // ==========================================
    let searchDebounce = null;
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value;
            currentPage = 1;
            if (searchClearBtn) searchClearBtn.style.display = searchQuery ? 'flex' : 'none';

            // Switch to "All" so typing "Chocolate" finds matches across every
            // category, not just whichever tab happens to be selected.
            if (searchQuery.trim() && currentCategory !== 'all') {
                currentCategory = 'all';
                catTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'all'));
            }

            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(renderProducts, 120);
        });
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            searchClearBtn.style.display = 'none';
            currentPage = 1;
            renderProducts();
            searchInput.focus();
        });
    }

    // Initial load: show skeletons briefly, then render, so the page feels
    // like it's fetching fresh data instead of popping in instantly.
    renderWithLoadingState();
});
