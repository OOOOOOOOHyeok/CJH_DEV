/**
 * Product Page Interactive Effects
 * - Mouse-responsive water ripple background
 * - Hover interactions
 */

class RippleEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ripples = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastRippleTime = 0;
        this.rippleInterval = 100; // ms between ripples

        this.resize();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            const now = Date.now();
            if (now - this.lastRippleTime > this.rippleInterval) {
                this.addRipple(e.clientX, e.clientY);
                this.lastRippleTime = now;
            }
        });

        // Touch support
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;

            const now = Date.now();
            if (now - this.lastRippleTime > this.rippleInterval) {
                this.addRipple(touch.clientX, touch.clientY);
                this.lastRippleTime = now;
            }
        });
    }

    addRipple(x, y) {
        // Determine color based on which section the mouse is in
        const section = this.getSectionAtPosition(x);
        let color;

        switch (section) {
            case 'food':
                color = { r: 255, g: 107, b: 53 };
                break;
            case 'drink':
                color = { r: 139, g: 92, b: 246 };
                break;
            case 'protein':
                color = { r: 16, g: 185, b: 129 };
                break;
            default:
                color = { r: 100, g: 100, b: 255 };
        }

        this.ripples.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 250,
            opacity: 0.5,
            color: color,
            speed: 3
        });
    }

    getSectionAtPosition(x) {
        const sectionWidth = window.innerWidth / 3;
        if (x < sectionWidth) return 'food';
        if (x < sectionWidth * 2) return 'drink';
        return 'protein';
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw ripples
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const ripple = this.ripples[i];

            ripple.radius += ripple.speed;
            ripple.opacity -= 0.008;

            if (ripple.opacity <= 0) {
                this.ripples.splice(i, 1);
                continue;
            }

            // Draw multiple concentric rings for water effect
            for (let j = 0; j < 3; j++) {
                const ringRadius = ripple.radius - (j * 20);
                if (ringRadius > 0) {
                    this.ctx.beginPath();
                    this.ctx.arc(ripple.x, ripple.y, ringRadius, 0, Math.PI * 2);
                    this.ctx.strokeStyle = `rgba(${ripple.color.r}, ${ripple.color.g}, ${ripple.color.b}, ${ripple.opacity * (1 - j * 0.3)})`;
                    this.ctx.lineWidth = 2 - (j * 0.5);
                    this.ctx.stroke();
                }
            }
        }

        // Draw subtle ambient ripples
        this.drawAmbientRipples();

        requestAnimationFrame(() => this.animate());
    }

    drawAmbientRipples() {
        const time = Date.now() * 0.001;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Subtle wave effect across the screen
        for (let i = 0; i < 5; i++) {
            const radius = (time * 50 + i * 100) % 500;
            const opacity = Math.max(0, 0.05 - (radius / 500) * 0.05);

            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(100, 100, 200, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('ripple-canvas');
    if (canvas) {
        new RippleEffect(canvas);
    }

    // Add smooth section interactions
    const sections = document.querySelectorAll('.product-section');

    sections.forEach(section => {
        // Add click handler for navigation (optional)
        section.addEventListener('click', () => {
            const category = section.dataset.category;
            console.log(`Clicked on ${category} section`);

            // Add click ripple effect
            section.style.transform = 'scale(0.98)';
            setTimeout(() => {
                section.style.transform = '';
            }, 150);
        });

        // Pause rotation on hover for better viewing
        section.addEventListener('mouseenter', () => {
            const spinner = section.querySelector('.product-spinner');
            if (spinner) {
                // Don't pause, just slow down (handled in CSS)
            }
        });
    });

    // Add parallax effect to 3D spinners based on mouse position
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;

        sections.forEach(section => {
            const container = section.querySelector('.product-3d-container');
            if (container) {
                container.style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
            }
        });
    });
});
