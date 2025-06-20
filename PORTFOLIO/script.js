// Get the DOM elements for the hamburger menu and navigation links
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.querySelector('.nav-links');

// Add a click event listener to the hamburger menu
hamburgerMenu.addEventListener('click', () => {
    // Toggle the 'active' class on the nav-links element
    // This will show or hide the menu based on the CSS
    navLinks.classList.toggle('active');
});