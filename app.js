/**
 * ========================================
 * 10-DAY MEAL PLANNER APPLICATION
 * ========================================
 * 
 * FEATURES:
 * - 170-meal database (56 Breakfast, 57 Lunch, 57 Dinner) - loaded from mealData.js
 * - 10-day meal plan generation
 * - 15-day rolling no-repeat logic to ensure variety
 * - Meal locking system to preserve selections during regeneration
 * - Manual meal selection via dropdown menus
 * - Date generation starting from tomorrow
 * - LocalStorage persistence for meals, history, and current plan
 * 
 * DATA STRUCTURE:
 * - meals: Array of meal objects {name: string, type: string}
 * - history: Array of meal names from last 45 meals (15 days × 3 meals)
 * - currentPlan: Array of 10 day objects with meals and lock states
 * 
 * NOTE: defaultMeals is loaded from mealData.js (shared with database.js)
 */

// ========================================
// APPLICATION STATE
// ========================================

/**
 * meals: Current meal database (loaded from localStorage or defaults)
 * Structure: [{name: string, type: "Breakfast"|"Lunch"|"Dinner"}]
 */
let meals = JSON.parse(localStorage.getItem('meals')) || defaultMeals;

/**
 * history: Tracks last 45 meal names (15 days × 3 meals) to prevent repeats
 * Only meal names are stored, not full objects
 * Trimmed to last 45 entries after each generation
 */
let history = JSON.parse(localStorage.getItem('mealHistory')) || [];

/**
 * currentPlan: Active 10-day meal plan
 * Structure: [{
 *   displayDate: string,           // e.g., "Thursday Dec 18"
 *   Breakfast: string,              // meal name
 *   Lunch: string,                  // meal name
 *   Dinner: string,                 // meal name
 *   locked: {Breakfast: bool, Lunch: bool, Dinner: bool},
 *   skipped: {Breakfast: bool, Lunch: bool, Dinner: bool}
 * }]
 */
let currentPlan = [];

/**
 * mealTypeSettings: Track which meal types are enabled
 * Structure: {Breakfast: bool, Lunch: bool, Dinner: bool}
 */
let mealTypeSettings = JSON.parse(localStorage.getItem('mealTypeSettings')) || {
    Breakfast: true,
    Lunch: true,
    Dinner: true
};

// ========================================
// INITIALIZATION
// ========================================

/**
 * On page load, restore meal type settings and load saved plan or create blank plan
 */
window.onload = () => {
    // Restore meal type toggle states
    document.getElementById('toggleBreakfast').checked = mealTypeSettings.Breakfast;
    document.getElementById('toggleLunch').checked = mealTypeSettings.Lunch;
    document.getElementById('toggleDinner').checked = mealTypeSettings.Dinner;
    
    // Load saved plan if it exists, otherwise create blank plan
    const savedPlan = localStorage.getItem('currentPlan');
    if (savedPlan) {
        currentPlan = JSON.parse(savedPlan);
    } else {
        createBlankPlan();
    }
    renderPlan();
};

/**
 * Create a blank 10-day plan with empty meals
 */
function createBlankPlan() {
    currentPlan = [];
    for (let i = 0; i < 10; i++) {
        const dateLabel = getFutureDateString(i + 1);
        currentPlan.push({
            displayDate: dateLabel,
            Breakfast: "",
            Lunch: "",
            Dinner: "",
            BreakfastSides: [""],
            LunchSides: [""],
            DinnerSides: [""],
            // Individual item controls
            mainLocked: { Breakfast: false, Lunch: false, Dinner: false },
            mainSkipped: { Breakfast: false, Lunch: false, Dinner: false },
            sidesLocked: { Breakfast: [false], Lunch: [false], Dinner: [false] },
            sidesSkipped: { Breakfast: [false], Lunch: [false], Dinner: [false] },
            // Entire meal controls (main + all sides)
            mealLocked: { Breakfast: false, Lunch: false, Dinner: false },
            mealSkipped: { Breakfast: false, Lunch: false, Dinner: false },
            // Legacy support (kept for backward compatibility)
            locked: { Breakfast: false, Lunch: false, Dinner: false },
            skipped: { Breakfast: false, Lunch: false, Dinner: false }
        });
    }
}

