document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('fullscreen-modal');
    var modalImg = document.getElementById('fullscreen-image');
    var closeBtn = modal ? modal.querySelector('.close-button') : null;

    if (!modal || !modalImg) return;

    document.querySelectorAll('.image-gallery img, .project-hero').forEach(function (img) {
        img.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    function close() {
        modal.style.display = 'none';
    }

    if (closeBtn) closeBtn.addEventListener('click', close);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) close();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });
});
