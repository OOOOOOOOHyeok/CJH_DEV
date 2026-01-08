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
        // Mouse wheel events
        document.addEventListener('wheel', onWheel, { passive: false });

        // Touch events - attach to document for reliability
        document.addEventListener('touchstart', onTouchStart, { passive: false });
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd, { passive: true });

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
        e.preventDefault();

        isTouching = true;
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
        console.log('Chapter 2: touch start at', touchStartY);
    }

    function onTouchMove(e) {
        if (Nav.getCurrent() !== 2 || !isTouching) return;
        e.preventDefault();

        const currentY = e.touches[0].clientY;
        const deltaY = currentY - lastTouchY; // Positive = swiping down = scroll up
        lastTouchY = currentY;

        if (deltaY > 0) { // Swiping down (scroll up content = go back)
            scroll += deltaY * 3;
            console.log('Chapter 2 swipe down (go back):', scroll);

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
        if (Nav.getCurrent() !== 2) return;
        isTouching = false;
        console.log('Chapter 2: touch end');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
