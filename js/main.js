document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    const overlays = document.querySelectorAll('.destination-overlay');
    const closeButtons = document.querySelectorAll('.close-overlay');

    // Filtering System
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const era = button.dataset.era;

            // Filter cards
            destinationCards.forEach(card => {
                if (era === 'all') {
                    // Show card with animation
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else if (card.dataset.era === era) {
                    // Show matching cards with animation
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Hide non-matching cards with animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Overlay System
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const overlayId = `${button.dataset.overlay}-overlay`;
            const overlay = document.getElementById(overlayId);
            
            if (overlay) {
                document.body.style.overflow = 'hidden';
                overlay.classList.add('active');
            }
        });
    });

    // Close overlay buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const overlay = button.closest('.destination-overlay');
            overlay.classList.remove('active');
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 600);
        });
    });

    // Close overlay with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeOverlay = document.querySelector('.destination-overlay.active');
            if (activeOverlay) {
                activeOverlay.classList.remove('active');
                setTimeout(() => {
                    document.body.style.overflow = '';
                }, 600);
            }
        }
    });

    // Initial animation for cards
    destinationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);
    });
});