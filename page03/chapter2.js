/**
 * Chapter 2: Creative Scroll Sections
 * UNDERSTANDING -> DESIGN -> WEBSITE
 * Features:
 * - Connecting flow line that animates between sections
 * - Asymmetric layouts alternating left/right
 * - Floating particles
 * - Smooth section transitions
 */
(function () {
    'use strict';

    // Section state
    let currentSection = 1;
    const TOTAL_SECTIONS = 3;
    const SCROLL_THRESHOLD = 120;

    // Scroll accumulator
    let scrollAccumulator = 0;
    let isTransitioning = false;

    // Touch state
    let touchStartY = 0;
    let lastTouchY = 0;
    let isTouching = false;

    // DOM Elements
    let sections = [];
    let progressDots = [];
    let progressLines = [];
    let chapter2El = null;
    let flowProgress = null;
    let flowGlow = null;

    function init() {
        chapter2El = document.getElementById('chapter2');
        sections = [
            document.getElementById('ch2Section1'),
            document.getElementById('ch2Section2'),
            document.getElementById('ch2Section3')
        ];
        progressDots = document.querySelectorAll('.ch2-progress-dot');
        progressLines = document.querySelectorAll('.ch2-progress-line');
        flowProgress = document.getElementById('flowProgress');
        flowGlow = document.querySelector('.ch2-flow-glow');

        // Create floating particles
        createParticles();

        // Mouse wheel events
        document.addEventListener('wheel', onWheel, { passive: false });

        // Touch events
        document.addEventListener('touchstart', onTouchStart, { passive: false });
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd, { passive: true });

        // Progress dot click events
        progressDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (Nav.getCurrent() === 2 && !isTransitioning) {
                    goToSection(index + 1);
                }
            });
        });

        // Show first section initially
        showSection(1);

        console.log('Chapter 2 ready: Creative sections with flow line');
    }

    function createParticles() {
        const container = document.getElementById('ch2Particles');
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'ch2-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(100, 150, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * -20}s;
            `;
            container.appendChild(particle);
        }

        // Add particle animation
        if (!document.getElementById('ch2ParticleStyles')) {
            const style = document.createElement('style');
            style.id = 'ch2ParticleStyles';
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    50% {
                        transform: translate(${Math.random() > 0.5 ? '' : '-'}50px, -100px) scale(1.2);
                    }
                    90% {
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function updateFlowLine(sectionNum) {
        if (!flowProgress || !flowGlow) return;

        // Calculate progress (33.33% per section)
        const progress = (sectionNum / TOTAL_SECTIONS) * 100;
        flowProgress.style.height = `${progress}%`;
        flowGlow.style.top = `${progress}%`;
    }

    function updateProgressIndicator(sectionNum) {
        progressDots.forEach((dot, index) => {
            const num = index + 1;
            dot.classList.remove('active', 'passed');

            if (num === sectionNum) {
                dot.classList.add('active');
            } else if (num < sectionNum) {
                dot.classList.add('passed');
            }
        });

        // Update progress lines
        progressLines.forEach((line, index) => {
            const fill = line.querySelector('.ch2-progress-fill');
            if (fill) {
                if (index < sectionNum - 1) {
                    fill.style.height = '100%';
                } else {
                    fill.style.height = '0%';
                }
            }
        });
    }

    function showSection(sectionNum) {
        sections.forEach((section, index) => {
            const num = index + 1;
            section.classList.remove('active');

            if (num === sectionNum) {
                section.classList.add('active');
            }
        });

        updateProgressIndicator(sectionNum);
        updateFlowLine(sectionNum);
        currentSection = sectionNum;
    }

    function goToSection(sectionNum) {
        if (sectionNum < 1 || sectionNum > TOTAL_SECTIONS) return;
        if (sectionNum === currentSection) return;

        isTransitioning = true;
        showSection(sectionNum);

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    function nextSection() {
        if (currentSection < TOTAL_SECTIONS) {
            goToSection(currentSection + 1);
        }
    }

    function prevSection() {
        if (currentSection > 1) {
            goToSection(currentSection - 1);
        } else {
            // Go back to Chapter 1 from first section
            scrollAccumulator = 0;
            Nav.showChapter(1);
        }
    }

    // Mouse wheel handler
    function onWheel(e) {
        if (Nav.getCurrent() !== 2) return;
        if (isTransitioning) return;
        e.preventDefault();

        chapter2El.classList.add('scrolling');
        clearTimeout(window.ch2ScrollTimeout);
        window.ch2ScrollTimeout = setTimeout(() => {
            chapter2El.classList.remove('scrolling');
        }, 500);

        if (e.deltaY > 0) {
            // Scrolling down
            scrollAccumulator += e.deltaY;
            if (scrollAccumulator >= SCROLL_THRESHOLD) {
                scrollAccumulator = 0;
                nextSection();
            }
        } else {
            // Scrolling up
            scrollAccumulator += Math.abs(e.deltaY);
            if (scrollAccumulator >= SCROLL_THRESHOLD) {
                scrollAccumulator = 0;
                prevSection();
            }
        }
    }

    // Touch handlers
    function onTouchStart(e) {
        if (Nav.getCurrent() !== 2) return;
        e.preventDefault();

        isTouching = true;
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
        scrollAccumulator = 0;
    }

    function onTouchMove(e) {
        if (Nav.getCurrent() !== 2 || !isTouching) return;
        if (isTransitioning) return;
        e.preventDefault();

        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchY - currentY; // Positive = swiping up
        lastTouchY = currentY;

        chapter2El.classList.add('scrolling');

        scrollAccumulator += Math.abs(deltaY);

        if (scrollAccumulator >= SCROLL_THRESHOLD / 2) {
            scrollAccumulator = 0;

            if (deltaY > 0) {
                // Swiping up = next section
                nextSection();
            } else {
                // Swiping down = prev section or go back
                prevSection();
            }
        }
    }

    function onTouchEnd(e) {
        if (Nav.getCurrent() !== 2) return;
        isTouching = false;
        scrollAccumulator = 0;

        clearTimeout(window.ch2ScrollTimeout);
        window.ch2ScrollTimeout = setTimeout(() => {
            chapter2El.classList.remove('scrolling');
        }, 500);
    }

    // Reset to first section when entering Chapter 2
    window.resetChapter2 = function () {
        currentSection = 1;
        scrollAccumulator = 0;
        isTransitioning = false;
        showSection(1);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
