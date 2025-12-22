/**
 * ========================================
 * SHARED MEAL DATABASE
 * ========================================
 * 
 * This file contains the default meal database used by both
 * the meal planner page and the database management page.
 * 
 * Centralizes the meal data to avoid duplication across files.
 */

// ========================================
// DEFAULT MEAL DATABASE (170 meals total)
// ========================================

const defaultMeals = [
    // --- BREAKFAST (56 Total) ---
    { name: "Oatmeal", type: "Breakfast" }, { name: "Pancakes", type: "Breakfast" }, { name: "Avocado Toast", type: "Breakfast" },
    { name: "Greek Yogurt", type: "Breakfast" }, { name: "Smoothie Bowl", type: "Breakfast" }, { name: "Scrambled Eggs", type: "Breakfast" },
    { name: "French Toast", type: "Breakfast" }, { name: "Breakfast Burrito", type: "Breakfast" }, { name: "Chia Pudding", type: "Breakfast" },
    { name: "Omelette", type: "Breakfast" }, { name: "Bagel & Lox", type: "Breakfast" }, { name: "Fruit Salad", type: "Breakfast" },
    { name: "Tofu Scramble", type: "Breakfast" }, { name: "Muffins", type: "Breakfast" }, { name: "Waffles", type: "Breakfast" },
    { name: "Frittata", type: "Breakfast" }, { name: "Eggs Benedict", type: "Breakfast" }, { name: "Shakshuka", type: "Breakfast" },
    { name: "Belgian Waffles", type: "Breakfast" }, { name: "Breakfast Quesadilla", type: "Breakfast" }, { name: "Cottage Cheese & Fruit", type: "Breakfast" },
    { name: "Steel Cut Oats", type: "Breakfast" }, { name: "English Muffin Sandwich", type: "Breakfast" }, { name: "Breakfast Potatoes", type: "Breakfast" },
    { name: "Quiche Lorraine", type: "Breakfast" }, { name: "Breakfast Pizza", type: "Breakfast" }, { name: "Acai Bowl", type: "Breakfast" },
    { name: "Granola Parfait", type: "Breakfast" }, { name: "Corned Beef Hash", type: "Breakfast" }, { name: "Dutch Baby Pancake", type: "Breakfast" },
    { name: "Breakfast Fried Rice", type: "Breakfast" }, { name: "Biscuits and Gravy", type: "Breakfast" }, { name: "Breakfast Tacos", type: "Breakfast" },
    { name: "Muesli", type: "Breakfast" }, { name: "Buckwheat Crepes", type: "Breakfast" }, { name: "Ricotta Toast", type: "Breakfast" },
    { name: "Zucchini Bread", type: "Breakfast" }, { name: "Baked Oatmeal", type: "Breakfast" }, { name: "Hashbrown Casserole", type: "Breakfast" },
    { name: "Huevos Rancheros", type: "Breakfast" }, { name: "Breakfast Sliders", type: "Breakfast" }, { name: "Sweet Potato Hash", type: "Breakfast" },
    { name: "Scones", type: "Breakfast" }, { name: "Overnight Oats", type: "Breakfast" }, { name: "Breakfast Casserole", type: "Breakfast" },
    { name: "Ham & Cheese Croissant", type: "Breakfast" }, { name: "Breakfast Skillet", type: "Breakfast" }, { name: "Potato Latkes", type: "Breakfast" },
    { name: "Turkish Eggs", type: "Breakfast" }, { name: "Cinnamon Rolls", type: "Breakfast" }, { name: "Breakfast Sausage Links", type: "Breakfast" },
    { name: "Banana Bread", type: "Breakfast" }, { name: "Apple Turnovers", type: "Breakfast" }, { name: "Peanut Butter Toast", type: "Breakfast" },
    { name: "Poached Eggs", type: "Breakfast" }, { name: "Breakfast Enchiladas", type: "Breakfast" },

    // --- LUNCH (57 Total) ---
    { name: "Quinoa Salad", type: "Lunch" }, { name: "Chicken Wrap", type: "Lunch" }, { name: "Tomato Soup", type: "Lunch" },
    { name: "Banh Mi", type: "Lunch" }, { name: "Cobb Salad", type: "Lunch" }, { name: "Turkey Sandwich", type: "Lunch" },
    { name: "Hummus Plate", type: "Lunch" }, { name: "Sushi Rolls", type: "Lunch" }, { name: "Lentil Soup", type: "Lunch" },
    { name: "Pasta Salad", type: "Lunch" }, { name: "Tuna Melt", type: "Lunch" }, { name: "Veggie Burger", type: "Lunch" },
    { name: "BLT Sandwich", type: "Lunch" }, { name: "Quesadilla", type: "Lunch" }, { name: "Burrito Bowl", type: "Lunch" },
    { name: "Poke Bowl", type: "Lunch" }, { name: "Caprese Panini", type: "Lunch" }, { name: "Falafel Wrap", type: "Lunch" },
    { name: "Chicken Caesar Salad", type: "Lunch" }, { name: "Egg Salad Sandwich", type: "Lunch" }, { name: "Greek Salad", type: "Lunch" },
    { name: "Minestrone Soup", type: "Lunch" }, { name: "Beef Sliders", type: "Lunch" }, { name: "Gazpacho", type: "Lunch" },
    { name: "Ramen", type: "Lunch" }, { name: "Chicken Noodle Soup", type: "Lunch" }, { name: "Steak Salad", type: "Lunch" },
    { name: "Club Sandwich", type: "Lunch" }, { name: "Lobster Roll", type: "Lunch" }, { name: "Chicken Salad", type: "Lunch" },
    { name: "Shrimp Po' Boy", type: "Lunch" }, { name: "Thai Noodle Salad", type: "Lunch" }, { name: "Buffalo Chicken Salad", type: "Lunch" },
    { name: "Miso Soup & Gyoza", type: "Lunch" }, { name: "French Dip Sandwich", type: "Lunch" }, { name: "Ploughman's Lunch", type: "Lunch" },
    { name: "Reuben Sandwich", type: "Lunch" }, { name: "Italian Sub", type: "Lunch" }, { name: "Salmon Salad", type: "Lunch" },
    { name: "Pulled Pork Sandwich", type: "Lunch" }, { name: "Fish and Chips", type: "Lunch" }, { name: "Niçoise Salad", type: "Lunch" },
    { name: "Taco Salad", type: "Lunch" }, { name: "Baked Potato", type: "Lunch" }, { name: "Mediterranean Bowl", type: "Lunch" },
    { name: "Chickpea Salad", type: "Lunch" }, { name: "Spring Rolls", type: "Lunch" }, { name: "Chicken Quesadilla", type: "Lunch" },
    { name: "Clam Chowder", type: "Lunch" }, { name: "Beef Barley Soup", type: "Lunch" }, { name: "BBQ Chicken Flatbread", type: "Lunch" },
    { name: "Peanut Noodles", type: "Lunch" }, { name: "Stuffed Pita", type: "Lunch" }, { name: "Curry Chicken Salad", type: "Lunch" },
    { name: "Waldorf Salad", type: "Lunch" }, { name: "Tortellini Soup", type: "Lunch" }, { name: "Teriyaki Bowl", type: "Lunch" },

    // --- DINNER (57 Total) ---
    { name: "Spaghetti", type: "Dinner" }, { name: "Salmon & Asparagus", type: "Dinner" }, { name: "Beef Stir Fry", type: "Dinner" },
    { name: "Chicken Curry", type: "Dinner" }, { name: "Tacos", type: "Dinner" }, { name: "Lasagna", type: "Dinner" },
    { name: "Roast Chicken", type: "Dinner" }, { name: "Shepherd's Pie", type: "Dinner" }, { name: "Stuffed Peppers", type: "Dinner" },
    { name: "Pizza", type: "Dinner" }, { name: "Steak & Potatoes", type: "Dinner" }, { name: "Mushroom Risotto", type: "Dinner" },
    { name: "Pad Thai", type: "Dinner" }, { name: "Fish Tacos", type: "Dinner" }, { name: "Meatloaf", type: "Dinner" },
    { name: "Eggplant Parm", type: "Dinner" }, { name: "Shrimp Scampi", type: "Dinner" }, { name: "Pot Roast", type: "Dinner" },
    { name: "Beef Wellington", type: "Dinner" }, { name: "Vegetable Lasagna", type: "Dinner" }, { name: "Chicken Parmesan", type: "Dinner" },
    { name: "Beef Stroganoff", type: "Dinner" }, { name: "Grilled Salmon", type: "Dinner" }, { name: "Chicken Alfredo", type: "Dinner" },
    { name: "Beef Tacos", type: "Dinner" }, { name: "Pork Chops & Apples", type: "Dinner" }, { name: "Bibimbap", type: "Dinner" },
    { name: "Lamb Chops", type: "Dinner" }, { name: "BBQ Ribs", type: "Dinner" }, { name: "Lobster Bisque", type: "Dinner" },
    { name: "Enchiladas", type: "Dinner" }, { name: "Chicken Pot Pie", type: "Dinner" }, { name: "Ratatouille", type: "Dinner" },
    { name: "Beef Stew", type: "Dinner" }, { name: "Paella", type: "Dinner" }, { name: "Fish Curry", type: "Dinner" },
    { name: "Jambalaya", type: "Dinner" }, { name: "Chicken Piccata", type: "Dinner" }, { name: "Swedish Meatballs", type: "Dinner" },
    { name: "Gnocchi", type: "Dinner" }, { name: "Stuffed Shells", type: "Dinner" }, { name: "Chicken Teriyaki", type: "Dinner" },
    { name: "Butter Chicken", type: "Dinner" }, { name: "Falafel Platter", type: "Dinner" }, { name: "Chili Con Carne", type: "Dinner" },
    { name: "Pork Souvlaki", type: "Dinner" }, { name: "Roast Beef", type: "Dinner" }, { name: "Trout Amandine", type: "Dinner" },
    { name: "Moussaka", type: "Dinner" }, { name: "Turkey Roast", type: "Dinner" }, { name: "Seafood Pasta", type: "Dinner" },
    { name: "Chicken Marsala", type: "Dinner" }, { name: "Beef Bourguignon", type: "Dinner" }, { name: "Spinach & Ricotta Cannelloni", type: "Dinner" },
    { name: "Zucchini Fritters", type: "Dinner" }, { name: "Moroccan Lamb Tagine", type: "Dinner" }, { name: "Hunan Beef", type: "Dinner" },
    
    // --- BREAKFAST SIDES (50 Total) ---
    { name: "Fresh Fruit Cup", type: "Breakfast Side" }, { name: "Hash Browns", type: "Breakfast Side" }, { name: "Toast with Butter", type: "Breakfast Side" },
    { name: "Bacon Strips", type: "Breakfast Side" }, { name: "Sausage Links", type: "Breakfast Side" }, { name: "Home Fries", type: "Breakfast Side" },
    { name: "Fresh Berries", type: "Breakfast Side" }, { name: "Orange Slices", type: "Breakfast Side" }, { name: "Cantaloupe Wedges", type: "Breakfast Side" },
    { name: "Sliced Banana", type: "Breakfast Side" }, { name: "Apple Slices", type: "Breakfast Side" }, { name: "Grapes", type: "Breakfast Side" },
    { name: "Pineapple Chunks", type: "Breakfast Side" }, { name: "Strawberries", type: "Breakfast Side" }, { name: "Blueberries", type: "Breakfast Side" },
    { name: "Croissant", type: "Breakfast Side" }, { name: "English Muffin", type: "Breakfast Side" }, { name: "Bagel", type: "Breakfast Side" },
    { name: "Cinnamon Roll", type: "Breakfast Side" }, { name: "Danish Pastry", type: "Breakfast Side" }, { name: "Scone", type: "Breakfast Side" },
    { name: "Biscuit", type: "Breakfast Side" }, { name: "Turkey Sausage", type: "Breakfast Side" }, { name: "Canadian Bacon", type: "Breakfast Side" },
    { name: "Grilled Tomatoes", type: "Breakfast Side" }, { name: "Sautéed Mushrooms", type: "Breakfast Side" }, { name: "Cottage Cheese", type: "Breakfast Side" },
    { name: "Yogurt", type: "Breakfast Side" }, { name: "Granola", type: "Breakfast Side" }, { name: "Honey Drizzle", type: "Breakfast Side" },
    { name: "Maple Syrup", type: "Breakfast Side" }, { name: "Fruit Compote", type: "Breakfast Side" }, { name: "Jam & Jelly", type: "Breakfast Side" },
    { name: "Peanut Butter", type: "Breakfast Side" }, { name: "Almond Butter", type: "Breakfast Side" }, { name: "Cream Cheese", type: "Breakfast Side" },
    { name: "Sliced Avocado", type: "Breakfast Side" }, { name: "Smoked Salmon", type: "Breakfast Side" }, { name: "Hollandaise Sauce", type: "Breakfast Side" },
    { name: "Hot Cereal", type: "Breakfast Side" }, { name: "Breakfast Sausage Patties", type: "Breakfast Side" }, { name: "Tater Tots", type: "Breakfast Side" },
    { name: "Fruit Smoothie", type: "Breakfast Side" }, { name: "Orange Juice", type: "Breakfast Side" }, { name: "Mixed Nuts", type: "Breakfast Side" },
    { name: "Chia Seeds", type: "Breakfast Side" }, { name: "Flax Seeds", type: "Breakfast Side" }, { name: "Honey Nut Mix", type: "Breakfast Side" },
    { name: "Fresh Melon", type: "Breakfast Side" }, { name: "Kiwi Slices", type: "Breakfast Side" },
    
    // --- LUNCH SIDES (50 Total) ---
    { name: "French Fries", type: "Lunch Side" }, { name: "Side Salad", type: "Lunch Side" }, { name: "Coleslaw", type: "Lunch Side" },
    { name: "Potato Chips", type: "Lunch Side" }, { name: "Pickle Spear", type: "Lunch Side" }, { name: "Onion Rings", type: "Lunch Side" },
    { name: "Sweet Potato Fries", type: "Lunch Side" }, { name: "Fruit Cup", type: "Lunch Side" }, { name: "Potato Salad", type: "Lunch Side" },
    { name: "Macaroni Salad", type: "Lunch Side" }, { name: "Chips & Salsa", type: "Lunch Side" }, { name: "Tortilla Chips", type: "Lunch Side" },
    { name: "Carrot Sticks", type: "Lunch Side" }, { name: "Celery Sticks", type: "Lunch Side" }, { name: "Cherry Tomatoes", type: "Lunch Side" },
    { name: "Cucumber Slices", type: "Lunch Side" }, { name: "Bell Pepper Strips", type: "Lunch Side" }, { name: "Hummus & Veggies", type: "Lunch Side" },
    { name: "Pretzels", type: "Lunch Side" }, { name: "Crackers", type: "Lunch Side" }, { name: "Bread Roll", type: "Lunch Side" },
    { name: "Garlic Bread", type: "Lunch Side" }, { name: "Breadsticks", type: "Lunch Side" }, { name: "Soup Cup", type: "Lunch Side" },
    { name: "Tomato Soup", type: "Lunch Side" }, { name: "Chicken Noodle Soup", type: "Lunch Side" }, { name: "Minestrone Soup", type: "Lunch Side" },
    { name: "Broccoli Soup", type: "Lunch Side" }, { name: "Caesar Salad", type: "Lunch Side" }, { name: "Greek Salad", type: "Lunch Side" },
    { name: "Garden Salad", type: "Lunch Side" }, { name: "Caprese Salad", type: "Lunch Side" }, { name: "Quinoa Salad", type: "Lunch Side" },
    { name: "Pasta Salad", type: "Lunch Side" }, { name: "Corn on the Cob", type: "Lunch Side" }, { name: "Baked Beans", type: "Lunch Side" },
    { name: "Applesauce", type: "Lunch Side" }, { name: "Cottage Cheese Cup", type: "Lunch Side" }, { name: "Cheese Cubes", type: "Lunch Side" },
    { name: "Trail Mix", type: "Lunch Side" }, { name: "Edamame", type: "Lunch Side" }, { name: "Steamed Vegetables", type: "Lunch Side" },
    { name: "Roasted Vegetables", type: "Lunch Side" }, { name: "Fruit Skewers", type: "Lunch Side" }, { name: "Wedge Salad", type: "Lunch Side" },
    { name: "Beet Salad", type: "Lunch Side" }, { name: "Asian Slaw", type: "Lunch Side" }, { name: "Tabbouleh", type: "Lunch Side" },
    { name: "Pita Chips", type: "Lunch Side" }, { name: "Guacamole", type: "Lunch Side" },
    
    // --- DINNER SIDES (50 Total) ---
    { name: "Mashed Potatoes", type: "Dinner Side" }, { name: "Steamed Rice", type: "Dinner Side" }, { name: "Garlic Mashed Potatoes", type: "Dinner Side" },
    { name: "Baked Potato", type: "Dinner Side" }, { name: "Roasted Potatoes", type: "Dinner Side" }, { name: "Scalloped Potatoes", type: "Dinner Side" },
    { name: "Rice Pilaf", type: "Dinner Side" }, { name: "Fried Rice", type: "Dinner Side" }, { name: "Wild Rice", type: "Dinner Side" },
    { name: "Brown Rice", type: "Dinner Side" }, { name: "Jasmine Rice", type: "Dinner Side" }, { name: "Basmati Rice", type: "Dinner Side" },
    { name: "Steamed Broccoli", type: "Dinner Side" }, { name: "Roasted Brussels Sprouts", type: "Dinner Side" }, { name: "Green Beans", type: "Dinner Side" },
    { name: "Asparagus", type: "Dinner Side" }, { name: "Glazed Carrots", type: "Dinner Side" }, { name: "Corn Casserole", type: "Dinner Side" },
    { name: "Creamed Spinach", type: "Dinner Side" }, { name: "Grilled Zucchini", type: "Dinner Side" }, { name: "Roasted Cauliflower", type: "Dinner Side" },
    { name: "Green Bean Casserole", type: "Dinner Side" }, { name: "Dinner Rolls", type: "Dinner Side" }, { name: "Garlic Bread", type: "Dinner Side" },
    { name: "Cornbread", type: "Dinner Side" }, { name: "Biscuits", type: "Dinner Side" }, { name: "Focaccia Bread", type: "Dinner Side" },
    { name: "Naan Bread", type: "Dinner Side" }, { name: "House Salad", type: "Dinner Side" }, { name: "Caesar Salad", type: "Dinner Side" },
    { name: "Wedge Salad", type: "Dinner Side" }, { name: "Caprese Salad", type: "Dinner Side" }, { name: "Arugula Salad", type: "Dinner Side" },
    { name: "Spinach Salad", type: "Dinner Side" }, { name: "Coleslaw", type: "Dinner Side" }, { name: "Potato Wedges", type: "Dinner Side" },
    { name: "Steak Fries", type: "Dinner Side" }, { name: "Mac and Cheese", type: "Dinner Side" }, { name: "Risotto", type: "Dinner Side" },
    { name: "Polenta", type: "Dinner Side" }, { name: "Quinoa", type: "Dinner Side" }, { name: "Couscous", type: "Dinner Side" },
    { name: "Orzo", type: "Dinner Side" }, { name: "Stuffing", type: "Dinner Side" }, { name: "Cranberry Sauce", type: "Dinner Side" },
    { name: "Gravy", type: "Dinner Side" }, { name: "Sautéed Spinach", type: "Dinner Side" }, { name: "Grilled Vegetables", type: "Dinner Side" },
    { name: "Ratatouille", type: "Dinner Side" }, { name: "Collard Greens", type: "Dinner Side" }
];
