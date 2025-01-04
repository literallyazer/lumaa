const questions = [
    {
        id: 1,
        question: "What interests you most about time travel?",
        options: [
            {
                text: "Witnessing historical events",
                description: "Being present at pivotal moments that shaped our world",
                score: { past: 3, future: 0, fantasy: 1 }
            },
            {
                text: "Exploring future innovations",
                description: "Discovering how technology transforms our world",
                score: { past: 0, future: 3, fantasy: 1 }
            },
            {
                text: "Experiencing mythical places",
                description: "Visiting locations that blur reality and legend",
                score: { past: 1, future: 0, fantasy: 3 }
            },
            {
                text: "Understanding different cultures",
                description: "Learning how people lived in different eras",
                score: { past: 2, future: 1, fantasy: 1 }
            }
        ]
    },
    {
        id: 2,
        question: "What type of adventure excites you the most?",
        options: [
            {
                text: "Uncovering ancient mysteries",
                description: "Solving puzzles and exploring lost civilizations",
                score: { past: 3, future: 0, fantasy: 1 }
            },
            {
                text: "Innovating in futuristic realms",
                description: "Testing cutting-edge technology and shaping the future",
                score: { past: 0, future: 3, fantasy: 1 }
            },
            {
                text: "Interacting with legendary figures",
                description: "Meeting mythical heroes or prominent historical figures",
                score: { past: 2, future: 0, fantasy: 3 }
            },
            {
                text: "Creating your own unique timeline",
                description: "Crafting alternative histories and shaping destiny",
                score: { past: 1, future: 2, fantasy: 2 }
            }
        ]
    },
    {
        id: 3,
        question: "What setting would you choose for your time travel adventure?",
        options: [
            {
                text: "The bustling streets of ancient cities",
                description: "Experiencing the energy of past civilizations at their peak",
                score: { past: 3, future: 0, fantasy: 1 }
            },
            {
                text: "A high-tech utopian metropolis",
                description: "Exploring advanced societies and their innovations",
                score: { past: 0, future: 3, fantasy: 1 }
            },
            {
                text: "A fantastical world beyond time",
                description: "Stepping into realms filled with magic and wonder",
                score: { past: 1, future: 0, fantasy: 3 }
            },
            {
                text: "A serene rural landscape",
                description: "Finding peace in simpler times or untouched nature",
                score: { past: 3, future: 1, fantasy: 2 }
            }
        ]
    }
    // Add more questions following the same pattern
];


const destinations = {
    past: [
        {
            name: "Ancient Egypt",
            era: "2500 BC",
            description: "Witness the construction of the Great Pyramids and experience life along the Nile.",
            image: "../images/hero.png"
        },
        {
            name: "Islamic Golden Age",
            era: "622 - 1258",
            description: "Experience the height of scientific and cultural advancement in the medieval Islamic world.",
            image: "../images/arabia.jpg"
        }
    ],
    future: [
        {
            name: "Neo Tokyo",
            era: "2150",
            description: "Experience the pinnacle of human achievement in this cyberpunk metropolis.",
            image: "../images/tokyo.png"
        }
    ],
    fantasy: [
        {
            name: "Lost City of Atlantis",
            era: "Mythical Era",
            description: "Explore the legendary underwater civilization at its peak.",
            image: "../images/ATLANTIS.png"
        }
    ]
};

class Quiz {
    constructor() {
        this.currentQuestion = 0;
        this.scores = { past: 0, future: 0, fantasy: 0 };
        this.questionContainer = document.querySelector('.question-container');
        this.resultContainer = document.querySelector('.result-container');
        this.progressBar = document.querySelector('.progress');
        
        this.init();
    }

    init() {
        this.showQuestion();
    }

    showQuestion() {
        const question = questions[this.currentQuestion];
        this.updateProgress();

        this.questionContainer.innerHTML = `
            <div class="question">
                <h2>${question.question}</h2>
                <div class="options-grid">
                    ${question.options.map((option, index) => `
                        <div class="option-card" data-index="${index}">
                            <h3>${option.text}</h3>
                            <p>${option.description}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="quiz-navigation">
                    ${this.currentQuestion > 0 ? 
                        '<button class="nav-btn prev-btn">Previous</button>' : ''}
                    <button class="nav-btn next-btn" disabled>Next</button>
                </div>
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const options = this.questionContainer.querySelectorAll('.option-card');
        const nextBtn = this.questionContainer.querySelector('.next-btn');
        const prevBtn = this.questionContainer.querySelector('.prev-btn');

        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                nextBtn.disabled = false;
            });
        });

        nextBtn.addEventListener('click', () => {
            const selectedOption = this.questionContainer.querySelector('.option-card.selected');
            const optionIndex = selectedOption.dataset.index;
            this.updateScores(questions[this.currentQuestion].options[optionIndex].score);

            if (this.currentQuestion < questions.length - 1) {
                this.currentQuestion++;
                this.showQuestion();
            } else {
                this.showResult();
            }
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentQuestion--;
                this.showQuestion();
            });
        }
    }

    updateScores(scores) {
        Object.keys(scores).forEach(key => {
            this.scores[key] += scores[key];
        });
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    showResult() {
        const result = this.calculateResult();
        const destination = this.getRandomDestination(result);

        this.questionContainer.style.display = 'none';
        this.resultContainer.classList.remove('hidden');
        this.resultContainer.innerHTML = `
            <div class="result-image">
                <img src="${destination.image}" alt="${destination.name}">
            </div>
            <div class="result-content">
                <h2>${destination.name}</h2>
                <p class="era">${destination.era}</p>
                <p>${destination.description}</p>
                <div class="result-actions">
                    <button class="result-btn book-trip">Book This Trip</button>
                    <button class="result-btn retake-quiz">Retake Quiz</button>
                </div>
            </div>
        `;

        this.addResultEventListeners();
    }

    calculateResult() {
        return Object.entries(this.scores).reduce((a, b) => 
            this.scores[a] > this.scores[b[0]] ? a : b[0]);
    }

    getRandomDestination(era) {
        const possibleDestinations = destinations[era];
        return possibleDestinations[Math.floor(Math.random() * possibleDestinations.length)];
    }

    addResultEventListeners() {
        const retakeBtn = this.resultContainer.querySelector('.retake-quiz');
        const bookBtn = this.resultContainer.querySelector('.book-trip');

        retakeBtn.addEventListener('click', () => {
            this.currentQuestion = 0;
            this.scores = { past: 0, future: 0, fantasy: 0 };
            this.resultContainer.classList.add('hidden');
            this.questionContainer.style.display = 'block';
            this.showQuestion();
        });

        bookBtn.addEventListener('click', () => {
            // Implement booking functionality
            window.location.href = '/book';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
});