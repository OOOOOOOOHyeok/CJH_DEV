/**
 * Chapter 2: Placeholder
 * Supports both mouse wheel and touch events for mobile
 */
(function () {
    'use strict';

    let scroll = 0;
    const THRESHOLD = 300;

    // Touch state
    let touchStartY = 0;
    let lastTouchY = 0;
    let isTouching = false;

    function init() {
        const ch2 = document.getElementById('chapter2');

        // Mouse wheel events
        document.addEventListener('wheel', onWheel, { passive: false });

        // Touch events for mobile
        ch2.addEventListener('touchstart', onTouchStart, { passive: false });
        ch2.addEventListener('touchmove', onTouchMove, { passive: false });
        ch2.addEventListener('touchend', onTouchEnd, { passive: true });

        console.log('Chapter 2 ready (mobile supported)');
    }

    // Mouse wheel handler
    function onWheel(e) {
        if (Nav.getCurrent() !== 2) return;
        e.preventDefault();

        if (e.deltaY < 0) {
            scroll += Math.abs(e.deltaY);
            console.log('Chapter 2 scroll up:', scroll);

            if (scroll >= THRESHOLD) {
                console.log('Going to Chapter 1');
                scroll = 0;
                Nav.showChapter(1);
            }
        } else {
            scroll = 0;
        }
    }

    // Touch handlers
    function onTouchStart(e) {
        if (Nav.getCurrent() !== 2) return;

        isTouching = true;
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
    }

    function onTouchMove(e) {
        if (Nav.getCurrent() !== 2 || !isTouching) return;
        e.preventDefault();

        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchY - currentY; // Negative = swipe up (go back)
        lastTouchY = currentY;

        if (deltaY < 0) { // Swiping down (scrolling up content)
            scroll += Math.abs(deltaY) * 2;
            console.log('Chapter 2 swipe down (scroll up):', scroll);

            if (scroll >= THRESHOLD) {
                console.log('Going to Chapter 1');
                scroll = 0;
                Nav.showChapter(1);
            }
        } else {
            scroll = 0;
        }
    }

    function onTouchEnd(e) {
        isTouching = false;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
