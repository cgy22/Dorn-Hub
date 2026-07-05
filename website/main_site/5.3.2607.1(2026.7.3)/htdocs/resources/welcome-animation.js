// welcome-animation.js
// 文件位置: https://dornhub.eu.org/resources/welcome-animation.js

(function() {
    'use strict';

    const ANIMATION_VERSION = '1.0.0';
    const STORAGE_KEY = 'welcome_animation_seen';
    const VERSION_KEY = 'welcome_animation_version';

    // 检查是否需要显示欢迎动画
    function shouldShowAnimation() {
        try {
            const hasSeen = localStorage.getItem(STORAGE_KEY);
            const seenVersion = localStorage.getItem(VERSION_KEY);
            return !hasSeen || seenVersion !== ANIMATION_VERSION;
        } catch(e) {
            return true;
        }
    }

    function markAnimationComplete() {
        try {
            localStorage.setItem(STORAGE_KEY, 'true');
            localStorage.setItem(VERSION_KEY, ANIMATION_VERSION);
        } catch(e) {}
    }

    // 等待原有 loading 完全消失
    function waitForLoadingComplete() {
        return new Promise((resolve) => {
            const loadingMask = document.getElementById('loading-mask');
            if (!loadingMask || getComputedStyle(loadingMask).display === 'none') {
                resolve();
                return;
            }
            
            const observer = new MutationObserver(() => {
                if (getComputedStyle(loadingMask).display === 'none') {
                    observer.disconnect();
                    resolve();
                }
            });
            observer.observe(loadingMask, { attributes: true, attributeFilter: ['style'] });
            
            setTimeout(() => {
                observer.disconnect();
                resolve();
            }, 5000);
        });
    }

    // 获取主容器
    function getMainContainer() {
        return document.querySelector('.container');
    }

    // 获取所有需要隐藏的内容元素（基于您 HTML 的实际结构）
    function getAllContentElements() {
        const elements = [];
        
        // header
        const header = document.querySelector('header');
        if (header) elements.push(header);
        
        // 搜索容器
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) elements.push(searchContainer);
        
        // 固定网站区域
        const pinnedSection = document.getElementById('pinnedSection');
        if (pinnedSection) elements.push(pinnedSection);
        
        // 分类容器
        const categoriesContainer = document.getElementById('categoriesContainer');
        if (categoriesContainer) elements.push(categoriesContainer);
        
        // footer
        const footer = document.querySelector('footer');
        if (footer) elements.push(footer);
        
        // 所有卡片
        document.querySelectorAll('.card').forEach(el => elements.push(el));
        document.querySelectorAll('.pinned-card').forEach(el => elements.push(el));
        document.querySelectorAll('.category-header').forEach(el => elements.push(el));
        
        return elements;
    }

    // 隐藏所有内容
    function hideAllContent() {
        const elements = getAllContentElements();
        elements.forEach(el => {
            if (el) {
                el.style.setProperty('opacity', '0', 'important');
                el.style.setProperty('visibility', 'hidden', 'important');
            }
        });
    }

    // 显示所有内容
    function showAllContent() {
        const elements = getAllContentElements();
        elements.forEach(el => {
            if (el) {
                el.style.removeProperty('opacity');
                el.style.removeProperty('visibility');
            }
        });
    }

    // 获取漩涡动画元素
    function getVortexElements() {
        const elements = [];
        
        const header = document.querySelector('header');
        if (header) elements.push(header);
        
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) elements.push(searchContainer);
        
        const pinnedSection = document.getElementById('pinnedSection');
        if (pinnedSection) elements.push(pinnedSection);
        
        const footer = document.querySelector('footer');
        if (footer) elements.push(footer);
        
        document.querySelectorAll('.card').forEach(el => elements.push(el));
        document.querySelectorAll('.pinned-card').forEach(el => elements.push(el));
        document.querySelectorAll('.category-header').forEach(el => elements.push(el));
        
        return elements;
    }

    // 添加动画样式到页面
    function addAnimationStyles() {
        if (document.getElementById('welcome-animation-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'welcome-animation-styles';
        style.textContent = `
            @keyframes vortexAppearWelcome {
                0% {
                    opacity: 0;
                    transform: translate(var(--tx, 0), var(--ty, 0)) rotate(540deg) scale(0.2);
                    filter: blur(15px);
                }
                40% {
                    opacity: 0.5;
                    transform: translate(calc(var(--tx, 0) * 0.3), calc(var(--ty, 0) * 0.3)) rotate(180deg) scale(0.6);
                    filter: blur(8px);
                }
                80% {
                    opacity: 0.9;
                    transform: translate(0, 0) rotate(10deg) scale(1.02);
                    filter: blur(2px);
                }
                100% {
                    opacity: 1;
                    transform: translate(0, 0) rotate(0deg) scale(1);
                    filter: blur(0);
                }
            }
            
            .logo-container {
                transition: opacity 0.8s cubic-bezier(0.34, 1.2, 0.55, 1), transform 0.8s cubic-bezier(0.34, 1.2, 0.55, 1);
            }
            
            .dornhub-logo.pressed-welcome {
                transform: scale(0.92) !important;
                transition: transform 0.1s cubic-bezier(0.05, 0.7, 0.1, 1.0) !important;
            }
            
            .click-hint-welcome {
                text-align: center;
                margin-top: 20px;
                font-size: 18px;
                font-weight: 500;
                color: #16DA49;
                background: rgba(22, 218, 73, 0.12);
                display: inline-block;
                padding: 10px 28px;
                border-radius: 60px;
                backdrop-filter: blur(8px);
                animation: pulseGlowWelcome 1.2s infinite ease-in-out;
                cursor: pointer;
                position: relative;
                z-index: 100;
            }
            
            @keyframes pulseGlowWelcome {
                0%, 100% { opacity: 0.6; transform: scale(0.98); }
                50% { opacity: 1; transform: scale(1.05); text-shadow: 0 0 8px rgba(22, 218, 73, 0.5); }
            }
        `;
        document.head.appendChild(style);
    }

    // 显示更新弹窗
    function showUpdateModal() {
        const updateModal = document.getElementById('updateModal');
        if (!updateModal) return;
        
        const lastVisitedVersion = localStorage.getItem('lastVisitedVersion');
        const CURRENT_VERSION = '5.3.2603.8';
        
        if (lastVisitedVersion !== CURRENT_VERSION) {
            updateModal.style.display = 'flex';
            localStorage.setItem('lastVisitedVersion', CURRENT_VERSION);
        }
    }

    // 主动画
    async function startWelcomeAnimation() {
        addAnimationStyles();
        
        const mainContainer = document.querySelector('.container');
        const logoContainer = document.querySelector('.logo-container');
        const mainLogo = document.querySelector('.dornhub-logo');
        const originalClickHint = document.getElementById('clickHint');
        
        if (!mainContainer || !logoContainer || !mainLogo) {
            if (mainContainer) mainContainer.style.display = 'block';
            showAllContent();
            markAnimationComplete();
            return;
        }
        
        // 显示主容器
        mainContainer.style.display = 'block';
        
        // 隐藏所有内容
        hideAllContent();
        
        // 隐藏原有的 clickHint
        if (originalClickHint) originalClickHint.style.display = 'none';
        
        // 创建新的点击提示
        const clickHint = document.createElement('div');
        clickHint.className = 'click-hint-welcome';
        clickHint.textContent = '✨ 点击 Logo 继续 ✨';
        clickHint.style.display = 'none';
        if (logoContainer.parentNode) {
            logoContainer.parentNode.insertBefore(clickHint, logoContainer.nextSibling);
        }
        
        // 确保 Logo 可见
        logoContainer.style.visibility = 'visible';
        logoContainer.style.opacity = '0';
        logoContainer.style.transform = 'scale(0.3)';
        
        // 强制重绘
        void logoContainer.offsetHeight;
        
        // ========== 场景1: Logo 浮入 ==========
        logoContainer.style.opacity = '1';
        logoContainer.style.transform = 'scale(1)';
        
        await new Promise(r => setTimeout(r, 2000));
        
        // ========== 场景2: 等待点击 ==========
        clickHint.style.display = 'block';
        
        await new Promise((resolve) => {
            let clicked = false;
            const timeout = setTimeout(() => {
                if (!clicked) resolve();
            }, 10000);
            
            const handleClick = () => {
                if (clicked) return;
                clicked = true;
                clearTimeout(timeout);
                
                mainLogo.classList.add('pressed-welcome');
                setTimeout(() => mainLogo.classList.remove('pressed-welcome'), 150);
                
                clickHint.style.opacity = '0';
                setTimeout(() => {
                    if (clickHint.parentNode) clickHint.remove();
                }, 300);
                
                mainLogo.removeEventListener('click', handleClick);
                resolve();
            };
            
            mainLogo.addEventListener('click', handleClick);
        });
        
        // ========== 场景3: 漩涡动画 ==========
        const vortexElements = getVortexElements();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        // 显示分类容器
        const categoriesContainer = document.getElementById('categoriesContainer');
        if (categoriesContainer) {
            categoriesContainer.style.opacity = '1';
            categoriesContainer.style.visibility = 'visible';
        }
        
        // 设置漩涡起始位置
        vortexElements.forEach(el => {
            if (!el) return;
            el.style.visibility = 'visible';
            el.style.opacity = '0';
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.max(vw, vh) * 1.2;
            const startX = Math.cos(angle) * radius;
            const startY = Math.sin(angle) * radius;
            el.style.setProperty('--tx', `${startX}px`);
            el.style.setProperty('--ty', `${startY}px`);
            el.style.transform = `translate(${startX}px, ${startY}px) scale(0.2)`;
            el.style.filter = 'blur(15px)';
        });
        
        void document.body.offsetHeight;
        
        // 应用动画
        vortexElements.forEach((el, idx) => {
            if (!el) return;
            el.style.animation = `vortexAppearWelcome 1.2s cubic-bezier(0.05, 0.7, 0.1, 1.0) forwards`;
            el.style.animationDelay = `${idx * 0.06}s`;
        });
        
        await new Promise(r => setTimeout(r, 2800));
        
        // 清理
        vortexElements.forEach(el => {
            if (el) {
                el.style.animation = '';
                el.style.transform = '';
                el.style.filter = '';
                el.style.opacity = '1';
            }
        });
        
        markAnimationComplete();
        
        // 动画完成，延时1秒后显示弹窗
        setTimeout(() => {
            showUpdateModal();
        }, 1000);
    }

    // 老用户直接显示
    function showNormal() {
        const mainContainer = document.querySelector('.container');
        if (mainContainer) mainContainer.style.display = 'block';
        showAllContent();
        setTimeout(() => {
            showUpdateModal();
        }, 1000);
    }

    // 初始化
    async function init() {
        await waitForLoadingComplete();
        
        if (shouldShowAnimation()) {
            await startWelcomeAnimation();
        } else {
            showNormal();
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();