# Complete Learning Guide: Virtual Pet Application
## A Step-by-Step Journey to Understanding Every Line of Code

---

## 📚 Table of Contents

1. [Introduction - How to Use This Guide](#introduction)
2. [Part 1: HTML - The Structure](#part-1-html)
3. [Part 2: CSS - The Styling](#part-2-css)
4. [Part 3: JavaScript Basics](#part-3-javascript-basics)
5. [Part 4: Advanced JavaScript Concepts](#part-4-advanced-javascript)
6. [Part 5: How Everything Works Together](#part-5-integration)
7. [Part 6: Code Walkthrough - Line by Line](#part-6-code-walkthrough)
8. [Part 7: Try It Yourself - Exercises](#part-7-exercises)

---

## 🎯 Introduction - How to Use This Guide {#introduction}

### Who Is This For?
This guide is written for high school students who want to understand how web applications work. No prior experience required! We'll start from the basics.

### Learning Path
1. **First Time?** Read sections 1-3 to understand basics
2. **Know HTML/CSS?** Jump to section 3 (JavaScript)
3. **Review Before Presentation?** Focus on section 6 (Code Walkthrough)
4. **Want to Modify?** Read everything, then do section 7 (Exercises)

### What You'll Learn
- How websites are built
- How to make websites interactive
- How to save data
- Programming concepts used in real applications
- How to explain technical concepts

---

## 📄 Part 1: HTML - The Structure {#part-1-html}

### What is HTML?

HTML stands for **HyperText Markup Language**. Think of it as the skeleton of a website. It defines:
- What content appears on the page
- Where elements are placed
- The structure and organization

### Basic HTML Concepts

#### 1. **Tags**
HTML uses "tags" to define elements. Tags are wrapped in angle brackets `< >`.

```html
<button>Click Me</button>
```

- `<button>` = Opening tag
- `Click Me` = Content
- `</button>` = Closing tag

#### 2. **Attributes**
Tags can have attributes that provide extra information:

```html
<button id="feed-btn" class="action-btn">Feed</button>
```

- `id="feed-btn"` = Unique identifier (only one per page)
- `class="action-btn"` = Group identifier (can be reused)

### Key HTML Elements in Our App

#### **Divs - Container Elements**
```html
<div class="container">
    <!-- Content goes here -->
</div>
```
**What it does**: Groups related content together. Like a box that holds other things.

#### **Buttons**
```html
<button id="feed-btn" onclick="feedPet()">
    🍔 Feed
</button>
```
**What it does**: Creates a clickable button
- `onclick="feedPet()"` = When clicked, run the feedPet function

#### **Progress Bars**
```html
<div class="stat-bar">
    <div class="stat-fill" id="hunger-fill" style="width: 50%"></div>
</div>
```
**What it does**: Shows a visual bar (like health bars in games)
- Outer div is the container
- Inner div is the colored fill
- Width changes to show different values

#### **Input Fields**
```html
<input type="text" id="pet-name" placeholder="Enter pet name">
```
**What it does**: Lets users type text
- `type="text"` = Regular text input
- `placeholder` = Gray hint text

#### **Select Dropdown**
```html
<select id="pet-type">
    <option value="dog">🐕 Dog</option>
    <option value="cat">🐱 Cat</option>
</select>
```
**What it does**: Creates a dropdown menu
- Each `<option>` is a choice
- `value` is what JavaScript sees

### HTML Structure of Our App

```
<!DOCTYPE html>                    ← Tells browser it's HTML5
<html>                            ← Root element
  <head>                          ← Info about the page
    <title>...</title>            ← Browser tab title
    <link rel="stylesheet">       ← Connect CSS file
  </head>
  <body>                          ← Visible content
    <div class="container">       ← Main container
      <div id="welcome-screen">   ← Welcome screen
      <div id="create-screen">    ← Pet creation screen
      <div id="game-screen">      ← Main game screen
      <div id="shop-screen">      ← Shop screen
    </div>
    <script src="script.js">      ← Connect JavaScript file
  </body>
</html>
```

### Why Multiple Screens?

Instead of separate HTML files, we use **single-page application** technique:
- All screens exist in one HTML file
- JavaScript shows/hides screens using CSS `display` property
- Faster than loading new pages
- Can share data between screens easily

### Understanding IDs vs Classes

**IDs** (use `#` in CSS):
```html
<div id="game-screen">
```
- Must be unique (only one per page)
- Used when JavaScript needs to find a specific element
- Example: `document.getElementById('game-screen')`

**Classes** (use `.` in CSS):
```html
<button class="action-btn">
```
- Can be reused many times
- Used for styling similar elements
- Example: All buttons with same style

---

## 🎨 Part 2: CSS - The Styling {#part-2-css}

### What is CSS?

CSS stands for **Cascading Style Sheets**. If HTML is the skeleton, CSS is the skin, clothes, and makeup. It controls:
- Colors
- Sizes
- Positions
- Animations
- Overall appearance

### CSS Syntax

```css
selector {
    property: value;
}
```

Example:
```css
button {
    background-color: blue;
    color: white;
    padding: 10px;
}
```

### CSS Selectors

#### **Element Selector**
```css
button {
    /* Styles ALL buttons */
}
```

#### **Class Selector**
```css
.action-btn {
    /* Styles all elements with class="action-btn" */
}
```

#### **ID Selector**
```css
#game-screen {
    /* Styles only the element with id="game-screen" */
}
```

#### **Combining Selectors**
```css
button.action-btn {
    /* Only buttons with class="action-btn" */
}

.container #game-screen {
    /* #game-screen inside .container */
}
```

### Key CSS Concepts in Our App

#### 1. **The Box Model**

Every HTML element is a box with 4 layers:

```
┌─────────────────────────────┐
│  Margin (outside space)     │
│  ┌──────────────────────┐   │
│  │  Border              │   │
│  │  ┌───────────────┐   │   │
│  │  │  Padding      │   │   │
│  │  │  ┌────────┐   │   │   │
│  │  │  │Content │   │   │   │
│  │  │  └────────┘   │   │   │
│  │  └───────────────┘   │   │
│  └──────────────────────┘   │
└─────────────────────────────┘
```

Example:
```css
.container {
    padding: 20px;        /* Inside space */
    margin: 10px;         /* Outside space */
    border: 2px solid;    /* Border line */
}
```

#### 2. **Flexbox - Modern Layout**

Flexbox makes it easy to arrange elements:

```css
.container {
    display: flex;           /* Enable flexbox */
    flex-direction: row;     /* Horizontal (or column for vertical) */
    justify-content: center; /* Center horizontally */
    align-items: center;     /* Center vertically */
    gap: 10px;              /* Space between items */
}
```

**Visual Example:**
```
justify-content: space-between
[Item 1]              [Item 2]              [Item 3]

justify-content: center
           [Item 1] [Item 2] [Item 3]
```

#### 3. **Positioning**

```css
.element {
    position: relative;   /* Positioned relative to normal position */
    position: absolute;   /* Positioned relative to parent */
    position: fixed;      /* Stays in place when scrolling */
    position: sticky;     /* Sticks when scrolling past */
}
```

Our app uses `absolute` for overlays:
```css
.screen {
    position: absolute;
    top: 0;
    left: 0;
}
```

#### 4. **Transitions - Smooth Animations**

```css
button {
    background-color: blue;
    transition: all 0.3s ease;  /* Animate changes over 0.3 seconds */
}

button:hover {
    background-color: darkblue;  /* Changes smoothly on hover */
    transform: scale(1.1);        /* Grows 10% larger */
}
```

**Breakdown:**
- `all` = Animate all properties
- `0.3s` = Takes 0.3 seconds
- `ease` = Smooth start and end

#### 5. **Animations - Keyframes**

For complex animations:

```css
@keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0); }
}

.pet {
    animation: bounce 1s infinite;
}
```

**What this does**: Pet bounces up and down forever

#### 6. **CSS Variables (Custom Properties)**

Define reusable values:

```css
:root {
    --primary-color: #4CAF50;
    --secondary-color: #2196F3;
}

button {
    background-color: var(--primary-color);
}
```

**Why use variables?**
- Easy to change colors everywhere at once
- Perfect for themes!

### Theme System Explained

Our app uses CSS variables for themes:

```css
[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
}

[data-theme="light"] {
    --bg-color: #ffffff;
    --text-color: #000000;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
```

**How it works:**
1. JavaScript sets `data-theme` attribute on body
2. CSS variables change based on theme
3. All elements using those variables update automatically!

### Responsive Design

Make it work on phones and tablets:

```css
@media (max-width: 768px) {
    /* These styles only apply on small screens */
    .container {
        width: 100%;
        padding: 10px;
    }
}
```

**Breakpoints:**
- `768px` = Tablets and smaller
- `480px` = Phones
- `1024px` = Small laptops

---

## 💻 Part 3: JavaScript Basics {#part-3-javascript-basics}

### What is JavaScript?

JavaScript (JS) makes websites **interactive**. It's the brain that:
- Responds to clicks and user actions
- Updates content without reloading page
- Stores and retrieves data
- Performs calculations
- Makes decisions

### Basic JavaScript Concepts

#### 1. **Variables - Storing Data**

```javascript
let petName = "Fluffy";        // Can change later
const maxLevel = 10;            // Cannot change
var oldWay = "Don't use this";  // Old style (avoid)
```

**Types of data:**
```javascript
let number = 42;                // Number
let text = "Hello";             // String (text)
let isHappy = true;             // Boolean (true/false)
let nothing = null;             // Null (intentionally empty)
let notSet = undefined;         // Undefined (not set yet)
```

#### 2. **Arrays - Lists of Items**

```javascript
let petTypes = ["dog", "cat", "dragon"];

// Accessing items (starts at 0!)
petTypes[0]  // "dog"
petTypes[1]  // "cat"

// Adding items
petTypes.push("robot");  // Adds to end

// Length
petTypes.length  // 4
```

#### 3. **Objects - Organized Data**

```javascript
let pet = {
    name: "Fluffy",
    type: "dog",
    hunger: 50,
    happiness: 70
};

// Accessing properties
pet.name           // "Fluffy"
pet["hunger"]      // 50

// Changing values
pet.hunger = 60;
```

#### 4. **Functions - Reusable Code**

```javascript
// Simple function
function feedPet() {
    pet.hunger += 10;
    console.log("Fed the pet!");
}

// Function with parameters
function updateStat(statName, amount) {
    pet[statName] += amount;
}

// Function that returns a value
function calculateHealth(hunger, happiness) {
    return (hunger + happiness) / 2;
}

// Calling functions
feedPet();
updateStat("hunger", 15);
let health = calculateHealth(50, 70);  // health = 60
```

#### 5. **Conditional Statements - Making Decisions**

```javascript
if (pet.hunger < 30) {
    console.log("Pet is hungry!");
} else if (pet.hunger < 70) {
    console.log("Pet is okay");
} else {
    console.log("Pet is full!");
}

// Short version (ternary)
let message = pet.hunger < 30 ? "Hungry" : "Full";
```

#### 6. **Loops - Repeating Actions**

```javascript
// For loop - repeat specific number of times
for (let i = 0; i < 5; i++) {
    console.log("Count: " + i);  // 0, 1, 2, 3, 4
}

// For...of loop - loop through array
let pets = ["dog", "cat", "dragon"];
for (let petType of pets) {
    console.log(petType);
}

// While loop - repeat while condition is true
while (pet.hunger > 0) {
    pet.hunger -= 1;
}
```

### DOM Manipulation - Changing the Webpage

DOM = **Document Object Model** (the webpage structure)

#### **Finding Elements**

```javascript
// By ID (most common)
let gameScreen = document.getElementById('game-screen');

// By class name
let buttons = document.getElementsByClassName('action-btn');

// By CSS selector (most flexible)
let feedBtn = document.querySelector('#feed-btn');
let allButtons = document.querySelectorAll('.action-btn');
```

#### **Changing Content**

```javascript
// Change text
document.getElementById('pet-name').textContent = "Fluffy";

// Change HTML
document.getElementById('stats').innerHTML = "<p>Hunger: 50</p>";

// Change value of input
document.getElementById('name-input').value = "Fluffy";
```

#### **Changing Styles**

```javascript
// Change individual style
element.style.backgroundColor = "red";
element.style.display = "none";  // Hide
element.style.display = "block"; // Show

// Add/remove class
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');  // Add if not there, remove if there
```

#### **Event Listeners - Responding to User Actions**

```javascript
// Click event
document.getElementById('feed-btn').addEventListener('click', function() {
    feedPet();
});

// Multiple events
button.addEventListener('mouseenter', function() {
    console.log('Mouse entered!');
});

button.addEventListener('mouseleave', function() {
    console.log('Mouse left!');
});

// Shorter syntax (arrow function)
button.addEventListener('click', () => {
    feedPet();
});
```

### Timers - Doing Things Automatically

```javascript
// Do something after a delay (once)
setTimeout(function() {
    console.log("This runs after 3 seconds");
}, 3000);  // 3000 milliseconds = 3 seconds

// Do something repeatedly
let timer = setInterval(function() {
    decreaseStats();  // Runs every 5 seconds
}, 5000);

// Stop a timer
clearInterval(timer);
```

### Local Storage - Saving Data

```javascript
// Save data (must be string)
localStorage.setItem('petName', 'Fluffy');

// Save complex data (convert to JSON first)
let petData = { name: 'Fluffy', hunger: 50 };
localStorage.setItem('pet', JSON.stringify(petData));

// Load data
let name = localStorage.getItem('petName');

// Load complex data (convert from JSON)
let savedPet = JSON.parse(localStorage.getItem('pet'));

// Remove data
localStorage.removeItem('pet');

// Clear all data
localStorage.clear();
```

---

## 🚀 Part 4: Advanced JavaScript Concepts {#part-4-advanced-javascript}

### 1. Classes - Object Templates

Classes are like blueprints for creating objects:

```javascript
class Pet {
    // Constructor - runs when creating new pet
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.hunger = 50;
        this.happiness = 50;
    }
    
    // Method - function inside class
    feed() {
        this.hunger += 15;
        if (this.hunger > 100) {
            this.hunger = 100;
        }
    }
    
    play() {
        this.happiness += 10;
        this.hunger -= 5;  // Playing makes them hungry
    }
    
    // Getter - calculated property
    get health() {
        return (this.hunger + this.happiness) / 2;
    }
}

// Creating a new pet
let myPet = new Pet("Fluffy", "dog");
myPet.feed();
console.log(myPet.health);  // Calls getter
```

**Why use classes?**
- Organize related data and functions
- Create multiple objects with same structure
- Easier to maintain code

### 2. Template Literals - Better Strings

```javascript
// Old way
let message = "Pet name is " + pet.name + " and hunger is " + pet.hunger;

// New way (template literals)
let message = `Pet name is ${pet.name} and hunger is ${pet.hunger}`;

// Multi-line strings
let html = `
    <div>
        <h1>${pet.name}</h1>
        <p>Hunger: ${pet.hunger}</p>
    </div>
`;
```

**Use backticks** (`) instead of quotes!

### 3. Array Methods - Powerful Data Manipulation

```javascript
let numbers = [1, 2, 3, 4, 5];

// Map - transform each item
let doubled = numbers.map(num => num * 2);  // [2, 4, 6, 8, 10]

// Filter - keep only items that match condition
let evens = numbers.filter(num => num % 2 === 0);  // [2, 4]

// Find - get first matching item
let three = numbers.find(num => num === 3);  // 3

// Some - check if any item matches
let hasLarge = numbers.some(num => num > 4);  // true

// Every - check if all items match
let allSmall = numbers.every(num => num < 10);  // true

// Reduce - combine all items into one value
let sum = numbers.reduce((total, num) => total + num, 0);  // 15
```

### 4. Destructuring - Extracting Values

```javascript
// Object destructuring
let pet = { name: "Fluffy", type: "dog", hunger: 50 };
let { name, hunger } = pet;
// Now: name = "Fluffy", hunger = 50

// Array destructuring
let colors = ["red", "green", "blue"];
let [first, second] = colors;
// Now: first = "red", second = "green"
```

### 5. Spread Operator - Copying and Combining

```javascript
// Copy array
let original = [1, 2, 3];
let copy = [...original];  // [1, 2, 3]

// Combine arrays
let combined = [...original, 4, 5, 6];  // [1, 2, 3, 4, 5, 6]

// Copy object
let pet = { name: "Fluffy", hunger: 50 };
let petCopy = { ...pet };

// Add properties while copying
let enhancedPet = { ...pet, happiness: 70 };
```

### 6. Arrow Functions - Shorter Syntax

```javascript
// Regular function
function add(a, b) {
    return a + b;
}

// Arrow function
let add = (a, b) => {
    return a + b;
};

// Even shorter (automatic return)
let add = (a, b) => a + b;

// Single parameter (no parentheses needed)
let double = num => num * 2;

// No parameters
let greet = () => console.log("Hello!");
```

**When to use:**
- Short, simple functions
- Callbacks in array methods
- Event listeners

### 7. Async Concepts (Preview)

Our app doesn't use these much, but good to know:

```javascript
// Promises - for future values
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Async/Await - cleaner syntax
async function getData() {
    try {
        let response = await fetch('https://api.example.com/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

---

## 🔗 Part 5: How Everything Works Together {#part-5-integration}

### The Application Lifecycle

```
1. Page Loads (index.html)
   ↓
2. Browser reads HTML structure
   ↓
3. Browser loads CSS (styles.css)
   ↓
4. Browser loads JavaScript (script.js)
   ↓
5. JavaScript runs initialization code
   ↓
6. Check if saved data exists
   ├─ YES → Load saved pet
   └─ NO → Show welcome screen
   ↓
7. Set up event listeners on buttons
   ↓
8. Start game loop (timer)
   ↓
9. [LOOP] Every 5 seconds:
   - Decrease stats
   - Update UI
   - Save progress
   ↓
10. User clicks button
    ↓
11. Event listener runs function
    ↓
12. Function updates pet data
    ↓
13. UI updates to reflect changes
    ↓
14. [LOOP continues...]
```

### Data Flow

```
User Action → Event Listener → Update Pet Object → Update DOM → User Sees Change
```

**Example: Feeding the Pet**

```javascript
// 1. User clicks Feed button
<button onclick="feedPet()">Feed</button>

// 2. feedPet function runs
function feedPet() {
    // 3. Update pet data
    pet.hunger += 15;
    pet.coins -= 5;
    
    // 4. Check limits
    if (pet.hunger > 100) pet.hunger = 100;
    
    // 5. Update UI
    updateUI();
    
    // 6. Save to localStorage
    savePet();
    
    // 7. Show animation
    playAnimation('feed');
}

// 8. User sees updated hunger bar and animation
```

### Screen Management

How we switch between different screens:

```javascript
function showScreen(screenId) {
    // 1. Hide all screens
    let screens = ['welcome-screen', 'create-screen', 'game-screen', 'shop-screen'];
    screens.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    
    // 2. Show requested screen
    document.getElementById(screenId).style.display = 'flex';
}

// Usage
showScreen('game-screen');  // Show game, hide others
```

### State Management

"State" = current data of the application

```javascript
// Global variables hold app state
let pet = null;              // Current pet object
let gameTimer = null;        // Timer reference
let currentTheme = 'light';  // Current theme
let unlockedItems = [];      // Items player owns

// When user does something, update state
function feedPet() {
    pet.hunger += 15;  // Update state
    updateUI();         // Reflect in UI
    savePet();          // Persist state
}
```

### The Update Loop

Most important pattern in the app:

```javascript
// Start the game loop
function startGame() {
    gameTimer = setInterval(() => {
        // Run every 5 seconds
        decreaseStats();      // Pet gets hungry/bored
        checkLevelUp();       // Check if pet levels up
        checkAchievements();  // Check if earned achievements
        updateUI();           // Update all displays
        savePet();            // Auto-save
    }, 5000);
}

// Clean up when game ends
function stopGame() {
    clearInterval(gameTimer);
}
```

**Why 5 seconds?**
- Fast enough to feel responsive
- Slow enough to not overwhelm player
- Can be adjusted for difficulty

---

## 📖 Part 6: Code Walkthrough - Line by Line {#part-6-code-walkthrough}

### Complete Pet Class Breakdown

```javascript
class Pet {
    constructor(name, type, personality) {
        // Basic info
        this.name = name;              // User's chosen name
        this.type = type;              // dog, cat, dragon, etc.
        this.personality = personality; // energetic, calm, playful, lazy
        
        // Core stats (0-100)
        this.hunger = 50;      // How full the pet is
        this.happiness = 50;   // How happy the pet is
        this.health = 50;      // Overall health
        
        // Progression
        this.level = 1;        // Current level
        this.experience = 0;   // XP points
        this.coins = 100;      // In-game currency
        
        // Timestamps
        this.birthDate = Date.now();      // When pet was created
        this.lastFed = Date.now();        // Last feeding time
        this.lastPlayed = Date.now();     // Last playtime
        
        // Inventory
        this.items = [];       // Owned items
        this.accessories = []; // Equipped accessories
        
        // Achievements
        this.achievements = [];
    }
    
    // Feed the pet
    feed() {
        // Increase hunger
        this.hunger += 15;
        
        // Cap at 100
        if (this.hunger > 100) {
            this.hunger = 100;
        }
        
        // Small happiness boost
        this.happiness += 5;
        if (this.happiness > 100) {
            this.happiness = 100;
        }
        
        // Deduct cost
        this.coins -= 5;
        if (this.coins < 0) {
            this.coins = 0;
        }
        
        // Update timestamp
        this.lastFed = Date.now();
        
        // Gain XP
        this.gainExperience(5);
    }
    
    // Play with pet
    play() {
        // Check if pet has enough energy
        if (this.hunger < 20) {
            alert("Pet is too hungry to play!");
            return;
        }
        
        // Increase happiness
        this.happiness += 20;
        if (this.happiness > 100) {
            this.happiness = 100;
        }
        
        // Playing makes hungry
        this.hunger -= 10;
        if (this.hunger < 0) {
            this.hunger = 0;
        }
        
        // Update timestamp
        this.lastPlayed = Date.now();
        
        // Gain more XP for interactive actions
        this.gainExperience(10);
    }
    
    // Level up system
    gainExperience(amount) {
        this.experience += amount;
        
        // Calculate XP needed for next level
        let xpNeeded = this.level * 100;
        
        // Check if leveled up
        if (this.experience >= xpNeeded) {
            this.levelUp();
        }
    }
    
    levelUp() {
        this.level++;
        this.experience = 0;  // Reset XP
        this.coins += 50;     // Reward coins
        
        // Show notification
        showNotification(`Level Up! Now level ${this.level}`);
        
        // Check for achievement
        checkAchievement('reach_level_5');
    }
    
    // Calculated property (getter)
    get age() {
        // Calculate days since birth
        let ageMs = Date.now() - this.birthDate;
        let ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
        return ageDays;
    }
    
    // Convert to saveable format
    toJSON() {
        return {
            name: this.name,
            type: this.type,
            personality: this.personality,
            hunger: this.hunger,
            happiness: this.happiness,
            health: this.health,
            level: this.level,
            experience: this.experience,
            coins: this.coins,
            birthDate: this.birthDate,
            lastFed: this.lastFed,
            lastPlayed: this.lastPlayed,
            items: this.items,
            accessories: this.accessories,
            achievements: this.achievements
        };
    }
    
    // Create from saved data
    static fromJSON(data) {
        let pet = new Pet(data.name, data.type, data.personality);
        Object.assign(pet, data);  // Copy all properties
        return pet;
    }
}
```

### Key Functions Explained

#### **Initialization Function**

```javascript
function initGame() {
    console.log("Initializing game...");
    
    // Try to load saved pet
    let savedData = localStorage.getItem('virtualPet');
    
    if (savedData) {
        // Pet exists - load it
        try {
            let data = JSON.parse(savedData);
            pet = Pet.fromJSON(data);
            
            // Go straight to game
            showScreen('game-screen');
            startGame();
            
            console.log("Loaded existing pet:", pet.name);
        } catch (error) {
            console.error("Error loading save:", error);
            // If load fails, start fresh
            showScreen('welcome-screen');
        }
    } else {
        // No save - show welcome
        showScreen('welcome-screen');
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Load theme preference
    loadTheme();
}

// Run when page loads
window.addEventListener('load', initGame);
```

**What's happening:**
1. Check if pet was saved before
2. If yes → load and start game
3. If no → show welcome screen
4. Set up buttons to respond to clicks
5. Apply saved theme

#### **Create Pet Function**

```javascript
function createPet() {
    // Get user input
    let name = document.getElementById('pet-name-input').value;
    let type = document.getElementById('pet-type-select').value;
    let personality = document.getElementById('personality-select').value;
    
    // Validate name
    if (!name || name.trim() === '') {
        alert('Please enter a pet name!');
        return;
    }
    
    // Create new Pet instance
    pet = new Pet(name.trim(), type, personality);
    
    // Save immediately
    savePet();
    
    // Switch to game screen
    showScreen('game-screen');
    
    // Start game loop
    startGame();
    
    // Show welcome message
    showNotification(`Welcome ${pet.name}!`);
}
```

**Step by step:**
1. Get values from input fields
2. Check if name is valid
3. Create new Pet object with chosen options
4. Save to localStorage
5. Show game screen
6. Start the game loop
7. Greet the player

#### **Update Stats Function (Core Game Loop)**

```javascript
function decreaseStats() {
    if (!pet) return;  // Safety check
    
    // Base decrease amounts
    let hungerDecrease = 2;
    let happinessDecrease = 3;
    
    // Personality affects rates
    switch (pet.personality) {
        case 'energetic':
            hungerDecrease = 3;      // Gets hungry faster
            happinessDecrease = 4;   // Gets bored faster
            break;
        case 'calm':
            hungerDecrease = 1;      // Gets hungry slower
            happinessDecrease = 1;   // Stays happy longer
            break;
        case 'playful':
            happinessDecrease = 5;   // Needs lots of play
            break;
        case 'lazy':
            hungerDecrease = 4;      // Eats a lot
            happinessDecrease = 2;   // Easily satisfied
            break;
    }
    
    // Apply decreases
    pet.hunger -= hungerDecrease;
    pet.happiness -= happinessDecrease;
    
    // Keep in bounds
    if (pet.hunger < 0) pet.hunger = 0;
    if (pet.happiness < 0) pet.happiness = 0;
    
    // Health is average of hunger and happiness
    pet.health = Math.floor((pet.hunger + pet.happiness) / 2);
    
    // Check critical conditions
    if (pet.hunger < 20) {
        showWarning("Your pet is very hungry!");
    }
    if (pet.happiness < 20) {
        showWarning("Your pet is sad!");
    }
    
    // Update display
    updateUI();
}
```

**Why personality matters:**
- Makes each playthrough different
- Players choose based on their availability
- Calm pets = good for busy players
- Energetic pets = more challenge

#### **Update UI Function**

```javascript
function updateUI() {
    if (!pet) return;
    
    // Update pet name display
    document.getElementById('pet-name-display').textContent = pet.name;
    
    // Update stat bars (visual)
    document.getElementById('hunger-fill').style.width = pet.hunger + '%';
    document.getElementById('happiness-fill').style.width = pet.happiness + '%';
    document.getElementById('health-fill').style.width = pet.health + '%';
    
    // Update stat numbers
    document.getElementById('hunger-value').textContent = Math.floor(pet.hunger);
    document.getElementById('happiness-value').textContent = Math.floor(pet.happiness);
    document.getElementById('health-value').textContent = Math.floor(pet.health);
    
    // Update level and coins
    document.getElementById('level-display').textContent = pet.level;
    document.getElementById('coins-display').textContent = pet.coins;
    
    // Update XP bar
    let xpNeeded = pet.level * 100;
    let xpPercent = (pet.experience / xpNeeded) * 100;
    document.getElementById('xp-fill').style.width = xpPercent + '%';
    
    // Update pet emoji/image
    updatePetDisplay();
    
    // Update button states (disable if can't afford)
    updateButtonStates();
}
```

**Why update everything:**
- Player needs to see current state
- Visual feedback for actions
- Shows progress (XP bar)
- Prevents invalid actions (disabled buttons)

#### **Save/Load Functions**

```javascript
function savePet() {
    if (!pet) return;
    
    try {
        // Convert pet to JSON string
        let data = JSON.stringify(pet.toJSON());
        
        // Save to localStorage
        localStorage.setItem('virtualPet', data);
        
        console.log("Game saved successfully");
    } catch (error) {
        console.error("Error saving:", error);
        alert("Failed to save game!");
    }
}

function loadPet() {
    try {
        // Get saved data
        let data = localStorage.getItem('virtualPet');
        
        if (!data) {
            return null;  // No save found
        }
        
        // Parse JSON
        let petData = JSON.parse(data);
        
        // Create Pet from data
        return Pet.fromJSON(petData);
    } catch (error) {
        console.error("Error loading:", error);
        return null;
    }
}

function exportData() {
    let data = JSON.stringify(pet.toJSON(), null, 2);
    
    // Create downloadable file
    let blob = new Blob([data], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    
    // Create temporary link and click it
    let a = document.createElement('a');
    a.href = url;
    a.download = `${pet.name}_save.json`;
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
}

function importData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                let data = JSON.parse(event.target.result);
                pet = Pet.fromJSON(data);
                savePet();
                updateUI();
                alert("Data imported successfully!");
            } catch (error) {
                alert("Invalid save file!");
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}
```

**LocalStorage limitations:**
- ~5-10 MB limit
- Only stores strings
- Cleared if user clears browser data
- Export feature = backup solution

#### **Shop System**

```javascript
// Shop items database
const shopItems = [
    {
        id: 'premium_food',
        name: '🥩 Premium Food',
        type: 'food',
        cost: 50,
        effect: { hunger: 30 },
        unlockLevel: 1
    },
    {
        id: 'toy_ball',
        name: '⚽ Ball',
        type: 'toy',
        cost: 75,
        effect: { happiness: 25 },
        unlockLevel: 2
    },
    {
        id: 'hat',
        name: '🎩 Top Hat',
        type: 'accessory',
        cost: 100,
        effect: {},
        unlockLevel: 3
    }
    // ... more items
];

function openShop() {
    // Clear previous items
    let container = document.getElementById('shop-items');
    container.innerHTML = '';
    
    // Generate shop items
    shopItems.forEach(item => {
        // Check if unlocked
        if (item.unlockLevel > pet.level) {
            return;  // Skip locked items
        }
        
        // Create item card
        let itemDiv = document.createElement('div');
        itemDiv.className = 'shop-item';
        
        // Check if already owned
        let owned = pet.items.includes(item.id);
        
        // Check if can afford
        let canAfford = pet.coins >= item.cost;
        
        itemDiv.innerHTML = `
            <div class="item-icon">${item.name}</div>
            <div class="item-cost">💰 ${item.cost}</div>
            <button 
                onclick="buyItem('${item.id}')"
                ${owned || !canAfford ? 'disabled' : ''}
            >
                ${owned ? 'Owned' : 'Buy'}
            </button>
        `;
        
        container.appendChild(itemDiv);
    });
    
    showScreen('shop-screen');
}

function buyItem(itemId) {
    // Find item
    let item = shopItems.find(i => i.id === itemId);
    
    if (!item) return;
    
    // Check if can afford
    if (pet.coins < item.cost) {
        alert("Not enough coins!");
        return;
    }
    
    // Deduct coins
    pet.coins -= item.cost;
    
    // Add to inventory
    pet.items.push(itemId);
    
    // Apply effect if consumable
    if (item.type === 'food') {
        pet.hunger += item.effect.hunger;
        if (pet.hunger > 100) pet.hunger = 100;
    } else if (item.type === 'toy') {
        pet.happiness += item.effect.happiness;
        if (pet.happiness > 100) pet.happiness = 100;
    }
    
    // Save and update
    savePet();
    updateUI();
    openShop();  // Refresh shop
    
    showNotification(`Purchased ${item.name}!`);
}
```

**Shop mechanics:**
- Items unlock by level
- Can't buy if can't afford
- Consumables give immediate effect
- Accessories are permanent

#### **Achievement System**

```javascript
const achievements = [
    {
        id: 'first_feed',
        name: 'First Meal',
        description: 'Feed your pet for the first time',
        icon: '🍔',
        check: (pet) => pet.lastFed !== pet.birthDate
    },
    {
        id: 'reach_level_5',
        name: 'Growing Strong',
        description: 'Reach level 5',
        icon: '⭐',
        check: (pet) => pet.level >= 5
    },
    {
        id: 'rich',
        name: 'Rich Pet Owner',
        description: 'Have 500 coins',
        icon: '💰',
        check: (pet) => pet.coins >= 500
    }
    // ... more achievements
];

function checkAchievements() {
    achievements.forEach(achievement => {
        // Skip if already unlocked
        if (pet.achievements.includes(achievement.id)) {
            return;
        }
        
        // Check condition
        if (achievement.check(pet)) {
            unlockAchievement(achievement);
        }
    });
}

function unlockAchievement(achievement) {
    // Add to pet's achievements
    pet.achievements.push(achievement.id);
    
    // Give reward
    pet.coins += 25;
    
    // Save
    savePet();
    
    // Show notification
    showAchievementNotification(achievement);
}

function showAchievementNotification(achievement) {
    let notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-info">
            <div class="achievement-title">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
            <div class="achievement-reward">+25 coins</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}
```

**Achievement design:**
- Gives players goals
- Rewards exploration
- Adds replay value
- Visual feedback makes it satisfying

---

## ✏️ Part 7: Try It Yourself - Exercises {#part-7-exercises}

### Beginner Exercises

#### **Exercise 1: Change Starting Stats**
Currently pets start at 50 for all stats. Change it to 75.

**Where to find it:** Look in the Pet class constructor
**What to change:** The numbers assigned to hunger, happiness, health
**Goal:** Understand how initial values affect gameplay

#### **Exercise 2: Add New Pet Type**
Add a "Fish" pet type to the options.

**Steps:**
1. Open index.html
2. Find the pet type select dropdown
3. Add new option: `<option value="fish">🐠 Fish</option>`
4. Test: Can you create a fish?

#### **Exercise 3: Change Button Colors**
Make the Feed button green.

**Where:** styles.css
**Find:** `.action-btn` or `#feed-btn`
**Change:** `background-color` property
**Experiment:** Try different colors!

### Intermediate Exercises

#### **Exercise 4: Add New Action Button**
Add a "Train" button that increases XP by 20 but costs 10 coins.

**Steps:**
1. Add button in HTML (copy Feed button structure)
2. Add function in JavaScript:
```javascript
function trainPet() {
    if (pet.coins < 10) {
        alert("Not enough coins!");
        return;
    }
    pet.coins -= 10;
    pet.gainExperience(20);
    updateUI();
    savePet();
}
```
3. Connect button to function
4. Style the button

#### **Exercise 5: Create New Theme**
Add a "Forest" theme with green colors.

**Steps:**
1. In styles.css, find theme definitions
2. Copy existing theme block
3. Change `data-theme` value to "forest"
4. Choose green color values
5. Add theme to theme selector dropdown
6. Test theme switching

#### **Exercise 6: Modify Stat Decrease Rate**
Make stats decrease slower (easier game).

**Where:** `decreaseStats()` function
**What to change:** Reduce the numbers being subtracted
**Test:** Play for a few minutes, observe difference

### Advanced Exercises

#### **Exercise 7: Add New Stat**
Add an "Energy" stat that affects what actions are available.

**Requirements:**
- Add energy property to Pet class
- Create visual bar in HTML
- Decrease energy when playing
- Restore energy when sleeping
- Disable play button when energy < 20

**Skills practiced:** Class modification, UI updates, conditional logic

#### **Exercise 8: Create Mini-Game**
Add a simple game where player guesses a number.

**Features:**
- Button to start game
- Input for guess
- Check if correct
- Reward coins if correct
- Show remaining attempts

**Bonus:** Add difficulty levels

#### **Exercise 9: Implement Daily Quests**
Create 3 daily quests that reset every 24 hours.

**Example quests:**
- "Feed pet 5 times"
- "Reach 100% happiness"
- "Buy 2 items"

**Requirements:**
- Track quest progress
- Save quest data with timestamps
- Check if 24 hours passed
- Reset and generate new quests
- Reward completion

#### **Exercise 10: Add Pet Moods**
Make pet have different moods based on stats.

**Moods:**
- Happy (happiness > 70)
- Neutral (happiness 40-70)
- Sad (happiness < 40)
- Hungry (hunger < 30)
- Sick (health < 30)

**Visual changes:**
- Different emoji/image
- Different background color
- Special animations
- Mood affects interactions

### Expert Challenges

#### **Challenge 1: Evolution System**
Pet evolves at level 5 and 10 to new forms.

**Requirements:**
- Define evolution stages
- Trigger evolution on level up
- Change pet appearance
- Keep all stats and progress
- Show evolution animation

#### **Challenge 2: Multiple Pets**
Allow player to own multiple pets simultaneously.

**Major changes needed:**
- Array of pets instead of single pet
- Pet selector/switcher UI
- Separate stats for each pet
- Save/load all pets
- Switch between pets

#### **Challenge 3: Online Leaderboard**
Add a leaderboard showing top players.

**Requirements:**
- Backend server (Node.js/Firebase)
- Submit score (based on level + coins)
- Fetch top 10 scores
- Display in UI
- Handle errors gracefully

---

## 🎓 Advanced Concepts & Best Practices

### Code Organization

**Principle: Separation of Concerns**

Keep different aspects separate:
```javascript
// ❌ Bad - everything mixed together
function doEverything() {
    pet.hunger += 10;
    document.getElementById('hunger').style.width = pet.hunger + '%';
    localStorage.setItem('pet', JSON.stringify(pet));
}

// ✅ Good - separated concerns
function feedPet() {
    updatePetData();    // Update data
}

function updatePetData() {
    pet.hunger += 10;
}

function updateUI() {
    updateStatBars();   // Update display
}

function savePet() {
    localStorage.setItem('pet', JSON.stringify(pet));
}
```

### Error Handling

Always prepare for things to go wrong:

```javascript
// ❌ Bad - no error handling
function loadPet() {
    let data = localStorage.getItem('pet');
    pet = JSON.parse(data);
}

// ✅ Good - handles errors
function loadPet() {
    try {
        let data = localStorage.getItem('pet');
        if (!data) {
            console.log("No save found");
            return null;
        }
        pet = JSON.parse(data);
        return pet;
    } catch (error) {
        console.error("Error loading save:", error);
        alert("Save file corrupted. Starting fresh.");
        return null;
    }
}
```

### Performance Tips

**1. Batch DOM Updates**
```javascript
// ❌ Slow - multiple redraws
document.getElementById('stat1').textContent = value1;
document.getElementById('stat2').textContent = value2;
document.getElementById('stat3').textContent = value3;

// ✅ Faster - single update
let statsHTML = `
    <div>Stat 1: ${value1}</div>
    <div>Stat 2: ${value2}</div>
    <div>Stat 3: ${value3}</div>
`;
document.getElementById('stats-container').innerHTML = statsHTML;
```

**2. Avoid Memory Leaks**
```javascript
// ❌ Bad - timer keeps running
function startGame() {
    setInterval(() => {
        updateGame();
    }, 1000);
}

// ✅ Good - can stop timer
let gameTimer;
function startGame() {
    gameTimer = setInterval(() => {
        updateGame();
    }, 1000);
}

function stopGame() {
    clearInterval(gameTimer);
}
```

### Debugging Tips

**1. Use console.log strategically**
```javascript
function feedPet() {
    console.log("Before feed:", pet.hunger);
    pet.hunger += 15;
    console.log("After feed:", pet.hunger);
}
```

**2. Use browser DevTools**
- F12 to open
- Console tab for errors
- Sources tab to set breakpoints
- Network tab for loading issues
- Application tab for localStorage

**3. Add debug mode**
```javascript
const DEBUG = true;

function debugLog(message) {
    if (DEBUG) {
        console.log("[DEBUG]", message);
    }
}

debugLog("Pet created");  // Only shows if DEBUG = true
```

---

## 📚 Additional Resources for Learning

### Online Learning Platforms
- **freeCodeCamp** - Free, comprehensive web dev course
- **MDN Web Docs** - Best reference for HTML/CSS/JS
- **JavaScript.info** - In-depth JS tutorials
- **CSS-Tricks** - Great for CSS techniques

### Practice Sites
- **CodePen** - Experiment with code
- **JSFiddle** - Quick JS testing
- **Repl.it** - Full development environment

### YouTube Channels
- **Traversy Media** - Project-based tutorials
- **Web Dev Simplified** - Clear explanations
- **The Coding Train** - Fun, creative coding

### Books (Free Online)
- **Eloquent JavaScript** - Deep dive into JS
- **You Don't Know JS** - JS fundamentals

---

## 🎯 Quiz Yourself

Test your understanding:

### HTML Questions
1. What's the difference between an ID and a class?
2. What does the `<div>` element do?
3. How do you create a button that runs a function?

### CSS Questions
1. What's the box model?
2. How do flexbox and grid differ?
3. How do CSS animations work?

### JavaScript Questions
1. What's the difference between `let` and `const`?
2. How does `localStorage` work?
3. What's a class in JavaScript?
4. Explain the event loop

### Application Questions
1. How does the game save progress?
2. Why do stats decrease over time?
3. How does the theme system work?
4. What happens when you level up?

---

## 🏆 Final Project Ideas

Once you understand everything, try these:

### Extend the Virtual Pet
1. Weather system that affects pet
2. Pet can get sick and need medicine
3. Day/night cycle
4. Seasonal events
5. Pet relationships (play with other pets)

### Build Something New
1. To-Do List App with rewards
2. Study timer (Pomodoro) with pet
3. Budget tracker with gamification
4. Habit tracker with streaks
5. Recipe keeper app

---

## 💡 Remember

1. **Coding is problem-solving** - Break big problems into small steps
2. **Errors are teachers** - Read error messages carefully
3. **Google is your friend** - Professional developers Google constantly
4. **Practice builds intuition** - The more you code, the easier it gets
5. **Ask questions** - No question is stupid
6. **Build projects** - Learning by doing is most effective
7. **Have fun!** - Enjoy the creative process

---

## 🎉 You've Got This!

You now have a complete guide to understanding every aspect of this Virtual Pet application. Take your time, experiment, and don't be afraid to break things - that's how you learn!

Remember: Every expert programmer started exactly where you are now. The difference is they kept learning and practicing.

**Good luck with your FBLA presentation!** 🏆

---

*Created with ❤️ to help students learn web development*
*Last updated: December 2025*

