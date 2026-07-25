document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    const paginationContainer = document.getElementById('paginationContainer');
    const catTabs = document.querySelectorAll('.cat-tab');
    if (window.CartStore) window.CartStore.updateBadge();

    const productsData = [
        { id: 1, category: "best-sellers", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Strawberry Bliss", rating: "5.0 (1,420 orders)", star: true, price: "$5.50" },
        { id: 2, category: "best-sellers", img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80", title: "Chocolate Chip", rating: "4.2 (340 orders)", star: true, price: "$4.75" },
        { id: 3, category: "best-sellers", img: "https://images.unsplash.com/photo-1557142046-c704a3adf3ea?auto=format&fit=crop&w=400&q=80", title: "Chocolate Lover", rating: "4.9 (980 orders)", star: true, price: "$4.80" },
        { id: 4, category: "best-sellers", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80", title: "Matcha Dream", rating: "4.4 (195 orders)", star: true, price: "$5.20" },
        { id: 5, category: "best-sellers", img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80", title: "Vanilla Bean Cloud", rating: "4.5 (630 orders)", star: true, price: "$4.20" },
        { id: 6, category: "best-sellers", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Hot Fudge Sundae", rating: "4.9 (1,150 orders)", star: true, price: "$6.50" },
        { id: 7, category: "best-sellers", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Chocolate Shake", rating: "4.8 (890 orders)", star: true, price: "$5.50" },
        { id: 8, category: "best-sellers", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Oreo Celebration Cake", rating: "4.3 (215 orders)", star: true, price: "$24.99" },
        
        { id: 9, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Hot Fudge Sundae", rating: "4.9 (1,150 orders)", star: true, price: "$6.50" },
        { id: 10, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Mango Tango Sundae", rating: "4.9 (420 orders)", star: true, price: "$6.20" },
        { id: 11, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Banana Split", rating: "4.1 (410 orders)", star: false, price: "$7.00" },
        { id: 12, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Caramel Pecan Sundae", rating: "4.5 (310 orders)", star: false, price: "$6.80" },
        { id: 13, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Brownie Extreme Sundae", rating: "4.9 (670 orders)", star: false, price: "$7.50" },
        { id: 14, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Berry Blast Sundae", rating: "4.7 (240 orders)", star: false, price: "$6.90" },
        { id: 15, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Marshmallow Mountain Sundae", rating: "4.6 (180 orders)", star: false, price: "$6.75" },
        { id: 16, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Toffee Crunch Sundae", rating: "4.8 (320 orders)", star: false, price: "$7.10" },

        { id: 17, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Chocolate Shake", rating: "4.8 (890 orders)", star: true, price: "$5.50" },
        { id: 18, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Vanilla Milkshake", rating: "4.3 (300 orders)", star: false, price: "$5.00" },
        { id: 19, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Strawberry Shake", rating: "4.6 (450 orders)", star: false, price: "$5.20" },
        { id: 20, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Cookies & Cream Shake", rating: "4.8 (600 orders)", star: false, price: "$5.80" },
        { id: 21, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Matcha Latte Shake", rating: "4.4 (180 orders)", star: false, price: "$5.60" },
        { id: 22, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Peanut Butter Blast Shake", rating: "4.9 (310 orders)", star: false, price: "$6.00" },
        { id: 23, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Caramel Coffee Shake", rating: "4.5 (210 orders)", star: false, price: "$5.90" },
        { id: 24, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Blueberry Bliss Shake", rating: "4.7 (250 orders)", star: false, price: "$5.75" },

        { id: 25, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Oreo Celebration Cake", rating: "4.3 (215 orders)", star: true, price: "$24.99" },
        { id: 26, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Velvet Ice Cream Cake", rating: "4.5 (130 orders)", star: false, price: "$26.00" },
        { id: 27, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Mango Cheesecake Cake", rating: "4.7 (210 orders)", star: false, price: "$28.00" },
        { id: 28, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Dark Fudge Ice Cake", rating: "4.9 (340 orders)", star: false, price: "$29.50" },
        { id: 29, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Strawberry Shortcake", rating: "4.4 (150 orders)", star: false, price: "$25.00" },
        { id: 30, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Mint Choc Chip Ice Cake", rating: "4.6 (115 orders)", star: false, price: "$27.50" },
        { id: 31, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Tiramisu Gelato Cake", rating: "4.8 (190 orders)", star: false, price: "$30.00" },
        { id: 32, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Caramel Praline Cake", rating: "4.5 (140 orders)", star: false, price: "$28.50" },

        { id: 33, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Chocolate Dip Cone", rating: "4.0 (520 orders)", star: true, price: "$3.80" },
        { id: 34, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Waffle Cone Supreme", rating: "4.5 (430 orders)", star: false, price: "$4.00" },
        { id: 35, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Rainbow Sprinkles Cone", rating: "4.2 (280 orders)", star: false, price: "$3.50" },
        { id: 36, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Almond Crusted Cone", rating: "4.7 (390 orders)", star: false, price: "$4.50" },
        { id: 37, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Double Scoop Cone", rating: "4.8 (510 orders)", star: false, price: "$5.00" },
        { id: 38, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Triple Scoop Waffle Bowl", rating: "4.9 (640 orders)", star: false, price: "$6.20" },
        { id: 39, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Cinnamon Sugar Cone", rating: "4.4 (190 orders)", star: false, price: "$4.10" },
        { id: 40, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Dark Chocolate Waffle Cone", rating: "4.6 (310 orders)", star: false, price: "$4.60" },

        { id: 41, category: "scoops", img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80", title: "Mint Choc Chip Scoop", rating: "4.1 (110 orders)", star: false, price: "$4.50" },
        { id: 42, category: "scoops", img: "https://images.unsplash.com/photo-1557142046-c704a3adf3ea?auto=format&fit=crop&w=400&q=80", title: "Pistachio Royale Scoop", rating: "4.7 (310 orders)", star: false, price: "$5.90" },
        { id: 43, category: "scoops", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80", title: "Pumpkin Spice Scoop", rating: "4.3 (90 orders)", star: false, price: "$5.00" },
        { id: 44, category: "scoops", img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80", title: "Cookies & Cream Scoop", rating: "4.6 (500 orders)", star: false, price: "$4.80" },
        { id: 45, category: "scoops", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Salted Caramel Swirl Scoop", rating: "4.8 (750 orders)", star: false, price: "$5.40" },
        { id: 46, category: "scoops", img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80", title: "Rum Raisin Delight Scoop", rating: "4.2 (160 orders)", star: false, price: "$5.10" },
        { id: 47, category: "scoops", img: "https://images.unsplash.com/photo-1557142046-c704a3adf3ea?auto=format&fit=crop&w=400&q=80", title: "Hazelnut Crunch Scoop", rating: "4.7 (430 orders)", star: false, price: "$5.60" },
        { id: 48, category: "scoops", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80", title: "Wild Berry Sorbet Scoop", rating: "4.5 (220 orders)", star: false, price: "$4.90" }
    ];

    let currentCategory = 'best-sellers';
    let currentPage = 1;
    const itemsPerPage = 5;

    function renderProducts() {
        if (!productsGrid) return;
        const matchedProducts = productsData.filter(item => item.category === currentCategory);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentProducts = matchedProducts.slice(startIndex, startIndex + itemsPerPage);

        let htmlContent = '';
        if (currentProducts.length === 0) {
            htmlContent = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-sub);">No products found in this category.</div>`;
        } else {
            currentProducts.forEach(product => {
                htmlContent += `
                    <div class="product-card" data-category="${product.category}">
                        <button class="wishlist-btn" aria-label="Save to Wishlist"><i class="ti ti-heart"></i></button>
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
        renderPagination(matchedProducts.length);
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
                e.stopPropagation();
                btn.classList.toggle('active');
                btn.setAttribute('aria-pressed', btn.classList.contains('active'));
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
                }

                btn.classList.add('added');
                btn.innerHTML = `<i class="ti ti-check"></i> Added`;
            });
        });
    }

    catTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            catTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.getAttribute('data-category');
            currentPage = 1;
            renderProducts();
        });
    });

    renderProducts();
});