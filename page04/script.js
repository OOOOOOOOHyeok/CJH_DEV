/**
 * Brand Website - Multi-phase Scroll Animation
 * 
 * Star continues rolling even after track becomes circle
 * Slower, more natural transitions
 */

(function () {
    'use strict';

    function initPreludeAnimation() {
        const wrapper = document.getElementById('prelude-wrapper');
        const prelude = document.getElementById('prelude');
        if (!wrapper || !prelude) return;

        const content = prelude.querySelector('.prelude__content');
        const track = prelude.querySelector('.prelude__track');
        const star = prelude.querySelector('.prelude__star');
        const hint = prelude.querySelector('.prelude__hint');
        const wordThat = prelude.querySelector('.prelude__word--that');
        const wordMatters = prelude.querySelector('.prelude__word--matters');
        const overlay = prelude.querySelector('.prelude__overlay');
        const reveal = prelude.querySelector('.prelude__reveal');

        // Measurements
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Track dimensions
        const initialTrackWidth = vw * 0.28;
        const trackHeight = vw * 0.10;
        const finalTrackWidth = trackHeight;

        // Pan distance
        const maxPanX = vw * 0.75;

        // === WHEEL - smooth interpolation ===
        let currentRotation = 0;
        let targetRotation = 0;
        const rotationSmoothing = 0.06; // Even slower

        // Colors
        const blackColor = '#141516';
        const grayColor = '#8A8A8A';

        function animateWheel() {
            const diff = targetRotation - currentRotation;
            currentRotation += diff * rotationSmoothing;
            star.style.transform = `rotate(${currentRotation}deg)`;
            requestAnimationFrame(animateWheel);
        }
        animateWheel();

        function updateTextFill(element, fillPercent) {
            const fill = Math.max(0, Math.min(100, fillPercent));
            element.style.background = `linear-gradient(to right, ${blackColor} 0%, ${blackColor} ${fill}%, ${grayColor} ${fill}%, ${grayColor} 100%)`;
            element.style.webkitBackgroundClip = 'text';
            element.style.backgroundClip = 'text';
            element.style.color = 'transparent';
        }

        // Wave effect - smooth undulating wave like water
        function updateTextFillWave(element, fillPercent, scrollProgress) {
            const fill = Math.max(0, Math.min(100, fillPercent));

            // Smooth wave motion - slower, more like water
            const time = scrollProgress * Math.PI * 2;
            const wave1 = Math.sin(time) * 3;
            const wave2 = Math.sin(time * 1.5 + 1) * 2;
            const totalWave = wave1 + wave2;

            // Soft gradient edge for wave effect
            const edgeStart = Math.max(0, fill - 8 + totalWave);
            const edgeMid = Math.max(0, fill - 3 + totalWave);
            const edgeEnd = Math.min(100, fill + 2 + totalWave);

            element.style.background = `linear-gradient(to right, 
                ${blackColor} 0%, 
                ${blackColor} ${edgeStart}%,
                rgba(20, 21, 22, 0.7) ${edgeMid}%,
                ${grayColor} ${edgeEnd}%, 
                ${grayColor} 100%)`;
            element.style.webkitBackgroundClip = 'text';
            element.style.backgroundClip = 'text';
            element.style.color = 'transparent';
        }

        function update() {
            const wrapperRect = wrapper.getBoundingClientRect();
            const totalScrollRange = wrapperRect.height - vh;
            const scrollProgress = Math.max(0, Math.min(1, -wrapperRect.top / totalScrollRange));

            if (scrollProgress > 0.01) {
                hint.classList.add('hidden');
            } else {
                hint.classList.remove('hidden');
            }

            // ========================================
            // PHASE 1: Track shrinks (0% - 15%)
            // ========================================
            const phase1End = 0.15;
            const phase1Progress = Math.min(1, scrollProgress / phase1End);
            const easedPhase1 = easeOutCubic(phase1Progress);

            const currentTrackWidth = initialTrackWidth - (easedPhase1 * (initialTrackWidth - finalTrackWidth));
            track.style.width = `${currentTrackWidth}px`;

            // Star rotates during track shrink (slower) - NEGATIVE for correct direction
            targetRotation = -(easedPhase1 * 360); // 1 full rotation during shrink

            // ========================================
            // PHASE 2: Track turns dark + star keeps rolling (15% - 25%)
            // ========================================
            const phase2Start = 0.15;
            const phase2End = 0.25;
            const phase2Progress = Math.max(0, Math.min(1, (scrollProgress - phase2Start) / (phase2End - phase2Start)));
            const easedPhase2 = easeInOutCubic(phase2Progress);

            // Smooth color transition
            if (easedPhase2 > 0) {
                const gray = Math.round(197 - (easedPhase2 * 160));
                track.style.backgroundColor = `rgb(${gray}, ${gray + 5}, ${gray + 10})`;

                if (easedPhase2 > 0.5) {
                    star.style.color = '#FFFFFF';
                } else {
                    star.style.color = '#141516';
                }
            }

            // Star continues rolling during phase 2
            if (phase2Progress > 0) {
                targetRotation = -(360 + (easedPhase2 * 180)); // Another 0.5 rotation
            }

            // ========================================
            // PHASE 3: Camera pans + text fills + star keeps rolling (25% - 65%)
            // ========================================
            const phase3Start = 0.25;
            const phase3End = 0.65;
            const phase3Progress = Math.max(0, Math.min(1, (scrollProgress - phase3Start) / (phase3End - phase3Start)));
            const easedPhase3 = easeOutQuad(phase3Progress);

            const panX = -easedPhase3 * maxPanX;
            content.style.transform = `translateX(${panX}px)`;

            // Star keeps rolling during pan (very slow)
            if (phase3Progress > 0) {
                targetRotation = -(540 + (phase3Progress * 360)); // Another full rotation during pan
            }

            // PAINT FILL - with wave effect
            // "that" fills from 10% to 50% of phase 3
            const thatFillStart = 0.10;
            const thatFillEnd = 0.50;
            const thatFillProgress = Math.max(0, Math.min(1, (phase3Progress - thatFillStart) / (thatFillEnd - thatFillStart)));
            updateTextFillWave(wordThat, easeOutCubic(thatFillProgress) * 100, scrollProgress);

            // "matters" fills MUCH slower - from 55% to 100% of phase 3
            const mattersFillStart = 0.55;
            const mattersFillEnd = 1.0;
            const mattersFillProgress = Math.max(0, Math.min(1, (phase3Progress - mattersFillStart) / (mattersFillEnd - mattersFillStart)));
            updateTextFillWave(wordMatters, easeOutCubic(mattersFillProgress) * 100, scrollProgress);

            // ========================================
            // PHASE 4: White box shrinks + INVISIBLE WORKS appears (65% - 100%)
            // ========================================
            const phase4Start = 0.65;
            const phase4Progress = Math.max(0, Math.min(1, (scrollProgress - phase4Start) / (1 - phase4Start)));
            const easedPhase4 = easeOutCubic(phase4Progress);

            const whiteBox = prelude.querySelector('.prelude__white-box');

            // First: show black background
            if (phase4Progress > 0) {
                overlay.style.opacity = 1;
            } else {
                overlay.style.opacity = 0;
            }

            // White box shrinks from all sides toward center
            // Phase 4a (0-60%): White box shrinks, content fades
            // Phase 4b (30-100%): INVISIBLE WORKS fades in

            const shrinkProgress = Math.min(1, phase4Progress / 0.7);
            const easedShrink = easeOutCubic(shrinkProgress);

            // Shrink white box: 100% -> 0%
            const boxWidth = 100 - (easedShrink * 100);
            const boxHeight = 100 - (easedShrink * 100);
            whiteBox.style.width = `${boxWidth}%`;
            whiteBox.style.height = `${boxHeight}%`;

            // Hide content with white box
            if (phase4Progress > 0) {
                content.style.opacity = 0;
            }

            // INVISIBLE WORKS appears as white box shrinks
            const revealStart = 0.2;
            const revealProgress = Math.max(0, Math.min(1, (phase4Progress - revealStart) / (1 - revealStart)));
            reveal.style.opacity = revealProgress;
        }

        function easeOutQuad(t) {
            return t * (2 - t);
        }

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', () => location.reload());

        update();
    }

    function initScrollAnimations() {
        const sections = document.querySelectorAll('.section:not(.section--prelude)');

        sections.forEach(section => {
            const content = section.querySelector('.section__content');
            if (content) content.classList.add('fade-in');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }

    function init() {
        initPreludeAnimation();
        initScrollAnimations();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
