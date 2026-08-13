document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('nav ul');

    if (!toggle || !menu) return;

    function toggleMenu() {
        menu.classList.toggle('show');
    }

    toggle.addEventListener('click', toggleMenu);
    toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close the mobile menu automatically once a link is chosen
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('show');
        });
    });
});
