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
 *   locked: {Breakfast: bool, Lunch: bool, Dinner: bool}
 * }]
 */
let currentPlan = [];

// ========================================
// INITIALIZATION
// ========================================

/**
 * On page load, nothing to initialize
 * Plan is generated when user clicks "Generate Unlocked Meals"
 */
window.onload = () => {
    // Meal list rendering removed - now on separate database.html page
};

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
        
        // Get existing data to check lock states (if plan already exists)
        let existingData = currentPlan[i] || { locked: { Breakfast: false, Lunch: false, Dinner: false } };
        
        // Build day object with locked meals preserved, unlocked meals regenerated
        // Build day object with locked meals preserved, unlocked meals regenerated
        const dayMeals = {
            displayDate: dateLabel,
            // Keep locked meal, otherwise generate new random meal
            Breakfast: existingData.locked?.Breakfast ? existingData.Breakfast : getRandomMeal('Breakfast', tempHistory),
            Lunch: existingData.locked?.Lunch ? existingData.Lunch : getRandomMeal('Lunch', tempHistory),
            Dinner: existingData.locked?.Dinner ? existingData.Dinner : getRandomMeal('Dinner', tempHistory),
            // Preserve lock states
            locked: { 
                Breakfast: existingData.locked?.Breakfast || false, 
                Lunch: existingData.locked?.Lunch || false, 
                Dinner: existingData.locked?.Dinner || false 
            }
        };
        
        newPlan.push(dayMeals);
        // Add all three meals to temp history for no-repeat logic
        tempHistory.push(dayMeals.Breakfast, dayMeals.Lunch, dayMeals.Dinner);
    }
    
    // Update global state
    currentPlan = newPlan;
    // Trim history to last 45 meals (15 days × 3 meals)
    history = tempHistory.slice(-45);
    // Persist history for future sessions
    localStorage.setItem('mealHistory', JSON.stringify(history));
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
function toggleLock(dayIndex, type) {
    currentPlan[dayIndex].locked[type] = !currentPlan[dayIndex].locked[type];
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
    // Manual changes are not added to history to avoid complicating the logic
}

/**
 * Render the 10-day meal plan to the UI
 * 
 * RENDERING PROCESS:
 * 1. Sort meals alphabetically for dropdown display
 * 2. For each day in currentPlan:
 *    - Create day card with date header
 *    - For each meal type (Breakfast, Lunch, Dinner):
 *      - Add lock button (styled based on lock state)
 *      - Add dropdown with filtered meal options
 *      - Disable dropdown if locked
 *      - Apply locked styling if locked
 * 
 * DROPDOWN BEHAVIOR:
 * - Shows only meals of matching type
 * - Sorted alphabetically for easy selection
 * - Disabled when meal is locked
 * - onchange updates the meal via updateManualSelection()
 * 
 * LOCK BUTTON BEHAVIOR:
 * - Shows "LOCK" (gray) or "LOCKED" (orange)
 * - onclick toggles lock state via toggleLock()
 */
function renderPlan() {
    const display = document.getElementById('plan-display');
    const sortedMeals = [...meals].sort((a, b) => a.name.localeCompare(b.name));  // Alphabetize for dropdowns

    display.innerHTML = currentPlan.map((day, i) => `
        <div class="day-card">
            <h3>${day.displayDate}</h3>
            ${['Breakfast', 'Lunch', 'Dinner'].map(type => {
                const isLocked = day.locked[type];
                // Build dropdown options: filter by type, mark current as selected
                const options = sortedMeals
                    .filter(m => m.type === type)  // Only show meals of matching type
                    .map(m => `<option value="${m.name}" ${day[type] === m.name ? 'selected' : ''}>${m.name}</option>`)
                    .join('');
                
                return `
                <div class="meal-slot">
                    <div class="label-row">
                        <label>${type}</label>
                        <!-- Lock button: toggles lock state, changes appearance when active -->
                        <button class="lock-btn ${isLocked ? 'active' : ''}" onclick="toggleLock(${i}, '${type}')">
                            ${isLocked ? 'LOCKED' : 'LOCK'}
                        </button>
                    </div>
                    <!-- Dropdown: disabled when locked, styled differently when locked -->
                    <select class="meal-select ${isLocked ? 'is-locked' : ''}" 
                            onchange="updateManualSelection(${i}, '${type}', this.value)"
                            ${isLocked ? 'disabled' : ''}>
                        ${options}
                    </select>
                </div>`;
            }).join('')}
        </div>
    `).join('');
}