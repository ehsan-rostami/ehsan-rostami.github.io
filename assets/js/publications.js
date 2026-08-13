document.addEventListener('DOMContentLoaded', function () {
    var toggles = document.querySelectorAll('.abstract-toggle');
    toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            var content = this.nextElementSibling;
            content.classList.toggle('show');
            var icon = this.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    var filterButtons = document.querySelectorAll('.publication-filters .filter-btn');
    var items = document.querySelectorAll('.publication-item');

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var filter = this.getAttribute('data-filter');
            filterButtons.forEach(function (btn) { btn.classList.remove('active'); });
            this.classList.add('active');

            items.forEach(function (item) {
                item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'flex' : 'none';
            });
        });
    });
});
