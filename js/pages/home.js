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
    const grid = document.querySelector('.categories-grid');
    const dots = document.querySelectorAll('.categories-section .scroll-dots .dot');
    const cards = document.querySelectorAll('.category-card');

    if (grid && dots.length > 0 && cards.length > 0) {
        grid.addEventListener('scroll', () => {
            const scrollLeft = grid.scrollLeft;
            const cardWidth = cards[0].offsetWidth + 15; // card width + 15px gap
            const index = Math.round(scrollLeft / cardWidth);

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            cards.forEach((card, i) => {
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
});