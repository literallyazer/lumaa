document.addEventListener('DOMContentLoaded', () => {
    // Traveler Counter
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const travelerInput = document.querySelector('input[name="travelers"]');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(travelerInput.value);
        if (value > 1) {
            travelerInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(travelerInput.value);
        if (value < 6) {
            travelerInput.value = value + 1;
        }
    });

    // Experience Slider
    const experienceSlider = document.querySelector('input[type="range"]');
    const sliderLabels = document.querySelectorAll('.slider-labels span');

    experienceSlider.addEventListener('input', () => {
        const value = experienceSlider.value;
        sliderLabels.forEach((label, index) => {
            if (index + 1 == value) {
                label.style.color = 'var(--secondary-color)';
                label.style.fontWeight = '500';
            } else {
                label.style.color = 'var(--text-light)';
                label.style.fontWeight = '400';
            }
        });
    });

    // Form Submission
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(bookingForm);
        const bookingData = Object.fromEntries(formData);
        
        // Add loading state to button
        const submitBtn = bookingForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            console.log('Booking Data:', bookingData);
            
            // Show success message
            showBookingConfirmation();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    function showBookingConfirmation() {
        // Create modal or notification
        const modal = document.createElement('div');
        modal.className = 'booking-confirmation';
        modal.innerHTML = `
            <div class="confirmation-content">
                <i class="fas fa-check-circle"></i>
                <h2>Journey Reserved!</h2>
                <p>Your temporal adventure has been successfully booked. Check your email for confirmation details.</p>
                <button class="close-btn">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Add close functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            bookingForm.reset();
        });
    }

    // Dynamic form updates
    const destinationSelect = document.querySelector('select[name="destination"]');
    const temporalOptions = document.querySelectorAll('input[name="temporal"]');

    destinationSelect.addEventListener('change', () => {
        const selectedEra = destinationSelect.selectedOptions[0].parentElement.label;
        
        // Update form based on destination
        if (selectedEra === 'Historical Era') {
            document.getElementById('language').parentElement.style.display = 'block';
        } else {
            document.getElementById('language').parentElement.style.display = 'none';
        }
    });

    // Add smooth animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Add this to your existing CSS
const styles = `
.booking-confirmation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.confirmation-content {
    background: white;
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    animation: slideIn 0.5s ease;
}

.confirmation-content i {
    font-size: 4rem;
    color: #4CAF50;
    margin-bottom: 20px;
}

.confirmation-content h2 {
    margin-bottom: 10px;
    color: var(--primary-color);
}

.confirmation-content p {
    margin-bottom: 20px;
    color: var(--text-light);
}

.close-btn {
    padding: 10px 20px;
    background: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.close-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(197, 165, 114, 0.2);
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);