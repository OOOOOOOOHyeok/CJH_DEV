/**
 * Chapter 1: Scan Reveal
 * Supports both mouse wheel and touch events for mobile
 */
(function () {
    'use strict';

    let animDone = false;
    let scroll = 0;
    const THRESHOLD = 500;

    // Touch state
    let touchStartY = 0;
    let lastTouchY = 0;
    let isTouching = false;

    function init() {
        const ch1 = document.getElementById('chapter1');

        // visible 될 때마다 애니메이션 시작
        const observer = new MutationObserver(() => {
            if (ch1.classList.contains('visible') && !ch1.classList.contains('phase-1') && !ch1.classList.contains('phase-2') && !ch1.classList.contains('phase-3')) {
                startAnimation();
            }
        });
        observer.observe(ch1, { attributes: true, attributeFilter: ['class'] });

        // Mouse wheel events
        document.addEventListener('wheel', onWheel, { passive: false });

        // Touch events - attach to document for reliability
        document.addEventListener('touchstart', onTouchStart, { passive: false });
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd, { passive: true });

        console.log('Chapter 1 ready (mobile supported)');
    }

    function startAnimation() {
        console.log('Chapter 1: starting animation');
        const ch1 = document.getElementById('chapter1');
        animDone = false;
        scroll = THRESHOLD; // 중간에서 시작

        // Phase 1: 바 나타남
        setTimeout(() => ch1.classList.add('phase-1'), 50);

        // Phase 2: 바 내려감
        setTimeout(() => {
            ch1.classList.remove('phase-1');
            ch1.classList.add('phase-2');
        }, 150);

        // Phase 3: 완료
        setTimeout(() => {
            ch1.classList.remove('phase-2');
            ch1.classList.add('phase-3');
        }, 1200);

        // 스크롤 허용
        setTimeout(() => {
            animDone = true;
            console.log('Chapter 1: animation done, scroll enabled');
        }, 1800);
    }

    // Mouse wheel handler
    function onWheel(e) {
        const current = Nav.getCurrent();
        if (current !== 1) return;

        if (!animDone) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        scroll += e.deltaY;

        handleScroll();
    }

    // Touch handlers
    function onTouchStart(e) {
        if (Nav.getCurrent() !== 1) return;

        isTouching = true;
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;

        if (animDone) {
            e.preventDefault();
        }
        console.log('Chapter 1: touch start at', touchStartY);
    }

    function onTouchMove(e) {
        if (Nav.getCurrent() !== 1 || !isTouching) return;

        if (!animDone) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        const currentY = e.touches[0].clientY;
        const deltaY = (lastTouchY - currentY) * 3; // Amplify touch movement
        lastTouchY = currentY;

        scroll += deltaY;
        console.log('Chapter 1: touch move, scroll:', scroll);

        handleScroll();
    }

    function onTouchEnd(e) {
        if (Nav.getCurrent() !== 1) return;
        isTouching = false;
        console.log('Chapter 1: touch end');
    }

    function handleScroll() {
        console.log('Chapter 1 scroll:', scroll);

        // 위로 → Chapter 0
        if (scroll <= 0) {
            console.log('Going to Chapter 0');
            animDone = false;
            Chapter0.reset();
            Nav.showChapter(0);
            return;
        }

        // 아래로 → Chapter 2
        if (scroll >= THRESHOLD * 2) {
            console.log('Going to Chapter 2');
            animDone = false;
            Nav.showChapter(2);
            return;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
