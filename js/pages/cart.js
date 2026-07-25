document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 0. Cart Badge Management & Synchronization
    // (actual cart storage now lives in CartStore, shared across pages)
    // ==========================================
    if (window.CartStore) window.CartStore.updateBadge();

    // ==========================================
    // 1. Hero Section Slideshow
    // ==========================================
    const track = document.getElementById('heroTrack');
    if (track) {
        const slides = track.querySelectorAll('.hero-slide');
        let currentIndex = 0;
        const totalItems = 6;

        function getSlideStep() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            const computedStyle = window.getComputedStyle(slides[0]);
            const marginRight = parseFloat(computedStyle.marginRight);
            return slideWidth + marginRight;
        }

        function getBaseOffset() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            return slideWidth / 2;
        }

        function moveToNextSlide() {
            currentIndex++;
            const step = getSlideStep();
            const baseOffset = getBaseOffset();
            track.style.transform = `translateY(-50%) translateX(calc(-${baseOffset}px - ${currentIndex * step}px))`;

            if (currentIndex === totalItems) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = 0;
                    track.style.transform = `translateY(-50%) translateX(calc(-${baseOffset}px - 0px))`;
                    
                    setTimeout(() => {
                        track.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
                    }, 50);
                }, 1200);
            }
        }

        setInterval(moveToNextSlide, 5200);
    }

    // ==========================================
    // 2. Categories Dynamic Scrolling & Dot Tracking
    // ==========================================
    const catGrid = document.querySelector('.categories-grid');
    const catDots = document.querySelectorAll('.categories-section .scroll-dots .dot');
    const catCards = document.querySelectorAll('.category-card');

    if (catGrid && catDots.length > 0 && catCards.length > 0) {
        catGrid.addEventListener('scroll', () => {
            const scrollLeft = catGrid.scrollLeft;
            const cardWidth = catCards[0].offsetWidth + 15;
            const index = Math.round(scrollLeft / cardWidth);

            catDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            catCards.forEach((card, i) => {
                card.classList.toggle('active-card', i === index);
            });
        });
    }

    // ==========================================
    // 3. Best Sellers Dynamic Scrolling & Dot Tracking
    // ==========================================
    const bsGrid = document.querySelector('.bestsellers-grid');
    const bsDots = document.querySelectorAll('.bestsellers-section .scroll-dots .dot');
    const bsCards = document.querySelectorAll('.bestseller-card');

    if (bsGrid && bsDots.length > 0 && bsCards.length > 0) {
        bsGrid.addEventListener('scroll', () => {
            const scrollLeft = bsGrid.scrollLeft;
            const cardWidth = bsCards[0].offsetWidth + 12;
            const index = Math.round(scrollLeft / cardWidth);

            bsDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            bsCards.forEach((card, i) => {
                card.classList.toggle('active-card', i === index);
            });
        });
    }

    // ==========================================
    // 4. Render the cart page from CartStore (the real, shared cart data)
    // ==========================================
    const cartItemsSection = document.querySelector('.cart-items-section');

    function buildCartItemCard(item) {
        const card = document.createElement('div');
        card.className = 'cart-item-card';
        card.setAttribute('data-id', item.id);
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <span class="cart-item-price" data-price="${item.price.toFixed(2)}">$${item.price.toFixed(2)}</span>
            </div>
            <div class="cart-quantity-controls">
                <button class="qty-btn decrease-qty" type="button" aria-label="Decrease quantity">-</button>
                <input type="text" class="qty-input" value="${item.qty}" readonly>
                <button class="qty-btn increase-qty" type="button" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
            <button class="remove-item-btn" type="button" aria-label="Remove item"><i class="ti ti-trash"></i></button>
        `;
        return card;
    }

    function renderCartFromStore() {
        if (!cartItemsSection || !window.CartStore) return;
        const items = window.CartStore.getItems();

        cartItemsSection.innerHTML = '';

        if (items.length === 0) {
            cartItemsSection.innerHTML = `
                <div class="empty-cart-message" style="text-align:center; padding: 40px 20px; color: var(--text-sub);">
                    <p>Your cart is empty.</p>
                    <a href="menu.html" class="btn-primary" style="display:inline-block; margin-top: 12px;">Browse the Menu</a>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            cartItemsSection.appendChild(buildCartItemCard(item));
        });
    }

    renderCartFromStore();

    // ==========================================
    // 5. Wishlist Button Toggle States
    // ==========================================
    const wishlistButtons = document.querySelectorAll(".wishlist-btn");

    wishlistButtons.forEach(button => {
        const icon = button.querySelector("i");
        
        button.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle("active");
            if (this.classList.contains("active")) {
                icon.className = "ti ti-heart-filled";
            } else {
                icon.className = "ti ti-heart";
            }
        });
    });

    // ==========================================
    // 6. Testimonial Carousel Logic
    // ==========================================
    const testimonialsData = [
        { rating: "★★★★★", text: "The ice cream is so fresh and delicious! My family loves it.", avatar: "https://i.pinimg.com/736x/73/85/d6/7385d60c7a168fd851ee08ee6eb3cb76.jpg", name: "Sreyneang P.", location: "Phnom Penh" },
        { rating: "★★★★★", text: "Best ice cream I've ever had! Creamy, rich, and perfect.", avatar: "https://i.pinimg.com/736x/57/04/cb/5704cb74000de0d7fd1342902f8c34c6.jpg", name: "Dara K.", location: "Siem Reap" },
        { rating: "★★★★★", text: "Their event service made my birthday so special!", avatar: "https://i.pinimg.com/control1/1200x/ba/67/b1/ba67b11da61ad3235440088861f0a429.jpg", name: "Rathana M.", location: "Battambang" },
        { rating: "★★★★★", text: "Absolute favorite spot in town! Great flavors and ambiance.", avatar: "https://i.pinimg.com/control1/1200x/fa/cc/68/facc68451edd099b3ad9af0f581b7815.jpg", name: "Chan Thy", location: "Kampot" },
        { rating: "★★★★★", text: "Super friendly staff and the kids love the chocolate scoops.", avatar: "https://i.pinimg.com/736x/9d/68/ad/9d68ad5f7b020c48f2ca01c1a1eae553.jpg", name: "Vichea S.", location: "Takéo" },
        { rating: "★★★★★", text: "Clean, fast service, and the quality is consistently top-notch.", avatar: "https://i.pinimg.com/736x/6e/6c/a6/6e6ca6568670979e3f27d40d8b1bd281.jpg", name: "Bopha N.", location: "Sihanoukville" },
        { rating: "★★★★★", text: "The seasonal fruit flavors are incredible. Highly recommend!", avatar: "https://i.pinimg.com/control1/1200x/6b/8d/55/6b8d557af9e7122dbd7eec1c2593232b.jpg", name: "Vanna R.", location: "Kandal" },
        { rating: "★★★★★", text: "A wonderful place to chill out with friends on a hot afternoon.", avatar: "https://i.pinimg.com/736x/55/7a/ae/557aaee4e55f066f5b072c8efe3b82f4.jpg", name: "Sophea K.", location: "Kampong Cham" },
        { rating: "★★★★★", text: "Extremely satisfying portions and gorgeous presentation.", avatar: "https://i.pinimg.com/control1/1200x/84/f5/d6/84f5d6166c40cd6cd5a253ed19fae994.jpg", name: "Chenda L.", location: "Prey Veng" }
    ];

    const testGrid = document.getElementById("testimonialGrid");
    const testDotsContainer = document.getElementById("dotsContainer");
    const testPrevBtn = document.getElementById("prevBtn");
    const testNextBtn = document.getElementById("nextBtn");

    if (testGrid) {
        let currentTestIndex = 0;
        const isMobile = () => window.innerWidth <= 768;
        let itemsPerPage = isMobile() ? 1 : 3;
        let totalPages = Math.ceil(testimonialsData.length / (isMobile() ? 1 : 3));

        function renderCarousel() {
            testGrid.innerHTML = "";
            if (testDotsContainer) testDotsContainer.innerHTML = "";

            const start = isMobile() ? 0 : currentTestIndex * itemsPerPage;
            const currentItems = isMobile() ? testimonialsData : testimonialsData.slice(start, start + itemsPerPage);

            currentItems.forEach((item, index) => {
                const card = document.createElement("div");
                card.className = "testimonial-card";
                card.setAttribute("data-index", index);
                card.innerHTML = `
                    <div class="star-rating">${item.rating}</div>
                    <p class="testimonial-text">"${item.text}"</p>
                    <div class="customer-info">
                        <img src="${item.avatar}" alt="${item.name}" class="customer-avatar">
                        <div class="customer-details">
                            <h4 class="customer-name">${item.name}</h4>
                            <span class="customer-location">${item.location}</span>
                        </div>
                    </div>
                `;
                testGrid.appendChild(card);
            });

            const dotCount = isMobile() ? testimonialsData.length : Math.ceil(testimonialsData.length / 3);
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement("span");
                dot.className = `dot ${i === currentTestIndex ? "active" : ""}`;
                dot.addEventListener("click", () => {
                    currentTestIndex = i;
                    if (isMobile()) {
                        const targetCard = testGrid.children[i];
                        if (targetCard) targetCard.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                    } else {
                        renderCarousel();
                    }
                });
                testDotsContainer.appendChild(dot);
            }
        }

        if (testGrid) {
            testGrid.addEventListener("scroll", () => {
                if (isMobile()) {
                    const cardWidth = testGrid.querySelector('.testimonial-card')?.offsetWidth || 1;
                    const scrollLeft = testGrid.scrollLeft;
                    currentTestIndex = Math.round(scrollLeft / cardWidth);
                    
                    const dots = testDotsContainer?.querySelectorAll('.dot');
                    dots?.forEach((dot, idx) => {
                        dot.classList.toggle('active', idx === currentTestIndex);
                    });
                }
            });
        }

        if (testNextBtn) {
            testNextBtn.addEventListener("click", () => {
                if (!isMobile()) {
                    currentTestIndex = (currentTestIndex + 1) % totalPages;
                    renderCarousel();
                }
            });
        }

        if (testPrevBtn) {
            testPrevBtn.addEventListener("click", () => {
                if (!isMobile()) {
                    currentTestIndex = (currentTestIndex - 1 + totalPages) % totalPages;
                    renderCarousel();
                }
            });
        }

        window.addEventListener("resize", () => {
            const newMobileState = isMobile();
            const newItemsPerPage = newMobileState ? 1 : 3;
            if (newItemsPerPage !== itemsPerPage) {
                itemsPerPage = newItemsPerPage;
                totalPages = Math.ceil(testimonialsData.length / itemsPerPage);
                currentTestIndex = 0;
                renderCarousel();
            }
        });

        renderCarousel();
    }

    // ==========================================
    // 7. Complete Ordering Flow (Cart ➔ Checkout ➔ Confirmation)
    // ==========================================
    const cartPage = document.getElementById('cartPage');
    const checkoutPage = document.getElementById('checkoutPage');
    const confirmationPage = document.getElementById('confirmationPage');

    const proceedToCheckoutBtn = document.getElementById('proceedToCheckoutBtn');
    const backToCartBtn = document.getElementById('backToCartBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const backToHomeBtn = document.getElementById('backToHomeBtn');

    const fulfillmentRadios = document.querySelectorAll('input[name="fulfillmentType"]');
    const addressGroup = document.getElementById('addressGroup');
    const customerAddressInput = document.getElementById('customerAddress');
    const coDeliveryFeeRow = document.getElementById('coDeliveryFeeRow');
    const coDeliveryFee = document.getElementById('coDeliveryFee');

    const couponInput = document.getElementById('couponInput');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponMessage = document.getElementById('couponMessage');
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const discountPercentEl = document.getElementById('discountPercent');
    const cartDiscountEl = document.getElementById('cartDiscount');
    const cartTotalEl = document.getElementById('cartTotal');

    const checkoutItemsList = document.getElementById('checkoutItemsList');
    const coSubtotal = document.getElementById('coSubtotal');
    const coDiscountRow = document.getElementById('coDiscountRow');
    const coDiscount = document.getElementById('coDiscount');
    const coFinalTotal = document.getElementById('coFinalTotal');

    let discountRate = 0;
    const DELIVERY_FEE = 2.00;

    function calculateSubtotal() {
        let subtotal = 0;
        const itemCards = document.querySelectorAll('.cart-item-card');
        itemCards.forEach(card => {
            const price = parseFloat(card.querySelector('.cart-item-price').getAttribute('data-price')) || 0;
            const qty = parseInt(card.querySelector('.qty-input').value) || 1;
            subtotal += price * qty;
        });
        return subtotal;
    }

    function updateAllTotals() {
        const subtotal = calculateSubtotal();
        const discountAmount = subtotal * (discountRate / 100);
        const fulfillmentType = document.querySelector('input[name="fulfillmentType"]:checked')?.value || 'delivery';
        const fee = (fulfillmentType === 'delivery') ? DELIVERY_FEE : 0;
        const finalTotal = subtotal - discountAmount + fee;

        if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        
        document.querySelectorAll('.discount-row').forEach(row => {
            row.style.display = discountRate > 0 ? 'flex' : 'none';
        });

        if (discountPercentEl) discountPercentEl.textContent = discountRate;
        if (cartDiscountEl) cartDiscountEl.textContent = `-$${discountAmount.toFixed(2)}`;
        if (cartTotalEl) cartTotalEl.textContent = `$${(subtotal - discountAmount).toFixed(2)}`;

        if (coSubtotal) coSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (coDeliveryFee) coDeliveryFee.textContent = `$${fee.toFixed(2)}`;
        if (coDeliveryFeeRow) coDeliveryFeeRow.style.display = (fulfillmentType === 'delivery') ? 'flex' : 'none';
        if (coDiscount) coDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
        if (coFinalTotal) coFinalTotal.textContent = `$${finalTotal.toFixed(2)}`;
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-qty')) {
            const card = e.target.closest('.cart-item-card');
            const input = card.querySelector('.qty-input');
            const newQty = parseInt(input.value) + 1;
            input.value = newQty;
            updateCartItemTotal(card);
            if (window.CartStore) window.CartStore.setQty(card.getAttribute('data-id'), newQty);
            updateAllTotals();
        }
        if (e.target.classList.contains('decrease-qty')) {
            const card = e.target.closest('.cart-item-card');
            const input = card.querySelector('.qty-input');
            if (parseInt(input.value) > 1) {
                const newQty = parseInt(input.value) - 1;
                input.value = newQty;
                updateCartItemTotal(card);
                if (window.CartStore) window.CartStore.setQty(card.getAttribute('data-id'), newQty);
                updateAllTotals();
            }
        }
        if (e.target.closest('.remove-item-btn')) {
            const card = e.target.closest('.cart-item-card');
            const id = card.getAttribute('data-id');
            card.remove();

            if (window.CartStore) window.CartStore.removeItem(id);

            // Show the empty-cart state if that was the last item
            if (cartItemsSection && cartItemsSection.querySelectorAll('.cart-item-card').length === 0) {
                renderCartFromStore();
            }

            updateAllTotals();
        }
    });

    function updateCartItemTotal(card) {
        const price = parseFloat(card.querySelector('.cart-item-price').getAttribute('data-price')) || 0;
        const qty = parseInt(card.querySelector('.qty-input').value) || 1;
        card.querySelector('.cart-item-total').textContent = `$${(price * qty).toFixed(2)}`;
    }

    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', () => {
            const code = couponInput.value.trim().toUpperCase();
            if (code === 'SAVE10') {
                discountRate = 10;
                couponMessage.style.color = 'green';
                couponMessage.textContent = 'Coupon applied: 10% OFF';
            } else if (code === 'SAVE20') {
                discountRate = 20;
                couponMessage.style.color = 'green';
                couponMessage.textContent = 'Coupon applied: 20% OFF';
            } else {
                discountRate = 0;
                couponMessage.style.color = 'red';
                couponMessage.textContent = 'Invalid coupon code';
            }
            updateAllTotals();
        });
    }

    if (proceedToCheckoutBtn) {
        proceedToCheckoutBtn.addEventListener('click', () => {
            if (calculateSubtotal() <= 0) {
                alert('Your cart is empty! Please add some delicious ice cream first.');
                return;
            }
            renderCheckoutReview();

            // Prefill checkout details for a logged-in user, so they don't
            // have to retype their info every time they order.
            if (window.AuthStore && window.AuthStore.isLoggedIn()) {
                const user = window.AuthStore.getCurrentUser();
                if (user) {
                    const nameInput = document.getElementById('customerName');
                    const phoneInput = document.getElementById('customerPhone');
                    if (nameInput && !nameInput.value) nameInput.value = `${user.firstName} ${user.lastName}`.trim();
                    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
                    if (customerAddressInput && !customerAddressInput.value) customerAddressInput.value = user.address || '';
                }
            }

            if (cartPage) cartPage.style.display = 'none';
            if (checkoutPage) checkoutPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', () => {
            if (checkoutPage) checkoutPage.style.display = 'none';
            if (cartPage) cartPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    fulfillmentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('.fulfillment-option-card').forEach(card => card.classList.remove('active'));
            e.target.closest('.fulfillment-option-card').classList.add('active');

            if (e.target.value === 'delivery') {
                if (addressGroup) addressGroup.style.display = 'block';
                if (customerAddressInput) customerAddressInput.setAttribute('required', 'true');
            } else {
                if (addressGroup) addressGroup.style.display = 'none';
                if (customerAddressInput) {
                    customerAddressInput.removeAttribute('required');
                    customerAddressInput.value = '';
                }
            }
            updateAllTotals();
        });
    });

    function renderCheckoutReview() {
        if (!checkoutItemsList) return;
        checkoutItemsList.innerHTML = '';
        const itemCards = document.querySelectorAll('.cart-item-card');
        itemCards.forEach(card => {
            const title = card.querySelector('.cart-item-title').textContent;
            const price = card.querySelector('.cart-item-price').textContent;
            const qty = card.querySelector('.qty-input').value;
            const total = card.querySelector('.cart-item-total').textContent;

            const div = document.createElement('div');
            div.className = 'checkout-review-item';
            div.innerHTML = `<span>${title} (x${qty})</span><span>${total}</span>`;
            checkoutItemsList.appendChild(div);
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('customerName').value;
            const phone = document.getElementById('customerPhone').value;
            const fulfillmentType = document.querySelector('input[name="fulfillmentType"]:checked').value;
            const address = customerAddressInput ? customerAddressInput.value : '';
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

            document.getElementById('receiptName').textContent = name;
            document.getElementById('receiptPhone').textContent = phone;
            document.getElementById('receiptPayment').textContent = paymentMethod;

            const fulfillmentEl = document.getElementById('receiptFulfillment');
            const addressContainer = document.getElementById('receiptAddressContainer');
            const addressEl = document.getElementById('receiptAddress');

            if (fulfillmentType === 'delivery') {
                fulfillmentEl.textContent = 'Home Delivery';
                addressContainer.style.display = 'block';
                addressEl.textContent = address;
            } else {
                fulfillmentEl.textContent = 'Store Pick-up (Collection at Main Branch)';
                addressContainer.style.display = 'none';
            }

            const receiptItemsList = document.getElementById('receiptItemsList');
            receiptItemsList.innerHTML = '';
            const itemCards = document.querySelectorAll('.cart-item-card');
            itemCards.forEach(card => {
                const title = card.querySelector('.cart-item-title').textContent;
                const qty = card.querySelector('.qty-input').value;
                const total = card.querySelector('.cart-item-total').textContent;
                const div = document.createElement('div');
                div.className = 'summary-row';
                div.innerHTML = `<span>${title} x ${qty}</span><span>${total}</span>`;
                receiptItemsList.appendChild(div);
            });

            document.getElementById('receiptSubtotal').textContent = cartSubtotalEl.textContent;
            
            const receiptFeeRow = document.getElementById('receiptFeeRow');
            const receiptFeeAmount = document.getElementById('receiptFeeAmount');
            if (fulfillmentType === 'delivery') {
                receiptFeeRow.style.display = 'flex';
                receiptFeeAmount.textContent = `$${DELIVERY_FEE.toFixed(2)}`;
            } else {
                receiptFeeRow.style.display = 'none';
            }

            const receiptDiscountRow = document.getElementById('receiptDiscountRow');
            const receiptDiscountAmount = document.getElementById('receiptDiscountAmount');
            if (discountRate > 0) {
                receiptDiscountRow.style.display = 'flex';
                receiptDiscountAmount.textContent = cartDiscountEl.textContent;
            } else {
                receiptDiscountRow.style.display = 'none';
            }

            document.getElementById('receiptFinalTotal').textContent = coFinalTotal.textContent;

            // Save this order to order history (tied to the logged-in
            // account, or to this device if checking out as a guest).
            let savedOrder = null;
            if (window.AuthStore) {
                const orderItems = Array.from(document.querySelectorAll('.cart-item-card')).map(card => ({
                    title: card.querySelector('.cart-item-title').textContent,
                    qty: parseInt(card.querySelector('.qty-input').value, 10) || 1,
                    price: parseFloat(card.querySelector('.cart-item-price').getAttribute('data-price')) || 0
                }));

                savedOrder = window.AuthStore.saveOrder({
                    items: orderItems,
                    subtotal: calculateSubtotal(),
                    total: parseFloat(coFinalTotal.textContent.replace(/[^0-9.]/g, '')) || 0,
                    fulfillmentType: fulfillmentType,
                    address: fulfillmentType === 'delivery' ? address : '',
                    paymentMethod: paymentMethod,
                    customerName: name,
                    customerPhone: phone
                });
            }

            const receiptOrderIdEl = document.getElementById('receiptOrderId');
            if (receiptOrderIdEl) {
                receiptOrderIdEl.textContent = savedOrder ? `#${savedOrder.id}` : '#ORD-' + Date.now();
            }

            // Clear the cart upon successful order placement
            if (window.CartStore) window.CartStore.clearCart();

            if (checkoutPage) checkoutPage.style.display = 'none';
            if (confirmationPage) confirmationPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            if (confirmationPage) confirmationPage.style.display = 'none';
            if (cartPage) cartPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    updateAllTotals();
});