/**
 * Clear the entire meal plan and reset all states
 */
function clearPlan() {
    if (confirm('Are you sure you want to clear the entire meal plan? This will remove all meals and reset lock/skip states.')) {
        createBlankPlan();
        localStorage.setItem('currentPlan', JSON.stringify(currentPlan));
        renderPlan();
    }
}

// ========================================
// MEAL TYPE SETTINGS
// ========================================

/**
 * Save meal type toggle settings
 */
function saveMealTypeSettings() {
    mealTypeSettings.Breakfast = document.getElementById('toggleBreakfast').checked;
    mealTypeSettings.Lunch = document.getElementById('toggleLunch').checked;
    mealTypeSettings.Dinner = document.getElementById('toggleDinner').checked;
    localStorage.setItem('mealTypeSettings', JSON.stringify(mealTypeSettings));
    
    // Re-render plan to show/hide disabled meal types
    if (currentPlan.length > 0) {
        renderPlan();
    }
}

// ========================================
// DATE GENERATION
// ========================================
function getFutureDateString(daysAhead) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    // Format: "Thursday Dec 18"
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
}

// ========================================
// MEAL PLAN GENERATION
// ========================================

/**
 * Generate a 10-day meal plan
 * 
 * PROCESS:
 * 1. Creates temporary history from existing history
 * 2. For each of 10 days:
 *    - Generates date label (starting tomorrow)
 *    - Checks if meals are locked
 *    - If locked: preserves existing meal
 *    - If unlocked: generates random meal avoiding recent history
 *    - Adds selected meals to temporary history
 * 3. Updates global state and saves to localStorage
 * 4. Renders the plan to UI
 * 
 * LOCKING LOGIC:
 * - Preserves lock state from existing plan
 * - Locked meals are not regenerated
 * - Lock state persists across regenerations
 * 
 * HISTORY MANAGEMENT:
 * - Maintains last 45 meals (15 days × 3 meals)
 * - Prevents same meal from appearing within 15-day window
 */
