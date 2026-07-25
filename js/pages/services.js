document.addEventListener('DOMContentLoaded', () => {
    if (window.CartStore) window.CartStore.updateBadge();

    // ==========================================
    // Mock data: each tab (category) has its own set
    // of services and a per-guest estimate price.
    // This is placeholder pricing until real rates
    // are provided -- swap the numbers below anytime.
    // ==========================================
    const CATEGORIES = {
        event: {
            label: 'Event Services',
            unitLabel: 'Number of Guests',
            guestOptions: [10, 20, 30, 50, 75, 100, 150],
            services: [
                { id: 'birthday', icon: '🎂', title: 'Birthday Parties', desc: 'Make birthdays extra special', pricePerUnit: 8 },
                { id: 'wedding', icon: '💍', title: 'Weddings', desc: 'Sweeten your big day', pricePerUnit: 12 },
                { id: 'kids', icon: '🎈', title: 'Kids Events', desc: 'Fun & tasty for kids', pricePerUnit: 6 },
                { id: 'corporate', icon: '🏢', title: 'Corporate Events', desc: 'Perfect for office gatherings', pricePerUnit: 9 },
                { id: 'private', icon: '🎉', title: 'Private Parties', desc: 'Celebrate your special moments', pricePerUnit: 10 }
            ]
        },
        catering: {
            label: 'Catering',
            unitLabel: 'Number of Guests',
            guestOptions: [10, 20, 30, 50, 75, 100, 150],
            services: [
                { id: 'ice-cream-bar', icon: '🍦', title: 'Ice Cream Bar', desc: 'Self-serve scoop station', pricePerUnit: 7 },
                { id: 'mobile-cart', icon: '🚚', title: 'Mobile Cart Catering', desc: 'We bring the cart to you', pricePerUnit: 9 },
                { id: 'sundae-bar', icon: '🍨', title: 'Sundae Bar', desc: 'Build-your-own sundae station', pricePerUnit: 8 },
                { id: 'milkshake-bar', icon: '🥤', title: 'Milkshake Bar', desc: 'Custom milkshake counter', pricePerUnit: 6 }
            ]
        },
        builder: {
            label: 'Builder',
            unitLabel: 'Number of Cups / Cones',
            guestOptions: [10, 20, 30, 50, 100],
            services: [
                { id: 'build-your-scoop', icon: '🍧', title: 'Build Your Scoop', desc: 'Pick a base + toppings', pricePerUnit: 5 },
                { id: 'chocolate-dip', icon: '🍫', title: 'Chocolate Dip Station', desc: 'Dip & top your own cone', pricePerUnit: 4.5 },
                { id: 'topping-bar', icon: '🌈', title: 'Topping Bar Add-on', desc: 'Unlimited toppings bar', pricePerUnit: 3 }
            ]
        },
        delivery: {
            label: 'Delivery',
            unitLabel: 'Number of Orders',
            guestOptions: [1, 5, 10, 20, 50],
            services: [
                { id: 'standard-delivery', icon: '🛵', title: 'Standard Delivery', desc: 'Within Phnom Penh, 45-60 min', pricePerUnit: 2 },
                { id: 'express-delivery', icon: '⚡', title: 'Express Delivery', desc: 'Priority delivery, 20-30 min', pricePerUnit: 4 },
                { id: 'bulk-delivery', icon: '📦', title: 'Bulk Delivery', desc: 'Large orders for offices/events', pricePerUnit: 1.5 }
            ]
        },
        subscription: {
            label: 'Subscription',
            unitLabel: 'Number of Boxes / Month',
            guestOptions: [1, 2, 4, 8],
            services: [
                { id: 'weekly-plan', icon: '📅', title: 'Weekly Plan', desc: 'Fresh pints every week', pricePerUnit: 15 },
                { id: 'monthly-plan', icon: '🗓️', title: 'Monthly Plan', desc: 'Curated flavors monthly', pricePerUnit: 40 },
                { id: 'gift-subscription', icon: '🎁', title: 'Gift Subscription', desc: 'Give the gift of gelato', pricePerUnit: 45 }
            ]
        },
        workshop: {
            label: 'Workshop',
            unitLabel: 'Number of Participants',
            guestOptions: [5, 10, 15, 20, 30],
            services: [
                { id: 'kids-workshop', icon: '👩‍🍳', title: 'Kids Workshop', desc: 'Hands-on ice cream making', pricePerUnit: 12 },
                { id: 'team-building', icon: '🧑‍🤝‍🧑', title: 'Team Building', desc: 'Corporate group workshop', pricePerUnit: 18 },
                { id: 'masterclass', icon: '🎓', title: 'Adult Masterclass', desc: 'Learn gelato-making techniques', pricePerUnit: 25 }
            ]
        }
    };

    const tabsContainer = document.getElementById('serviceTabs');
    const cardsContainer = document.getElementById('categoryCards');
    const eventTypeSelect = document.getElementById('eventType');
    const guestCountSelect = document.getElementById('guestCount');
    const guestCountLabel = document.getElementById('guestCountLabel');
    const bookingForm = document.getElementById('bookingForm');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const confirmationBox = document.getElementById('bookingConfirmation');

    const estGuests = document.getElementById('estGuests');
    const estPackage = document.getElementById('estPackage');
    const estPricePerGuest = document.getElementById('estPricePerGuest');
    const estTotal = document.getElementById('estTotal');

    let activeCategoryKey = 'event';

    function getActiveCategory() {
        return CATEGORIES[activeCategoryKey];
    }

    function getSelectedService() {
        const category = getActiveCategory();
        return category.services.find(s => s.id === eventTypeSelect.value) || category.services[0];
    }

    function renderCards() {
        const category = getActiveCategory();
        cardsContainer.innerHTML = '';

        category.services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'category-icon-card';
            card.setAttribute('data-service-id', service.id);
            card.innerHTML = `
                <span class="icon-emoji">${service.icon}</span>
                <h4>${service.title}</h4>
                <p>${service.desc}</p>
            `;
            card.addEventListener('click', () => {
                eventTypeSelect.value = service.id;
                highlightSelectedCard();
            });
            cardsContainer.appendChild(card);
        });

        highlightSelectedCard();
    }

    function highlightSelectedCard() {
        const selectedId = eventTypeSelect.value;
        cardsContainer.querySelectorAll('.category-icon-card').forEach(card => {
            card.classList.toggle('selected', card.getAttribute('data-service-id') === selectedId);
        });
    }

    function renderEventTypeOptions() {
        const category = getActiveCategory();
        eventTypeSelect.innerHTML = category.services
            .map(s => `<option value="${s.id}">${s.title}</option>`)
            .join('');
    }

    function renderGuestOptions() {
        const category = getActiveCategory();
        guestCountLabel.textContent = category.unitLabel;
        guestCountSelect.innerHTML = category.guestOptions
            .map(n => `<option value="${n}">${n}</option>`)
            .join('');
    }

    function formatMoney(amount) {
        return `$${amount.toFixed(2)}`;
    }

    function calculateEstimate() {
        const service = getSelectedService();
        const guests = parseInt(guestCountSelect.value, 10) || 0;
        const total = guests * service.pricePerUnit;

        estGuests.textContent = guests;
        estPackage.textContent = 'Standard';
        estPricePerGuest.textContent = formatMoney(service.pricePerUnit);
        estTotal.textContent = formatMoney(total);

        confirmationBox.classList.remove('visible');
        confirmationBox.textContent = '';
    }

    function switchCategory(key) {
        activeCategoryKey = key;

        tabsContainer.querySelectorAll('.service-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-category') === key);
        });

        renderEventTypeOptions();
        renderGuestOptions();
        renderCards();
        calculateEstimate();
    }

    tabsContainer.querySelectorAll('.service-tab').forEach(tab => {
        tab.addEventListener('click', () => switchCategory(tab.getAttribute('data-category')));
    });

    eventTypeSelect.addEventListener('change', highlightSelectedCard);

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateEstimate();
    });

    bookNowBtn.addEventListener('click', () => {
        const location = document.getElementById('eventLocation').value.trim();
        const date = document.getElementById('eventDate').value;

        if (!date || !location) {
            alert('Please choose a date and enter a location before booking.');
            return;
        }

        const service = getSelectedService();
        const guests = parseInt(guestCountSelect.value, 10) || 0;
        const total = guests * service.pricePerUnit;

        confirmationBox.innerHTML = `
            <strong>🎉 Booking request received!</strong><br>
            ${service.title} on ${date} at ${location} for ${guests} (${getActiveCategory().unitLabel.toLowerCase()}).<br>
            Estimated total: ${formatMoney(total)}. We'll contact you shortly to confirm.
        `;
        confirmationBox.classList.add('visible');
    });

    // Initial render
    renderEventTypeOptions();
    renderGuestOptions();
    renderCards();
    calculateEstimate();
});
