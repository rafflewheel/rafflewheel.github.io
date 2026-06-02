/* ============================================
   Footer Component
   ============================================ */

(function() {
    const year = new Date().getFullYear();

    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-wave">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 40 C240 100 480 0 720 50 C960 100 1200 0 1440 60 L1440 100 L0 100 Z" fill="url(#footerWave)"/>
                <defs>
                    <linearGradient id="footerWave" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#8b5cf6"/>
                        <stop offset="50%" stop-color="#ec4899"/>
                        <stop offset="100%" stop-color="#fbbf24"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>

        <div class="footer-main">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <a href="#" class="logo">
                            <div class="logo-mark">
                                <svg viewBox="0 0 100 100" width="40" height="40">
                                    <circle cx="50" cy="50" r="46" fill="url(#footerLogoGrad)"/>
                                    <circle cx="50" cy="50" r="36" fill="white"/>
                                    <g transform="translate(50 50)">
                                        <path d="M0 -32 L9.4 -9.9 L32 -9.9 L13.8 4 L20.5 26 L0 13 L-20.5 26 L-13.8 4 L-32 -9.9 L-9.4 -9.9 Z" fill="url(#footerLogoGrad)"/>
                                    </g>
                                    <circle cx="50" cy="50" r="8" fill="white"/>
                                    <circle cx="50" cy="50" r="4" fill="#8b5cf6"/>
                                    <defs>
                                        <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#8b5cf6"/>
                                            <stop offset="50%" stop-color="#ec4899"/>
                                            <stop offset="100%" stop-color="#fbbf24"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div class="logo-text">
                                <span class="logo-name">RaffleWheel</span>
                                <span class="logo-tag">spin · pick · win</span>
                            </div>
                        </a>
                        <p class="footer-tagline">
                            The most colorful, free online <strong>spin the wheel</strong> tool. Create custom
                            <strong>raffle wheels</strong>, run <strong>giveaway</strong> draws, and pick
                            <strong>random winners</strong> in seconds.
                        </p>
                        <div class="footer-socials">
                            <a href="#" class="social-link" aria-label="Twitter">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-link" aria-label="Facebook">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-link" aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-link" aria-label="GitHub">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div class="footer-col">
                        <h4>Product</h4>
                        <ul>
                            <li><a href="#wheel-app">Spin The Wheel</a></li>
                            <li><a href="#templates">Templates</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#customize">Customization</a></li>
                            <li><a href="#tips">Pro Tips</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Use Cases</h4>
                        <ul>
                            <li><a href="#usecases">Classroom Picker</a></li>
                            <li><a href="#usecases">Giveaway Wheel</a></li>
                            <li><a href="#usecases">Prize Wheel</a></li>
                            <li><a href="#usecases">Decision Maker</a></li>
                            <li><a href="#usecases">Game Night</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#how">How It Works</a></li>
                            <li><a href="#spin">Quick Start</a></li>
                            <li><a href="#" id="export-btn">Export Wheel</a></li>
                            <li><a href="#" id="import-btn">Import Wheel</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Stay In The Loop</h4>
                        <p class="footer-newsletter">Get notified about new wheel templates and features.</p>
                        <form class="newsletter-form" onsubmit="event.preventDefault(); this.querySelector('button').textContent='Subscribed ✓'; this.querySelector('button').style.background='#10b981';">
                            <input type="email" placeholder="your@email.com" required class="newsletter-input">
                            <button type="submit" class="newsletter-btn">Join</button>
                        </form>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-bottom-left">
                        <p>© ${year} RaffleWheel · All rights reserved.</p>
                    </div>
                    <div class="footer-bottom-right">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
        </div>

        <input type="file" id="import-file" accept=".json" style="display:none">
    </footer>
    `;

    // Inject footer into DOM
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }

    // Add footer-specific styles
    const footerStyles = document.createElement('style');
    footerStyles.textContent = `
    .site-footer {
        margin-top: 0;
        position: relative;
    }

    .footer-wave {
        line-height: 0;
        margin-bottom: -1px;
    }

    .footer-wave svg {
        display: block;
        width: 100%;
        height: 80px;
    }

    .footer-main {
        background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
        color: #d1d5db;
        padding: 60px 0 30px;
    }

    .footer-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr 1.3fr;
        gap: 40px;
        margin-bottom: 40px;
    }

    .footer-brand .logo {
        margin-bottom: 16px;
    }

    .footer-brand .logo-name {
        color: white;
        -webkit-text-fill-color: white;
        background: none;
    }

    .footer-tagline {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 20px;
        color: #9ca3af;
    }

    .footer-tagline strong {
        color: #fbbf24;
    }

    .footer-socials {
        display: flex;
        gap: 8px;
    }

    .social-link {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,0.05);
        color: #d1d5db;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        border: 1px solid rgba(255,255,255,0.1);
    }

    .social-link:hover {
        background: var(--gradient-primary);
        background-size: 200% 200%;
        color: white;
        transform: translateY(-3px);
        animation: gradientShift 3s ease infinite;
        border-color: transparent;
    }

    .footer-col h4 {
        color: white;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .footer-col ul {
        list-style: none;
        padding: 0;
    }

    .footer-col li {
        margin-bottom: 8px;
    }

    .footer-col a {
        color: #9ca3af;
        font-size: 14px;
        transition: color 0.2s;
        display: inline-block;
    }

    .footer-col a:hover {
        color: #fbbf24;
        transform: translateX(4px);
    }

    .footer-newsletter {
        font-size: 13px;
        color: #9ca3af;
        margin-bottom: 12px;
    }

    .newsletter-form {
        display: flex;
        gap: 8px;
    }

    .newsletter-input {
        flex: 1;
        padding: 10px 14px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 100px;
        color: white;
        font-size: 13px;
        font-family: inherit;
        outline: none;
        min-width: 0;
    }

    .newsletter-input::placeholder {
        color: #6b7280;
    }

    .newsletter-input:focus {
        border-color: #8b5cf6;
        background: rgba(255,255,255,0.08);
    }

    .newsletter-btn {
        padding: 10px 20px;
        background: var(--gradient-primary);
        background-size: 200% 200%;
        color: white;
        border-radius: 100px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s;
        animation: gradientShift 6s ease infinite;
        border: none;
    }

    .newsletter-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
    }

    .footer-bottom {
        padding-top: 30px;
        border-top: 1px solid rgba(255,255,255,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
    }

    .footer-bottom p {
        font-size: 13px;
        color: #9ca3af;
    }

    .footer-bottom-right {
        display: flex;
        gap: 20px;
    }

    .footer-bottom-right a {
        font-size: 13px;
        color: #9ca3af;
        transition: color 0.2s;
    }

    .footer-bottom-right a:hover {
        color: #fbbf24;
    }

    @media (max-width: 900px) {
        .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
        }
        .footer-brand {
            grid-column: span 2;
        }
    }

    @media (max-width: 600px) {
        .footer-grid {
            grid-template-columns: 1fr;
        }
        .footer-brand {
            grid-column: span 1;
        }
        .footer-bottom {
            flex-direction: column;
            text-align: center;
        }
    }
    `;
    document.head.appendChild(footerStyles);
})();