function generatePlan() {
    let tempHistory = [...history];  // Clone to avoid modifying original during generation
    let newPlan = [];

    // Generate meals for 10 days
    for (let i = 0; i < 10; i++) {
        const dateLabel = getFutureDateString(i + 1);  // Start from tomorrow (i+1)
        
        // Get existing data to check lock and skip states (if plan already exists)
        let existingData = currentPlan[i] || { 
            mainLocked: { Breakfast: false, Lunch: false, Dinner: false },
            mainSkipped: { Breakfast: false, Lunch: false, Dinner: false },
            mealLocked: { Breakfast: false, Lunch: false, Dinner: false },
            mealSkipped: { Breakfast: false, Lunch: false, Dinner: false },
            BreakfastSides: [""],
            LunchSides: [""],
            DinnerSides: [""],
            sidesLocked: { Breakfast: [false], Lunch: [false], Dinner: [false] },
            sidesSkipped: { Breakfast: [false], Lunch: [false], Dinner: [false] },
            // Legacy support
            locked: { Breakfast: false, Lunch: false, Dinner: false },
            skipped: { Breakfast: false, Lunch: false, Dinner: false }
        };
        
        // Generate sides for each meal type (check meal-level skip/lock first)
        const generateSides = (type, existingSides, existingLocked, existingSkipped, mealSkipped, mealLocked) => {
            const sides = [];
            const sideType = type + " Side";
            for (let j = 0; j < (existingSides?.length || 1); j++) {
                if (mealSkipped || existingSkipped?.[j]) {
                    sides.push("");
                } else if (mealLocked || existingLocked?.[j]) {
                    sides.push(existingSides[j]);
                } else {
                    sides.push(mealTypeSettings[type] ? getRandomMeal(sideType, tempHistory) : "");
                }
            }
            return sides;
        };
        
        // Build day object with locked meals preserved, unlocked meals regenerated
        const dayMeals = {
            displayDate: dateLabel,
            // Main dishes (check meal-level skip first, then main-level skip/lock)
            Breakfast: (existingData.mealSkipped?.Breakfast || existingData.mainSkipped?.Breakfast) ? "" :
                       ((existingData.mealLocked?.Breakfast || existingData.mainLocked?.Breakfast) ? existingData.Breakfast : 
                       (mealTypeSettings.Breakfast ? getRandomMeal('Breakfast', tempHistory) : null)),
            Lunch: (existingData.mealSkipped?.Lunch || existingData.mainSkipped?.Lunch) ? "" :
                   ((existingData.mealLocked?.Lunch || existingData.mainLocked?.Lunch) ? existingData.Lunch : 
                   (mealTypeSettings.Lunch ? getRandomMeal('Lunch', tempHistory) : null)),
            Dinner: (existingData.mealSkipped?.Dinner || existingData.mainSkipped?.Dinner) ? "" :
                    ((existingData.mealLocked?.Dinner || existingData.mainLocked?.Dinner) ? existingData.Dinner : 
                    (mealTypeSettings.Dinner ? getRandomMeal('Dinner', tempHistory) : null)),
            // Sides
            BreakfastSides: generateSides('Breakfast', existingData.BreakfastSides, existingData.sidesLocked?.Breakfast, existingData.sidesSkipped?.Breakfast, existingData.mealSkipped?.Breakfast, existingData.mealLocked?.Breakfast),
            LunchSides: generateSides('Lunch', existingData.LunchSides, existingData.sidesLocked?.Lunch, existingData.sidesSkipped?.Lunch, existingData.mealSkipped?.Lunch, existingData.mealLocked?.Lunch),
            DinnerSides: generateSides('Dinner', existingData.DinnerSides, existingData.sidesLocked?.Dinner, existingData.sidesSkipped?.Dinner, existingData.mealSkipped?.Dinner, existingData.mealLocked?.Dinner),
            // Preserve all lock and skip states
            mainLocked: { 
                Breakfast: existingData.mainLocked?.Breakfast || existingData.locked?.Breakfast || false, 
                Lunch: existingData.mainLocked?.Lunch || existingData.locked?.Lunch || false, 
                Dinner: existingData.mainLocked?.Dinner || existingData.locked?.Dinner || false 
            },
            mainSkipped: {
                Breakfast: existingData.mainSkipped?.Breakfast || false,
                Lunch: existingData.mainSkipped?.Lunch || false,
                Dinner: existingData.mainSkipped?.Dinner || false
            },
            mealLocked: { 
                Breakfast: existingData.mealLocked?.Breakfast || false, 
                Lunch: existingData.mealLocked?.Lunch || false, 
                Dinner: existingData.mealLocked?.Dinner || false 
            },
            mealSkipped: {
                Breakfast: existingData.mealSkipped?.Breakfast || existingData.skipped?.Breakfast || false,
                Lunch: existingData.mealSkipped?.Lunch || existingData.skipped?.Lunch || false,
                Dinner: existingData.mealSkipped?.Dinner || existingData.skipped?.Dinner || false
            },
            // Legacy support
            locked: { 
                Breakfast: existingData.mainLocked?.Breakfast || existingData.locked?.Breakfast || false, 
                Lunch: existingData.mainLocked?.Lunch || existingData.locked?.Lunch || false, 
                Dinner: existingData.mainLocked?.Dinner || existingData.locked?.Dinner || false 
            },
            skipped: {
                Breakfast: existingData.mealSkipped?.Breakfast || existingData.skipped?.Breakfast || false,
                Lunch: existingData.mealSkipped?.Lunch || existingData.skipped?.Lunch || false,
                Dinner: existingData.mealSkipped?.Dinner || existingData.skipped?.Dinner || false
            },
            sidesLocked: {
                Breakfast: existingData.sidesLocked?.Breakfast || dayMeals.BreakfastSides.map(() => false),
                Lunch: existingData.sidesLocked?.Lunch || dayMeals.LunchSides.map(() => false),
                Dinner: existingData.sidesLocked?.Dinner || dayMeals.DinnerSides.map(() => false)
            },
            sidesSkipped: {
                Breakfast: existingData.sidesSkipped?.Breakfast || dayMeals.BreakfastSides.map(() => false),
                Lunch: existingData.sidesSkipped?.Lunch || dayMeals.LunchSides.map(() => false),
                Dinner: existingData.sidesSkipped?.Dinner || dayMeals.DinnerSides.map(() => false)
            }
        };
        
        newPlan.push(dayMeals);
        // Add generated meals to temp history for no-repeat logic (skip empty entries)
        if (dayMeals.Breakfast && dayMeals.Breakfast !== "") tempHistory.push(dayMeals.Breakfast);
        if (dayMeals.Lunch && dayMeals.Lunch !== "") tempHistory.push(dayMeals.Lunch);
        if (dayMeals.Dinner && dayMeals.Dinner !== "") tempHistory.push(dayMeals.Dinner);
        // Add sides to history
        dayMeals.BreakfastSides.forEach(s => { if (s && s !== "") tempHistory.push(s); });
        dayMeals.LunchSides.forEach(s => { if (s && s !== "") tempHistory.push(s); });
        dayMeals.DinnerSides.forEach(s => { if (s && s !== "") tempHistory.push(s); });
    }
    
    // Update global state
    currentPlan = newPlan;
    // Trim history to last 45 meals (15 days × 3 meals)
    history = tempHistory.slice(-45);
    // Persist history and plan for future sessions
    localStorage.setItem('mealHistory', JSON.stringify(history));
    localStorage.setItem('currentPlan', JSON.stringify(currentPlan));
    // Display the new plan
    renderPlan();
}

