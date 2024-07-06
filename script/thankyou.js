document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        window.location.href = './thankyou.html'; 
    });
});

const currentYear = document.getElementById('current-year');
currentYear.textContent = new Date().getFullYear();