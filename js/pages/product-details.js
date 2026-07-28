document.addEventListener("DOMContentLoaded", () => {
    const productsData = (window.ProductsData && window.ProductsData.all) || [];

    // 1. Parse ID from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;

    const currentProduct = productsData.find(p => p.id === productId) || productsData[0];

    // Populate DOM elements with product details
    const imgEl = document.querySelector('.product-detail-img');
    const titleEl = document.querySelector('.product-detail-title');
    const priceEl = document.querySelector('.product-detail-price');
    const descEl = document.querySelector('.product-detail-description');
    const badgeEl = document.getElementById('detailBadge');

    if (imgEl) { imgEl.src = currentProduct.img; imgEl.alt = currentProduct.title; }
    if (titleEl) { titleEl.textContent = currentProduct.title; }
    if (priceEl) { priceEl.textContent = currentProduct.price; }
    if (descEl) { descEl.textContent = currentProduct.desc; }

    if (badgeEl) {
        if (currentProduct.isNew) {
            badgeEl.textContent = 'New';
            badgeEl.className = 'card-badge badge-new';
            badgeEl.style.display = 'flex';
        } else if (currentProduct.isBestSeller) {
            badgeEl.innerHTML = '<i class="ti ti-flame"></i> Best Seller';
            badgeEl.className = 'card-badge badge-best-seller';
            badgeEl.style.display = 'flex';
        } else {
            badgeEl.style.display = 'none';
        }
    }

    // 2. Quantity Selector Functionality
    const decreaseBtn = document.getElementById("decreaseQty");
    const increaseBtn = document.getElementById("increaseQty");
    const quantityInput = document.getElementById("quantityInput");

    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener("click", () => {
            let currentVal = parseInt(quantityInput.value) || 1;
            if (currentVal > 1) {
                quantityInput.value = currentVal - 1;
            }
        });

        increaseBtn.addEventListener("click", () => {
            let currentVal = parseInt(quantityInput.value) || 1;
            quantityInput.value = currentVal + 1;
        });
    }

    // 3. Cart Badge Management & Synchronization
    if (window.CartStore) window.CartStore.updateBadge();

    // 4. Add to Cart Behavior (Normal state without redirection)
    const addToCartBtn = document.getElementById("detailAddToCartBtn");

    if (addToCartBtn) {
        let originalText = addToCartBtn.innerHTML;

        addToCartBtn.addEventListener("click", () => {
            const quantityToAdd = parseInt(quantityInput ? quantityInput.value : 1) || 1;

            if (window.CartStore) {
                window.CartStore.addItem(currentProduct, quantityToAdd);
            }

            if (window.showToast) {
                window.showToast(`${currentProduct.title} added to cart`, 'success');
            }

            // Show success feedback temporarily, then revert back to normal
            addToCartBtn.classList.add("active");
            addToCartBtn.innerHTML = `<i class="ti ti-check"></i> Added`;

            setTimeout(() => {
                addToCartBtn.classList.remove("active");
                addToCartBtn.innerHTML = originalText;
            }, 1500);
        });
    }

    // 5. Wishlist Heart
    const wishlistBtn = document.getElementById('detailWishlistBtn');
    if (wishlistBtn && window.WishlistStore) {
        const saved = window.WishlistStore.isSaved(currentProduct.id);
        wishlistBtn.classList.toggle('active', saved);
        wishlistBtn.querySelector('i').className = `ti ${saved ? 'ti-heart-filled' : 'ti-heart'}`;

        wishlistBtn.addEventListener('click', () => {
            const nowSaved = window.WishlistStore.toggle(currentProduct);
            wishlistBtn.classList.toggle('active', nowSaved);
            wishlistBtn.querySelector('i').className = `ti ${nowSaved ? 'ti-heart-filled' : 'ti-heart'}`;
            if (window.showToast) {
                window.showToast(nowSaved ? `${currentProduct.title} added to wishlist` : `${currentProduct.title} removed from wishlist`, 'info');
            }
        });
    }

    // 6. "You May Also Like" — recommendations from the same category
    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (relatedGrid && window.ProductsData) {
        const related = window.ProductsData.getRelated(currentProduct, 4);

        if (related.length === 0) {
            relatedGrid.closest('.you-may-like-section').style.display = 'none';
        } else {
            relatedGrid.innerHTML = related.map(product => `
                <div class="product-card" data-category="${product.category}">
                    ${product.isNew ? '<span class="card-badge badge-new">New</span>' : (product.isBestSeller ? '<span class="card-badge badge-best-seller"><i class="ti ti-flame"></i> Best Seller</span>' : '')}
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
                        <button class="add-to-cart-btn related-add-to-cart-btn" data-id="${product.id}">
                            <i class="ti ti-shopping-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');

            relatedGrid.querySelectorAll('.related-add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = btn.getAttribute('data-id');
                    const product = productsData.find(p => String(p.id) === String(id));
                    if (product && window.CartStore) {
                        window.CartStore.addItem(product, 1);
                        if (window.showToast) window.showToast(`${product.title} added to cart`, 'success');
                    }
                    btn.classList.add('added');
                    btn.innerHTML = `<i class="ti ti-check"></i> Added`;
                });
            });
        }
    }
});
