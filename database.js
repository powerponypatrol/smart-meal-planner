/**
 * ========================================
 * MEAL DATABASE MANAGEMENT PAGE
 * ========================================
 * 
 * FEATURES:
 * - Add new meals to the database
 * - Delete meals from the database
 * - Filter meals by type (All/Breakfast/Lunch/Dinner)
 * - Display statistics (total meals, meals per category)
 * - Shared localStorage with main meal planner
 * 
 * DATA STRUCTURE:
 * - meals: Array of meal objects {name: string, type: string}
 * - Syncs with main app via localStorage key 'meals'
 * 
 * NOTE: defaultMeals is loaded from mealData.js (shared with app.js)
 */

// ========================================
// APPLICATION STATE
// ========================================

/**
 * meals: Current meal database (loaded from localStorage or defaults)
 * Structure: [{name: string, type: "Breakfast"|"Lunch"|"Dinner"}]
 * Shared with main meal planner app via localStorage
 */
let meals = JSON.parse(localStorage.getItem('meals')) || defaultMeals;

/**
 * currentFilter: Current filter selection ('All', 'Breakfast', 'Lunch', or 'Dinner')
 */
let currentFilter = 'All';

// ========================================
// INITIALIZATION
// ========================================

/**
 * On page load, render the meal list and update statistics
 */
window.onload = () => {
    updateStatistics();
    renderMealList();
};

// ========================================
// DATABASE MANAGEMENT
// ========================================

/**
 * Add a new meal to the database
 * Reads from input fields, validates, adds to meals array, and saves
 * Clears input field after successful addition
 * Updates the meal list display and statistics
 */
function addMeal() {
    const nameInput = document.getElementById('new-meal-name');
    const typeInput = document.getElementById('new-meal-type');
    const name = nameInput.value.trim();
    
    if (name) {
        meals.push({ name, type: typeInput.value });
        nameInput.value = '';  // Clear input for next entry
        saveData();
    }
}

/**
 * Remove a meal from the database
 * @param {number} index - Array index of meal to remove
 * 
 * Updates display and statistics after removal
 */
function removeMeal(index) {
    meals.splice(index, 1);
    saveData();
}

/**
 * Save meals to localStorage and update the display
 * Called after any database modification (add/delete)
 */
function saveData() {
    localStorage.setItem('meals', JSON.stringify(meals));
    updateStatistics();
    renderMealList();
}

// ========================================
// FILTERING
// ========================================

/**
 * Filter meal list by type
 * @param {string} type - Filter type ('All', 'Breakfast', 'Lunch', or 'Dinner')
 * 
 * Updates active filter button styling and re-renders list
 */
function filterMeals(type) {
    currentFilter = type;
    
    // Update active button styling
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderMealList();
}

// ========================================
// STATISTICS
// ========================================

/**
 * Update meal count statistics display
 * Calculates and displays total meals and counts by type
 */
function updateStatistics() {
    const breakfastCount = meals.filter(m => m.type === 'Breakfast').length;
    const lunchCount = meals.filter(m => m.type === 'Lunch').length;
    const dinnerCount = meals.filter(m => m.type === 'Dinner').length;
    const totalCount = meals.length;
    
    document.getElementById('total-count').textContent = totalCount;
    document.getElementById('breakfast-count').textContent = breakfastCount;
    document.getElementById('lunch-count').textContent = lunchCount;
    document.getElementById('dinner-count').textContent = dinnerCount;
}

// ========================================
// RENDERING
// ========================================

/**
 * Render the meal database list
 * Filters meals based on currentFilter and displays them
 * Each meal shows type, name, and delete button
 */
function renderMealList() {
    const list = document.getElementById('meal-list');
    
    // Filter meals based on current filter selection
    const filteredMeals = currentFilter === 'All' 
        ? meals 
        : meals.filter(m => m.type === currentFilter);
    
    // Sort meals alphabetically by name
    const sortedMeals = [...filteredMeals].sort((a, b) => a.name.localeCompare(b.name));
    
    list.innerHTML = sortedMeals.map((m) => {
        // Find original index for deletion
        const originalIndex = meals.indexOf(m);
        return `
            <div class="meal-item">
                <span><strong>${m.type}:</strong> ${m.name}</span>
                <button class="delete-btn" onclick="removeMeal(${originalIndex})">Delete</button>
            </div>
        `;
    }).join('');
    
    // Show message if no meals match filter
    if (sortedMeals.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#999; padding:20px;">No meals found</p>';
    }
}
