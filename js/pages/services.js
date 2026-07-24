document.addEventListener("DOMContentLoaded", () => {
    const servicesData = {
        "event-catering": {
            title: "Event Catering",
            icon: "ti-confetti",
            description: "Transform your special day with our full-service live ice cream station. We provide professional servers, custom flavor menus, and stunning setups tailored for weddings, birthdays, and celebrations.",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
            rating: "4.9",
            reviews: "126",
            formType: "booking",
            packages: [
                { name: "Classic Package", price: "$150", features: ["Up to 50 guests", "2 Ice Cream Flavors", "2 Hours Service"] },
                { name: "Premium Package", price: "$280", features: ["Up to 100 guests", "4 Ice Cream Flavors", "3 Hours Service", "Custom Toppings Bar"] },
                { name: "Luxury Package", price: "$450", features: ["Unlimited guests", "6 Flavors + Sorbets", "Full Event Duration", "Dedicated Staff & Setup"] }
            ]
        },
        "fast-delivery": {
            title: "Fast Delivery",
            icon: "ti-truck-delivery",
            description: "Craving a sweet treat right now? Our fast delivery service brings your favorite artisanal scoops straight to your doorstep packed in temperature-controlled containers to ensure maximum freshness.",
            image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
            rating: "4.8",
            reviews: "94",
            formType: "order",
            packages: [
                { name: "Pint Duo Pack", price: "$16", features: ["2 Pints of Choice", "Insulated Delivery Bag", "Free Topping"] },
                { name: "Party Bundle", price: "$35", features: ["4 Pints of Choice", "Waffle Cones Included", "Priority Delivery"] }
            ]
        },
        "ice-cream-cakes": {
            title: "Ice Cream Cakes",
            icon: "ti-cake",
            description: "Layered with rich artisanal gelato, fudge, and crispy crunches, our custom ice cream cakes are handcrafted to steal the show at any birthday, anniversary, or celebration.",
            image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
            rating: "5.0",
            reviews: "78",
            formType: "booking",
            packages: [
                { name: "Standard 8-inch", price: "$38", features: ["Serves 8-10 people", "Choice of 2 Gelato Layers", "Custom Chocolate Message"] },
                { name: "Deluxe Tiered", price: "$65", features: ["Serves 15-20 people", "Multi-layer Gourmet Build", "Special Decorative Toppings"] }
            ]
        },
        "custom-builder": {
            title: "Custom Ice Cream Builder",
            icon: "ti-wand",
            description: "Unleash your creativity! Mix and match unique base flavors, drizzles, and loaded toppings to design a signature personalized cup or cone that matches your exact cravings.",
            image: "https://images.unsplash.com/photo-1557142046-c704a3adf3ea?auto=format&fit=crop&w=600&q=80",
            rating: "4.9",
            reviews: "112",
            formType: "order",
            packages: [
                { name: "Custom Signature Cup", price: "$6.50", features: ["3 Scoops of Choice", "Unlimited Standard Toppings", "Choice of Drizzle"] },
                { name: "Waffle Bowl Creation", price: "$8.50", features: ["Handmade Waffle Bowl", "4 Scoops", "Premium Toppings & Macaron"] }
            ]
        },
        "corporate-events": {
            title: "Corporate Events",
            icon: "ti-briefcase",
            description: "Boost team morale or impress clients with professional ice cream setups. Customized branding, dedicated staff, and delicious treats tailored specifically for corporate gatherings and brand activations.",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=600&q=80",
            rating: "4.9",
            reviews: "64",
            formType: "quote",
            packages: [
                { name: "Office Treat", price: "$200", features: ["Up to 40 Employees", "Mobile Cart Setup", "1.5 Hours Service"] },
                { name: "Brand Activation", price: "Custom Quote", features: ["Custom Branded Cups & Cart", "Full Day Presence", "On-site Coordinators"] }
            ]
        },
        "workshops": {
            title: "Ice Cream Workshops",
            icon: "ti-school",
            description: "Learn the art and science behind crafting creamy gelato! Our interactive hands-on workshops are designed for ice cream lovers of all ages, complete with tastings and take-home recipes.",
            image: "https://images.unsplash.com/photo-1543255006-d6395b6f147f?auto=format&fit=crop&w=600&q=80",
            rating: "5.0",
            reviews: "45",
            formType: "booking",
            packages: [
                { name: "Individual Masterclass", price: "$25", features: ["2-hour hands-on session", "Take home a pint of your own", "Recipe booklet included"] },
                { name: "Group / Family Session", price: "$90", features: ["Up to 4 participants", "Private station", "Tasting flight included"] }
            ]
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const serviceKey = urlParams.get("service") || "event-catering";
    const targetPackage = urlParams.get("package"); // e.g., "party-bundle"
    const data = servicesData[serviceKey] || servicesData["event-catering"];

    const titleTextEl = document.getElementById("service-title-text");
    if (titleTextEl) {
        titleTextEl.textContent = data.title;
        document.getElementById("service-icon").className = `ti ${data.icon}`;
        document.getElementById("service-desc").textContent = data.description;
        document.getElementById("service-img").src = data.image;
        document.getElementById("service-img").alt = data.title;
        document.getElementById("service-rating").textContent = data.rating;
        document.getElementById("service-reviews").textContent = data.reviews;

        const bookingNameEl = document.getElementById("booking-service-name");
        const quoteNameEl = document.getElementById("quote-service-name");
        if (bookingNameEl) bookingNameEl.textContent = data.title;
        if (quoteNameEl) quoteNameEl.textContent = data.title;

        // Render packages dynamically based on the chosen service
        const packagesContainer = document.getElementById("packages-container");
        if (packagesContainer) {
            packagesContainer.innerHTML = data.packages.map((pkg, index) => {
                // Normalize package name to create a matching slug identifier
                const pkgSlug = pkg.name.toLowerCase().replace(/\s+/g, '-');
                // Check if this package matches the requested package parameter in the URL
                const isTargetMatch = targetPackage && pkgSlug.includes(targetPackage.toLowerCase());
                
                // If there's a target package match, select it; otherwise, default the first item to selected
                const isSelected = targetPackage ? isTargetMatch : (index === 0);

                return `
                    <div class="package-card ${isSelected ? 'selected' : ''}" onclick="selectPackage(this)" data-slug="${pkgSlug}">
                        <div class="select-indicator"><i class="ti ti-check"></i></div>
                        <h4>${pkg.name}</h4>
                        <div class="package-price">${pkg.price}</div>
                        <ul class="package-features">
                            ${pkg.features.map(f => `<li><i class="ti ti-circle-check"></i> ${f}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }).join('');

            // If a target package was requested, automatically scroll it nicely into view
            if (targetPackage) {
                setTimeout(() => {
                    const matchedCard = packagesContainer.querySelector('.package-card.selected');
                    if (matchedCard) {
                        matchedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            }
        }

        const bookingWrapper = document.getElementById("booking-form-wrapper");
        const quoteWrapper = document.getElementById("quote-form-wrapper");
        const orderWrapper = document.getElementById("order-form-wrapper");

        if (bookingWrapper) bookingWrapper.style.display = "none";
        if (quoteWrapper) quoteWrapper.style.display = "none";
        if (orderWrapper) orderWrapper.style.display = "none";

        if (data.formType === "booking" && bookingWrapper) {
            bookingWrapper.style.display = "block";
        } else if (data.formType === "quote" && quoteWrapper) {
            quoteWrapper.style.display = "block";
        } else if (data.formType === "order" && orderWrapper) {
            orderWrapper.style.display = "block";
        }
    }
});

window.showForm = function(type) {
    document.querySelectorAll('.form-wrapper').forEach(el => el.style.display = 'none');
    if (type === 'booking') {
        document.getElementById("booking-form-wrapper").style.display = 'block';
        document.getElementById("booking-form-wrapper").scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'quote') {
        document.getElementById("quote-form-wrapper").style.display = 'block';
        document.getElementById("quote-form-wrapper").scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'order') {
        document.getElementById("order-form-wrapper").style.display = 'block';
        document.getElementById("order-form-wrapper").scrollIntoView({ behavior: 'smooth' });
    }
};

window.selectPackage = function(cardElement) {
    const parent = cardElement.parentElement;
    parent.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
    cardElement.classList.add('selected');
};

window.handleFormSubmit = function(event, formType) {
    event.preventDefault();
    alert(`Success! Your ${formType} request has been submitted securely.`);
};