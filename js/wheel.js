/* ============================================
   Wheel Core - Canvas-based spinning wheel
   ============================================ */

class SpinWheel {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.container = this.canvas.parentElement;
        this.centerEl = document.getElementById('wheel-center');

        this.entries = options.entries || [
            { text: 'Yes', color: '#8b5cf6' },
            { text: 'No', color: '#ec4899' },
            { text: 'Maybe', color: '#fbbf24' },
            { text: 'Try Again', color: '#3b82f6' }
        ];

        this.currentRotation = 0;
        this.isSpinning = false;
        this.centerTitle = 'SPIN!';

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        const size = Math.min(rect.width, 580);
        const dpr = window.devicePixelRatio || 1;

        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';

        this.size = size;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);

        this.draw();
    }

    setEntries(entries) {
        this.entries = entries.filter(e => e.text && e.text.trim().length > 0);
        if (this.entries.length < 2) {
            this.entries = [
                { text: 'Add', color: '#8b5cf6' },
                { text: 'Entries', color: '#ec4899' }
            ];
        }
        this.draw();
    }

    setCenterTitle(title) {
        this.centerTitle = title;
        if (this.centerEl) this.centerEl.textContent = title;
    }

    draw() {
        if (!this.ctx || !this.entries.length) return;

        const ctx = this.ctx;
        const cx = this.size / 2;
        const cy = this.size / 2;
        const radius = this.size / 2 - 6;

        ctx.clearRect(0, 0, this.size, this.size);

        const numSlices = this.entries.length;
        const arc = (2 * Math.PI) / numSlices;

        // Draw slices
        this.entries.forEach((entry, i) => {
            const startAngle = i * arc - Math.PI / 2;
            const endAngle = startAngle + arc;

            // Main slice
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = entry.color;
            ctx.fill();

            // Slice border
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Decorative inner ring gradient
            const grad = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius);
            grad.addColorStop(0, 'rgba(255,255,255,0)');
            grad.addColorStop(0.7, 'rgba(255,255,255,0)');
            grad.addColorStop(1, 'rgba(0,0,0,0.1)');
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();

            // Text
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(startAngle + arc / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${this.getFontSize()}px "Plus Jakarta Sans", system-ui, sans-serif`;
            ctx.shadowColor = 'rgba(0,0,0,0.4)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;

            const text = entry.text;
            const maxWidth = radius * 0.65;
            const truncated = this.truncateText(ctx, text, maxWidth);
            ctx.fillText(truncated, radius - 14, 0);
            ctx.restore();
        });

        // Outer decorative ring
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Inner glow ring
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.18, 0, 2 * Math.PI);
        const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.18);
        innerGrad.addColorStop(0, 'rgba(255,255,255,0.9)');
        innerGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = innerGrad;
        ctx.fill();
    }

    getFontSize() {
        const numSlices = this.entries.length;
        if (numSlices <= 4) return 26;
        if (numSlices <= 6) return 22;
        if (numSlices <= 8) return 18;
        if (numSlices <= 12) return 14;
        return 12;
    }

    truncateText(ctx, text, maxWidth) {
        if (ctx.measureText(text).width <= maxWidth) return text;
        let truncated = text;
        while (truncated.length > 0 && ctx.measureText(truncated + '…').width > maxWidth) {
            truncated = truncated.slice(0, -1);
        }
        return truncated + '…';
    }

    spin(targetIndex = null) {
        if (this.isSpinning || this.entries.length < 2) return Promise.resolve(null);

        return new Promise((resolve) => {
            this.isSpinning = true;
            this.container.classList.add('spinning');

            // Determine target
            let winnerIndex;
            if (targetIndex !== null && targetIndex >= 0 && targetIndex < this.entries.length) {
                winnerIndex = targetIndex;
            } else {
                winnerIndex = Math.floor(Math.random() * this.entries.length);
            }

            const numSlices = this.entries.length;
            const sliceAngle = 360 / numSlices;
            const targetAngle = (360 - (winnerIndex * sliceAngle + sliceAngle / 2));

            // Random extra rotations (5-8 full turns) for visual drama
            const extraSpins = 5 + Math.floor(Math.random() * 3);
            const currentNormalized = ((this.currentRotation % 360) + 360) % 360;
            const totalRotation = (extraSpins * 360) + (targetAngle - currentNormalized);

            const startTime = performance.now();
            const startRotation = this.currentRotation;
            const targetRotation = startRotation + totalRotation;
            const duration = parseInt(document.getElementById('spin-duration')?.value || 5) * 1000;

            // Easing function - cubic ease-out
            const easeOut = (t) => 1 - Math.pow(1 - t, 4);

            const animate = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOut(progress);

                this.currentRotation = startRotation + (targetRotation - startRotation) * easedProgress;
                this.canvas.style.transform = `rotate(${this.currentRotation}deg)`;

                // Play tick sound at slice boundaries
                if (progress < 1) {
                    this.playTick();
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.currentRotation = ((this.currentRotation % 360) + 360) % 360;
                    this.canvas.style.transform = `rotate(${this.currentRotation}deg)`;
                    this.isSpinning = false;
                    this.container.classList.remove('spinning');
                    resolve({
                        index: winnerIndex,
                        entry: this.entries[winnerIndex]
                    });
                }
            };

            requestAnimationFrame(animate);
        });
    }

    lastTickTime = 0;
    playTick() {
        if (!this.tickEnabled) return;
        const now = performance.now();
        if (now - this.lastTickTime < 80) return;
        this.lastTickTime = now;
        if (window.tickSound) {
            try {
                window.tickSound.currentTime = 0;
                window.tickSound.play().catch(() => {});
            } catch (e) {}
        }
    }

    highlightWinner(index) {
        // Visual flash effect on winner
        const ctx = this.ctx;
        const numSlices = this.entries.length;
        const arc = (2 * Math.PI) / numSlices;
        const startAngle = index * arc - Math.PI / 2;
        const endAngle = startAngle + arc;
        const cx = this.size / 2;
        const cy = this.size / 2;
        const radius = this.size / 2 - 6;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
        ctx.restore();
    }
}

// Expose to window
window.SpinWheel = SpinWheel;
