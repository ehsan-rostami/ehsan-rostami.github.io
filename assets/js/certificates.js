document.addEventListener('DOMContentLoaded', function () {
    var list = document.querySelector('.certificates-list');
    if (!list) return;

    var filterButtons = document.querySelectorAll('.certificate-filters .filter-btn');
    var items = Array.from(document.querySelectorAll('.certificate-item'));

    function sortAndShow(filter) {
        var visible = filter === 'all' ? items : items.filter(function (item) {
            return item.classList.contains(filter);
        });

        visible.sort(function (a, b) {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        });

        items.forEach(function (item) { item.style.display = 'none'; });
        visible.forEach(function (item) {
            item.style.display = 'block';
            list.appendChild(item);
        });
    }

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            sortAndShow(btn.getAttribute('data-filter'));
        });
    });

    document.querySelectorAll('.description-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var content = btn.closest('.certificate-links').nextElementSibling;
            content.classList.toggle('show');
            var icon = btn.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    sortAndShow('all');
});
