# Issue Tracker - Smart Meal Planner

Track bugs, features, and enhancements for the Smart Meal Planner app.

## 🐛 Bugs

- [ ] **User Profile Data Isolation**
  - Description: Each user should have their own profile with isolated data. Currently, when logging in as different users, they all share the same meal plans and preferences. Guest users should not be able to save any data.
  - Priority: High
  - Labels: bug, authentication, user-data
  - Expected Behavior: Each logged-in user should have their own saved meal plans, preferences, lock states, skip states, and meal type settings. Guest users should work with temporary data that is cleared on logout.
  - Current Behavior: All users (including guest) share the same localStorage data, causing meal plans and settings to carry over between different user sessions.

## ✨ Feature Requests

- [ ] **Multi-Person Meal Planning**
  - Description: Add ability to plan for multiple people with option to match or set different meals for each person
  - Priority: High
  - Labels: feature, meal-planning

- [ ] **Export Meal Plan**
  - Description: Export meal plans to print or downloadable file (PDF, CSV, etc.)
  - Priority: Medium
  - Labels: feature, export

- [ ] **External User Database**
  - Description: Implement external user database so users can sign up and save their own meals and plans
  - Priority: High
  - Labels: feature, backend, authentication

- [ ] **Per-User Meal Database**
  - Description: Create external meal database tied to each user for adding/modifying personal meals
  - Priority: High
  - Labels: feature, backend, database

- [ ] **Import Meals from CSV**
  - Description: Add ability to import meals into the database from a CSV file
  - Priority: Medium
  - Labels: feature, import

- [ ] **Recipe and Meal Component API Integration**
  - Description: Integrate with external API or database to get actual meal components and recipes
  - Priority: Medium
  - Labels: feature, api, integration

- [ ] **Nutrition Information API Integration**
  - Description: Integrate with external API or database to display nutrition info for meals
  - Priority: Low
  - Labels: feature, api, integration, health

## 🔧 Enhancements

- [ ] **Disable/Enable Meals in Database**
  - Description: Allow users to toggle meals on/off so they don't populate in meal generation
  - Priority: Medium
  - Labels: enhancement, meal-database

- [ ] **Favorite Meals System**
  - Description: Let users mark favorite meals that appear more frequently in meal plans
  - Priority: Medium
  - Labels: enhancement, user-preference

- [ ] **Adjustable Meal Repeat Threshold**
  - Description: Make the 15-day rolling period for meal repeating user-configurable
  - Priority: Low
  - Labels: enhancement, settings, meal-planning

## 📋 Completed

- [x] **Toggle to Skip Meal Types or Individual Meals**
  - Description: Allow users to turn on/off specific meal types (breakfast, lunch, dinner) or skip individual meals
  - Priority: Medium
  - Labels: feature, user-experience
  - Completed: December 22, 2025
  - Details: Added global checkboxes to enable/disable Breakfast, Lunch, and Dinner. Added SKIP button to each meal slot for per-day meal skipping. All states persist in localStorage.

- [x] **Clear/Reset Meal Plan Button**
  - Description: Add a button to clear all generated meals and reset any locked or skipped meal states. Also ensure the app opens with a blank/reset plan showing empty meal slots instead of requiring the user to click "Generate Unlocked Meals" first.
  - Priority: Medium
  - Labels: bug, user-experience, feature
  - Completed: December 22, 2025
  - Details: Added red "Clear Plan" button in header with confirmation dialog. App now opens with a blank 10-day plan showing empty meal slots. Clear function resets all meals, lock states, and skip states.

- [x] **Multi-Slot Meals (Main Dish + Sides)**
  - Description: Each meal should support multiple slots (e.g., main dish and sides). Default to 2 slots per meal (main + side). Add ability to add more slots dynamically. Include 150+ side dish options in the database appropriate for each meal type (breakfast, lunch, dinner).
  - Priority: High
  - Labels: feature, meal-planning, database
  - Completed: December 22, 2025
  - Details: Added 150 side dishes to database (50 breakfast, 50 lunch, 50 dinner). Implemented multi-slot system with main dish and sides. Added two-level control system: meal-level lock/skip (affects entire meal including all sides) and item-level lock/skip (individual control for main dish and each side). Users can dynamically add side slots with "+ Add Side" button. Main dish now displays like sides with individual controls.

---

## How to Use

1. Add issues below in their respective sections
2. Use checkboxes to track progress: `- [ ]` for incomplete, `- [x]` for complete
3. Run the sync script to push/pull from GitHub Issues

### Issue Format
```
- [ ] **Issue Title** (#issue-number if synced)
  - Description: What needs to be done
  - Priority: Low/Medium/High
  - Labels: bug, feature, enhancement
```