/**
 * Select a random meal of specified type, avoiding recent history
 * @param {string} type - Meal type ("Breakfast", "Lunch", or "Dinner")
 * @param {string[]} currentHistory - Array of recent meal names to avoid
 * @returns {string} Selected meal name
 * 
 * SELECTION LOGIC:
 * 1. Filter meals by type (Breakfast/Lunch/Dinner)
 * 2. Remove meals that appear in recent history
 * 3. If available meals exist, select randomly from them
 * 4. If all meals are in history, select from full pool (fallback)
 * 
 * This ensures variety while handling edge cases where database < 15 days worth
 */
function getRandomMeal(type, currentHistory) {
    const pool = meals.filter(m => m.type === type);  // All meals of this type
    const available = pool.filter(m => !currentHistory.includes(m.name));  // Exclude recent meals
    const selection = available.length > 0 ? available : pool;  // Fallback to full pool if needed
    return selection[Math.floor(Math.random() * selection.length)].name;
}

// ========================================
// USER INTERFACE CONTROLS
// ========================================
/**
 * Toggle lock state for entire meal (main + all sides)
 * @param {number} dayIndex - Day index in currentPlan (0-9)
 * @param {string} type - Meal type ("Breakfast", "Lunch", or "Dinner")
 */
function toggleMealLock(dayIndex, type) {
    currentPlan[dayIndex].mealLocked[type] = !currentPlan[dayIndex].mealLocked[type];
    localStorage.setItem('currentPlan', JSON.stringify(currentPlan));
    renderPlan();
}

