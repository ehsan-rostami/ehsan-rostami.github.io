/*
 * Turns any element with [data-gallery] into a minimal image gallery:
 * large main image, prev/next arrows, a thumbnail strip for quick
 * jumping, keyboard navigation, and a fullscreen lightbox.
 *
 * Required data attributes on the element:
 *   data-count         -> total number of images
 *   data-image-prefix   -> path prefix before the page number, e.g. "/assets/images/portfolio/page-"
 *   data-image-ext      -> file extension including the dot, e.g. ".jpg"
 * Optional:
 *   data-image-pad       -> zero padding for page numbers (default 2, so "01", "02"...)
 *
 * Image files are expected at: {prefix}{padded index}{ext}, 1-indexed.
 * Expects a sibling/related lightbox element with id="gallery-lightbox"
 * containing .gallery-lightbox-image, .gallery-lightbox-close and its
 * own .gallery-prev / .gallery-next buttons.
 */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-gallery]').forEach(initGallery);
});

function initGallery(root) {
    var count = parseInt(root.dataset.count, 10) || 1;
    var prefix = root.dataset.imagePrefix || '';
    var ext = root.dataset.imageExt || '.jpg';
    var pad = parseInt(root.dataset.imagePad, 10) || 2;

    var current = 0;

    function srcFor(index) {
        var num = String(index + 1).padStart(pad, '0');
        return prefix + num + ext;
    }

    var mainImg = root.querySelector('.gallery-main-image');
    var indicator = root.querySelector('.gallery-indicator');
    var thumbsWrap = root.querySelector('.gallery-thumbs');
    var expandBtn = root.querySelector('.gallery-expand');

    var lightbox = document.getElementById('gallery-lightbox');
    var lightboxImg = lightbox ? lightbox.querySelector('.gallery-lightbox-image') : null;
    var lightboxClose = lightbox ? lightbox.querySelector('.gallery-lightbox-close') : null;

    var prevBtns = Array.prototype.slice.call(root.querySelectorAll('.gallery-prev'));
    var nextBtns = Array.prototype.slice.call(root.querySelectorAll('.gallery-next'));
    if (lightbox) {
        prevBtns = prevBtns.concat(Array.prototype.slice.call(lightbox.querySelectorAll('.gallery-prev')));
        nextBtns = nextBtns.concat(Array.prototype.slice.call(lightbox.querySelectorAll('.gallery-next')));
    }

    var thumbs = [];

    for (var i = 0; i < count; i++) {
        var thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'gallery-thumb';
        thumb.setAttribute('aria-label', 'Go to page ' + (i + 1));

        var thumbImg = document.createElement('img');
        thumbImg.src = srcFor(i);
        thumbImg.alt = '';
        thumbImg.loading = 'lazy';
        thumb.appendChild(thumbImg);

        (function (index) {
            thumb.addEventListener('click', function () { goTo(index); });
        })(i);

        thumbsWrap.appendChild(thumb);
        thumbs.push(thumb);
    }

    function update() {
        var src = srcFor(current);
        var label = 'Page ' + (current + 1);

        if (mainImg) {
            mainImg.src = src;
            mainImg.alt = label;
        }
        if (indicator) {
            indicator.textContent = (current + 1) + ' / ' + count;
        }
        thumbs.forEach(function (t, idx) {
            t.classList.toggle('active', idx === current);
        });
        var activeThumb = thumbs[current];
        if (activeThumb && activeThumb.scrollIntoView) {
            activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        if (lightbox && lightbox.classList.contains('open') && lightboxImg) {
            lightboxImg.src = src;
            lightboxImg.alt = label;
        }
    }

    function goTo(index) {
        current = (index + count) % count;
        update();
    }

    prevBtns.forEach(function (btn) { btn.addEventListener('click', function () { goTo(current - 1); }); });
    nextBtns.forEach(function (btn) { btn.addEventListener('click', function () { goTo(current + 1); }); });

    function openLightbox() {
        if (!lightbox) return;
        lightbox.classList.add('open');
        if (lightboxImg) {
            lightboxImg.src = srcFor(current);
            lightboxImg.alt = 'Page ' + (current + 1);
        }
    }

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('open');
    }

    if (expandBtn) expandBtn.addEventListener('click', openLightbox);
    if (mainImg) mainImg.addEventListener('click', openLightbox);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
        if (e.key === 'Escape') closeLightbox();
    });

    update();
}
