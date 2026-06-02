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
                        <a href="/" class="logo">
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
                    </div>

                    <div class="footer-col">
                        <h4>Product</h4>
                        <ul>
                            <li><a href="/#wheel-app">Spin The Wheel</a></li>
                            <li><a href="/#templates">Templates</a></li>
                            <li><a href="/#features">Features</a></li>
                            <li><a href="/#customize">Customization</a></li>
                            <li><a href="/#tips">Pro Tips</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Use Cases</h4>
                        <ul>
                            <li><a href="/#usecases">Classroom Picker</a></li>
                            <li><a href="/#usecases">Giveaway Wheel</a></li>
                            <li><a href="/#usecases">Prize Wheel</a></li>
                            <li><a href="/#usecases">Decision Maker</a></li>
                            <li><a href="/#usecases">Game Night</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="/#faq">FAQ</a></li>
                            <li><a href="/#how">How It Works</a></li>
                            <li><a href="/#spin">Quick Start</a></li>
                            <li><a href="/#" id="export-btn">Export Wheel</a></li>
                            <li><a href="/#" id="import-btn">Import Wheel</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Pages</h4>
                        <ul>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/cookies">Cookies Policy</a></li>                            
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-bottom-left">
                        <p>© ${year} RaffleWheel · All rights reserved.</p>
                    </div>
                    <div class="footer-bottom-right">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Use</a>                        
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
