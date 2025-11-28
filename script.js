class VirtualPet {
    constructor() {
        this.name = 'PixelPaw';
        this.health = 100;
        this.hunger = 100;
        this.happiness = 100;
        this.energy = 100;
        this.age = 0;
        this.level = 1;
        this.experience = 0;
        this.expToNextLevel = 100;
        this.mood = 'happy';
        this.lastUpdate = Date.now();
        this.isSleeping = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadGame();
        this.startGameLoop();
    }

    initializeElements() {
        // Status bars
        this.healthBar = document.getElementById('healthBar');
        this.hungerBar = document.getElementById('hungerBar');
        this.happinessBar = document.getElementById('happinessBar');
        this.energyBar = document.getElementById('energyBar');
        
        // Status values
        this.healthValue = document.getElementById('healthValue');
        this.hungerValue = document.getElementById('hungerValue');
        this.happinessValue = document.getElementById('happinessValue');
        this.energyValue = document.getElementById('energyValue');
        
        // Stats
        this.ageStat = document.getElementById('ageStat');
        this.levelStat = document.getElementById('levelStat');
        this.expStat = document.getElementById('expStat');
        this.moodStat = document.getElementById('moodStat');
        
        // Pet element
        this.pet = document.getElementById('pet');
        this.petNameDisplay = document.getElementById('petName');
        
        // Inputs
        this.petNameInput = document.getElementById('petNameInput');
        this.setNameBtn = document.getElementById('setNameBtn');
        
        // Buttons
        this.feedBtn = document.getElementById('feedBtn');
        this.playBtn = document.getElementById('playBtn');
        this.sleepBtn = document.getElementById('sleepBtn');
        this.healBtn = document.getElementById('healBtn');
        this.bathBtn = document.getElementById('bathBtn');
        this.trainBtn = document.getElementById('trainBtn');
        
        // Message
        this.message = document.getElementById('message');
    }

    setupEventListeners() {
        this.setNameBtn.addEventListener('click', () => this.setPetName());
        this.petNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.setPetName();
        });

        this.feedBtn.addEventListener('click', () => this.feed());
        this.playBtn.addEventListener('click', () => this.play());
        this.sleepBtn.addEventListener('click', () => this.sleep());
        this.healBtn.addEventListener('click', () => this.heal());
        this.bathBtn.addEventListener('click', () => this.bath());
        this.trainBtn.addEventListener('click', () => this.train());
    }

    setPetName() {
        const name = this.petNameInput.value.trim();
        if (name) {
            this.name = name;
            this.petNameDisplay.textContent = this.name;
            this.petNameInput.value = '';
            this.showMessage(`Your pet is now named ${this.name}! 🎉`);
            this.saveGame();
        }
    }

    feed() {
        if (this.isSleeping) {
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.hunger >= 100) {
            this.showMessage('Your pet is not hungry!', true);
            return;
        }

        if (this.energy < 10) {
            this.showMessage('Your pet is too tired to eat!', true);
            return;
        }

        this.hunger = Math.min(100, this.hunger + 30);
        this.happiness = Math.min(100, this.happiness + 5);
        this.energy = Math.max(0, this.energy - 5);
        this.addExperience(5);
        
        this.pet.classList.add('eating');
        setTimeout(() => this.pet.classList.remove('eating'), 500);
        
        this.showMessage('Yum! Your pet enjoyed the meal! 🍖');
        this.updateDisplay();
        this.saveGame();
    }

    play() {
        if (this.isSleeping) {
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.energy < 20) {
            this.showMessage('Your pet is too tired to play!', true);
            return;
        }

        this.happiness = Math.min(100, this.happiness + 25);
        this.energy = Math.max(0, this.energy - 20);
        this.hunger = Math.max(0, this.hunger - 5);
        this.addExperience(10);
        
        this.pet.classList.add('playing');
        setTimeout(() => this.pet.classList.remove('playing'), 1000);
        
        this.showMessage('Your pet had fun playing! 🎾');
        this.updateDisplay();
        this.saveGame();
    }

    sleep() {
        if (this.isSleeping) {
            this.isSleeping = false;
            this.pet.classList.remove('sleeping');
            this.showMessage('Your pet woke up! ☀️');
        } else {
            this.isSleeping = true;
            this.energy = Math.min(100, this.energy + 50);
            this.health = Math.min(100, this.health + 10);
            this.pet.classList.add('sleeping');
            this.showMessage('Your pet is sleeping... Zzz 💤');
        }
        this.updateDisplay();
        this.saveGame();
    }

    heal() {
        if (this.isSleeping) {
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.health >= 100) {
            this.showMessage('Your pet is already healthy!', true);
            return;
        }

        if (this.energy < 15) {
            this.showMessage('Your pet is too tired!', true);
            return;
        }

        this.health = Math.min(100, this.health + 30);
        this.energy = Math.max(0, this.energy - 15);
        this.addExperience(8);
        
        this.showMessage('Your pet feels better! 💊');
        this.updateDisplay();
        this.saveGame();
    }

    bath() {
        if (this.isSleeping) {
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.energy < 10) {
            this.showMessage('Your pet is too tired!', true);
            return;
        }

        this.happiness = Math.min(100, this.happiness + 15);
        this.health = Math.min(100, this.health + 5);
        this.energy = Math.max(0, this.energy - 10);
        this.addExperience(5);
        
        this.showMessage('Your pet is clean and happy! 🛁');
        this.updateDisplay();
        this.saveGame();
    }

    train() {
        if (this.isSleeping) {
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.energy < 30) {
            this.showMessage('Your pet is too tired to train!', true);
            return;
        }

        this.happiness = Math.min(100, this.happiness + 10);
        this.energy = Math.max(0, this.energy - 30);
        this.hunger = Math.max(0, this.hunger - 10);
        this.addExperience(20);
        
        this.showMessage('Your pet trained hard! 🏋️');
        this.updateDisplay();
        this.saveGame();
    }

    addExperience(amount) {
        this.experience += amount;
        if (this.experience >= this.expToNextLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.experience = 0;
        this.expToNextLevel = Math.floor(this.expToNextLevel * 1.5);
        this.health = 100;
        this.happiness = Math.min(100, this.happiness + 20);
        this.showMessage(`🎉 Level Up! Your pet is now level ${this.level}!`);
    }

    updateMood() {
        const avg = (this.health + this.hunger + this.happiness + this.energy) / 4;
        
        if (avg >= 80) {
            this.mood = 'happy';
            this.moodStat.textContent = '😊 Happy';
        } else if (avg >= 60) {
            this.mood = 'okay';
            this.moodStat.textContent = '😐 Okay';
        } else if (avg >= 40) {
            this.mood = 'sad';
            this.moodStat.textContent = '😢 Sad';
        } else {
            this.mood = 'critical';
            this.moodStat.textContent = '😰 Critical';
        }
    }

    updateDisplay() {
        // Update bars
        this.healthBar.style.width = `${this.health}%`;
        this.hungerBar.style.width = `${this.hunger}%`;
        this.happinessBar.style.width = `${this.happiness}%`;
        this.energyBar.style.width = `${this.energy}%`;
        
        // Update values
        this.healthValue.textContent = `${Math.round(this.health)}%`;
        this.hungerValue.textContent = `${Math.round(this.hunger)}%`;
        this.happinessValue.textContent = `${Math.round(this.happiness)}%`;
        this.energyValue.textContent = `${Math.round(this.energy)}%`;
        
        // Update stats
        this.ageStat.textContent = `${this.age} days`;
        this.levelStat.textContent = this.level;
        this.expStat.textContent = `${this.experience} / ${this.expToNextLevel}`;
        
        // Update mood
        this.updateMood();
        
        // Update bar colors based on values
        this.updateBarColors();
    }

    updateBarColors() {
        const updateBarColor = (bar, value) => {
            if (value >= 70) {
                bar.style.background = value === this.health ? 
                    'linear-gradient(90deg, #51cf66, #69db7c)' :
                    value === this.hunger ?
                    'linear-gradient(90deg, #ffa94d, #ffc078)' :
                    value === this.happiness ?
                    'linear-gradient(90deg, #51cf66, #69db7c)' :
                    'linear-gradient(90deg, #4dabf7, #74c0fc)';
            } else if (value >= 40) {
                bar.style.background = 'linear-gradient(90deg, #ffd43b, #ffec8c)';
            } else {
                bar.style.background = 'linear-gradient(90deg, #ff6b6b, #ff8787)';
            }
        };

        updateBarColor(this.healthBar, this.health);
        updateBarColor(this.hungerBar, this.hunger);
        updateBarColor(this.happinessBar, this.happiness);
        updateBarColor(this.energyBar, this.energy);
    }

    decayStats() {
        const now = Date.now();
        const timePassed = (now - this.lastUpdate) / 1000; // seconds
        
        if (timePassed >= 5) { // Update every 5 seconds
            if (!this.isSleeping) {
                this.hunger = Math.max(0, this.hunger - 0.5);
                this.happiness = Math.max(0, this.happiness - 0.3);
                this.energy = Math.max(0, this.energy - 0.4);
                
                // Health decreases if other stats are low
                if (this.hunger < 20 || this.happiness < 20) {
                    this.health = Math.max(0, this.health - 0.5);
                }
            } else {
                // While sleeping, energy regenerates
                this.energy = Math.min(100, this.energy + 0.3);
            }
            
            this.lastUpdate = now;
            this.updateDisplay();
            this.saveGame();
        }
    }

    checkGameOver() {
        if (this.health <= 0) {
            this.showMessage('Your pet has passed away... 😢 Restarting...', true);
            setTimeout(() => {
                this.reset();
            }, 3000);
        }
    }

    reset() {
        this.health = 100;
        this.hunger = 100;
        this.happiness = 100;
        this.energy = 100;
        this.age = 0;
        this.level = 1;
        this.experience = 0;
        this.expToNextLevel = 100;
        this.isSleeping = false;
        this.pet.classList.remove('sleeping');
        this.updateDisplay();
        this.saveGame();
    }

    startGameLoop() {
        setInterval(() => {
            this.decayStats();
            this.checkGameOver();
        }, 1000);
        
        // Age increment (every minute)
        setInterval(() => {
            this.age++;
            this.updateDisplay();
            this.saveGame();
        }, 60000);
    }

    showMessage(text, isError = false) {
        this.message.textContent = text;
        this.message.className = `message ${isError ? 'error' : ''} show`;
        
        setTimeout(() => {
            this.message.classList.remove('show');
        }, 3000);
    }

    saveGame() {
        const gameData = {
            name: this.name,
            health: this.health,
            hunger: this.hunger,
            happiness: this.happiness,
            energy: this.energy,
            age: this.age,
            level: this.level,
            experience: this.experience,
            expToNextLevel: this.expToNextLevel,
            mood: this.mood,
            isSleeping: this.isSleeping,
            lastUpdate: this.lastUpdate
        };
        
        localStorage.setItem('pixelPawSave', JSON.stringify(gameData));
    }

    loadGame() {
        const saved = localStorage.getItem('pixelPawSave');
        if (saved) {
            try {
                const gameData = JSON.parse(saved);
                this.name = gameData.name || 'PixelPaw';
                this.health = gameData.health || 100;
                this.hunger = gameData.hunger || 100;
                this.happiness = gameData.happiness || 100;
                this.energy = gameData.energy || 100;
                this.age = gameData.age || 0;
                this.level = gameData.level || 1;
                this.experience = gameData.experience || 0;
                this.expToNextLevel = gameData.expToNextLevel || 100;
                this.mood = gameData.mood || 'happy';
                this.isSleeping = gameData.isSleeping || false;
                this.lastUpdate = gameData.lastUpdate || Date.now();
                
                this.petNameDisplay.textContent = this.name;
                if (this.isSleeping) {
                    this.pet.classList.add('sleeping');
                }
            } catch (e) {
                console.error('Error loading game:', e);
            }
        }
        this.updateDisplay();
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new VirtualPet();
});

