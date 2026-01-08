/**
 * Navigation Controller
 */
(function () {
    'use strict';

    let current = 0;

    const ch0 = () => document.getElementById('chapter0');
    const ch1 = () => document.getElementById('chapter1');
    const ch2 = () => document.getElementById('chapter2');

    function showChapter(num) {
        console.log('Nav: showChapter', num, 'from', current);

        if (num === 0) {
            ch1().classList.remove('visible', 'phase-1', 'phase-2', 'phase-3');
            ch2().classList.remove('visible');
            ch0().classList.remove('exit');
        } else if (num === 1) {
            ch0().classList.add('exit');
            ch2().classList.remove('visible');
            ch1().classList.remove('phase-1', 'phase-2', 'phase-3');
            ch1().classList.add('visible');
        } else if (num === 2) {
            ch1().classList.remove('visible', 'phase-1', 'phase-2', 'phase-3');
            ch2().classList.add('visible');
        }

        current = num;
    }

    function getCurrent() {
        return current;
    }

    window.Nav = { showChapter, getCurrent };
    console.log('Navigation ready');
})();
