document.addEventListener("DOMContentLoaded", () => {
    // 1. Full Products Data Array (All 48 items across all 6 categories)
    const productsData = [
        // Best Sellers (IDs 1-8)
        { id: 1, category: "best-sellers", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Strawberry Bliss", rating: "5.0 (1,420 orders)", star: true, price: "$5.50", desc: "A delightful blend of fresh sweet strawberries and creamy artisanal gelato." },
        { id: 2, category: "best-sellers", img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80", title: "Chocolate Chip", rating: "4.2 (340 orders)", star: true, price: "$4.75", desc: "Classic vanilla gelato packed with rich, premium dark chocolate chips." },
        { id: 3, category: "best-sellers", img: "https://images.unsplash.com/photo-1557142046-c704a3adf3ea?auto=format&fit=crop&w=400&q=80", title: "Chocolate Lover", rating: "4.9 (980 orders)", star: true, price: "$4.80", desc: "An intense, velvety smooth triple chocolate experience for true enthusiasts." },
        { id: 4, category: "best-sellers", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80", title: "Matcha Dream", rating: "4.4 (195 orders)", star: true, price: "$5.20", desc: "Authentic Japanese ceremonial-grade matcha blended into rich cream." },
        { id: 5, category: "best-sellers", img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80", title: "Vanilla Bean Cloud", rating: "4.5 (630 orders)", star: true, price: "$4.20", desc: "Smooth Madagascar vanilla bean infused into a light, airy gelato base." },
        { id: 6, category: "best-sellers", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Hot Fudge Sundae", rating: "4.9 (1,150 orders)", star: true, price: "$6.50", desc: "Decadent layers of gelato drenched in warm, gooey homemade hot fudge." },
        { id: 7, category: "best-sellers", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Chocolate Shake", rating: "4.8 (890 orders)", star: true, price: "$5.50", desc: "Thick, creamy blended chocolate shake topped with whipped cream." },
        { id: 8, category: "best-sellers", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Oreo Celebration Cake", rating: "4.3 (215 orders)", star: true, price: "$24.99", desc: "Ice cream celebration cake loaded with crushed Oreo cookies." },

        // Sundaes (IDs 9-16)
        { id: 9, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Hot Fudge Sundae", rating: "4.9 (1,150 orders)", star: true, price: "$6.50", desc: "Decadent layers of gelato drenched in warm, gooey homemade hot fudge." },
        { id: 10, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Mango Tango Sundae", rating: "4.9 (420 orders)", star: true, price: "$6.20", desc: "Tropical mango chunks paired with sweet vanilla and fruit drizzle." },
        { id: 11, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Banana Split", rating: "4.1 (410 orders)", star: false, price: "$7.00", desc: "Traditional split banana served with three scoops and classic toppings." },
        { id: 12, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Caramel Pecan Sundae", rating: "4.5 (310 orders)", star: false, price: "$6.80", desc: "Buttery caramel sauce topped with crunchy roasted pecans." },
        { id: 13, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Brownie Extreme Sundae", rating: "4.9 (670 orders)", star: false, price: "$7.50", desc: "Warm fudge brownie pieces layered with rich chocolate gelato." },
        { id: 14, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Berry Blast Sundae", rating: "4.7 (240 orders)", star: false, price: "$6.90", desc: "An explosion of mixed wild berries over creamy vanilla gelato." },
        { id: 15, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Marshmallow Mountain Sundae", rating: "4.6 (180 orders)", star: false, price: "$6.75", desc: "Toasted marshmallow fluff layered with sweet cream scoops." },
        { id: 16, category: "sundaes", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Toffee Crunch Sundae", rating: "4.8 (320 orders)", star: false, price: "$7.10", desc: "Crushed English toffee bits sprinkled over salted caramel gelato." },

        // Shakes (IDs 17-24)
        { id: 17, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Chocolate Shake", rating: "4.8 (890 orders)", star: true, price: "$5.50", desc: "Thick, creamy blended chocolate shake topped with whipped cream." },
        { id: 18, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Vanilla Milkshake", rating: "4.3 (300 orders)", star: false, price: "$5.00", desc: "Classic smooth vanilla milkshake blended to perfection." },
        { id: 19, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Strawberry Shake", rating: "4.6 (450 orders)", star: false, price: "$5.20", desc: "Fresh strawberry puree blended with rich cream." },
        { id: 20, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Cookies & Cream Shake", rating: "4.8 (600 orders)", star: false, price: "$5.80", desc: "Crushed cookies blended into a thick, sweet ice cream base." },
        { id: 21, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Matcha Latte Shake", rating: "4.4 (180 orders)", star: false, price: "$5.60", desc: "Earthy green tea matcha blended into a creamy cold shake." },
        { id: 22, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Peanut Butter Blast Shake", rating: "4.9 (310 orders)", star: false, price: "$6.00", desc: "Rich creamy peanut butter whipped into a decadent shake." },
        { id: 23, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Caramel Coffee Shake", rating: "4.5 (210 orders)", star: false, price: "$5.90", desc: "Espresso kick combined with sweet caramel syrup and milk." },
        { id: 24, category: "shakes", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", title: "Blueberry Bliss Shake", rating: "4.7 (250 orders)", star: false, price: "$5.75", desc: "Sweet wild blueberries blended with smooth vanilla cream." },

        // Cakes (IDs 25-32)
        { id: 25, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Oreo Celebration Cake", rating: "4.3 (215 orders)", star: true, price: "$24.99", desc: "Ice cream celebration cake loaded with crushed Oreo cookies." },
        { id: 26, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Velvet Ice Cream Cake", rating: "4.5 (130 orders)", star: false, price: "$26.00", desc: "Luxurious red velvet layers combined with sweet cream gelato." },
        { id: 27, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Mango Cheesecake Cake", rating: "4.7 (210 orders)", star: false, price: "$28.00", desc: "Tropical mango cheesecake styled in an ice cream format." },
        { id: 28, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Dark Fudge Ice Cake", rating: "4.9 (340 orders)", star: false, price: "$29.50", desc: "Intense dark fudge layers coated in rich chocolate frosting." },
        { id: 29, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Strawberry Shortcake", rating: "4.4 (150 orders)", star: false, price: "$25.00", desc: "Light sponge cake filled with fresh strawberry gelato slices." },
        { id: 30, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Mint Choc Chip Ice Cake", rating: "4.6 (115 orders)", star: false, price: "$27.50", desc: "Refreshing mint chocolate chip layers baked into an ice cream cake." },
        { id: 31, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Tiramisu Gelato Cake", rating: "4.8 (190 orders)", star: false, price: "$30.00", desc: "Coffee-soaked ladyfinger layers paired with mascarpone gelato." },
        { id: 32, category: "cakes", img: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80", title: "Caramel Praline Cake", rating: "4.5 (140 orders)", star: false, price: "$28.50", desc: "Sweet praline crunch layered with buttery caramel ice cream." },

        // Cones (IDs 33-40)
        { id: 33, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Chocolate Dip Cone", rating: "4.0 (520 orders)", star: true, price: "$3.80", desc: "Crispy waffle cone dipped in a hardened chocolate shell." },
        { id: 34, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Waffle Cone Supreme", rating: "4.5 (430 orders)", star: false, price: "$4.00", desc: "Freshly baked golden waffle cone with a crisp bite." },
        { id: 35, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Rainbow Sprinkles Cone", rating: "4.2 (280 orders)", star: false, price: "$3.50", desc: "Fun colorful sprinkles lining a sweet crunchy cone." },
        { id: 36, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Almond Crusted Cone", rating: "4.7 (390 orders)", star: false, price: "$4.50", desc: "Cone rim rolled in toasted roasted almonds." },
        { id: 37, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Double Scoop Cone", rating: "4.8 (510 orders)", star: false, price: "$5.00", desc: "Sturdy structured cone designed to hold two giant scoops." },
        { id: 38, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Triple Scoop Waffle Bowl", rating: "4.9 (640 orders)", star: false, price: "$6.20", desc: "Wide waffle bowl loaded with three delicious scoops." },
        { id: 39, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Cinnamon Sugar Cone", rating: "4.4 (190 orders)", star: false, price: "$4.10", desc: "Fragrant cinnamon sugar dusting inside a crispy cone." },
        { id: 40, category: "cones", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80", title: "Dark Chocolate Waffle Cone", rating: "4.6 (310 orders)", star: false, price: "$4.60", desc: "Cocoa-infused waffle cone for chocolate lovers." },

        // Scoops (IDs 41-48)
        { id: 41, category: "scoops", img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80", title: "Mint Choc Chip Scoop", rating: "4.1 (110 orders)", star: false, price: "$4.50", desc: "Single refreshing scoop of cool mint with chocolate shards." },
        { id: 42, category: "scoops", img: "https://images.unsplash.com/photo-1557142046-c704a3adf3ea?auto=format&fit=crop&w=400&q=80", title: "Pistachio Royale Scoop", rating: "4.7 (310 orders)", star: false, price: "$5.90", desc: "Rich nutty pistachio flavor made with authentic Mediterranean nuts." },
        { id: 43, category: "scoops", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80", title: "Pumpkin Spice Scoop", rating: "4.3 (90 orders)", star: false, price: "$5.00", desc: "Cozy seasonal autumn spices blended into sweet cream." },
        { id: 44, category: "scoops", img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80", title: "Cookies & Cream Scoop", rating: "4.6 (500 orders)", star: false, price: "$4.80", desc: "Single scoop packed with crunchy chocolate cookie bits." },
        { id: 45, category: "scoops", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80", title: "Salted Caramel Swirl Scoop", rating: "4.8 (750 orders)", star: false, price: "$5.40", desc: "Sweet cream gelato laced with a savory salted caramel ribbon." },
        { id: 46, category: "scoops", img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80", title: "Rum Raisin Delight Scoop", rating: "4.2 (160 orders)", star: false, price: "$5.10", desc: "Plump rum-soaked raisins folded into rich custard gelato." },
        { id: 47, category: "scoops", img: "https://images.unsplash.com/photo-1557142046-c704a3adf3ea?auto=format&fit=crop&w=400&q=80", title: "Hazelnut Crunch Scoop", rating: "4.7 (430 orders)", star: false, price: "$5.60", desc: "Toasted Italian hazelnuts blended with smooth chocolate-cream." },
        { id: 48, category: "scoops", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80", title: "Wild Berry Sorbet Scoop", rating: "4.5 (220 orders)", star: false, price: "$4.90", desc: "Refreshing dairy-free fruit sorbet packed with wild berries." }
    ];

    // 2. Parse ID from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;

    const currentProduct = productsData.find(p => p.id === productId) || productsData[0];

    // Populate DOM elements with product details
    const imgEl = document.querySelector('.product-detail-img');
    const titleEl = document.querySelector('.product-detail-title');
    const priceEl = document.querySelector('.product-detail-price');
    const descEl = document.querySelector('.product-detail-description');

    if (imgEl) { imgEl.src = currentProduct.img; imgEl.alt = currentProduct.title; }
    if (titleEl) { titleEl.textContent = currentProduct.title; }
    if (priceEl) { priceEl.textContent = currentProduct.price; }
    if (descEl) { descEl.textContent = currentProduct.desc; }

    // 3. Quantity Selector Functionality
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

    // 4. Cart Badge Management & Synchronization
    const cartBadge = document.getElementById('cartBadge') || document.querySelector('.cart-badge');
    
    function updateCartBadge(count) {
        if (cartBadge) {
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }

    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    updateCartBadge(cartCount);

    // 5. Add to Cart Behavior (Normal state without redirection)
    const addToCartBtn = document.getElementById("detailAddToCartBtn");

    if (addToCartBtn) {
        let originalText = addToCartBtn.innerHTML;

        addToCartBtn.addEventListener("click", () => {
            const quantityToAdd = parseInt(quantityInput ? quantityInput.value : 1) || 1;

            cartCount += quantityToAdd;
            updateCartBadge(cartCount);
            localStorage.setItem('cartCount', cartCount);

            // Show success feedback temporarily, then revert back to normal
            addToCartBtn.classList.add("active");
            addToCartBtn.innerHTML = `<i class="ti ti-check"></i> Added`;

            setTimeout(() => {
                addToCartBtn.classList.remove("active");
                addToCartBtn.innerHTML = originalText;
            }, 1500);
        });
    }

    // Listen to storage changes across pages for real-time updates
    window.addEventListener('storage', (e) => {
        if (e.key === 'cartCount') {
            cartCount = parseInt(e.newValue) || 0;
            updateCartBadge(cartCount);
        }
    });
});