/**
 * Toggle skip state for entire meal (main + all sides)
 * @param {number} dayIndex - Day index in currentPlan (0-9)
 * @param {string} type - Meal type ("Breakfast", "Lunch", or "Dinner")
 */
function toggleMealSkip(dayIndex, type) {
    currentPlan[dayIndex].mealSkipped[type] = !currentPlan[dayIndex].mealSkipped[type];
    
    // If skipping, clear main and all sides; if unskipping, generate new ones
    const sidesKey = type + 'Sides';
    if (currentPlan[dayIndex].mealSkipped[type]) {
        currentPlan[dayIndex][type] = "";
        currentPlan[dayIndex][sidesKey] = currentPlan[dayIndex][sidesKey].map(() => "");
    } else {
        currentPlan[dayIndex][type] = getRandomMeal(type, history);
        currentPlan[dayIndex][sidesKey] = currentPlan[dayIndex][sidesKey].map(() => 
            getRandomMeal(type + ' Side', history)
        );
    }
    
    localStorage.setItem('currentPlan', JSON.stringify(currentPlan));
    renderPlan();
}

/**
 * Toggle lock state for main dish or individual side
 * @param {number} dayIndex - Day index in currentPlan (0-9)
 * @param {string} type - Meal type ("Breakfast", "Lunch", or "Dinner")
 * @param {number} [sideIndex] - Optional side index for locking a specific side
 */
function toggleLock(dayIndex, type, sideIndex) {
    if (sideIndex !== undefined) {
        // Toggle lock for a specific side
        currentPlan[dayIndex].sidesLocked[type][sideIndex] = !currentPlan[dayIndex].sidesLocked[type][sideIndex];
    } else {
        // Toggle lock for main dish only
        currentPlan[dayIndex].mainLocked[type] = !currentPlan[dayIndex].mainLocked[type];
    }
    localStorage.setItem('currentPlan', JSON.stringify(currentPlan));
    renderPlan();
}

/**
 * Toggle skip state for main dish or individual side
 * @param {number} dayIndex - Day index in currentPlan (0-9)
 * @param {string} type - Meal type ("Breakfast", "Lunch", or "Dinner")
 * @param {number} [sideIndex] - Optional side index for skipping a specific side
 */
function toggleSkip(dayIndex, type, sideIndex) {
    if (sideIndex !== undefined) {
        // Toggle skip for a specific side
        currentPlan[dayIndex].sidesSkipped[type][sideIndex] = !currentPlan[dayIndex].sidesSkipped[type][sideIndex];
        
        // If skipping, clear the side; if unskipping, generate a new side
        const sidesKey = type + 'Sides';
        if (currentPlan[dayIndex].sidesSkipped[type][sideIndex]) {
            currentPlan[dayIndex][sidesKey][sideIndex] = "";
        } else {
            currentPlan[dayIndex][sidesKey][sideIndex] = getRandomMeal(type + ' Side', history);
        }
    } else {
        // Toggle skip for main dish only
        currentPlan[dayIndex].mainSkipped[type] = !currentPlan[dayIndex].mainSkipped[type];
        
        // If skipping, clear the main; if unskipping, generate a new main
        if (currentPlan[dayIndex].mainSkipped[type]) {
            currentPlan[dayIndex][type] = "";
        } else {
            currentPlan[dayIndex][type] = getRandomMeal(type, history);
        }
    }
    
    localStorage.setItem('currentPlan', JSON.stringify(currentPlan));
    renderPlan();
}

/**
 * Update meal when user manually selects from dropdown
 * @param {number} index - Day index in currentPlan (0-9)
 * @param {string} type - Meal type ("Breakfast", "Lunch", or "Dinner")
 * @param {string} value - Selected meal name
 * 
 * NOTE: Manual selections are NOT added to history
 * This keeps the logic simple and allows users to make temporary changes
 * History is only updated during plan generation
 */
