/**
 * AUTH.JS - Authentication Module
 * Handles user login, logout, and session management for Smart Meal Planner
 */

const Auth = {
    // LOCAL USERS DATABASE
    // In the future, this will be replaced with a real database
    users: [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' }
    ],
    
    /**
     * LOGIN - Authenticate user with username and password
     * @param {string} username - The username
     * @param {string} password - The password
     * @returns {boolean} - True if login successful, false otherwise
     */
    login: function(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Store user session in localStorage
            const session = {
                username: user.username,
                role: user.role,
                isGuest: false,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('mealPlannerAuth', JSON.stringify(session));
            return true;
        }
        
        return false;
    },
    
    /**
     * LOGIN AS GUEST - Create a guest session
     */
    loginAsGuest: function() {
        const session = {
            username: 'Guest',
            role: 'guest',
            isGuest: true,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('mealPlannerAuth', JSON.stringify(session));
    },
    
    /**
     * LOGOUT - Clear user session
     */
    logout: function() {
        localStorage.removeItem('mealPlannerAuth');
        window.location.href = 'login.html';
    },
    
    /**
     * IS AUTHENTICATED - Check if user is logged in
     * @returns {boolean} - True if authenticated, false otherwise
     */
    isAuthenticated: function() {
        const session = localStorage.getItem('mealPlannerAuth');
        return session !== null;
    },
    
    /**
     * GET CURRENT USER - Get the current logged in user
     * @returns {object|null} - User session object or null if not logged in
     */
    getCurrentUser: function() {
        const session = localStorage.getItem('mealPlannerAuth');
        
        if (session) {
            return JSON.parse(session);
        }
        
        return null;
    },
    
    /**
     * REQUIRE AUTH - Redirect to login if not authenticated
     * Call this function at the top of protected pages
     */
    requireAuth: function() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    },
    
    /**
     * IS GUEST - Check if current user is a guest
     * @returns {boolean} - True if guest, false otherwise
     */
    isGuest: function() {
        const user = this.getCurrentUser();
        return user && user.isGuest === true;
    },
    
    /**
     * IS ADMIN - Check if current user is an admin
     * @returns {boolean} - True if admin, false otherwise
     */
    isAdmin: function() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
};

// AUTO-PROTECT: If this script is loaded on a page other than login.html,
// automatically check for authentication
if (!window.location.pathname.endsWith('login.html')) {
    Auth.requireAuth();
}
