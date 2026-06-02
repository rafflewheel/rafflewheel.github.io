/* ============================================
   Header Component
   ============================================ */

(function() {
    const headerHTML = `
    <header class="site-header" id="site-header">
        <div class="header-container">
            <a href="#" class="logo" aria-label="RaffleWheel Home">
                <div class="logo-mark">
                    <svg viewBox="0 0 100 100" width="36" height="36">
                        <defs>
                            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#8b5cf6"/>
                                <stop offset="50%" stop-color="#ec4899"/>
                                <stop offset="100%" stop-color="#fbbf24"/>
                            </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="46" fill="url(#logoGrad)"/>
                        <circle cx="50" cy="50" r="36" fill="white"/>
                        <g transform="translate(50 50)">
                            <path d="M0 -32 L9.4 -9.9 L32 -9.9 L13.8 4 L20.5 26 L0 13 L-20.5 26 L-13.8 4 L-32 -9.9 L-9.4 -9.9 Z" fill="url(#logoGrad)"/>
                        </g>
                        <circle cx="50" cy="50" r="8" fill="white"/>
                        <circle cx="50" cy="50" r="4" fill="#8b5cf6"/>
                    </svg>
                </div>
                <div class="logo-text">
                    <span class="logo-name">RaffleWheel</span>
                    <span class="logo-tag">spin · pick · win</span>
                </div>
            </a>

            <nav class="main-nav" id="main-nav">
                <a href="#spin" class="nav-link">Spin</a>
                <a href="#templates" class="nav-link">Templates</a>
                <a href="#features" class="nav-link">Features</a>
                <a href="#usecases" class="nav-link">Use Cases</a>
                <a href="#faq" class="nav-link">FAQ</a>
            </nav>

            <div class="header-actions">
                <a href="#wheel-app" class="btn-spin-header">
                    <span>Spin Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>
    `;

    // Inject header into DOM
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }

    // Add header-specific styles
    const headerStyles = document.createElement('style');
    headerStyles.textContent = `
    .site-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid transparent;
        transition: all 0.3s ease;
    }

    .site-header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        border-bottom-color: var(--c-border);
        box-shadow: 0 4px 20px rgba(139, 92, 246, 0.06);
    }

    .header-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 14px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        flex-shrink: 0;
    }

    .logo-mark {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s;
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    }

    .logo:hover .logo-mark {
        transform: rotate(15deg) scale(1.05);
    }

    .logo-mark svg {
        animation: logoSpin 20s linear infinite;
    }

    @keyframes logoSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
    }

    .logo-name {
        font-size: 18px;
        font-weight: 800;
        background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #fbbf24 100%);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradientShift 6s ease infinite;
    }

    .logo-tag {
        font-size: 10px;
        color: var(--c-text-mute);
        font-weight: 600;
        letter-spacing: 0.05em;
    }

    .main-nav {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .nav-link {
        padding: 8px 14px;
        font-size: 14px;
        font-weight: 600;
        color: var(--c-text-soft);
        border-radius: 100px;
        transition: all 0.2s;
        position: relative;
    }

    .nav-link:hover {
        color: var(--c-primary);
        background: rgba(139, 92, 246, 0.08);
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .btn-spin-header {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 10px 20px;
        background: var(--gradient-primary);
        background-size: 200% 200%;
        color: white;
        border-radius: 100px;
        font-size: 13px;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35);
        transition: all 0.3s;
        animation: gradientShift 6s ease infinite;
    }

    .btn-spin-header:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.5);
    }

    .mobile-menu-btn {
        display: none;
        width: 40px;
        height: 40px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        border-radius: 10px;
        background: rgba(139, 92, 246, 0.08);
    }

    .mobile-menu-btn span {
        width: 18px;
        height: 2px;
        background: var(--c-text);
        border-radius: 2px;
        transition: all 0.3s;
    }

    .mobile-menu-btn.active span:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
    }

    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-btn.active span:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
    }

    @media (max-width: 900px) {
        .main-nav {
            position: fixed;
            top: 70px;
            left: 16px;
            right: 16px;
            flex-direction: column;
            background: white;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.15);
            gap: 8px;
            transform: translateY(-20px);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s;
        }

        .main-nav.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }

        .nav-link {
            width: 100%;
            text-align: center;
            padding: 12px;
        }

        .mobile-menu-btn {
            display: flex;
        }
    }

    @media (max-width: 480px) {
        .btn-spin-header span {
            display: none;
        }
        .btn-spin-header {
            padding: 10px 14px;
        }
        .logo-tag {
            display: none;
        }
    }
    `;
    document.head.appendChild(headerStyles);

    // Scroll behavior
    const header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('open');
        });

        // Close menu on nav link click
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                nav.classList.remove('open');
            });
        });
    }
})();
