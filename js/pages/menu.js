document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    const paginationContainer = document.getElementById('paginationContainer');
    const catTabs = document.querySelectorAll('.cat-tab');
    if (window.CartStore) window.CartStore.updateBadge();

    const productsData = [
        
        { id: 1, category: "best-sellers", img: "https://i.pinimg.com/1200x/ae/78/10/ae7810385c6cb445eccddfce7f8986f0.jpg", title: "Strawberry Bliss", rating: "5.0 (1,420 orders)", star: true, price: "$5.50" },
        { id: 2, category: "best-sellers", img: "https://i.pinimg.com/1200x/9f/97/3f/9f973fa075445404871ef0005e1f31ae.jpg", title: "Chocolate Chip", rating: "4.2 (340 orders)", star: true, price: "$4.75" },
        { id: 3, category: "best-sellers", img: "https://i.pinimg.com/1200x/c7/59/fd/c759fddd7579ddab6ae287c87a5f7895.jpg", title: "Chocolate Lover", rating: "4.9 (980 orders)", star: true, price: "$4.80" },
        { id: 4, category: "best-sellers", img: "https://i.pinimg.com/1200x/90/5c/4b/905c4b31e793d1a986fead40fe35b7c9.jpg", title: "Matcha Dream", rating: "4.4 (195 orders)", star: true, price: "$5.20" },
        { id: 5, category: "best-sellers", img: "https://i.pinimg.com/1200x/40/d6/98/40d698825dff73ff4bb026a509bb6727.jpg", title: "Vanilla Bean Cloud", rating: "4.5 (630 orders)", star: true, price: "$4.20" },
        { id: 6, category: "best-sellers", img: "https://i.pinimg.com/1200x/ed/3c/af/ed3caf5a5b65ea3c74dd838962743cf5.jpg", title: "Hot Fudge Sundae", rating: "4.9 (1,150 orders)", star: true, price: "$6.50" },
        { id: 7, category: "best-sellers", img: "https://i.pinimg.com/1200x/00/58/2c/00582c50306566a48094d9589a2db125.jpg", title: "Chocolate Shake", rating: "4.8 (890 orders)", star: true, price: "$5.50" },
        { id: 8, category: "best-sellers", img: "https://i.pinimg.com/1200x/b3/7d/f7/b37df7fc4976b13c8b5d38fe83c550d3.jpg", title: "Oreo Celebration Cake", rating: "4.3 (215 orders)", star: true, price: "$24.99" },

        
        { id: 9, category: "sundaes", img: "https://i.pinimg.com/1200x/ed/3c/af/ed3caf5a5b65ea3c74dd838962743cf5.jpg", title: "Hot Fudge Sundae", rating: "4.9 (1,150 orders)", star: true, price: "$6.50" },
        { id: 10, category: "sundaes", img: "https://i.pinimg.com/1200x/ca/e6/2a/cae62a3ed327c78ce2a5addc866eec75.jpg", title: "Mango Tango Sundae", rating: "4.9 (420 orders)", star: true, price: "$6.20" },
        { id: 11, category: "sundaes", img: "https://i.pinimg.com/1200x/31/d2/90/31d29082d0e3a34d18c6b93d30228d7d.jpg", title: "Banana Split", rating: "4.1 (410 orders)", star: false, price: "$7.00" },
        { id: 12, category: "sundaes", img: "https://i.pinimg.com/1200x/23/2e/30/232e306714da15c58d2cf93d8fe22f61.jpg", title: "Caramel Pecan Sundae", rating: "4.5 (310 orders)", star: false, price: "$6.80" },
        { id: 13, category: "sundaes", img: "https://i.pinimg.com/1200x/55/f3/1c/55f31ccc29a8cd0a5562b536ee4cda26.jpg", title: "Brownie Extreme Sundae", rating: "4.9 (670 orders)", star: false, price: "$7.50" },
        { id: 14, category: "sundaes", img: "https://i.pinimg.com/1200x/ed/f2/f5/edf2f5c16d96a188d5eea2611c45f93b.jpg", title: "Berry Blast Sundae", rating: "4.7 (240 orders)", star: false, price: "$6.90" },
        { id: 15, category: "sundaes", img: "https://i.pinimg.com/1200x/6d/70/20/6d70200b9cd9e68af0306b9a0f4a849b.jpg", title: "Marshmallow Mountain Sundae", rating: "4.6 (180 orders)", star: false, price: "$6.75" },
        { id: 16, category: "sundaes", img: "https://i.pinimg.com/1200x/90/33/d4/9033d4015d0ed678dc476be265179950.jpg", title: "Toffee Crunch Sundae", rating: "4.8 (320 orders)", star: false, price: "$7.10" },

        { id: 17, category: "shakes", img: "https://i.pinimg.com/1200x/47/61/b4/4761b4f0694e2b143e84d1337d1b148e.jpg", title: "Chocolate Shake", rating: "4.8 (890 orders)", star: true, price: "$5.50" },
        { id: 18, category: "shakes", img: "https://i.pinimg.com/1200x/3d/b9/a2/3db9a23d047bbe0fdf5d9299a3ba654b.jpg", title: "Vanilla Milkshake", rating: "4.3 (300 orders)", star: false, price: "$5.00" },
        { id: 19, category: "shakes", img: "https://i.pinimg.com/1200x/e2/7d/b2/e27db22fd60d2c0613489f4cf73d8773.jpg", title: "Strawberry Shake", rating: "4.6 (450 orders)", star: false, price: "$5.20" },
        { id: 20, category: "shakes", img: "https://i.pinimg.com/1200x/d5/a0/6e/d5a06ea3bdbe518646766da933c2df7f.jpg", title: "Cookies & Cream Shake", rating: "4.8 (600 orders)", star: false, price: "$5.80" },
        { id: 21, category: "shakes", img: "https://i.pinimg.com/1200x/ee/70/7d/ee707d79c523762cb8b1b25962f40aee.jpg", title: "Matcha Latte Shake", rating: "4.4 (180 orders)", star: false, price: "$5.60" },
        { id: 22, category: "shakes", img: "https://i.pinimg.com/1200x/dc/23/a5/dc23a51fdd7234915c939314b4b9b839.jpg", title: "Peanut Butter Blast Shake", rating: "4.9 (310 orders)", star: false, price: "$6.00" },
        { id: 23, category: "shakes", img: "https://i.pinimg.com/1200x/fa/79/bd/fa79bd738d9e97d2cf8fba47a0dd0b6e.jpg", title: "Caramel Coffee Shake", rating: "4.5 (210 orders)", star: false, price: "$5.90" },
        { id: 24, category: "shakes", img: "https://i.pinimg.com/1200x/e3/78/59/e378592766cf9f7b8a5e30aae5696355.jpg", title: "Blueberry Bliss Shake", rating: "4.7 (250 orders)", star: false, price: "$5.75" },

        { id: 25, category: "cakes", img: "https://i.pinimg.com/1200x/dc/86/86/dc868648e0c00d4a7cd7c45aa62e82f1.jpg", title: "Oreo Celebration Cake", rating: "4.3 (215 orders)", star: true, price: "$24.99" },
        { id: 26, category: "cakes", img: "https://i.pinimg.com/1200x/a4/a8/5a/a4a85abf1bab06723db7770ce8a3ad73.jpg", title: "Velvet Ice Cream Cake", rating: "4.5 (130 orders)", star: false, price: "$26.00" },
        { id: 27, category: "cakes", img: "https://i.pinimg.com/1200x/97/df/2f/97df2f839e461acd99b737815d08f518.jpg", title: "Mango Cheesecake Cake", rating: "4.7 (210 orders)", star: false, price: "$28.00" },
        { id: 28, category: "cakes", img: "https://i.pinimg.com/1200x/cd/78/d4/cd78d4eaca2b2528c6b08527dbdbf0b3.jpg", title: "Dark Fudge Ice Cake", rating: "4.9 (340 orders)", star: false, price: "$29.50" },
        { id: 29, category: "cakes", img: "https://i.pinimg.com/1200x/2e/8a/f0/2e8af0843927c63ce4689e62063b8fdd.jpg", title: "Strawberry Shortcake", rating: "4.4 (150 orders)", star: false, price: "$25.00" },
        { id: 30, category: "cakes", img: "https://i.pinimg.com/1200x/78/24/3a/78243a6182361f3c77ba98117bb0a167.jpg", title: "Mint Choc Chip Ice Cake", rating: "4.6 (115 orders)", star: false, price: "$27.50" },
        { id: 31, category: "cakes", img: "https://i.pinimg.com/1200x/49/d5/ae/49d5aef143396ebf8b157bcf8cf75bcb.jpg", title: "Tiramisu Gelato Cake", rating: "4.8 (190 orders)", star: false, price: "$30.00" },
        { id: 32, category: "cakes", img: "https://i.pinimg.com/1200x/d0/dd/63/d0dd63cc16f6444c2a3bc0161e169773.jpg", title: "Caramel Praline Cake", rating: "4.5 (140 orders)", star: false, price: "$28.50" },

        { id: 33, category: "cones", img: "https://i.pinimg.com/1200x/ea/02/80/ea0280bf38818bc1bb180a89133391cc.jpg", title: "Chocolate Dip Cone", rating: "4.0 (520 orders)", star: true, price: "$3.80" },
        { id: 34, category: "cones", img: "https://i.pinimg.com/1200x/6d/a5/60/6da5602185f062eb27fe911abb271783.jpg", title: "Waffle Cone Supreme", rating: "4.5 (430 orders)", star: false, price: "$4.00" },
        { id: 35, category: "cones", img: "https://i.pinimg.com/1200x/60/da/2c/60da2c9d1e78fd15323a176ace7e7dfa.jpg", title: "Rainbow Sprinkles Cone", rating: "4.2 (280 orders)", star: false, price: "$3.50" },
        { id: 36, category: "cones", img: "https://i.pinimg.com/1200x/53/59/cc/5359ccade565d907c41f37396aae6c6c.jpg", title: "Almond Crusted Cone", rating: "4.7 (390 orders)", star: false, price: "$4.50" },
        { id: 37, category: "cones", img: "https://i.pinimg.com/1200x/eb/5f/9e/eb5f9eaf21bf8de8006bf6384a24f4eb.jpg", title: "Double Scoop Cone", rating: "4.8 (510 orders)", star: false, price: "$5.00" },
        { id: 38, category: "cones", img: "https://i.pinimg.com/1200x/22/70/5f/22705ff496ad3ff5f813fc0c4ec2b43f.jpg", title: "Triple Scoop Waffle Bowl", rating: "4.9 (640 orders)", star: false, price: "$6.20" },
        { id: 39, category: "cones", img: "https://i.pinimg.com/1200x/32/0f/e0/320fe0d0318748b5e54ba3d6ff4e66e3.jpg", title: "Cinnamon Sugar Cone", rating: "4.4 (190 orders)", star: false, price: "$4.10" },
        { id: 40, category: "cones", img: "https://i.pinimg.com/1200x/61/6d/e8/616de82b96682d95b71250ff8c422102.jpg", title: "Dark Chocolate Waffle Cone", rating: "4.6 (310 orders)", star: false, price: "$4.60" },

        { id: 41, category: "scoops", img: "https://i.pinimg.com/1200x/f7/ad/32/f7ad32a74d6b090900a0958a45be4704.jpg", title: "Mint Choc Chip Scoop", rating: "4.1 (110 orders)", star: false, price: "$4.50" },
    { id: 42, category: "scoops", img: "https://i.pinimg.com/1200x/2e/ae/6c/2eae6c7b2288a22bc0f7fd69f89681a5.jpg", title: "Pistachio Royale Scoop", rating: "4.7 (310 orders)", star: false, price: "$5.90" },
    { id: 43, category: "scoops", img: "https://i.pinimg.com/1200x/90/49/6b/90496b672eb13e46595192c3ee285988.jpg", title: "Pumpkin Spice Scoop", rating: "4.3 (90 orders)", star: false, price: "$5.00" },
    { id: 44, category: "scoops", img: "https://i.pinimg.com/1200x/b6/78/f4/b678f4590226839d4f7c4491746abe06.jpg", title: "Cookies & Cream Scoop", rating: "4.6 (500 orders)", star: false, price: "$4.80" },
    { id: 45, category: "scoops", img: "https://i.pinimg.com/1200x/cf/47/0a/cf470a8a891c23ffdb52815a29a44b64.jpg", title: "Salted Caramel Swirl Scoop", rating: "4.8 (750 orders)", star: false, price: "$5.40" },
    { id: 46, category: "scoops", img: "https://i.pinimg.com/1200x/3b/da/3b/3bda3bdd510bc409a683e67a54b41a77.jpg", title: "Rum Raisin Delight Scoop", rating: "4.2 (160 orders)", star: false, price: "$5.10" },
    { id: 47, category: "scoops", img: "https://i.pinimg.com/1200x/16/24/7b/16247bf14a4988cc1ccd133ee05192cb.jpg", title: "Hazelnut Crunch Scoop", rating: "4.7 (430 orders)", star: false, price: "$5.60" },
    { id: 48, category: "scoops", img: "https://i.pinimg.com/1200x/61/9b/dd/619bdddb1045d7b3dfadda12168a1d56.jpg", title: "Wild Berry Sorbet Scoop", rating: "4.5 (220 orders)", star: false, price: "$4.90" }
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