/* ============================================
   RaffleWheel - Main Application Logic
   Spin The Wheel Interactive Experience
   ============================================ */

(function() {
    // ============================================
    // DOM Elements
    // ============================================
    let wheel = null;
    let currentEntries = [];
    let currentTheme = 'rainbow';
    let isSoundEnabled = true;
    let isConfettiEnabled = true;
    let isRemoveWinnerEnabled = false;

    // DOM References (populated after ready)
    let entriesListEl, addEntryBtn, clearEntriesBtn, resetWheelBtn;
    let spinBtn, lastResultEl, centerTitleInput;
    let themeSwatches;
    let soundToggle, confettiToggle, removeWinnerToggle, spinDurationSelect;
    let modal, modalWinner, modalSpinAgain, modalClose, modalEmoji;
    let confettiCanvas, confettiCtx;
    let templatesGrid;

    // Sound elements
    let tickSound, winSound;

    // ============================================
    // Initialize Audio
    // ============================================
    function initAudio() {
        // Create audio contexts lazily (browser policy)
        try {
            tickSound = new Audio();
            tickSound.src = 'data:audio/wav;base64,U3RlYWx0aCBzb3VuZCByZXBsYWNlbWVudCBmb3IgdGljayAtIHVzZSBzaWxlbmNl';
            // Fallback - if audio can't load, just silently fail
            tickSound.volume = 0.3;
            
            winSound = new Audio();
            winSound.src = 'data:audio/wav;base64,U3RlYWx0aCBzb3VuZCByZXBsYWNlbWVudCBmb3Igd2luIC0gc2lsZW5jZQ==';
            winSound.volume = 0.5;
        } catch(e) {
            console.log('Audio not supported');
        }
        
        // Simple beep using Web Audio for tick (more reliable)
        window.tickSound = {
            play: function() {
                if (!isSoundEnabled) return Promise.resolve();
                try {
                    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    oscillator.frequency.value = 880;
                    gainNode.gain.value = 0.1;
                    oscillator.start();
                    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
                    oscillator.stop(audioCtx.currentTime + 0.1);
                    setTimeout(() => audioCtx.close(), 200);
                } catch(e) {}
                return Promise.resolve();
            }
        };
        
        window.winSound = {
            play: function() {
                if (!isSoundEnabled) return;
                try {
                    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    oscillator.frequency.value = 523.25;
                    gainNode.gain.value = 0.15;
                    oscillator.start();
                    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1);
                    oscillator.stop(audioCtx.currentTime + 1);
                    setTimeout(() => audioCtx.close(), 1200);
                } catch(e) {}
            }
        };
    }

    // ============================================
    // Confetti System
    // ============================================
    function initConfetti() {
        confettiCanvas = document.getElementById('confetti-canvas');
        if (!confettiCanvas) return;
        confettiCtx = confettiCanvas.getContext('2d');
        
        function resizeConfetti() {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeConfetti);
        resizeConfetti();
        
        window.confetti = {
            particles: [],
            active: false,
            
            burst: function() {
                if (!isConfettiEnabled) return;
                this.active = true;
                const count = 120;
                for (let i = 0; i < count; i++) {
                    this.particles.push({
                        x: Math.random() * confettiCanvas.width,
                        y: -20,
                        size: Math.random() * 8 + 4,
                        speedX: (Math.random() - 0.5) * 6,
                        speedY: Math.random() * 8 + 5,
                        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                        rotation: Math.random() * 360,
                        spin: (Math.random() - 0.5) * 15,
                        gravity: 0.2 + Math.random() * 0.2
                    });
                }
                if (!this.animationFrame) {
                    this.animate();
                }
                setTimeout(() => {
                    if (this.particles.length === 0) this.active = false;
                }, 3000);
            },
            
            animate: function() {
                if (!confettiCtx) return;
                confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
                let stillActive = false;
                
                for (let i = 0; i < window.confetti.particles.length; i++) {
                    const p = window.confetti.particles[i];
                    p.x += p.speedX;
                    p.y += p.speedY;
                    p.speedY += p.gravity;
                    p.rotation += p.spin;
                    
                    confettiCtx.save();
                    confettiCtx.translate(p.x, p.y);
                    confettiCtx.rotate(p.rotation * Math.PI / 180);
                    confettiCtx.fillStyle = p.color;
                    confettiCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size/2);
                    confettiCtx.restore();
                    
                    if (p.y < confettiCanvas.height + 50 && p.x > -50 && p.x < confettiCanvas.width + 50) {
                        stillActive = true;
                    }
                }
                
                window.confetti.particles = window.confetti.particles.filter(p => 
                    p.y < confettiCanvas.height + 100 && p.x > -100 && p.x < confettiCanvas.width + 100
                );
                
                if (stillActive && window.confetti.particles.length > 0) {
                    window.confetti.animationFrame = requestAnimationFrame(() => window.confetti.animate());
                } else {
                    window.confetti.animationFrame = null;
                    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
                }
            }
        };
    }

    // ============================================
    // Entries Management
    // ============================================
    function renderEntriesList() {
        if (!entriesListEl) return;
        entriesListEl.innerHTML = '';
        
        currentEntries.forEach((entry, idx) => {
            const row = document.createElement('div');
            row.className = 'entry-row';
            row.innerHTML = `
                <div class="entry-color" style="background: ${entry.color}" data-index="${idx}"></div>
                <input type="text" class="entry-input" value="${escapeHtml(entry.text)}" data-index="${idx}">
                <button class="entry-remove" data-index="${idx}">✕</button>
            `;
            entriesListEl.appendChild(row);
        });
        
        // Attach event listeners
        document.querySelectorAll('.entry-color').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(el.dataset.index);
                const colorPicker = document.createElement('input');
                colorPicker.type = 'color';
                colorPicker.value = currentEntries[idx].color;
                colorPicker.addEventListener('change', (e) => {
                    currentEntries[idx].color = e.target.value;
                    renderEntriesList();
                    updateWheel();
                });
                colorPicker.click();
            });
        });
        
        document.querySelectorAll('.entry-input').forEach(el => {
            el.addEventListener('change', (e) => {
                const idx = parseInt(el.dataset.index);
                currentEntries[idx].text = e.target.value;
                updateWheel();
                saveToLocalStorage();
            });
        });
        
        document.querySelectorAll('.entry-remove').forEach(el => {
            el.addEventListener('click', (e) => {
                const idx = parseInt(el.dataset.index);
                currentEntries.splice(idx, 1);
                if (currentEntries.length === 0) {
                    currentEntries = [{ text: 'Add Entry', color: '#8b5cf6' }];
                }
                renderEntriesList();
                updateWheel();
                saveToLocalStorage();
            });
        });
    }
    
    function addEntry() {
        const newColor = getRandomColor();
        currentEntries.push({ text: 'New Option', color: newColor });
        renderEntriesList();
        updateWheel();
        saveToLocalStorage();
    }
    
    function clearEntries() {
        if (confirm('Clear all entries? This cannot be undone.')) {
            currentEntries = [
                { text: 'Option 1', color: '#8b5cf6' },
                { text: 'Option 2', color: '#ec4899' },
                { text: 'Option 3', color: '#fbbf24' },
                { text: 'Option 4', color: '#3b82f6' }
            ];
            renderEntriesList();
            updateWheel();
            saveToLocalStorage();
        }
    }
    
    function getRandomColor() {
        const colors = ['#8b5cf6', '#ec4899', '#fbbf24', '#3b82f6', '#10b981', '#f97316', '#06b6d4', '#a855f7'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function updateWheel() {
        if (!wheel) return;
        wheel.setEntries(currentEntries);
        const centerTitle = centerTitleInput ? centerTitleInput.value : 'SPIN!';
        wheel.setCenterTitle(centerTitle);
    }
    
    function applyTheme(themeName) {
        currentTheme = themeName;
        const themeColors = COLOR_THEMES[themeName] || COLOR_THEMES.rainbow;
        
        // Assign colors to entries cyclically
        currentEntries.forEach((entry, idx) => {
            entry.color = themeColors[idx % themeColors.length];
        });
        
        renderEntriesList();
        updateWheel();
        saveToLocalStorage();
        
        // Update active swatch
        document.querySelectorAll('.theme-swatch').forEach(swatch => {
            swatch.classList.remove('active');
            if (swatch.dataset.theme === themeName) {
                swatch.classList.add('active');
            }
        });
    }
    
    function resetWheel() {
        if (confirm('Reset to default template? All custom entries will be lost.')) {
            loadTemplateById('classroom');
        }
    }
    
    // ============================================
    // Template System
    // ============================================
    function loadTemplateById(templateId) {
        const template = WHEEL_TEMPLATES.find(t => t.id === templateId);
        if (!template) return;
        
        currentEntries = JSON.parse(JSON.stringify(template.entries));
        currentTheme = template.theme || 'rainbow';
        
        // Apply theme colors
        const themeColors = COLOR_THEMES[currentTheme] || COLOR_THEMES.rainbow;
        currentEntries.forEach((entry, idx) => {
            entry.color = themeColors[idx % themeColors.length];
        });
        
        if (centerTitleInput) {
            centerTitleInput.value = template.centerTitle || 'SPIN!';
        }
        
        renderEntriesList();
        updateWheel();
        applyTheme(currentTheme);
        saveToLocalStorage();
        
        // Scroll to wheel
        document.getElementById('wheel-app')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    function renderTemplates() {
        if (!templatesGrid) return;
        templatesGrid.innerHTML = '';
        
        WHEEL_TEMPLATES.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.style.setProperty('--card-color', template.color);
            card.innerHTML = `
                <div class="template-icon" style="background: ${template.color}">${template.icon}</div>
                <div class="template-name">${escapeHtml(template.name)}</div>
                <div class="template-desc">${escapeHtml(template.desc)}</div>
                <div class="template-entries">${template.entries.length} options</div>
            `;
            card.addEventListener('click', () => loadTemplateById(template.id));
            templatesGrid.appendChild(card);
        });
    }
    
    // ============================================
    // Spin Logic
    // ============================================
    async function handleSpin() {
        if (!wheel || wheel.isSpinning) return;
        
        spinBtn.disabled = true;
        lastResultEl.textContent = '🎡 Spinning...';
        
        try {
            const result = await wheel.spin();
            
            if (result && result.entry) {
                lastResultEl.innerHTML = `✨ Winner: <strong>${escapeHtml(result.entry.text)}</strong> ✨`;
                
                // Sound and confetti
                if (isSoundEnabled && window.winSound) {
                    window.winSound.play();
                }
                if (isConfettiEnabled && window.confetti) {
                    window.confetti.burst();
                }
                
                // Show modal
                showWinnerModal(result.entry.text);
                
                // Remove winner if enabled
                if (isRemoveWinnerEnabled) {
                    currentEntries = currentEntries.filter((_, idx) => idx !== result.index);
                    if (currentEntries.length === 0) {
                        currentEntries = [{ text: 'Game Over!', color: '#8b5cf6' }];
                    }
                    renderEntriesList();
                    updateWheel();
                    saveToLocalStorage();
                }
            }
        } catch (err) {
            console.error('Spin error:', err);
            lastResultEl.textContent = '❌ Spin failed, try again';
        } finally {
            spinBtn.disabled = false;
        }
    }
    
    function showWinnerModal(winnerText) {
        if (!modal || !modalWinner) return;
        
        // Random emoji for fun
        const emojis = ['🎉', '🏆', '⭐', '🎊', '✨', '🎈', '💎', '🔥', '👑', '🎯'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        if (modalEmoji) modalEmoji.textContent = randomEmoji;
        
        modalWinner.textContent = winnerText;
        modal.setAttribute('aria-hidden', 'false');
    }
    
    function closeModal() {
        if (modal) modal.setAttribute('aria-hidden', 'true');
    }
    
    // ============================================
    // Save/Load State
    // ============================================
    function saveToLocalStorage() {
        const state = {
            entries: currentEntries,
            theme: currentTheme,
            centerTitle: centerTitleInput ? centerTitleInput.value : 'SPIN!',
            soundEnabled: isSoundEnabled,
            confettiEnabled: isConfettiEnabled,
            removeWinnerEnabled: isRemoveWinnerEnabled,
            spinDuration: spinDurationSelect ? spinDurationSelect.value : '5'
        };
        localStorage.setItem('rafflewheel_state', JSON.stringify(state));
    }
    
    function loadFromLocalStorage() {
        const saved = localStorage.getItem('rafflewheel_state');
        if (!saved) return false;
        
        try {
            const state = JSON.parse(saved);
            if (state.entries && state.entries.length) {
                currentEntries = state.entries;
            }
            if (state.theme) currentTheme = state.theme;
            if (centerTitleInput && state.centerTitle) centerTitleInput.value = state.centerTitle;
            if (soundToggle) {
                isSoundEnabled = state.soundEnabled !== undefined ? state.soundEnabled : true;
                soundToggle.checked = isSoundEnabled;
            }
            if (confettiToggle) {
                isConfettiEnabled = state.confettiEnabled !== undefined ? state.confettiEnabled : true;
                confettiToggle.checked = isConfettiEnabled;
            }
            if (removeWinnerToggle) {
                isRemoveWinnerEnabled = state.removeWinnerEnabled || false;
                removeWinnerToggle.checked = isRemoveWinnerEnabled;
            }
            if (spinDurationSelect && state.spinDuration) {
                spinDurationSelect.value = state.spinDuration;
            }
            
            renderEntriesList();
            updateWheel();
            applyTheme(currentTheme);
            return true;
        } catch(e) {
            console.warn('Failed to load saved state', e);
            return false;
        }
    }
    
    // ============================================
    // Tab System
    // ============================================
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const panels = document.querySelectorAll('.tab-panel');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                panels.forEach(panel => {
                    if (panel.dataset.panel === tabId) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // ============================================
    // FAQ Accordion
    // ============================================
    function initFaq() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }
    
    // ============================================
    // Keyboard Shortcuts
    // ============================================
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !e.target.matches('input, textarea, button')) {
                e.preventDefault();
                if (!wheel?.isSpinning) handleSpin();
            }
            if (e.code === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                if (confirm('Remove last winner?')) {
                    // Optional: remove last winner functionality
                }
            }
        });
    }
    
    // ============================================
    // Export/Import
    // ============================================
    function initExportImport() {
        const exportBtn = document.getElementById('export-btn');
        const importBtn = document.getElementById('import-btn');
        const importFile = document.getElementById('import-file');
        
        if (exportBtn) {
            exportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const exportData = {
                    entries: currentEntries,
                    theme: currentTheme,
                    centerTitle: centerTitleInput ? centerTitleInput.value : 'SPIN!'
                };
                const dataStr = JSON.stringify(exportData, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `rafflewheel-${Date.now()}.json`;
                a.click();
                URL.revokeObjectURL(url);
            });
        }
        
        if (importBtn && importFile) {
            importBtn.addEventListener('click', (e) => {
                e.preventDefault();
                importFile.click();
            });
            
            importFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const data = JSON.parse(ev.target.result);
                        if (data.entries) currentEntries = data.entries;
                        if (data.theme) currentTheme = data.theme;
                        if (data.centerTitle && centerTitleInput) centerTitleInput.value = data.centerTitle;
                        renderEntriesList();
                        updateWheel();
                        applyTheme(currentTheme);
                        saveToLocalStorage();
                        alert('Wheel imported successfully!');
                    } catch(err) {
                        alert('Invalid wheel file');
                    }
                };
                reader.readAsText(file);
                importFile.value = '';
            });
        }
    }
    
    // ============================================
    // Scroll Animations
    // ============================================
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.feature-card, .step-card, .usecase-card, .tip-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // ============================================
    // Helper Functions
    // ============================================
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }
    
    // ============================================
    // Initialize Everything
    // ============================================
    function init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp();
        }
    }
    
    function initApp() {
        // Get DOM elements
        entriesListEl = document.getElementById('entries-list');
        addEntryBtn = document.getElementById('add-entry');
        clearEntriesBtn = document.getElementById('clear-entries');
        resetWheelBtn = document.getElementById('reset-wheel');
        spinBtn = document.getElementById('spin-btn');
        lastResultEl = document.getElementById('last-result');
        centerTitleInput = document.getElementById('center-title');
        themeSwatches = document.querySelectorAll('.theme-swatch');
        soundToggle = document.getElementById('sound-toggle');
        confettiToggle = document.getElementById('confetti-toggle');
        removeWinnerToggle = document.getElementById('remove-winner-toggle');
        spinDurationSelect = document.getElementById('spin-duration');
        templatesGrid = document.getElementById('templates-grid');
        modal = document.getElementById('winner-modal');
        modalWinner = document.getElementById('modal-winner');
        modalSpinAgain = document.getElementById('modal-spin-again');
        modalClose = document.getElementById('modal-close');
        modalEmoji = document.getElementById('modal-emoji');
        
        // Initialize default entries if needed
        if (!currentEntries.length) {
            currentEntries = [
                { text: 'Yes', color: '#8b5cf6' },
                { text: 'No', color: '#ec4899' },
                { text: 'Maybe', color: '#fbbf24' },
                { text: 'Try Again', color: '#3b82f6' }
            ];
        }
        
        // Initialize audio and confetti
        initAudio();
        initConfetti();
        
        // Create wheel instance
        wheel = new SpinWheel('wheel-canvas', { entries: currentEntries });
        
        // Load saved state or default
        const hasSaved = loadFromLocalStorage();
        if (!hasSaved) {
            renderEntriesList();
            updateWheel();
            applyTheme('rainbow');
        }
        
        // Set up event listeners
        if (addEntryBtn) addEntryBtn.addEventListener('click', addEntry);
        if (clearEntriesBtn) clearEntriesBtn.addEventListener('click', clearEntries);
        if (resetWheelBtn) resetWheelBtn.addEventListener('click', resetWheel);
        if (spinBtn) spinBtn.addEventListener('click', handleSpin);
        if (centerTitleInput) centerTitleInput.addEventListener('input', () => {
            if (wheel) wheel.setCenterTitle(centerTitleInput.value);
            saveToLocalStorage();
        });
        
        if (themeSwatches) {
            themeSwatches.forEach(swatch => {
                swatch.addEventListener('click', () => {
                    applyTheme(swatch.dataset.theme);
                });
            });
        }
        
        if (soundToggle) {
            soundToggle.addEventListener('change', (e) => {
                isSoundEnabled = e.target.checked;
                saveToLocalStorage();
            });
        }
        
        if (confettiToggle) {
            confettiToggle.addEventListener('change', (e) => {
                isConfettiEnabled = e.target.checked;
                saveToLocalStorage();
            });
        }
        
        if (removeWinnerToggle) {
            removeWinnerToggle.addEventListener('change', (e) => {
                isRemoveWinnerEnabled = e.target.checked;
                saveToLocalStorage();
            });
        }
        
        if (spinDurationSelect) {
            spinDurationSelect.addEventListener('change', () => saveToLocalStorage());
        }
        
        // Modal events
        if (modalSpinAgain) {
            modalSpinAgain.addEventListener('click', () => {
                closeModal();
                handleSpin();
            });
        }
        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                    closeModal();
                }
            });
        }
        
        // Additional features
        renderTemplates();
        initTabs();
        initFaq();
        initKeyboardShortcuts();
        initExportImport();
        initScrollAnimations();
        
        // Enable tick sound on wheel
        if (wheel) wheel.tickEnabled = true;
        
        // Force initial draw
        setTimeout(() => {
            if (wheel) wheel.draw();
        }, 100);
        
        console.log('RaffleWheel initialized!');
    }
    
    // Start the app
    init();
})();
