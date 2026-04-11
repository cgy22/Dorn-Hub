// ui.js - Dorn Hub website unified UI control and animation effects

/**
 * Global UI Control Module
 * Includes: Theme switching, color management, background control, mica effects, animation effects
 * Does not include any login components
 */

(function() {
    'use strict';

    // ==================== Global Variables ====================
    let currentTheme = localStorage.getItem('theme') || 'auto';
    let currentColor = localStorage.getItem('primaryColor') || '#16DA49';
    let backgroundType = localStorage.getItem('backgroundType') || 'default';
    let showDate = localStorage.getItem('showDate') !== 'false';
    let showTime = localStorage.getItem('showTime') !== 'false';
    let animationTimer = null;

    // ==================== Initialization ====================
    document.addEventListener('DOMContentLoaded', function() {
        initTheme();
        initColor();
        initBackground();
        initDateTime();
        initScrollEffects();
        initMicaEffects();
        initAnimations();
    });

    // ==================== Theme Management ====================
    function initTheme() {
        applyTheme(currentTheme);
        setupThemeListeners();
    }

    function applyTheme(theme) {
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    function setTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('theme', theme);
        applyTheme(theme);
        dispatchThemeChange(theme);
    }

    function setupThemeListeners() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (currentTheme === 'auto') {
                applyTheme('auto');
            }
        });

        document.querySelectorAll('[data-theme]').forEach(el => {
            el.addEventListener('click', () => {
                const theme = el.getAttribute('data-theme');
                setTheme(theme);
            });
        });
    }

    // ==================== Color Management ====================
    function initColor() {
        applyColor(currentColor);
        updatePrimaryColorRGB();
        setupColorListeners();
    }

    function applyColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
        
        const elements = document.querySelectorAll('[data-color]');
        elements.forEach(el => {
            if (el.tagName === 'INPUT' && el.type === 'color') {
                el.value = color;
            }
        });

        const customColorBtn = document.getElementById('customColorBtn');
        if (customColorBtn) {
            customColorBtn.style.backgroundColor = color;
        }
    }

    function setColor(color) {
        currentColor = color;
        localStorage.setItem('primaryColor', color);
        applyColor(color);
        updatePrimaryColorRGB();
        dispatchColorChange(color);
    }

    function updatePrimaryColorRGB() {
        const hex = currentColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        document.documentElement.style.setProperty('--primary-color-rgb', `${r}, ${g}, ${b}`);
    }

    function setupColorListeners() {
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                const color = option.getAttribute('data-color');
                if (color) {
                    setColor(color);
                }
            });
        });

        const customColorInput = document.getElementById('customColorInput');
        const applyCustomColor = document.getElementById('applyCustomColor');

        if (customColorInput) {
            customColorInput.addEventListener('input', (e) => {
                const color = e.target.value;
                applyColor(color);
            });
        }

        if (applyCustomColor) {
            applyCustomColor.addEventListener('click', () => {
                if (customColorInput) {
                    setColor(customColorInput.value);
                }
            });
        }
    }

    // ==================== Background Management ====================
    function initBackground() {
        applyBackground(backgroundType);
        setupBackgroundListeners();
    }

    function applyBackground(type) {
        backgroundType = type;
        localStorage.setItem('backgroundType', type);

        const existingBgLayer = document.querySelector('.background-layer');
        if (existingBgLayer) {
            existingBgLayer.remove();
        }

        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'var(--bg-color)';

        if (type === 'none') {
            return;
        }

        const bgLayer = document.createElement('div');
        bgLayer.className = 'background-layer';

        if (type === 'random') {
            loadRandomBackground(bgLayer);
        } else if (type === 'default') {
            bgLayer.style.backgroundImage = `url('https://dornhub.eu.org/flag.jpg')`;
            document.body.appendChild(bgLayer);
        } else if (type === 'custom') {
            loadCustomBackground(bgLayer);
        }
    }

    function loadRandomBackground(bgLayer) {
        const imageSources = [
            'https://picsum.photos/1920/1080',
            'flag.jpg',
            'bg.png'
        ];
        tryLoadImage(imageSources, 0, bgLayer);
    }

    function loadCustomBackground(bgLayer) {
        const customBg = localStorage.getItem('customBackground');
        if (customBg) {
            const tempImg = new Image();
            tempImg.onload = () => {
                bgLayer.style.backgroundImage = `url('${customBg}')`;
                document.body.appendChild(bgLayer);
            };
            tempImg.src = customBg;
        }
    }

    function tryLoadImage(sources, index, bgLayer) {
        if (index >= sources.length) {
            console.warn('All background images failed to load');
            return;
        }

        const tempImg = new Image();
        tempImg.onload = () => {
            bgLayer.style.backgroundImage = `url('${sources[index]}')`;
            document.body.appendChild(bgLayer);
        };
        tempImg.onerror = () => {
            tryLoadImage(sources, index + 1, bgLayer);
        };
        tempImg.src = sources[index];
    }

    function setupBackgroundListeners() {
        document.querySelectorAll('.background-option').forEach(option => {
            option.addEventListener('click', () => {
                const bgType = option.getAttribute('data-bg');
                applyBackground(bgType);
                dispatchBackgroundChange(bgType);
            });
        });

        const applyCustomBackground = document.getElementById('applyCustomBackground');
        const customBackgroundInput = document.getElementById('customBackgroundInput');

        if (applyCustomBackground && customBackgroundInput) {
            applyCustomBackground.addEventListener('click', () => {
                const file = customBackgroundInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        localStorage.setItem('customBackground', e.target.result);
                        applyBackground('custom');
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // ==================== Date and Time ====================
    function initDateTime() {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    function updateDateTime() {
        const datetimeElement = document.getElementById('datetime');
        if (!datetimeElement) return;

        const now = new Date();
        let datetimeStr = '';

        if (showDate) {
            datetimeStr += now.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        }

        if (showDate && showTime) {
            datetimeStr += ' ';
        }

        if (showTime) {
            datetimeStr += now.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        datetimeElement.textContent = datetimeStr;
        datetimeElement.style.display = (showDate || showTime) ? 'block' : 'none';
    }

    function setDateTimeVisibility(dateVisible, timeVisible) {
        showDate = dateVisible;
        showTime = timeVisible;
        localStorage.setItem('showDate', showDate);
        localStorage.setItem('showTime', showTime);
        updateDateTime();
        
        const event = new CustomEvent('dateTimeVisibilityChanged', { 
            detail: { showDate, showTime } 
        });
        document.dispatchEvent(event);
    }
    
    function getShowDate() {
        return showDate;
    }
    
    function getShowTime() {
        return showTime;
    }

    // ==================== Scroll Effects ====================
    function initScrollEffects() {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    function handleScroll() {
        const header = document.querySelector('header');
        const container = document.querySelector('.container');

        if (!header || !container) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.classList.add('scrolled');
            container.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            container.classList.remove('scrolled');
        }
    }

    // ==================== Mica Effects ====================
    function initMicaEffects() {
        const sections = document.querySelectorAll('.section-container, .modal-content, .user-dropdown');
        sections.forEach(section => {
            if (!section.classList.contains('mica-enhanced')) {
                section.classList.add('mica-enhanced');
            }
        });

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.classList && 
                            (node.classList.contains('section-container') || 
                             node.classList.contains('modal-content') || 
                             node.classList.contains('user-dropdown'))) {
                            node.classList.add('mica-enhanced');
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // ==================== Animation Effects ====================
    function initAnimations() {
        const cards = document.querySelectorAll('.card, .pinned-card, .info-item');
        cards.forEach(card => {
            card.removeEventListener('mouseenter', handleCardHover);
            card.removeEventListener('mouseleave', handleCardLeave);
            card.addEventListener('mouseenter', handleCardHover);
            card.addEventListener('mouseleave', handleCardLeave);
        });

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.classList && 
                            (node.classList.contains('card') || 
                             node.classList.contains('pinned-card') || 
                             node.classList.contains('setting-group') || 
                             node.classList.contains('info-item'))) {
                            node.removeEventListener('mouseenter', handleCardHover);
                            node.removeEventListener('mouseleave', handleCardLeave);
                            node.addEventListener('mouseenter', handleCardHover);
                            node.addEventListener('mouseleave', handleCardLeave);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function handleCardHover(e) {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 3.2px 7.2px 0 var(--shadow-color), 0 0.6px 1.8px 0 var(--shadow-color)';
    }

    function handleCardLeave(e) {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
    }

    function bounceAnimation(element) {
        if (!element) return;

        if (animationTimer) {
            clearTimeout(animationTimer);
            animationTimer = null;
        }

        element.classList.remove('bounce-animation');
        
        void element.offsetWidth;
        
        element.classList.add('bounce-animation');

        animationTimer = setTimeout(() => {
            element.classList.remove('bounce-animation');
            animationTimer = null;
        }, 1000);
    }

    function fadeIn(element, duration = 400) {
        if (!element) return Promise.resolve();

        return new Promise(resolve => {
            element.style.animation = `fadeIn ${duration / 1000}s var(--animation-curve) forwards`;
            element.style.display = 'block';
            
            setTimeout(() => {
                element.style.animation = '';
                resolve();
            }, duration);
        });
    }

    function fadeOut(element, duration = 400) {
        if (!element) return Promise.resolve();

        return new Promise(resolve => {
            element.style.transition = `opacity ${duration / 1000}s var(--animation-curve)`;
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.display = 'none';
                element.style.opacity = '';
                element.style.transition = '';
                resolve();
            }, duration);
        });
    }

    function slideIn(element, direction = 'down', duration = 400) {
        if (!element) return Promise.resolve();

        let animationName = 'slideDown';
        if (direction === 'up') {
            animationName = 'slideUp';
        } else if (direction === 'left') {
            animationName = 'slideLeft';
        } else if (direction === 'right') {
            animationName = 'slideRight';
        }

        return new Promise(resolve => {
            element.style.animation = `${animationName} ${duration / 1000}s var(--animation-curve) forwards`;
            element.style.display = 'block';
            
            setTimeout(() => {
                element.style.animation = '';
                resolve();
            }, duration);
        });
    }

    // ==================== Notification System ====================
    function showNotification(message, type = 'info', duration = 3000) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const colors = {
            success: { bg: '#d4edda', text: '#155724' },
            error: { bg: '#f8d7da', text: '#721c24' },
            warning: { bg: '#fff3cd', text: '#856404' },
            info: { bg: '#d1ecf1', text: '#0c5460' }
        };

        const color = colors[type] || colors.info;

        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${color.bg};
            color: ${color.text};
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: "Segoe UI", sans-serif;
        `;
        
        notification.style.animation = `slideInRight var(--transition-speed) var(--animation-curve)`;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin: 0;
            line-height: 1;
            color: inherit;
        `;

        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            removeNotification(notification);
        }, duration);
        
        function removeNotification(notif) {
            if (notif.parentNode) {
                notif.style.animation = `slideOutRight var(--transition-speed) var(--animation-curve)`;
                setTimeout(() => {
                    if (notif.parentNode) {
                        notif.remove();
                    }
                }, 400);
            }
        }

        return notification;
    }

    // ==================== Event Dispatch ====================
    function dispatchThemeChange(theme) {
        const event = new CustomEvent('themeChanged', { detail: { theme } });
        document.dispatchEvent(event);
    }

    function dispatchColorChange(color) {
        const event = new CustomEvent('colorChanged', { detail: { color } });
        document.dispatchEvent(event);
    }

    function dispatchBackgroundChange(type) {
        const event = new CustomEvent('backgroundChanged', { detail: { type } });
        document.dispatchEvent(event);
    }

    // ==================== Public API ====================
    window.UI = {
        getTheme: () => currentTheme,
        setTheme: setTheme,
        applyTheme: applyTheme,
        getColor: () => currentColor,
        setColor: setColor,
        applyColor: applyColor,
        getBackground: () => backgroundType,
        setBackground: applyBackground,
        setDateTimeVisibility: setDateTimeVisibility,
        updateDateTime: updateDateTime,
        getShowDate: getShowDate,
        getShowTime: getShowTime,
        bounce: bounceAnimation,
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        slideIn: slideIn,
        notify: showNotification,
        success: (msg, duration) => showNotification(msg, 'success', duration),
        error: (msg, duration) => showNotification(msg, 'error', duration),
        warning: (msg, duration) => showNotification(msg, 'warning', duration),
        info: (msg, duration) => showNotification(msg, 'info', duration),
        handleScroll: handleScroll
    };

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideLeft {
            from { opacity: 0; transform: translateX(10px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .background-layer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
        }
        .mica-enhanced {
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
    `;
    document.head.appendChild(style);

})();
