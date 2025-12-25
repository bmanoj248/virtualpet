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
        this.idleInterval = null;
        
        // Growth system
        this.growthStage = 'baby'; // baby, child, teen, adult, elder
        this.growthProgress = 0;
        this.size = 1.0;
        
        // Pet type system
        this.petType = 'dog'; // dog, cat, bird, rabbit, fox, bear
        
        // Achievement system
        this.achievements = {
            firstFeed: false,
            firstPlay: false,
            reach5: false,
            reach10: false,
            petted50: false,
            petted100: false,
            weekOld: false
        };
        
        // Analytics tracking
        this.petCount = 0;
        this.feedCount = 0;
        this.playCount = 0;
        this.healCount = 0;
        this.bathCount = 0;
        this.trainCount = 0;
        this.vetCount = 0;
        this.choreCount = 0;
        this.toyCount = 0;
        this.trickCount = 0;
        this.totalXP = 0;
        this.createdDate = Date.now();
        this.totalTimePlayed = 0;
        
        // Money & Savings system
        this.wallet = 100;
        this.totalEarned = 100;
        this.totalSpent = 0;
        this.savingsGoal = 100;
        this.saved = 0;
        
        // Activity & Badges
        this.badges = {
            earlyBird: false,
            nightOwl: false,
            caretaker: false,
            millionaire: false,
            saver: false,
            spender: false,
            trainer: false,
            veterinarian: false,
            cleaner: false,
            player: false
        };
        this.activityLog = [];
        
        // Settings
        this.settings = {
            decaySpeed: 1,
            soundEnabled: true,
            soundMode: 'game', // 'game' or 'realistic'
            particlesEnabled: true,
            autoSave: true,
            theme: 'purple',
            containerTheme: 'dark'
        };
        
        // Audio library for MP3 sounds
        this.audioLibrary = {
            pets: {},
            ui: {}
        };
        this.loadAudioFiles();
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadGame();
        this.startGameLoop();
        this.startAmbientInteractions();
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
        this.vetBtn = document.getElementById('vetBtn');
        this.choreBtn = document.getElementById('choreBtn');
        this.toyBtn = document.getElementById('toyBtn');
        this.trickBtn = document.getElementById('trickBtn');
        
        // Tab buttons
        this.petStatsTab = document.getElementById('petStatsTab');
        this.moneySavingsTab = document.getElementById('moneySavingsTab');
        this.activityBadgesTab = document.getElementById('activityBadgesTab');
        
        // Money & Savings elements
        this.walletDisplay = document.getElementById('walletAmount');
        this.earnedDisplay = document.getElementById('earnedAmount');
        this.spentDisplay = document.getElementById('spentAmount');
        this.savingsGoalDisplay = document.getElementById('savingsGoal');
        this.savedDisplay = document.getElementById('savedAmount');
        
        // Message
        this.message = document.getElementById('message');

        // Ambient/visual elements
        this.thoughtBubble = document.getElementById('thoughtBubble');
        this.petEmoji = document.querySelector('.pet-emoji');
        this.moodBadge = document.querySelector('.mood-badge');
        this.petStageDisplay = document.querySelector('.pet-stage');
        this.petTypeDisplay = document.querySelector('.pet-type-display');
        this.petLevelDisplay = document.querySelector('.pet-level');
        this.petExpDisplay = document.querySelector('.pet-exp');
        this.moodEmojiDisplay = document.querySelector('.mood-emoji');
        this.moodTextDisplay = document.querySelector('.mood-text');
        this.bodyElement = document.body;

        // Settings and Analytics
        this.settingsBtn = document.getElementById('settingsBtn');
        this.analyticsBtn = document.getElementById('analyticsBtn');
        this.helpBtn = document.getElementById('helpBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.analyticsModal = document.getElementById('analyticsModal');
        this.helpModal = document.getElementById('helpModal');
        this.closeSettings = document.getElementById('closeSettings');
        this.closeAnalytics = document.getElementById('closeAnalytics');
        this.closeHelp = document.getElementById('closeHelp');
    }

    setupEventListeners() {
        this.setNameBtn.addEventListener('click', () => this.setPetName());
        this.petNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.setPetName();
        });

        if (this.feedBtn) this.feedBtn.addEventListener('click', () => this.feed());
        if (this.playBtn) this.playBtn.addEventListener('click', () => this.play());
        if (this.sleepBtn) this.sleepBtn.addEventListener('click', () => this.sleep());
        if (this.healBtn) this.healBtn.addEventListener('click', () => this.heal());
        if (this.bathBtn) this.bathBtn.addEventListener('click', () => this.bath());
        if (this.trainBtn) this.trainBtn.addEventListener('click', () => this.train());
        if (this.vetBtn) this.vetBtn.addEventListener('click', () => this.vet());
        if (this.choreBtn) this.choreBtn.addEventListener('click', () => this.chore());
        if (this.toyBtn) this.toyBtn.addEventListener('click', () => this.toy());
        if (this.trickBtn) this.trickBtn.addEventListener('click', () => this.trick());
        
        // Tab event listeners
        if (this.petStatsTab) this.petStatsTab.addEventListener('click', () => this.showTab('stats'));
        if (this.moneySavingsTab) this.moneySavingsTab.addEventListener('click', () => this.showTab('money'));
        if (this.activityBadgesTab) this.activityBadgesTab.addEventListener('click', () => this.showTab('activity'));

        if (this.pet) {
            this.pet.addEventListener('click', () => this.petPet());
            this.pet.addEventListener('dblclick', () => this.hugPet());
            this.pet.addEventListener('mouseenter', () => {
                if (!this.isSleeping) {
                    this.pet.classList.add('curious');
                }
            });
            this.pet.addEventListener('mouseleave', () => this.pet.classList.remove('curious'));
        }

        // Interactive pet emoji - all interactions now on main pet element
        // (ear, belly, nose, tail interactions removed as we now use emoji-based design)

        // Settings and Analytics
        if (this.settingsBtn) this.settingsBtn.addEventListener('click', () => this.openSettings());
        if (this.analyticsBtn) this.analyticsBtn.addEventListener('click', () => this.openAnalytics());
        if (this.helpBtn) this.helpBtn.addEventListener('click', () => this.openHelp());
        if (this.closeSettings) this.closeSettings.addEventListener('click', () => this.closeSettingsModal());
        if (this.closeAnalytics) this.closeAnalytics.addEventListener('click', () => this.closeAnalyticsModal());
        if (this.closeHelp) this.closeHelp.addEventListener('click', () => this.closeHelpModal());

        // Close modals on outside click
        if (this.settingsModal) {
            this.settingsModal.addEventListener('click', (e) => {
                if (e.target === this.settingsModal) this.closeSettingsModal();
            });
        }
        if (this.analyticsModal) {
            this.analyticsModal.addEventListener('click', (e) => {
                if (e.target === this.analyticsModal) this.closeAnalyticsModal();
            });
        }
        if (this.helpModal) {
            this.helpModal.addEventListener('click', (e) => {
                if (e.target === this.helpModal) this.closeHelpModal();
            });
        }

        // Pet selection
        document.querySelectorAll('.pet-option').forEach(option => {
            option.addEventListener('click', () => {
                const petType = option.dataset.pet;
                this.changePetType(petType);
            });
        });

        // Settings controls
        document.getElementById('decaySpeed').addEventListener('change', (e) => {
            this.settings.decaySpeed = parseFloat(e.target.value);
            this.saveGame();
        });

        document.getElementById('soundToggle').addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            this.saveGame();
        });

        document.getElementById('soundMode').addEventListener('change', (e) => {
            this.settings.soundMode = e.target.value;
            this.saveGame();
            this.showMessage(`Sound mode: ${e.target.value === 'game' ? 'Game Sounds' : 'Realistic Sounds'}`);
        });

        document.getElementById('particlesToggle').addEventListener('change', (e) => {
            this.settings.particlesEnabled = e.target.checked;
            this.saveGame();
        });

        document.getElementById('autoSave').addEventListener('change', (e) => {
            this.settings.autoSave = e.target.checked;
            this.saveGame();
        });

        document.getElementById('containerTheme').addEventListener('change', (e) => {
            this.settings.containerTheme = e.target.value;
            this.applyContainerTheme();
            this.saveGame();
        });

        document.getElementById('themeSelect').addEventListener('change', (e) => {
            this.settings.theme = e.target.value;
            this.applyTheme();
            this.saveGame();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
                localStorage.removeItem('pixelPawSave');
                location.reload();
            }
        });
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
            this.playSound('error');
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.hunger >= 100) {
            this.playSound('error');
            this.showMessage('Your pet is not hungry!', true);
            return;
        }

        const cost = 5;
        if (this.wallet < cost) {
            this.playSound('error');
            this.showMessage(`Not enough money! Need $${cost}`, true);
            return;
        }

        if (this.energy < 10) {
            this.playSound('error');
            this.showMessage('Your pet is too tired to eat!', true);
            return;
        }

        this.wallet -= cost;
        this.totalSpent += cost;
        this.hunger = Math.min(100, this.hunger + 30);
        this.happiness = Math.min(100, this.happiness + 5);
        this.energy = Math.max(0, this.energy - 5);
        this.addExperience(5);
        this.feedCount++;
        
        this.pet.classList.add('eating');
        setTimeout(() => this.pet.classList.remove('eating'), 500);
        
        this.playSound('pet');
        this.createParticles('🍖', 'sparkle');
        this.showMessage(`Yum! Your pet enjoyed the meal! (-$${cost})`);
        this.logActivity('Fed the pet');
        
        this.checkAchievement('firstFeed', 'First Meal! 🍖');
        
        this.updateDisplay();
        this.saveGame();
    }

    play() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.energy < 20) {
            this.playSound('error');
            this.showMessage('Your pet is too tired to play!', true);
            return;
        }

        this.happiness = Math.min(100, this.happiness + 25);
        this.energy = Math.max(0, this.energy - 20);
        this.hunger = Math.max(0, this.hunger - 5);
        this.addExperience(10);
        this.playCount++;
        
        this.pet.classList.add('playing');
        setTimeout(() => this.pet.classList.remove('playing'), 1000);
        
        this.playSound('pet');
        this.createParticles('✨', 'sparkle');
        this.showMessage('Your pet had fun playing! 🎾');
        this.logActivity('Played with the pet');
        
        this.checkAchievement('firstPlay', 'First Playtime! 🎾');
        
        this.updateDisplay();
        this.saveGame();
    }

    sleep() {
        if (this.isSleeping) {
            this.playSound('click');
            this.isSleeping = false;
            this.pet.classList.remove('sleeping');
            this.showMessage('Your pet woke up! ☀️');
            this.logActivity('Pet woke up');
        } else {
            this.playSound('sleep');
            this.isSleeping = true;
            this.energy = Math.min(100, this.energy + 50);
            this.health = Math.min(100, this.health + 10);
            this.pet.classList.add('sleeping');
            this.showMessage('Your pet is sleeping... Zzz 💤');
            this.logActivity('Put pet to sleep');
        }
        this.updateDisplay();
        this.saveGame();
    }

    heal() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.health >= 100) {
            this.playSound('error');
            this.showMessage('Your pet is already healthy!', true);
            return;
        }

        if (this.energy < 15) {
            this.playSound('error');
            this.showMessage('Your pet is too tired!', true);
            return;
        }

        this.health = Math.min(100, this.health + 30);
        this.energy = Math.max(0, this.energy - 15);
        this.addExperience(8);
        this.healCount++;
        
        this.playSound('heal');
        this.showMessage('Your pet feels better! 💊');
        this.logActivity('Used healing medicine');
        this.updateDisplay();
        this.saveGame();
    }

    bath() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        const cost = 8;
        if (this.wallet < cost) {
            this.playSound('error');
            this.showMessage(`Not enough money! Need $${cost}`, true);
            return;
        }

        if (this.energy < 10) {
            this.playSound('error');
            this.showMessage('Your pet is too tired!', true);
            return;
        }

        this.wallet -= cost;
        this.totalSpent += cost;
        this.happiness = Math.min(100, this.happiness + 15);
        this.health = Math.min(100, this.health + 5);
        this.energy = Math.max(0, this.energy - 10);
        this.addExperience(5);
        this.bathCount++;
        
        this.playSound('pet');
        this.showMessage(`Your pet is clean and happy! (-$${cost})`);
        this.logActivity('Gave the pet a bath');
        this.updateDisplay();
        this.saveGame();
    }

    train() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.energy < 30) {
            this.playSound('error');
            this.showMessage('Your pet is too tired to train!', true);
            return;
        }

        this.happiness = Math.min(100, this.happiness + 10);
        this.energy = Math.max(0, this.energy - 30);
        this.hunger = Math.max(0, this.hunger - 10);
        this.addExperience(20);
        this.trainCount++;
        
        this.playSound('pet');
        this.showMessage('Your pet trained hard! 🏋️');
        this.logActivity('Trained the pet');
        this.updateDisplay();
        this.saveGame();
    }

    vet() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        const cost = 25;
        if (this.wallet < cost) {
            this.playSound('error');
            this.showMessage(`Not enough money! Need $${cost}`, true);
            return;
        }

        this.wallet -= cost;
        this.totalSpent += cost;
        this.health = 100;
        this.happiness = Math.min(100, this.happiness + 15);
        this.energy = Math.max(0, this.energy - 10);
        this.addExperience(12);
        this.vetCount++;
        
        this.pet.classList.add('healing');
        setTimeout(() => this.pet.classList.remove('healing'), 800);
        
        this.playSound('heal');
        this.createParticles('💉', 'sparkle');
        this.showMessage(`Vet visit complete! Full health restored! (-$${cost})`);
        this.logActivity('Visited the vet');
        this.checkBadge('veterinarian', this.vetCount >= 10, 'Veterinarian: 10 vet visits! 🏥');
        
        this.updateDisplay();
        this.saveGame();
    }

    chore() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.energy < 20) {
            this.playSound('error');
            this.showMessage('Your pet is too tired for chores!', true);
            return;
        }

        const earnings = Math.floor(Math.random() * 15) + 10; // $10-$24
        this.wallet += earnings;
        this.totalEarned += earnings;
        this.energy = Math.max(0, this.energy - 20);
        this.hunger = Math.max(0, this.hunger - 8);
        this.happiness = Math.min(100, this.happiness + 5);
        this.addExperience(15);
        this.choreCount++;
        
        this.pet.classList.add('working');
        setTimeout(() => this.pet.classList.remove('working'), 1000);
        
        this.playSound('money');
        this.createParticles('💰', 'sparkle');
        this.showMessage(`Chore completed! Earned $${earnings}! 🧹`);
        this.logActivity(`Did chores and earned $${earnings}`);
        this.checkBadge('caretaker', this.choreCount >= 20, 'Caretaker: 20 chores done! 🧹');
        
        this.updateDisplay();
        this.saveGame();
    }

    toy() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        const cost = 15;
        if (this.wallet < cost) {
            this.playSound('error');
            this.showMessage(`Not enough money! Need $${cost}`, true);
            return;
        }

        if (this.energy < 15) {
            this.playSound('error');
            this.showMessage('Your pet is too tired to play with toys!', true);
            return;
        }

        this.wallet -= cost;
        this.totalSpent += cost;
        this.happiness = Math.min(100, this.happiness + 30);
        this.energy = Math.max(0, this.energy - 15);
        this.hunger = Math.max(0, this.hunger - 5);
        this.addExperience(12);
        this.toyCount++;
        
        this.pet.classList.add('playing');
        setTimeout(() => this.pet.classList.remove('playing'), 1200);
        
        this.playSound('pet');
        this.createParticles('🧸', 'sparkle');
        this.createParticles('🎈', 'sparkle');
        this.showMessage(`New toy! Your pet loves it! (-$${cost})`);
        this.logActivity('Bought a new toy');
        this.checkBadge('player', this.toyCount >= 15, 'Player: 15 toys bought! 🧸');
        
        this.updateDisplay();
        this.saveGame();
    }

    trick() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Your pet is sleeping! Zzz...', true);
            return;
        }

        if (this.energy < 25) {
            this.playSound('error');
            this.showMessage('Your pet is too tired to perform tricks!', true);
            return;
        }

        if (this.level < 3) {
            this.playSound('error');
            this.showMessage('Your pet needs to be Level 3+ to learn tricks!', true);
            return;
        }

        const earnings = Math.floor(Math.random() * 20) + 20; // $20-$39
        this.wallet += earnings;
        this.totalEarned += earnings;
        this.happiness = Math.min(100, this.happiness + 20);
        this.energy = Math.max(0, this.energy - 25);
        this.hunger = Math.max(0, this.hunger - 10);
        this.addExperience(25);
        this.trickCount++;
        
        this.pet.classList.add('trick-performing');
        setTimeout(() => this.pet.classList.remove('trick-performing'), 1500);
        
        this.playSound('money');
        this.createParticles('✨', 'sparkle');
        this.createParticles('🌟', 'sparkle');
        this.createParticles('🎭', 'sparkle');
        
        const tricks = ['Rolled over!', 'Did a backflip!', 'Played dead!', 'Jumped through hoops!', 'Danced!'];
        const trick = tricks[Math.floor(Math.random() * tricks.length)];
        this.showMessage(`Amazing trick! ${trick} Earned $${earnings}! 🎪`);
        this.logActivity(`Performed a trick and earned $${earnings}`);
        this.checkBadge('trainer', this.trickCount >= 25, 'Trick Master: 25 tricks performed! 🎪');
        
        this.updateDisplay();
        this.saveGame();
    }

    addExperience(amount) {
        this.experience += amount;
        this.totalXP += amount;
        if (this.experience >= this.expToNextLevel) {
            this.levelUp();
        }
    }

    logActivity(description) {
        const timestamp = new Date().toLocaleTimeString();
        this.activityLog.unshift({
            description: description,
            time: timestamp,
            date: new Date()
        });
        
        // Keep only last 50 activities
        if (this.activityLog.length > 50) {
            this.activityLog = this.activityLog.slice(0, 50);
        }
    }

    checkBadge(badgeId, condition, message) {
        if (!this.badges[badgeId] && condition) {
            this.badges[badgeId] = true;
            this.showAchievement(message);
            this.saveGame();
        }
    }

    earnMoney(amount) {
        this.wallet += amount;
        this.totalEarned += amount;
        this.checkBadge('millionaire', this.totalEarned >= 1000, 'Millionaire: Earned $1000! 💰');
        this.updateDisplay();
    }

    spendMoney(amount) {
        if (this.wallet >= amount) {
            this.wallet -= amount;
            this.totalSpent += amount;
            this.checkBadge('spender', this.totalSpent >= 500, 'Big Spender: Spent $500! 💸');
            this.updateDisplay();
            return true;
        }
        return false;
    }

    depositToSavings(amount) {
        if (this.wallet >= amount) {
            this.wallet -= amount;
            this.saved += amount;
            this.showMessage(`Saved $${amount}! 🏦`);
            this.checkBadge('saver', this.saved >= this.savingsGoal, 'Savings Goal Reached! 🎯');
            this.updateDisplay();
            this.saveGame();
            return true;
        } else {
            this.showMessage('Not enough money in wallet!', true);
            return false;
        }
    }

    withdrawFromSavings(amount) {
        if (this.saved >= amount) {
            this.saved -= amount;
            this.wallet += amount;
            this.showMessage(`Withdrew $${amount}! 💵`);
            this.updateDisplay();
            this.saveGame();
            return true;
        } else {
            this.showMessage('Not enough in savings!', true);
            return false;
        }
    }

    showTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        if (tabName === 'stats') {
            document.getElementById('statsContent').classList.add('active');
            this.petStatsTab.classList.add('active');
        } else if (tabName === 'money') {
            document.getElementById('moneyContent').classList.add('active');
            this.moneySavingsTab.classList.add('active');
            this.updateMoneyDisplay();
        } else if (tabName === 'activity') {
            document.getElementById('activityContent').classList.add('active');
            this.activityBadgesTab.classList.add('active');
            this.updateActivityDisplay();
        }
    }

    updateMoneyDisplay() {
        if (this.walletDisplay) this.walletDisplay.textContent = `$${this.wallet.toFixed(2)}`;
        if (this.earnedDisplay) this.earnedDisplay.textContent = `$${this.totalEarned.toFixed(2)}`;
        if (this.spentDisplay) this.spentDisplay.textContent = `$${this.totalSpent.toFixed(2)}`;
        if (this.savingsGoalDisplay) this.savingsGoalDisplay.textContent = `$${this.savingsGoal}`;
        if (this.savedDisplay) this.savedDisplay.textContent = `$${this.saved.toFixed(2)}`;
        
        // Update spending bar
        const spendingBar = document.getElementById('spendingBar');
        const spendingLimit = 200;
        if (spendingBar) {
            const percentage = Math.min(100, (this.totalSpent / spendingLimit) * 100);
            spendingBar.style.width = `${percentage}%`;
            document.getElementById('spendingText').textContent = `$${this.totalSpent.toFixed(2)} / $${spendingLimit}`;
        }
        
        // Update savings progress bar
        const savingsBar = document.getElementById('savingsProgressBar');
        if (savingsBar) {
            const percentage = Math.min(100, (this.saved / this.savingsGoal) * 100);
            savingsBar.style.width = `${percentage}%`;
        }
    }

    updateActivityDisplay() {
        // Update activity log
        const activityLogElement = document.getElementById('activityLog');
        if (activityLogElement) {
            activityLogElement.innerHTML = '';
            if (this.activityLog.length === 0) {
                activityLogElement.innerHTML = '<div class="no-activity">No recent activities</div>';
            } else {
                this.activityLog.slice(0, 10).forEach(activity => {
                    const activityItem = document.createElement('div');
                    activityItem.className = 'activity-item';
                    activityItem.innerHTML = `
                        <span class="activity-time">${activity.time}</span>
                        <span class="activity-desc">${activity.description}</span>
                    `;
                    activityLogElement.appendChild(activityItem);
                });
            }
        }
        
        // Update badges
        const badgeGrid = document.getElementById('badgeGrid');
        if (badgeGrid) {
            badgeGrid.innerHTML = '';
            const badgeInfo = {
                earlyBird: { icon: '🌅', name: 'Early Bird', desc: 'Interact before 6 AM' },
                nightOwl: { icon: '🦉', name: 'Night Owl', desc: 'Interact after 10 PM' },
                caretaker: { icon: '🧹', name: 'Caretaker', desc: 'Complete 20 chores' },
                millionaire: { icon: '💰', name: 'Millionaire', desc: 'Earn $1000 total' },
                saver: { icon: '🏦', name: 'Saver', desc: 'Reach savings goal' },
                spender: { icon: '💸', name: 'Big Spender', desc: 'Spend $500 total' },
                trainer: { icon: '🎪', name: 'Trick Master', desc: 'Perform 25 tricks' },
                veterinarian: { icon: '🏥', name: 'Veterinarian', desc: '10 vet visits' },
                cleaner: { icon: '🛁', name: 'Cleaner', desc: '30 baths given' },
                player: { icon: '🧸', name: 'Player', desc: 'Buy 15 toys' }
            };
            
            Object.keys(badgeInfo).forEach(badgeId => {
                const badge = badgeInfo[badgeId];
                const isUnlocked = this.badges[badgeId];
                const badgeElement = document.createElement('div');
                badgeElement.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
                badgeElement.innerHTML = `
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-desc">${badge.desc}</div>
                `;
                badgeGrid.appendChild(badgeElement);
            });
        }
        
        // Check time-based badges
        const hour = new Date().getHours();
        if (hour < 6) {
            this.checkBadge('earlyBird', true, 'Early Bird: Active before 6 AM! 🌅');
        }
        if (hour >= 22) {
            this.checkBadge('nightOwl', true, 'Night Owl: Active after 10 PM! 🦉');
        }
        if (this.bathCount >= 30) {
            this.checkBadge('cleaner', true, 'Cleaner: 30 baths given! 🛁');
        }
    }

    levelUp() {
        this.level++;
        this.experience = 0;
        this.expToNextLevel = Math.floor(this.expToNextLevel * 1.5);
        this.health = 100;
        this.happiness = Math.min(100, this.happiness + 20);
        
        this.playSound('levelup');
        this.createParticles('⭐', 'sparkle');
        this.createParticles('🎉', 'sparkle');
        
        this.showMessage(`🎉 Level Up! Your pet is now level ${this.level}!`);
        
        // Check level achievements
        if (this.level === 5) this.checkAchievement('reach5', 'Level 5 Reached! ⭐');
        if (this.level === 10) this.checkAchievement('reach10', 'Level 10 Reached! 🌟');
        
        this.updateGrowthStage();
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

        if (this.pet) {
            this.pet.classList.remove('mood-happy', 'mood-okay', 'mood-sad', 'mood-critical');
            this.pet.classList.add(`mood-${this.mood}`);
        }
    }

    updatePetEmoji() {
        if (!this.petEmoji) return;
        
        // When sleeping, show 😴 emoji (only emoji with closed eyes)
        // Standard animal emojis (🐶🐱🐦🐰🦊🐻) cannot have their eyes closed
        if (this.isSleeping) {
            this.petEmoji.textContent = '😴';
        } else {
            const petEmojis = {
                dog: '🐶',
                cat: '🐱',
                bird: '🐦',
                rabbit: '🐰',
                fox: '🦊',
                bear: '🐻'
            };
            this.petEmoji.textContent = petEmojis[this.petType] || '🐶';
        }
        
        // Update mood badge
        if (this.moodBadge) {
            const moodEmojis = {
                happy: '😊',
                okay: '😐',
                sad: '😢',
                critical: '😰'
            };
            this.moodBadge.textContent = moodEmojis[this.mood] || '😊';
        }
    }

    updatePetInfo() {
        // Update pet details display
        if (this.petStageDisplay) {
            this.petStageDisplay.textContent = `Age: ${this.growthStage.charAt(0).toUpperCase() + this.growthStage.slice(1)}`;
        }
        if (this.petTypeDisplay) {
            this.petTypeDisplay.textContent = `Type: ${this.petType}`;
        }
        if (this.petLevelDisplay) {
            this.petLevelDisplay.textContent = `Level ${this.level}`;
        }
        if (this.petExpDisplay) {
            this.petExpDisplay.textContent = `EXP ${this.experience}/${this.expToNextLevel}`;
        }
        
        // Update mood display with text
        if (this.moodEmojiDisplay && this.moodTextDisplay) {
            const moodEmojis = {
                happy: '😊',
                okay: '😐',
                sad: '😢',
                critical: '😰'
            };
            const moodTexts = {
                happy: 'Super happy!',
                okay: 'Doing okay',
                sad: 'Feeling sad',
                critical: 'Needs help!'
            };
            this.moodEmojiDisplay.textContent = moodEmojis[this.mood] || '😊';
            this.moodTextDisplay.textContent = moodTexts[this.mood] || 'Happy';
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
        
        // Update pet emoji and displays
        this.updatePetEmoji();
        this.updatePetInfo();
        
        // Update bar colors based on values
        this.updateBarColors();

        this.updateThoughtBubble();
        this.updateEnvironment();
        this.updateMoneyDisplay();
    }

    updateBarColors() {
        const updateBarColor = (bar, value, colors) => {
            if (value >= 70) {
                bar.style.background = `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`;
            } else if (value >= 40) {
                bar.style.background = 'linear-gradient(90deg, #ffd43b, #ffec8c)';
            } else {
                bar.style.background = 'linear-gradient(90deg, #ff6b6b, #ff8787)';
            }
        };

        updateBarColor(this.healthBar, this.health, ['#ff6b6b', '#ff8787']);
        updateBarColor(this.hungerBar, this.hunger, ['#ffa94d', '#ffc078']);
        updateBarColor(this.happinessBar, this.happiness, ['#51cf66', '#69db7c']);
        updateBarColor(this.energyBar, this.energy, ['#4dabf7', '#74c0fc']);
    }

    decayStats() {
        const now = Date.now();
        const timePassed = (now - this.lastUpdate) / 1000; // seconds
        
        if (timePassed >= 5) { // Update every 5 seconds
            if (!this.isSleeping) {
                const decayMultiplier = this.settings.decaySpeed;
                this.hunger = Math.max(0, this.hunger - (0.5 * decayMultiplier));
                this.happiness = Math.max(0, this.happiness - (0.3 * decayMultiplier));
                this.energy = Math.max(0, this.energy - (0.4 * decayMultiplier));
                
                // Health decreases if other stats are low
                if (this.hunger < 20 || this.happiness < 20) {
                    this.health = Math.max(0, this.health - (0.5 * decayMultiplier));
                }
            } else {
                // While sleeping, energy regenerates
                this.energy = Math.min(100, this.energy + 0.3);
            }
            
            this.lastUpdate = now;
            this.totalTimePlayed += timePassed;
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
        
        // Age increment (every minute for testing, normally would be longer)
        setInterval(() => {
            this.age++;
            
            if (this.age === 7) this.checkAchievement('weekOld', 'One Week Old! 🎂');
            
            this.updateGrowthStage();
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

    // New interactive body part methods
    scratchEar(earElement) {
        if (this.isSleeping) return;
        
        earElement.style.animation = 'none';
        setTimeout(() => {
            earElement.style.animation = '';
        }, 10);
        
        this.happiness = Math.min(100, this.happiness + 5);
        this.addExperience(2);
        this.createParticles('🎵', 'sparkle');
        this.showMessage('Your pet loves ear scratches! 🎵');
        this.updateDisplay();
        this.saveGame();
    }

    tickleBelly() {
        if (this.isSleeping) return;
        
        this.pet.classList.add('laughing');
        setTimeout(() => this.pet.classList.remove('laughing'), 800);
        
        this.happiness = Math.min(100, this.happiness + 15);
        this.addExperience(5);
        this.createParticles('😆', 'sparkle');
        this.showMessage('Hehe! Your pet is ticklish! 😆');
        this.updateDisplay();
        this.saveGame();
    }

    boopNose() {
        if (this.isSleeping) return;
        
        this.pet.classList.add('boop');
        setTimeout(() => this.pet.classList.remove('boop'), 400);
        
        this.happiness = Math.min(100, this.happiness + 8);
        this.addExperience(3);
        this.createParticles('👃', 'sparkle');
        
        const boopMessages = ['Boop! 👃', '*Sneezes* Achoo! 🤧', 'Cute boop! 💕', '*Wiggles nose* 👃'];
        this.showMessage(boopMessages[Math.floor(Math.random() * boopMessages.length)]);
        this.updateDisplay();
        this.saveGame();
    }

    playWithTail() {
        if (this.isSleeping) return;
        
        const tail = document.querySelector('.pet-tail');
        tail.style.animation = 'tailWagFast 0.3s ease-in-out 5';
        setTimeout(() => {
            tail.style.animation = '';
        }, 1500);
        
        this.happiness = Math.min(100, this.happiness + 10);
        this.energy = Math.max(0, this.energy - 5);
        this.addExperience(4);
        this.createParticles('💫', 'sparkle');
        this.showMessage('Your pet chases its tail! 💫');
        this.updateDisplay();
        this.saveGame();
    }

    hugPet() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Your pet is sleeping peacefully... 💤', true);
            return;
        }

        this.pet.classList.add('hugging');
        setTimeout(() => this.pet.classList.remove('hugging'), 1200);
        
        this.happiness = Math.min(100, this.happiness + 20);
        this.health = Math.min(100, this.health + 5);
        this.addExperience(8);
        
        this.playSound('pet');
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.createParticles('💖', 'heart'), i * 100);
        }
        
        this.showMessage('Big hug! Your pet feels loved! 💖');
        this.updateDisplay();
        this.saveGame();
    }

    // Growth system
    updateGrowthStage() {
        const oldStage = this.growthStage;
        
        if (this.level >= 20 || this.age >= 30) {
            this.growthStage = 'elder';
            this.size = 1.3;
        } else if (this.level >= 15 || this.age >= 21) {
            this.growthStage = 'adult';
            this.size = 1.2;
        } else if (this.level >= 10 || this.age >= 14) {
            this.growthStage = 'teen';
            this.size = 1.1;
        } else if (this.level >= 5 || this.age >= 7) {
            this.growthStage = 'child';
            this.size = 1.0;
        } else {
            this.growthStage = 'baby';
            this.size = 0.85;
        }
        
        if (oldStage !== this.growthStage) {
            this.applyGrowthVisuals();
            this.announceGrowth();
        }
    }

    applyGrowthVisuals() {
        if (!this.pet) return;
        
        this.pet.style.transform = `scale(${this.size})`;
        this.pet.style.transition = 'transform 1s ease-out';
        
        // Add visual cues based on stage
        this.pet.classList.remove('stage-baby', 'stage-child', 'stage-teen', 'stage-adult', 'stage-elder');
        this.pet.classList.add(`stage-${this.growthStage}`);
        
        // Update emoji size based on growth
        if (this.petEmoji) {
            const emojiSizes = {
                baby: '85px',
                child: '95px',
                teen: '105px',
                adult: '115px',
                elder: '120px'
            };
            this.petEmoji.style.fontSize = emojiSizes[this.growthStage] || '105px';
        }
    }

    announceGrowth() {
        const announcements = {
            child: '🌱 Your pet is growing! Now a child!',
            teen: '🌿 Your pet is a teenager now!',
            adult: '🌳 Your pet has become an adult!',
            elder: '👑 Your pet is now a wise elder!'
        };
        
        if (announcements[this.growthStage]) {
            this.createParticles('✨', 'sparkle');
            this.createParticles('⭐', 'sparkle');
            this.showMessage(announcements[this.growthStage]);
        }
    }

    // Achievement system
    checkAchievement(achievementId, message) {
        if (!this.achievements[achievementId]) {
            this.achievements[achievementId] = true;
            this.playSound('achievement');
            this.showAchievement(message);
            this.saveGame();
        }
    }

    showAchievement(message) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-popup';
        achievement.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">🏆</div>
                <div class="achievement-text">
                    <div class="achievement-title">Achievement Unlocked!</div>
                    <div class="achievement-desc">${message}</div>
                </div>
            </div>
        `;
        document.body.appendChild(achievement);
        
        setTimeout(() => achievement.classList.add('show'), 100);
        setTimeout(() => {
            achievement.classList.remove('show');
            setTimeout(() => achievement.remove(), 500);
        }, 4000);
    }

    // Settings Modal
    openSettings() {
        this.settingsModal.classList.add('show');
        this.updateSettingsUI();
    }

    closeSettingsModal() {
        this.settingsModal.classList.remove('show');
    }

    updateSettingsUI() {
        // Update pet selection
        document.querySelectorAll('.pet-option').forEach(option => {
            if (option.dataset.pet === this.petType) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });

        // Update settings values
        document.getElementById('decaySpeed').value = this.settings.decaySpeed;
        document.getElementById('soundToggle').checked = this.settings.soundEnabled;
        document.getElementById('soundMode').value = this.settings.soundMode || 'game';
        document.getElementById('particlesToggle').checked = this.settings.particlesEnabled;
        document.getElementById('autoSave').checked = this.settings.autoSave;
        document.getElementById('containerTheme').value = this.settings.containerTheme;
        document.getElementById('themeSelect').value = this.settings.theme;
    }

    // Analytics Modal
    openAnalytics() {
        this.analyticsModal.classList.add('show');
        this.updateAnalytics();
    }

    closeAnalyticsModal() {
        this.analyticsModal.classList.remove('show');
    }

    // Help Modal
    openHelp() {
        this.helpModal.classList.add('show');
    }

    closeHelpModal() {
        this.helpModal.classList.remove('show');
    }

    updateAnalytics() {
        // Interaction counts
        document.getElementById('statPetCount').textContent = this.petCount;
        document.getElementById('statFeedCount').textContent = this.feedCount;
        document.getElementById('statPlayCount').textContent = this.playCount;
        document.getElementById('statHealCount').textContent = this.healCount;
        document.getElementById('statBathCount').textContent = this.bathCount;
        document.getElementById('statTrainCount').textContent = this.trainCount;
        document.getElementById('statVetCount').textContent = this.vetCount;
        document.getElementById('statChoreCount').textContent = this.choreCount;
        document.getElementById('statToyCount').textContent = this.toyCount;
        document.getElementById('statTrickCount').textContent = this.trickCount;

        // Time statistics
        document.getElementById('statAge').textContent = this.age;
        document.getElementById('statLevel').textContent = this.level;
        document.getElementById('statGrowth').textContent = this.growthStage.charAt(0).toUpperCase() + this.growthStage.slice(1);
        
        const hoursPlayed = Math.floor(this.totalTimePlayed / 3600);
        const minutesPlayed = Math.floor((this.totalTimePlayed % 3600) / 60);
        document.getElementById('statTimePlayed').textContent = `${hoursPlayed}h ${minutesPlayed}m`;
        
        const createdDate = new Date(this.createdDate);
        document.getElementById('statCreated').textContent = createdDate.toLocaleDateString();

        // Current stats chart
        document.getElementById('chartHealth').style.width = `${this.health}%`;
        document.getElementById('chartHealthValue').textContent = `${Math.round(this.health)}%`;
        document.getElementById('chartHunger').style.width = `${this.hunger}%`;
        document.getElementById('chartHungerValue').textContent = `${Math.round(this.hunger)}%`;
        document.getElementById('chartHappiness').style.width = `${this.happiness}%`;
        document.getElementById('chartHappinessValue').textContent = `${Math.round(this.happiness)}%`;
        document.getElementById('chartEnergy').style.width = `${this.energy}%`;
        document.getElementById('chartEnergyValue').textContent = `${Math.round(this.energy)}%`;

        // Performance stats
        const avgStats = (this.health + this.hunger + this.happiness + this.energy) / 4;
        document.getElementById('statAvgHappiness').textContent = `${Math.round(this.happiness)}%`;
        document.getElementById('statAvgHealth').textContent = `${Math.round(this.health)}%`;
        
        const totalInteractions = this.petCount + this.feedCount + this.playCount + this.healCount + this.bathCount + this.trainCount + this.vetCount + this.choreCount + this.toyCount + this.trickCount;
        const interactionsPerDay = this.age > 0 ? Math.round(totalInteractions / this.age) : totalInteractions;
        document.getElementById('statInteractionsPerDay').textContent = interactionsPerDay;
        document.getElementById('statTotalXP').textContent = this.totalXP;
        
        const petTypeNames = {dog: 'Dog', cat: 'Cat', bird: 'Bird', rabbit: 'Rabbit', fox: 'Fox', bear: 'Bear'};
        document.getElementById('statPetType').textContent = petTypeNames[this.petType];

        // Achievements list
        const achievementList = document.getElementById('achievementList');
        achievementList.innerHTML = '';
        const achievementNames = {
            firstFeed: '🍖 First Meal',
            firstPlay: '🎾 First Playtime',
            reach5: '⭐ Level 5',
            reach10: '🌟 Level 10',
            petted50: '🏆 50 Pets',
            petted100: '👑 100 Pets',
            weekOld: '🎂 One Week Old'
        };
        Object.keys(this.achievements).forEach(key => {
            const achieved = this.achievements[key];
            const item = document.createElement('div');
            item.className = `achievement-item ${achieved ? 'unlocked' : 'locked'}`;
            item.textContent = achievementNames[key] || key;
            achievementList.appendChild(item);
        });

        // Care rating
        this.updateCareRating(avgStats);
    }

    updateCareRating(avgStats) {
        const careRating = document.getElementById('careRating');
        const careMessage = document.getElementById('careMessage');
        
        if (avgStats >= 90) {
            careRating.textContent = '⭐⭐⭐⭐⭐';
            careMessage.textContent = 'Exceptional Care! Your pet is thriving!';
            careMessage.style.color = '#51cf66';
        } else if (avgStats >= 75) {
            careRating.textContent = '⭐⭐⭐⭐';
            careMessage.textContent = 'Great Care! Keep it up!';
            careMessage.style.color = '#69db7c';
        } else if (avgStats >= 60) {
            careRating.textContent = '⭐⭐⭐';
            careMessage.textContent = 'Good Care! Room for improvement.';
            careMessage.style.color = '#ffd43b';
        } else if (avgStats >= 40) {
            careRating.textContent = '⭐⭐';
            careMessage.textContent = 'Needs More Attention!';
            careMessage.style.color = '#ffa94d';
        } else {
            careRating.textContent = '⭐';
            careMessage.textContent = 'Critical! Your pet needs care!';
            careMessage.style.color = '#ff6b6b';
        }
    }

    // Pet Type System
    changePetType(newType) {
        this.petType = newType;
        this.applyPetType();
        this.showMessage(`Your pet is now a ${newType}! 🎉`);
        this.saveGame();
    }

    applyPetType() {
        if (!this.pet) return;
        
        // Remove all pet type classes
        this.pet.classList.remove('pet-dog', 'pet-cat', 'pet-bird', 'pet-rabbit', 'pet-fox', 'pet-bear');
        
        // Add current pet type class
        this.pet.classList.add(`pet-${this.petType}`);
        
        // Update the emoji display
        this.updatePetEmoji();
        this.updatePetInfo();
    }

    updateIdleBehavior() {
        // Different pets have different behaviors
        const petBehaviors = {
            dog: ['idle-wiggle', 'shake-head', 'happy', 'idle-sniff'],
            cat: ['idle-tilt', 'idle-sniff', 'idle-yawn', 'stretch'],
            bird: ['hop', 'flap-wings', 'chirp', 'preen'],
            rabbit: ['hop', 'nose-twitch', 'idle-sniff', 'stand-up'],
            fox: ['idle-tilt', 'shake-head', 'idle-sniff', 'pounce'],
            bear: ['idle-wiggle', 'idle-yawn', 'stretch', 'scratch']
        };
        
        this.currentBehaviors = petBehaviors[this.petType] || petBehaviors.dog;
    }

    performIdleBehavior() {
        if (this.isSleeping || !this.currentBehaviors) return;
        
        const behavior = this.currentBehaviors[Math.floor(Math.random() * this.currentBehaviors.length)];
        this.pet.classList.add(behavior);
        
        const duration = behavior.includes('hop') ? 400 : 
                        behavior.includes('flap') ? 600 : 
                        behavior.includes('stretch') ? 1200 : 800;
        
        setTimeout(() => this.pet.classList.remove(behavior), duration);
    }

    // Theme System
    applyTheme() {
        const themes = {
            purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            blue: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
            pink: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
            green: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
            cosmic: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
            fire: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
            aurora: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
            night: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
        };
        
        if (this.bodyElement) {
            this.bodyElement.style.background = themes[this.settings.theme] || themes.purple;
        }
    }

    applyContainerTheme() {
        const container = document.querySelector('.container');
        if (!container) return;

        // Remove all theme classes
        container.classList.remove('theme-dark', 'theme-light', 'theme-midnight', 'theme-forest', 'theme-sunset', 'theme-ocean');
        
        // Add current theme class
        container.classList.add(`theme-${this.settings.containerTheme}`);
    }

    saveGame() {
        if (!this.settings.autoSave) return;
        
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
            lastUpdate: this.lastUpdate,
            growthStage: this.growthStage,
            size: this.size,
            petType: this.petType,
            petCount: this.petCount,
            feedCount: this.feedCount,
            playCount: this.playCount,
            healCount: this.healCount,
            bathCount: this.bathCount,
            trainCount: this.trainCount,
            totalXP: this.totalXP,
            createdDate: this.createdDate,
            totalTimePlayed: this.totalTimePlayed,
            achievements: this.achievements,
            settings: this.settings,
            vetCount: this.vetCount,
            choreCount: this.choreCount,
            toyCount: this.toyCount,
            trickCount: this.trickCount,
            wallet: this.wallet,
            totalEarned: this.totalEarned,
            totalSpent: this.totalSpent,
            savingsGoal: this.savingsGoal,
            saved: this.saved,
            badges: this.badges,
            activityLog: this.activityLog
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
                this.growthStage = gameData.growthStage || 'baby';
                this.size = gameData.size || 1.0;
                this.petType = gameData.petType || 'dog';
                this.petCount = gameData.petCount || 0;
                this.feedCount = gameData.feedCount || 0;
                this.playCount = gameData.playCount || 0;
                this.healCount = gameData.healCount || 0;
                this.bathCount = gameData.bathCount || 0;
                this.trainCount = gameData.trainCount || 0;
                this.totalXP = gameData.totalXP || 0;
                this.createdDate = gameData.createdDate || Date.now();
                this.totalTimePlayed = gameData.totalTimePlayed || 0;
                this.achievements = gameData.achievements || this.achievements;
                this.settings = gameData.settings || this.settings;
                this.vetCount = gameData.vetCount || 0;
                this.choreCount = gameData.choreCount || 0;
                this.toyCount = gameData.toyCount || 0;
                this.trickCount = gameData.trickCount || 0;
                this.wallet = gameData.wallet || 100;
                this.totalEarned = gameData.totalEarned || 100;
                this.totalSpent = gameData.totalSpent || 0;
                this.savingsGoal = gameData.savingsGoal || 100;
                this.saved = gameData.saved || 0;
                this.badges = gameData.badges || this.badges;
                this.activityLog = gameData.activityLog || [];
                
                this.petNameDisplay.textContent = this.name;
                if (this.isSleeping) {
                    this.pet.classList.add('sleeping');
                }
                
                this.updateGrowthStage();
                this.applyGrowthVisuals();
                this.applyPetType();
                this.applyTheme();
                this.applyContainerTheme();
            } catch (e) {
                console.error('Error loading game:', e);
            }
        } else {
            // First time loading - apply default dark theme
            this.applyContainerTheme();
        }
        this.updateDisplay();
    }

    petPet() {
        if (this.isSleeping) {
            this.playSound('error');
            this.showMessage('Shh... Your pet is sleeping! 💤', true);
            return;
        }

        this.happiness = Math.min(100, this.happiness + 10);
        this.addExperience(3);
        this.petCount++;
        
        this.pet.classList.add('petting');
        setTimeout(() => this.pet.classList.remove('petting'), 600);
        
        this.playSound('pet');
        this.createParticles('❤️', 'heart');
        
        const messages = [
            'Your pet loves the attention! ❤️',
            'Your pet purrs with joy! 😊',
            'Your pet nuzzles your hand! 🥰',
            'Your pet is so happy! ✨'
        ];
        this.showMessage(messages[Math.floor(Math.random() * messages.length)]);
        
        if (this.petCount === 50) this.checkAchievement('petted50', '50 Pets Achievement! 🏆');
        if (this.petCount === 100) this.checkAchievement('petted100', '100 Pets Master! 👑');
        
        this.updateDisplay();
        this.saveGame();
    }

    async playSound(type = 'click') {
        if (!this.settings.soundEnabled) return;
        
        // Pet-specific sounds
        if (type === 'pet') {
            await this.playPetSound();
            return;
        }
        
        // Try MP3 first if realistic mode is enabled
        if (this.settings.soundMode === 'realistic') {
            const mp3Played = await this.playMP3Sound('ui', type);
            if (mp3Played) return;
        }
        
        // Fallback to synthesized sounds
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different sounds for different actions
            const soundTypes = {
                click: { freq: 800, duration: 0.1, type: 'sine' },
                feed: { freq: 600, duration: 0.15, type: 'sine' },
                play: { freq: 1000, duration: 0.2, type: 'sine' },
                sleep: { freq: 400, duration: 0.3, type: 'sine' },
                heal: { freq: 900, duration: 0.2, type: 'sine' },
                levelup: { freq: 1200, duration: 0.3, type: 'square' },
                achievement: { freq: 1500, duration: 0.25, type: 'square' },
                error: { freq: 300, duration: 0.15, type: 'sawtooth' },
                money: { freq: 1100, duration: 0.18, type: 'triangle' }
            };
            
            const sound = soundTypes[type] || soundTypes.click;
            
            oscillator.frequency.value = sound.freq;
            oscillator.type = sound.type;
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + sound.duration);
        } catch (error) {
            console.log('Sound not available:', error);
        }
    }

    async playPetSound() {
        // Try MP3 first if realistic mode is enabled
        if (this.settings.soundMode === 'realistic') {
            const mp3Played = await this.playMP3Sound('pets', this.petType);
            if (mp3Played) return;
        }
        
        // Fallback to synthesized pet sounds
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        
        // Pet-specific sounds using frequency modulation
        const petSounds = {
            dog: () => {
                // Simple "arf arf" pattern - more recognizable
                for (let i = 0; i < 2; i++) {
                    const t = now + (i * 0.18);
                    
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    
                    osc.type = 'square';
                    
                    // Quick drop from high to low - classic bark sound
                    osc.frequency.setValueAtTime(800, t);
                    osc.frequency.exponentialRampToValueAtTime(300, t + 0.06);
                    
                    // Sharp attack and quick decay
                    gain.gain.setValueAtTime(0.4, t);
                    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
                    
                    osc.start(t);
                    osc.stop(t + 0.08);
                }
            },
            cat: () => {
                // Realistic meow: Complex frequency modulation with vibrato
                const osc1 = audioContext.createOscillator();
                const osc2 = audioContext.createOscillator();
                const vibrato = audioContext.createOscillator();
                const vibratoGain = audioContext.createGain();
                const gain = audioContext.createGain();
                const filter = audioContext.createBiquadFilter();
                
                // Setup vibrato (makes it sound more cat-like)
                vibrato.frequency.value = 8; // 8Hz vibrato
                vibratoGain.gain.value = 30; // Vibrato depth
                vibrato.connect(vibratoGain);
                
                // Connect oscillators
                vibratoGain.connect(osc1.frequency);
                osc1.connect(gain);
                osc2.connect(gain);
                gain.connect(filter);
                filter.connect(audioContext.destination);
                
                filter.type = 'bandpass';
                filter.frequency.value = 800;
                filter.Q.value = 2;
                
                osc1.type = 'sawtooth';
                osc2.type = 'sine';
                
                // Meow pattern: mrrr-OW-www
                osc1.frequency.setValueAtTime(350, now);
                osc1.frequency.linearRampToValueAtTime(450, now + 0.1);
                osc1.frequency.linearRampToValueAtTime(900, now + 0.25);
                osc1.frequency.linearRampToValueAtTime(600, now + 0.45);
                osc1.frequency.linearRampToValueAtTime(400, now + 0.55);
                
                osc2.frequency.setValueAtTime(700, now);
                osc2.frequency.linearRampToValueAtTime(1200, now + 0.25);
                osc2.frequency.linearRampToValueAtTime(800, now + 0.55);
                
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.linearRampToValueAtTime(0.4, now + 0.25);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
                
                vibrato.start(now);
                vibrato.stop(now + 0.6);
                osc1.start(now);
                osc1.stop(now + 0.6);
                osc2.start(now);
                osc2.stop(now + 0.6);
            },
            bird: () => {
                // Chirp: High frequency, quick pulses
                for (let i = 0; i < 3; i++) {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    
                    const startTime = now + (i * 0.1);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(2000 + (i * 200), startTime);
                    osc.frequency.exponentialRampToValueAtTime(1800, startTime + 0.05);
                    
                    gain.gain.setValueAtTime(0.25, startTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.08);
                    
                    osc.start(startTime);
                    osc.stop(startTime + 0.08);
                }
            },
            rabbit: () => {
                // Soft squeak: Short, high-pitched
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
                
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                
                osc.start(now);
                osc.stop(now + 0.1);
            },
            fox: () => {
                // Yip: Quick high-pitched bark
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                
                osc.type = 'square';
                osc.frequency.setValueAtTime(900, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
                
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                
                osc.start(now);
                osc.stop(now + 0.12);
            },
            bear: () => {
                // Growl: Low frequency rumble
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                const filter = audioContext.createBiquadFilter();
                
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(audioContext.destination);
                
                filter.type = 'lowpass';
                filter.frequency.value = 400;
                
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(120, now + 0.3);
                
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                
                osc.start(now);
                osc.stop(now + 0.35);
            }
        };
        
        const soundFunc = petSounds[this.petType] || petSounds.dog;
        soundFunc();
    }

    loadAudioFiles() {
        // Load pet sounds
        const petTypes = ['dog', 'cat', 'bird', 'rabbit', 'fox', 'bear'];
        petTypes.forEach(pet => {
            const audio = new Audio();
            audio.src = `sounds/pets/${pet}.mp3`;
            audio.volume = 0.5;
            audio.preload = 'auto';
            this.audioLibrary.pets[pet] = audio;
            
            // Handle loading errors silently
            audio.addEventListener('error', () => {
                console.log(`MP3 not found for ${pet}, will use synthesized sound`);
            });
        });
        
        // Load UI sounds
        const uiSounds = ['money', 'heal', 'sleep', 'levelup', 'achievement', 'error'];
        uiSounds.forEach(sound => {
            const audio = new Audio();
            audio.src = `sounds/ui/${sound}.mp3`;
            audio.volume = 0.4;
            audio.preload = 'auto';
            this.audioLibrary.ui[sound] = audio;
            
            // Handle loading errors silently
            audio.addEventListener('error', () => {
                console.log(`MP3 not found for ${sound}, will use synthesized sound`);
            });
        });
    }

    async playMP3Sound(category, name) {
        try {
            const audio = this.audioLibrary[category][name];
            if (!audio) return false;
            
            // Clone the audio to allow overlapping sounds
            const soundClone = audio.cloneNode();
            soundClone.volume = audio.volume;
            
            await soundClone.play();
            return true;
        } catch (error) {
            console.log(`Failed to play MP3 ${category}/${name}:`, error);
            return false;
        }
    }

    createParticles(emoji, type = 'heart') {
        if (!this.settings.particlesEnabled) return;
        
        const petRect = this.pet.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = `pet-particle ${type}`;
                particle.textContent = emoji;
                particle.style.left = `${petRect.width / 2 + (Math.random() - 0.5) * 40}px`;
                particle.style.top = `${petRect.height / 2 + (Math.random() - 0.5) * 40}px`;
                this.pet.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1200);
            }, i * 150);
        }
    }


    updateThoughtBubble() {
        if (!this.thoughtBubble) return;

        // Pet-specific thoughts
        const petThoughts = {
            dog: {
                happy: [
                    { emoji: '😊', text: 'Wag wag!' },
                    { emoji: '🦴', text: 'Play fetch?' },
                    { emoji: '❤️', text: 'I love you!' }
                ],
                hungry: { emoji: '🍖', text: 'Hungry! Woof!' }
            },
            cat: {
                happy: [
                    { emoji: '😸', text: 'Purr purr...' },
                    { emoji: '🐟', text: 'Meow?' },
                    { emoji: '😺', text: 'Pet me!' }
                ],
                hungry: { emoji: '🐟', text: 'Meow! Feed me!' }
            },
            bird: {
                happy: [
                    { emoji: '🐦', text: 'Tweet tweet!' },
                    { emoji: '🎵', text: 'Chirp chirp!' },
                    { emoji: '✨', text: 'Flying high!' }
                ],
                hungry: { emoji: '🌾', text: 'Seeds please!' }
            },
            rabbit: {
                happy: [
                    { emoji: '🐰', text: 'Hop hop!' },
                    { emoji: '🥕', text: 'Nibble nibble' },
                    { emoji: '😊', text: 'Bunny happy!' }
                ],
                hungry: { emoji: '🥕', text: 'Carrot time?' }
            },
            fox: {
                happy: [
                    { emoji: '🦊', text: 'Yip yip!' },
                    { emoji: '✨', text: 'Clever fox!' },
                    { emoji: '😊', text: 'Sneaky fun!' }
                ],
                hungry: { emoji: '🍖', text: 'Hunt time!' }
            },
            bear: {
                happy: [
                    { emoji: '🐻', text: 'Grr! (happy)' },
                    { emoji: '🍯', text: 'Honey good!' },
                    { emoji: '😊', text: 'Bear hugs!' }
                ],
                hungry: { emoji: '🍯', text: 'Need honey!' }
            }
        };

        const thoughts = {
            happy: [
                { emoji: '😊', text: "I'm happy!" },
                { emoji: '✨', text: 'Life is good!' },
                { emoji: '🎉', text: 'Yay!' }
            ],
            okay: [
                { emoji: '😐', text: "I'm okay..." },
                { emoji: '🤔', text: 'Hmm...' }
            ],
            sad: [
                { emoji: '😢', text: 'I need care...' },
                { emoji: '😞', text: "I'm sad..." }
            ],
            critical: [
                { emoji: '😰', text: 'Help me!' },
                { emoji: '😭', text: 'I need help!' }
            ]
        };

        if (this.isSleeping) {
            const sleepThoughts = [
                { emoji: '💤', text: 'Zzz...' },
                { emoji: '😴', text: 'Sweet dreams...' },
                { emoji: '🌙', text: 'Sleeping...' }
            ];
            const thought = sleepThoughts[Math.floor(Math.random() * sleepThoughts.length)];
            this.thoughtBubble.querySelector('.bubble-emoji').textContent = thought.emoji;
            this.thoughtBubble.querySelector('.bubble-text').textContent = thought.text;
            return;
        }

        // Pet-specific messages
        const currentPetThoughts = petThoughts[this.petType] || petThoughts.dog;

        if (this.hunger < 30) {
            const hungryThought = currentPetThoughts.hungry;
            this.thoughtBubble.querySelector('.bubble-emoji').textContent = hungryThought.emoji;
            this.thoughtBubble.querySelector('.bubble-text').textContent = hungryThought.text;
        } else if (this.energy < 30) {
            this.thoughtBubble.querySelector('.bubble-emoji').textContent = '💤';
            this.thoughtBubble.querySelector('.bubble-text').textContent = "I'm tired...";
        } else if (this.health < 40) {
            this.thoughtBubble.querySelector('.bubble-emoji').textContent = '🤒';
            this.thoughtBubble.querySelector('.bubble-text').textContent = "I don't feel good...";
        } else {
            // Use pet-specific happy thoughts or mood-based thoughts
            if (this.mood === 'happy' && currentPetThoughts.happy) {
                const happyThoughts = currentPetThoughts.happy;
                const thought = happyThoughts[Math.floor(Math.random() * happyThoughts.length)];
                this.thoughtBubble.querySelector('.bubble-emoji').textContent = thought.emoji;
                this.thoughtBubble.querySelector('.bubble-text').textContent = thought.text;
            } else {
                const moodThoughts = thoughts[this.mood] || thoughts.happy;
                const thought = moodThoughts[Math.floor(Math.random() * moodThoughts.length)];
                this.thoughtBubble.querySelector('.bubble-emoji').textContent = thought.emoji;
                this.thoughtBubble.querySelector('.bubble-text').textContent = thought.text;
            }
        }
    }

    updateEnvironment() {
        if (!this.bodyElement) return;

        const hour = new Date().getHours();
        if (hour >= 20 || hour < 6) {
            this.bodyElement.classList.add('night-mode');
        } else {
            this.bodyElement.classList.remove('night-mode');
        }
    }

    startAmbientInteractions() {
        // Pet emoji and mood updates handled in updateDisplay()

        // Initialize behaviors
        this.updateIdleBehavior();

        // Random idle animations - species-specific
        this.idleInterval = setInterval(() => {
            this.performIdleBehavior();
        }, 4000); // Every 4 seconds

        // Update thought bubble periodically with pet-specific messages
        setInterval(() => {
            this.updateThoughtBubble();
        }, 8000);

        // Periodic blinking - make it feel alive
        setInterval(() => {
            if (!this.isSleeping) {
                this.pet.classList.add('quick-blink');
                setTimeout(() => this.pet.classList.remove('quick-blink'), 200);
            }
        }, 3500);

        // Show first-time help hint
        if (!localStorage.getItem('pixelPawHelpShown')) {
            setTimeout(() => {
                this.showMessage('💡 New here? Click the ❓ button for help and tutorial!', false);
                localStorage.setItem('pixelPawHelpShown', 'true');
            }, 2000);
        }
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new VirtualPet();
});

