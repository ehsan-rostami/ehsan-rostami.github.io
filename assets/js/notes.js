document.addEventListener('DOMContentLoaded', function () {
    // Copy-link button on single note pages
    document.querySelectorAll('.post-share-copy').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var url = btn.getAttribute('data-url');
            if (!url || !navigator.clipboard) return;
            navigator.clipboard.writeText(url).then(function () {
                var icon = btn.querySelector('i');
                if (!icon) return;
                icon.classList.remove('fa-link');
                icon.classList.add('fa-check');
                setTimeout(function () {
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-link');
                }, 1500);
            });
        });
    });

    // Reading progress bar
    var progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = pct + '%';
        });
    }

    // Clickable "#" anchor links next to headings inside a note
    document.querySelectorAll('.post-body h2[id], .post-body h3[id]').forEach(function (heading) {
        var link = document.createElement('a');
        link.href = '#' + heading.id;
        link.className = 'heading-anchor';
        link.textContent = '#';
        link.setAttribute('aria-label', 'Link to this section');
        heading.appendChild(link);
    });
});
