document.addEventListener("DOMContentLoaded", () => {
    const servicesData = {
        1: {
            title: "Event Catering",
            icon: "ti-confetti",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
            rating: "4.9",
            reviews: "126",
            location: "Serving Phnom Penh & Provinces",
            description: "Bring the joy of handcrafted ice cream to your special occasions with our fully managed mobile ice cream station. Perfect for weddings, birthdays, graduations, baby showers, and family gatherings.",
            formType: "booking",
            packages: [
                { name: "Classic", price: "$150", desc: "Suitable for 30 guests. Includes 3 Ice Cream Flavors, 8 Toppings, 1 Serving Staff, Mobile Ice Cream Station, 2 Hours Service." },
                { name: "Premium", price: "$280", desc: "Suitable for 80 guests. Includes 6 Flavors, Unlimited Toppings, 2 Serving Staff, Premium Decoration, 3 Hours Service." },
                { name: "Luxury", price: "$480", desc: "Suitable for 150 guests. Includes Premium Station Design, 8 Flavors, Unlimited Toppings, 3 Staff, Custom Decoration, 4 Hours Service." }
            ]
        },
        2: {
            title: "Corporate Events",
            icon: "ti-briefcase",
            image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
            rating: "5.0",
            reviews: "78",
            location: "Corporate offices & commercial venues",
            description: "Professional ice cream catering designed for businesses, product launches, employee appreciation, and promotional events across Cambodia.",
            formType: "quote",
            packages: [
                { name: "Business Starter", price: "$250", desc: "Up to 50 Guests. Includes Branded Serving Station, 4 Flavors, 2 Staff, Company Logo Sign." },
                { name: "Business Premium", price: "$450", desc: "Up to 120 Guests. Includes Premium Setup, 6 Flavors, Unlimited Toppings, Company Branding, 3 Staff." },
                { name: "Enterprise", price: "Custom Pricing", desc: "Suitable for large-scale corporate events and brand activations." }
            ]
        },
        3: {
            title: "Custom Ice Cream Builder",
            icon: "ti-ice-cream-2",
            image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
            rating: "4.8",
            reviews: "210",
            location: "Online Builder / Store Pickup & Delivery",
            description: "Create your own perfect ice cream exactly the way you like it. Choose your container, scoops, premium flavors, free & specialty toppings, and delicious sauces.",
            formType: "order",
            packages: [
                { name: "1 Scoop", price: "$2.50", desc: "Choice of Cup, Cone, or Waffle Bowl with your favorite flavor and free toppings." },
                { name: "2 Scoops", price: "$4.50", desc: "Double scoop combination with multi-flavor pairing options." },
                { name: "3 Scoops", price: "$6.00", desc: "Triple scoop supreme bowl with choice of premium sauces and toppings." }
            ]
        },
        4: {
            title: "Ice Cream Workshops",
            icon: "ti-chef-hat",
            image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
            rating: "5.0",
            reviews: "64",
            location: "Scoopify Academy Kitchen",
            description: "Learn to make delicious ice cream through fun, hands-on experiences. Ideal for kids, families, and school groups.",
            formType: "booking",
            packages: [
                { name: "Kids Workshop", price: "$12 / Person", desc: "Duration 90 Minutes. Includes Ingredients, Equipment, Certificate, and Ice Cream Tasting." },
                { name: "Family Workshop", price: "$40", desc: "Up to 4 People. Includes Family Activities, Recipe Card, and Dessert Box." },
                { name: "School Workshop", price: "Custom Quote", desc: "Suitable for 20+ students with guided interactive lessons." }
            ]
        },
        5: {
            title: "Party Packages",
            icon: "ti-gift",
            image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80",
            rating: "4.7",
            reviews: "95",
            location: "Phnom Penh & Surrounding Areas",
            description: "Ready-made dessert packages for birthdays, anniversaries, and private gatherings delivered fresh and cold.",
            formType: "booking",
            packages: [
                { name: "Sweet Party", price: "$80", desc: "20 Guests. Includes Mini Ice Cream Cups, 3 Flavors, Basic Decoration." },
                { name: "Celebration Party", price: "$180", desc: "50 Guests. Includes Ice Cream Cart, 5 Flavors, Premium Toppings." },
                { name: "Grand Celebration", price: "$320", desc: "100 Guests. Includes Premium Station, 6 Flavors, Decorations, 2 Staff." }
            ]
        },
        6: {
            title: "Private Celebrations",
            icon: "ti-glass",
            image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
            rating: "4.9",
            reviews: "52",
            location: "Exclusive Private Venues",
            description: "Create unforgettable moments with a personalized ice cream experience for your closest family and friends. Perfect for romantic celebrations, anniversaries, proposals, and VIP gatherings.",
            formType: "booking",
            packages: [
                { name: "Cozy Celebration", price: "$100", desc: "10–20 Guests. Includes Elegant Ice Cream Setup, 3 Flavors, Personalized Welcome Sign." },
                { name: "Signature Celebration", price: "$220", desc: "20–50 Guests. Includes Premium Setup, 5 Flavors, Decoration, Serving Staff." },
                { name: "Luxury Celebration", price: "Custom Quote", desc: "Perfect for exclusive private events and customized theme setups." }
            ]
        }
    };

    // Read URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id') || '1';
    const targetPackage = urlParams.get('package'); // e.g., "business-premium"

    const currentService = servicesData[serviceId] || servicesData[1];

    // Populate Service Details
    document.getElementById('service-img').src = currentService.image;
    document.getElementById('service-img').alt = currentService.title;
    document.getElementById('service-title-text').textContent = currentService.title;
    document.getElementById('service-icon').className = `ti ${currentService.icon}`;
    document.getElementById('service-rating').textContent = currentService.rating;
    document.getElementById('service-reviews').textContent = currentService.reviews;
    document.getElementById('service-location').textContent = currentService.location;
    document.getElementById('service-desc').textContent = currentService.description;
    
    document.getElementById('booking-service-name').textContent = currentService.title;
    document.getElementById('quote-service-name').textContent = currentService.title;

    // Set Button text based on service type
    const primaryBtn = document.getElementById('primary-cta-btn');
    const secondaryBtn = document.getElementById('secondary-cta-btn');

    if (currentService.formType === 'order') {
        if (primaryBtn) primaryBtn.textContent = "Build & Order";
        if (secondaryBtn) secondaryBtn.style.display = "none";
    } else if (currentService.formType === 'quote') {
        if (primaryBtn) primaryBtn.textContent = "Request a Quote";
        if (secondaryBtn) secondaryBtn.style.display = "none";
    } else {
        if (primaryBtn) primaryBtn.textContent = "Book Package";
        if (secondaryBtn) {
            secondaryBtn.textContent = "Get a Free Quote";
            secondaryBtn.style.display = "inline-block";
        }
    }

    // Render Packages Dynamically with selection logic
    const packagesContainer = document.getElementById('packages-container');
    if (packagesContainer) {
        packagesContainer.innerHTML = '';
        currentService.packages.forEach((pkg, index) => {
            const pkgSlug = pkg.name.toLowerCase().replace(/\s+/g, '-');
            const isMatch = targetPackage && pkgSlug === targetPackage.toLowerCase();
            const isSelected = targetPackage ? isMatch : (index === 0);

            const card = document.createElement('div');
            card.className = `package-card ${isSelected ? 'selected' : ''}`;
            card.setAttribute('data-slug', pkgSlug);
            card.onclick = function() {
                window.selectPackage(this);
            };
            card.innerHTML = `
                <div class="select-indicator"><i class="ti ti-check"></i></div>
                <h5>${pkg.name}</h5>
                <div class="package-price">${pkg.price}</div>
                <p class="package-desc">${pkg.desc}</p>
            `;
            packagesContainer.appendChild(card);
        });

        // Smooth scroll to target package if specified
        if (targetPackage) {
            setTimeout(() => {
                const matchedCard = packagesContainer.querySelector('.package-card.selected');
                if (matchedCard) {
                    matchedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 150);
        }
    }

    // Expose selectPackage globally
    window.selectPackage = function(cardElement) {
        const parent = cardElement.parentElement;
        if (parent) {
            parent.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
        }
        cardElement.classList.add('selected');
    };

    // Expose showForm globally
    window.showForm = function(type) {
        const bForm = document.getElementById('booking-form-wrapper');
        const qForm = document.getElementById('quote-form-wrapper');
        const oForm = document.getElementById('order-form-wrapper');

        if (bForm) bForm.style.display = 'none';
        if (qForm) qForm.style.display = 'none';
        if (oForm) oForm.style.display = 'none';

        let targetFormId = '';
        if (currentService.formType === 'order' || type === 'order') {
            targetFormId = 'order-form-wrapper';
        } else if (currentService.formType === 'quote' || type === 'quote') {
            targetFormId = 'quote-form-wrapper';
        } else {
            targetFormId = 'booking-form-wrapper';
        }

        const wrapper = document.getElementById(targetFormId);
        if (wrapper) {
            wrapper.style.display = 'block';
            wrapper.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Expose handleFormSubmit globally
    window.handleFormSubmit = function(event, formName) {
        event.preventDefault();
        alert('Thank you! Your ' + formName + ' request for ' + currentService.title + ' has been successfully submitted. We will contact you shortly!');
        event.target.reset();
    };
});