function updateManualSelection(index, type, value) {
    currentPlan[index][type] = value;
    localStorage.setItem('currentPlan', JSON.stringify(currentPlan));
    // Manual changes are not added to history to avoid complicating the logic
}

/**
 * Update side dish when user manually selects from dropdown
 * @param {number} dayIndex - Day index in currentPlan (0-9)
 * @param {string} type - Meal type ("Breakfast", "Lunch", or "Dinner")
 * @param {number} sideIndex - Index of the side slot
 * @param {string} value - Selected side dish name
 */
function updateSideSelection(dayIndex, type, sideIndex, value) {
    const sidesKey = type + 'Sides';
    currentPlan[dayIndex][sidesKey][sideIndex] = value;
    localStorage.setItem('currentPlan', JSON.stringify(currentPlan));
}

/**
 * Add a new side slot to a specific meal on a specific day
 * @param {number} dayIndex - Day index in currentPlan (0-9)
 * @param {string} type - Meal type ("Breakfast", "Lunch", or "Dinner")
 */
function addSideSlot(dayIndex, type) {
    const sidesKey = type + 'Sides';
    
    // Add a new empty side slot
    currentPlan[dayIndex][sidesKey].push("");
    currentPlan[dayIndex].sidesLocked[type].push(false);
    currentPlan[dayIndex].sidesSkipped[type].push(false);
    
    localStorage.setItem('currentPlan', JSON.stringify(currentPlan));
    renderPlan();
}

/**
 * Render the 10-day meal plan to the UI with multi-slot support (main + sides)
 * 
 * RENDERING PROCESS:
 * 1. Sort meals alphabetically for dropdown display
 * 2. For each day in currentPlan:
 *    - Create day card with date header
 *    - For each meal type (Breakfast, Lunch, Dinner):
 *      - Render meal-level controls (lock/skip entire meal)
 *      - Render main dish as individual item with own controls
 *      - Render sides as individual items with own controls
 *      - Add "Add Side" button to create new side slots
 * 
 * MULTI-LEVEL CONTROL STRUCTURE:
 * - Meal level: Lock/skip affects main + all sides
 * - Item level: Individual lock/skip for main dish and each side
 */
