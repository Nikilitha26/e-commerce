document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get all input elements in the form
        const inputs = form.querySelectorAll('input');

        // Check if any inputs are empty
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value) {
                allFilled = false;
            }
        });

        if (!allFilled) {
            // If any inputs are empty, show an alert
            alert('Please fill out all fields.');
            return; // Stop the form submission
        }

        // If all inputs are filled, show a message and reset the form
        alert('Message Submitted!');
        form.reset();
    });
});

const currentYear = document.getElementById('current-year');
currentYear.textContent = new Date().getFullYear();