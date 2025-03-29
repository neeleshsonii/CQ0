// DOM Elements
const authModal = document.getElementById('authModal');
const modalTitle = document.getElementById('modalTitle');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userNameDisplay = document.getElementById('userName');
const isClubAdmin = document.getElementById('isClubAdmin');
const clubFields = document.getElementById('clubFields');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle for mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Toggle for like button
function likePost(button) {
    const heartIcon = button.querySelector('i');
    const likeCount = button.querySelector('.like-count');

    // Toggle heart icon
    if (heartIcon.classList.contains('far')) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas', 'text-red-500');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        heartIcon.classList.add('like-animation');
        setTimeout(() => {
            heartIcon.classList.remove('like-animation');
        }, 500);
    } else {
        heartIcon.classList.remove('fas', 'text-red-500');
        heartIcon.classList.add('far');
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
    }
}

// Auth modal functionality
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Login';
        authModal.classList.remove('hidden');
    });
}

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Register';
        authModal.classList.remove('hidden');
    });
}

function closeModal() {
    authModal.classList.add('hidden');
}

// Toggle club admin fields
if (isClubAdmin) {
    isClubAdmin.addEventListener('change', function () {
        if (this.checked) {
            clubFields.classList.remove('hidden');
        } else {
            clubFields.classList.add('hidden');
        }
    });
}

// Form submission (mock)
const authForm = document.getElementById('authForm');
if (authForm) {
    authForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Mock authentication
        const nameField = document.getElementById('name');
        if (nameField && nameField.value) {
            const name = nameField.value;

            // Update UI to show logged in state
            if (userNameDisplay) {
                userNameDisplay.textContent = name;
            }

            if (loginBtn) loginBtn.classList.add('hidden');
            if (registerBtn) registerBtn.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');

            closeModal();

            // If club admin, would store that info
            if (isClubAdmin && isClubAdmin.checked) {
                // In a real app, would send this to server
                console.log('Club admin logged in:', {
                    name: name,
                    phone: document.getElementById('phone').value,
                    clubName: document.getElementById('clubName').value,
                    clubDescription: document.getElementById('clubDescription').value
                });
            }

            // Save user data to localStorage (would use proper auth tokens in production)
            localStorage.setItem('campusquest_user', name);
        }
    });
}

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();

        if (userNameDisplay) userNameDisplay.textContent = 'Guest';
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (registerBtn) registerBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');

        // Clear localStorage
        localStorage.removeItem('campusquest_user');
    });
}

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('campusquest_user');
    if (savedUser && userNameDisplay) {
        userNameDisplay.textContent = savedUser;
        if (loginBtn) loginBtn.classList.add('hidden');
        if (registerBtn) registerBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
    }

    // Fix any syntax errors from the original code
    const postButtons = document.querySelectorAll('[onclick="likePost(this)"]');
    postButtons.forEach(button => {
        button.addEventListener('click', () => likePost(button));
    });
});