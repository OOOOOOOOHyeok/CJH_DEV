/**
 * Chapter 0: Loading Screen
 */
(function () {
    'use strict';

    let scroll = 0;
    let rotation = 0;
    let velocity = 0;
    let complete = false;
    let maxPan = 0;

    const PHASE1 = 400;   // 더 빠르게
    const PHASE2 = 1000;  // 더 빠르게
    const TOTAL = 1400;   // 더 빠르게

    function init() {
        const track = document.getElementById('textTrack');
        const particles = document.getElementById('particles');

        maxPan = Math.max(0, track.scrollWidth - window.innerWidth + 100);

        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            particles.appendChild(p);
        }

        document.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('resize', () => {
            maxPan = Math.max(0, track.scrollWidth - window.innerWidth + 100);
        });

        animate();
        console.log('Chapter 0 ready');
    }

    function reset() {
        scroll = 0;
        complete = false;

        document.getElementById('chapter0').classList.remove('active');
        document.getElementById('asterisk').classList.remove('active', 'tight', 'complete');
        document.querySelector('.word-everywhere').classList.remove('revealed');
        document.getElementById('textTrack').style.transform = 'translateX(0)';
        document.getElementById('progressBar').style.width = '0%';
    }

    function onWheel(e) {
        if (Nav.getCurrent() !== 0 || complete) return;
        e.preventDefault();

        scroll = Math.max(0, scroll + e.deltaY);
        velocity += e.deltaY * 0.12;

        update();
    }

    function update() {
        const bar = document.getElementById('progressBar');
        const asterisk = document.getElementById('asterisk');
        const everywhere = document.querySelector('.word-everywhere');
        const track = document.getElementById('textTrack');
        const ch0 = document.getElementById('chapter0');

        bar.style.width = Math.min(scroll / TOTAL * 100, 100) + '%';

        if (scroll > 0) {
            ch0.classList.add('active');
            asterisk.classList.add('active');
        }

        if (scroll > PHASE1 * 0.3) {
            asterisk.classList.add('tight');
        }

        if (scroll >= PHASE1) {
            const progress = (scroll - PHASE1) / PHASE2;
            const ease = 1 - Math.pow(1 - Math.min(progress, 1), 3);
            track.style.transform = `translateX(-${ease * maxPan}px)`;

            if (progress > 0.2) everywhere.classList.add('revealed');
            if (progress > 0.5) asterisk.classList.add('complete');
        }

        if (scroll >= TOTAL && !complete) {
            complete = true;
            bar.style.width = '100%';
            setTimeout(() => Nav.showChapter(1), 300);
        }
    }

    function animate() {
        if (Nav.getCurrent() === 0 && Math.abs(velocity) > 0.01) {
            velocity *= 0.92;
            rotation += velocity;
            const asterisk = document.getElementById('asterisk');
            if (asterisk) asterisk.style.transform = `rotate(${rotation}deg)`;
        }
        requestAnimationFrame(animate);
    }

    window.Chapter0 = { reset };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
