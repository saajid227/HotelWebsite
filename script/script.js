document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');

    if (menuToggle) {
        menuToggle.addEventListener('change', function () {
            const navlinks = document.querySelector('.navlinks');

            if (this.checked) {
                // Show the navlinks
                navlinks.style.display = 'flex';

                // Add a close button to the navlinks container
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close';
                closeButton.classList.add('close-button');
                closeButton.addEventListener('click', function () {
                    // Close the navlinks when the close button is clicked
                    menuToggle.checked = false;
                });

                navlinks.appendChild(closeButton);
            } else {
                // Hide the navlinks
                navlinks.style.display = 'none';

                // Remove the close button
                const closeButton = document.querySelector('.close-button');
                if (closeButton) {
                    navlinks.removeChild(closeButton);
                }
            }
        });
    }

    document.querySelectorAll('.navlink').forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) {
                menuToggle.checked = false;
            }
        });
    });
});