function renderPlan() {
    const display = document.getElementById('plan-display');
    const sortedMeals = [...meals].sort((a, b) => a.name.localeCompare(b.name));

    display.innerHTML = currentPlan.map((day, i) => `
        <div class="day-card">
            <h3>${day.displayDate}</h3>
            ${['Breakfast', 'Lunch', 'Dinner'].map(type => {
                // Skip rendering if meal type is disabled globally
                if (!mealTypeSettings[type]) {
                    return '';
                }
                
                const isMealLocked = day.mealLocked[type];
                const isMealSkipped = day.mealSkipped[type];
                const isMainLocked = day.mainLocked?.[type] || day.locked?.[type] || false;
                const isMainSkipped = day.mainSkipped?.[type] || false;
                
                // Build main meal dropdown options
                const mainOptions = sortedMeals
                    .filter(m => m.type === type)
                    .map(m => `<option value="${m.name}" ${day[type] === m.name ? 'selected' : ''}>${m.name}</option>`)
                    .join('');
                
                const emptyOption = `<option value="" ${day[type] === "" ? 'selected' : ''}>-- No meal --</option>`;
                
                // Build side dish dropdown options
                const sideType = type + " Side";
                const sideOptions = sortedMeals
                    .filter(m => m.type === sideType)
                    .map(m => `<option value="${m.name}">${m.name}</option>`)
                    .join('');
                
                // Render side slots
                const sidesArray = day[type + 'Sides'] || [""];
                const sidesHTML = sidesArray.map((sideMeal, sideIndex) => {
                    const isSideLocked = day.sidesLocked?.[type]?.[sideIndex] || false;
                    const isSideSkipped = day.sidesSkipped?.[type]?.[sideIndex] || false;
                    
                    return `
                    <div class="side-slot ${isSideSkipped || isMealSkipped ? 'skipped' : ''}">
                        <div class="label-row">
                            <label>Side ${sideIndex + 1}</label>
                            <div>
                                <button class="skip-btn ${isSideSkipped ? 'active' : ''}" 
                                        onclick="toggleSkip(${i}, '${type}', ${sideIndex})"
                                        ${isMealLocked || isMealSkipped ? 'disabled' : ''}>
                                    SKIP
                                </button>
                                <button class="lock-btn ${isSideLocked ? 'active' : ''}" 
                                        onclick="toggleLock(${i}, '${type}', ${sideIndex})"
                                        ${isMealLocked || isMealSkipped ? 'disabled' : ''}>
                                    ${isSideLocked ? 'LOCKED' : 'LOCK'}
                                </button>
                            </div>
                        </div>
                        <select class="side-select ${isSideLocked ? 'is-locked' : ''}"
                                onchange="updateSideSelection(${i}, '${type}', ${sideIndex}, this.value)"
                                ${isSideLocked || isSideSkipped || isMealLocked || isMealSkipped ? 'disabled' : ''}>
                            <option value="" ${sideMeal === "" ? 'selected' : ''}>-- No side --</option>
                            ${sideOptions.split('</option>').map(opt => {
                                if (!opt) return '';
                                const value = opt.match(/value="([^"]+)"/)?.[1];
                                if (value === sideMeal) {
                                    return opt.replace('<option', '<option selected') + '</option>';
                                }
                                return opt + '</option>';
                            }).join('')}
                        </select>
                    </div>`;
                }).join('');
                
                return `
                <div class="meal-section">
                    <!-- Meal-Level Controls -->
                    <div class="meal-header">
                        <h4>${type}</h4>
                        <div>
                            <button class="skip-btn ${isMealSkipped ? 'active' : ''}" 
                                    onclick="toggleMealSkip(${i}, '${type}')">
                                ${isMealSkipped ? 'MEAL SKIPPED' : 'SKIP MEAL'}
                            </button>
                            <button class="lock-btn ${isMealLocked ? 'active' : ''}" 
                                    onclick="toggleMealLock(${i}, '${type}')">
                                ${isMealLocked ? 'MEAL LOCKED' : 'LOCK MEAL'}
                            </button>
                        </div>
                    </div>
                    
                    <!-- Main Dish -->
                    <div class="side-slot ${isMainSkipped || isMealSkipped ? 'skipped' : ''}">
                        <div class="label-row">
                            <label>Main Dish</label>
                            <div>
                                <button class="skip-btn ${isMainSkipped ? 'active' : ''}" 
                                        onclick="toggleSkip(${i}, '${type}')"
                                        ${isMealLocked || isMealSkipped ? 'disabled' : ''}>
                                    SKIP
                                </button>
                                <button class="lock-btn ${isMainLocked ? 'active' : ''}" 
                                        onclick="toggleLock(${i}, '${type}')"
                                        ${isMealLocked || isMealSkipped ? 'disabled' : ''}>
                                    ${isMainLocked ? 'LOCKED' : 'LOCK'}
                                </button>
                            </div>
                        </div>
                        <select class="side-select ${isMainLocked ? 'is-locked' : ''}" 
                                onchange="updateManualSelection(${i}, '${type}', this.value)"
                                ${isMainLocked || isMainSkipped || isMealLocked || isMealSkipped ? 'disabled' : ''}>
                            ${emptyOption}
                            ${mainOptions}
                        </select>
                    </div>
                    
                    <!-- Sides Section -->
                    <div class="sides-section">
                        ${sidesHTML}
                        <button class="add-side-btn" onclick="addSideSlot(${i}, '${type}')"
                                ${isMealLocked || isMealSkipped ? 'disabled' : ''}>
                            + Add Side
                        </button>
                    </div>
                </div>`;
            }).join('')}
        </div>
    `).join('');
}