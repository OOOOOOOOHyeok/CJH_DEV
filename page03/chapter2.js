/**
 * Chapter 2: Placeholder
 */
(function () {
    'use strict';

    let scroll = 0;
    const THRESHOLD = 300;  // 더 빠르게

    function init() {
        document.addEventListener('wheel', onWheel, { passive: false });
        console.log('Chapter 2 ready');
    }

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
