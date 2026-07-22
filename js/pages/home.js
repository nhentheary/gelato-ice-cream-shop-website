document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. Hero Section Slideshow
    // ==========================================
    const track = document.getElementById('heroTrack');
    if (track) {
        const slides = track.querySelectorAll('.hero-slide');
        let currentIndex = 0;
        const totalItems = 6; // Number of unique slides before duplication

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

            // When it reaches the duplicate set, instantly reset back to the start without animation
            if (currentIndex === totalItems) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = 0;
                    track.style.transform = `translateY(-50%) translateX(calc(-${baseOffset}px - 0px))`;
                    
                    // Re-enable smooth transition after reset frame
                    setTimeout(() => {
                        track.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
                    }, 50);
                }, 1200); // Matches the 1.2s transition time
            }
        }

        // Sets the interval to run every 4 seconds of pause time plus transition time
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
            const cardWidth = catCards[0].offsetWidth + 15; // card width + 15px gap
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
            const cardWidth = bsCards[0].offsetWidth + 12; // card width + 12px gap matching CSS
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
    // 4. Add to Cart Button Interactive State
    // ==========================================
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Prevent multiple clicks while active
            if (this.classList.contains("added")) return;

            // Save original HTML content (icon + text)
            const originalHTML = this.innerHTML;

            // Change to Added state
            this.classList.add("added");
            this.innerHTML = '<i class="ti ti-check"></i> Added!';

            // Revert back after 1.5 seconds
            setTimeout(() => {
                this.classList.remove("added");
                this.innerHTML = originalHTML;
            }, 1500);
        });
    });

    // ==========================================
    // 5. Wishlist Button Toggle States
    // ==========================================
    const wishlistButtons = document.querySelectorAll(".wishlist-btn");

    wishlistButtons.forEach(button => {
        const icon = button.querySelector("i");
        
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            
            if (this.classList.contains("active")) {
                // Change to filled icon on click
                icon.className = "ti ti-heart-filled";
            } else {
                // Revert back to outline icon
                icon.className = "ti ti-heart";
            }
        });
    });

    // ==========================================
    // 6. Testimonial Carousel Logic
    // ==========================================

    const testimonialsData = [
        {
            rating: "★★★★★",
            text: "The ice cream is so fresh and delicious! My family loves it.",
            avatar: "images/customer-1.jpg",
            name: "Sreyneang P.",
            location: "Phnom Penh"
        },
        {
            rating: "★★★★★",
            text: "Best ice cream I've ever had! Creamy, rich, and perfect.",
            avatar: "images/customer-2.jpg",
            name: "Dara K.",
            location: "Siem Reap"
        },
        {
            rating: "★★★★★",
            text: "Their event service made my birthday so special!",
            avatar: "images/customer-3.jpg",
            name: "Rathana M.",
            location: "Battambang"
        },
        {
            rating: "★★★★★",
            text: "Absolute favorite spot in town! Great flavors and ambiance.",
            avatar: "images/customer-4.jpg",
            name: "Chan Thy",
            location: "Kampot"
        },
        {
            rating: "★★★★★",
            text: "Super friendly staff and the kids love the chocolate scoops.",
            avatar: "images/customer-5.jpg",
            name: "Vichea S.",
            location: "Takéo"
        },
        {
            rating: "★★★★★",
            text: "Clean, fast service, and the quality is consistently top-notch.",
            avatar: "images/customer-6.jpg",
            name: "Bopha N.",
            location: "Sihanoukville"
        },
        {
            rating: "★★★★★",
            text: "The seasonal fruit flavors are incredible. Highly recommend!",
            avatar: "images/customer-7.jpg",
            name: "Vanna R.",
            location: "Kandal"
        },
        {
            rating: "★★★★★",
            text: "A wonderful place to chill out with friends on a hot afternoon.",
            avatar: "images/customer-8.jpg",
            name: "Sophea K.",
            location: "Kampong Cham"
        },
        {
            rating: "★★★★★",
            text: "Extremely satisfying portions and gorgeous presentation.",
            avatar: "images/customer-9.jpg",
            name: "Chenda L.",
            location: "Prey Veng"
        }
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

            // Render cards
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

            // Always render dots (for both mobile and desktop)
            const dotCount = isMobile() ? testimonialsData.length : Math.ceil(testimonialsData.length / 3);
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement("span");
                dot.className = `dot ${i === currentTestIndex ? "active" : ""}`;
                dot.addEventListener("click", () => {
                    currentTestIndex = i;
                    if (isMobile()) {
                        // Scroll to the specific card on mobile when dot is clicked
                        const targetCard = testGrid.children[i];
                        if (targetCard) {
                            targetCard.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                        }
                    } else {
                        renderCarousel();
                    }
                });
                testDotsContainer.appendChild(dot);
            }
        }

        // Update active dot on mobile scroll/swipe
        if (testGrid) {
            testGrid.addEventListener("scroll", () => {
                if (isMobile()) {
                    const cardWidth = testGrid.querySelector('.testimonial-card')?.offsetWidth || 1;
                    const scrollLeft = testGrid.scrollLeft;
                    const activeIndex = Math.round(scrollLeft / cardWidth);
                    
                    currentTestIndex = activeIndex;
                    
                    // Update active class on dots without re-rendering everything
                    const dots = testDotsContainer?.querySelectorAll('.dot');
                    dots?.forEach((dot, idx) => {
                        if (idx === currentTestIndex) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                }
            });
        }

        if (testNextBtn) {
            testNextBtn.addEventListener("click", function () {
                if (!isMobile()) {
                    currentTestIndex = (currentTestIndex + 1) % totalPages;
                    renderCarousel();
                }
            });
        }

        if (testPrevBtn) {
            testPrevBtn.addEventListener("click", function () {
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
});