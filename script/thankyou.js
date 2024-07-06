document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submit action
        window.location.href = './thankyou.html'; // Redirect to thank you page
    });
});

const currentYear = document.getElementById('current-year');
currentYear.textContent = new Date().getFullYear();