// ui.js - 统一UI控制与动画效果
// 文件位置: https://dornhub.eu.org/resources/ui.js

/**
 * 全局UI控制模块
 * 包含: 主题切换、颜色管理、背景控制、云母效果、动画效果
 * 不包含任何登录组件
 */

(function() {
    'use strict';

    // ==================== HDR 触发器 ====================
    // 在页面中注入隐藏的 HDR 图片，触发 Chrome 的 HDR 渲染模式
    (function injectHDRTrigger() {
        // 避免重复注入
        if (document.querySelector('.hdr-trigger')) return;

        const img = document.createElement('img');
        img.className = 'hdr-trigger';
        img.src = 'https://dornhub.eu.org/resources/images/avif-hdr-pq.avif';
        img.alt = '';
        img.loading = 'eager';
        img.decoding = 'async';
        img.style.cssText = [
            'position:fixed',
            'width:1px',
            'height:1px',
            'opacity:0.001',
            'pointer-events:none',
            'z-index:-9999',
            'top:0',
            'left:0'
        ].join(';');

        document.body.prepend(img);
    })();

    // ==================== 全局变量 ====================
    let currentTheme = localStorage.getItem('theme') || 'auto';
    let currentColor = localStorage.getItem('primaryColor') || '#16DA49';
    let backgroundType = localStorage.getItem('backgroundType') || 'default';
    let showDate = localStorage.getItem('showDate') !== 'false';
    let showTime = localStorage.getItem('showTime') !== 'false';
    let animationTimer = null;

    // 存储每个文件夹的展开状态
    const folderStates = new Map();

    // ==================== 初始化 ====================
    document.addEventListener('DOMContentLoaded', function() {
        initTheme();
        initColor();
        initBackground();
        initDateTime();
        initScrollEffects();
        initMicaEffects();
        initAnimations();
        initHamburgerMenu();
    });

    // ==================== 主题管理 ====================
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
        // 主题切换时重新计算 HDR 颜色（深色模式需要不同的亮度补偿）
        applyHDRColors(currentColor);
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

    // ==================== HDR 颜色计算 ====================
    function hexToDisplayP3(hex) {
        // 将 hex 转换为 sRGB 0-1 范围
        const r = parseInt(hex.substring(1, 3), 16) / 255;
        const g = parseInt(hex.substring(3, 5), 16) / 255;
        const b = parseInt(hex.substring(5, 7), 16) / 255;

        // 将 sRGB 转换为 Display-P3 的近似值
        // 使用 CSS Color 4 中定义的矩阵
        const p3r = 0.8225 * r + 0.1770 * g + 0.0005 * b;
        const p3g = 0.0332 * r + 0.9170 * g + 0.0498 * b;
        const p3b = 0.0171 * r + 0.0268 * g + 0.9561 * b;

        return { r: p3r, g: p3g, b: p3b };
    }

    function applyHDRColors(hexColor) {
        const rgb = hexToDisplayP3(hexColor);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
        // 大幅提高亮度倍数，确保 HDR 效果明显
        // 深色模式下需要更高的亮度才能看到效果
        const baseBoost = isDark ? 3.5 : 2.5;
        const brightBoost = isDark ? 6.0 : 4.5;
        const glowBoost = isDark ? 4.5 : 3.0;
    
        // 基础 HDR 色 - 限制最大 4.0
        const hdrR = Math.min(rgb.r * baseBoost, 4.0);
        const hdrG = Math.min(rgb.g * baseBoost, 4.0);
        const hdrB = Math.min(rgb.b * baseBoost, 4.0);
    
        // 亮色 HDR（更亮，用于渐变末端）- 限制最大 6.0
        const brightR = Math.min(rgb.r * brightBoost, 6.0);
        const brightG = Math.min(rgb.g * brightBoost, 6.0);
        const brightB = Math.min(rgb.b * brightBoost, 6.0);
    
        // 发光色 - 限制最大 5.0
        const glowR = Math.min(rgb.r * glowBoost, 5.0);
        const glowG = Math.min(rgb.g * glowBoost, 5.0);
        const glowB = Math.min(rgb.b * glowBoost, 5.0);
    
        // 控制台输出方便调试
        console.log('HDR Colors:', {
            primary: `color(display-p3 ${hdrR.toFixed(2)} ${hdrG.toFixed(2)} ${hdrB.toFixed(2)})`,
            bright: `color(display-p3 ${brightR.toFixed(2)} ${brightG.toFixed(2)} ${brightB.toFixed(2)})`,
            isDark: isDark
        });
    
        document.documentElement.style.setProperty('--primary-hdr', `color(display-p3 ${hdrR} ${hdrG} ${hdrB})`);
        document.documentElement.style.setProperty('--primary-hdr-bright', `color(display-p3 ${brightR} ${brightG} ${brightB})`);
        document.documentElement.style.setProperty('--primary-hdr-glow', `color(display-p3 ${glowR} ${glowG} ${glowB})`);
    
        // 边框和阴影
        const borderBrightness = isDark ? 0.50 : 0.95;
        const shadowAlpha = isDark ? 0.40 : 0.12;
        const hoverBrightness = isDark ? 0.35 : 0.98;
    
        document.documentElement.style.setProperty('--border-hdr', `color(display-p3 ${borderBrightness} ${borderBrightness} ${borderBrightness})`);
        document.documentElement.style.setProperty('--shadow-hdr', `color(display-p3 0 0 0 / ${shadowAlpha})`);
        document.documentElement.style.setProperty('--card-hover-hdr', `color(display-p3 ${hoverBrightness} ${hoverBrightness} ${hoverBrightness})`);
    
        if (isDark) {
            document.documentElement.style.setProperty('--text-hdr', 'color(display-p3 1 1 1)');
        } else {
            document.documentElement.style.setProperty('--text-hdr', 'color(display-p3 0.196 0.192 0.188)');
        }
    }

    // ==================== 颜色管理 ====================
    function initColor() {
        applyColor(currentColor);
        updatePrimaryColorRGB();
        // 初始计算 HDR 颜色
        setTimeout(() => {
            applyHDRColors(currentColor);
        }, 50);
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
        // 更新 HDR 颜色
        applyHDRColors(color);
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
                // 实时预览 HDR 效果
                applyHDRColors(color);
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

    // ==================== 背景管理 ====================
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
            console.warn('所有背景图片加载失败');
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

    // ==================== 日期时间 ====================
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

    // ==================== 滚动效果 ====================
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

    // ==================== 云母效果 ====================
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

    // ==================== 动画效果 ====================
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

    // ==================== 文件夹网格展开/收起功能（同级展开） ====================
    /**
     * 切换文件夹的同级网格展开/收起
     * 点击文件夹卡片时，将子网站作为独立卡片插入到网格中（与文件夹同级）
     * @param {HTMLElement} folderCard - 文件夹卡片元素
     * @param {Array} childrenData - 子网站数据数组
     * @param {Function} renderChildFn - 渲染子网站卡片的函数 (childData, index) => HTMLElement
     * @param {Function} getPinnedStatusFn - 检查是否已固定的函数 (childData) => boolean
     * @param {Function} onPinFn - 固定按钮回调函数 (childData, cardElement) => void
     * @param {string} gridSelector - 网格容器选择器，默认为 '.grid'
     * @returns {boolean} 展开状态
     */
    function toggleFolderGrid(folderCard, childrenData, renderChildFn, getPinnedStatusFn, onPinFn, gridSelector = '.grid') {
        if (!folderCard || !childrenData || childrenData.length === 0) return false;

        const grid = folderCard.closest(gridSelector);
        if (!grid) return false;

        // 获取文件夹在网格中的位置
        const folderIndex = Array.from(grid.children).indexOf(folderCard);
        if (folderIndex === -1) return false;

        // 获取或创建状态标识
        const folderId = folderCard.getAttribute('data-folder-id') || 
                         'folder_' + Math.random().toString(36).substr(2, 8);
        if (!folderCard.getAttribute('data-folder-id')) {
            folderCard.setAttribute('data-folder-id', folderId);
        }

        // 检查是否已展开（通过是否存在子项卡片来判断）
        const childCards = grid.querySelectorAll(`.folder-child-card[data-parent-id="${folderId}"]`);
        const isExpanded = childCards.length > 0;

        if (isExpanded) {
            // ===== 收起：移除子项卡片（带淡出动画） =====
            const removePromises = [];
            childCards.forEach(card => {
                // 添加淡出动画
                card.style.transition = 'all 0.3s var(--animation-curve)';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9) translateY(-10px)';
                
                const promise = new Promise(resolve => {
                    setTimeout(() => {
                        if (card.parentNode) {
                            card.remove();
                        }
                        resolve();
                    }, 300);
                });
                removePromises.push(promise);
            });

            // 更新箭头状态
            const arrow = folderCard.querySelector('.folder-arrow');
            if (arrow) arrow.classList.remove('rotated');

            // 更新状态
            folderStates.set(folderId, false);

            // 触发自定义事件
            const event = new CustomEvent('folderGridToggled', {
                detail: {
                    expanded: false,
                    folderId: folderId,
                    folderCard: folderCard
                }
            });
            document.dispatchEvent(event);

            return false;
        } else {
            // ===== 展开：插入子项卡片（带淡入动画） =====
            const fragment = document.createDocumentFragment();
            const cardsToInsert = [];

            childrenData.forEach((child, index) => {
                const childCard = renderChildFn(child, index);
                if (childCard) {
                    childCard.className = 'card folder-child-card';
                    childCard.setAttribute('data-parent-id', folderId);
                    childCard.setAttribute('data-child-index', index);
                    
                    // 初始状态：透明、缩小、稍微上移（准备淡入动画）
                    childCard.style.opacity = '0';
                    childCard.style.transform = 'scale(0.9) translateY(-10px)';
                    childCard.style.transition = 'all 0.4s var(--animation-curve)';
                    
                    // 检查是否已固定
                    const isPinned = getPinnedStatusFn ? getPinnedStatusFn(child) : false;
                    
                    // 构建卡片内容
                    childCard.innerHTML = `
                        <h3><i class="fas ${child.icon || 'fa-link'}"></i> ${escapeHtml(child.name)}</h3>
                        <p>${escapeHtml(child.url)}</p>
                        <button class="pin-btn" ${isPinned ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    `;

                    // 点击卡片跳转
                    childCard.addEventListener('click', (e) => {
                        if (!e.target.closest('.pin-btn') && !e.target.closest('.folder-toggle-btn')) {
                            window.open(child.url, '_blank');
                        }
                    });

                    // 固定按钮事件
                    const pinBtn = childCard.querySelector('.pin-btn');
                    pinBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (onPinFn) {
                            onPinFn(child, childCard);
                        }
                    });

                    cardsToInsert.push(childCard);
                    fragment.appendChild(childCard);
                }
            });

            // 在文件夹卡片后面插入所有子项卡片
            let insertPosition = folderIndex + 1;
            const childrenToInsert = Array.from(fragment.children);
            
            // 使用 DocumentFragment 一次性插入
            const parent = grid;
            const nextSibling = parent.children[insertPosition] || null;
            
            // 先逐个添加以保持顺序
            childrenToInsert.forEach((card, idx) => {
                parent.insertBefore(card, parent.children[folderIndex + 1 + idx] || null);
            });

            // 更新箭头状态
            const arrow = folderCard.querySelector('.folder-arrow');
            if (arrow) arrow.classList.add('rotated');

            // 更新状态
            folderStates.set(folderId, true);

            // 触发淡入动画（延迟一帧让浏览器完成插入）
            requestAnimationFrame(() => {
                childrenToInsert.forEach((card, idx) => {
                    // 逐个延迟动画，产生级联效果
                    const delay = idx * 60;
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, delay);
                });
            });

            // 触发自定义事件
            const event = new CustomEvent('folderGridToggled', {
                detail: {
                    expanded: true,
                    folderId: folderId,
                    folderCard: folderCard,
                    childCount: childrenToInsert.length
                }
            });
            document.dispatchEvent(event);

            return true;
        }
    }

    /**
     * 获取文件夹展开状态
     * @param {HTMLElement} folderCard - 文件夹卡片元素
     * @returns {boolean} 是否展开
     */
    function isFolderExpanded(folderCard) {
        if (!folderCard) return false;
        const folderId = folderCard.getAttribute('data-folder-id');
        if (!folderId) return false;
        return folderStates.get(folderId) || false;
    }

    /**
     * 收起所有已展开的文件夹
     * @param {string} gridSelector - 网格容器选择器，默认为 '.grid'
     */
    function collapseAllFolders(gridSelector = '.grid') {
        const grid = document.querySelector(gridSelector);
        if (!grid) return;

        const folderCards = grid.querySelectorAll('.folder-card');
        folderCards.forEach(card => {
            const folderId = card.getAttribute('data-folder-id');
            if (folderId && folderStates.get(folderId)) {
                // 触发点击事件来收起
                const headerArea = card.querySelector('h3') || card;
                headerArea.click();
            }
        });
    }

    /**
     * 展开所有文件夹
     * @param {string} gridSelector - 网格容器选择器，默认为 '.grid'
     * @param {Array} folderDataMap - 文件夹数据映射，用于渲染子项
     * @param {Function} renderChildFn - 渲染子网站卡片的函数
     * @param {Function} getPinnedStatusFn - 检查是否已固定的函数
     * @param {Function} onPinFn - 固定按钮回调函数
     */
    function expandAllFolders(gridSelector = '.grid', folderDataMap, renderChildFn, getPinnedStatusFn, onPinFn) {
        const grid = document.querySelector(gridSelector);
        if (!grid) return;

        const folderCards = grid.querySelectorAll('.folder-card');
        folderCards.forEach(card => {
            const folderId = card.getAttribute('data-folder-id');
            if (folderId && !folderStates.get(folderId)) {
                // 获取文件夹数据
                const folderName = card.getAttribute('data-folder-name') || 
                                   card.querySelector('h3')?.textContent?.trim() || '';
                const folderData = folderDataMap ? folderDataMap[folderName] : null;
                if (folderData && folderData.children) {
                    // 使用 toggleFolderGrid 展开
                    toggleFolderGrid(card, folderData.children, renderChildFn, getPinnedStatusFn, onPinFn, gridSelector);
                }
            }
        });
    }

    // ==================== 通知系统 ====================
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
                notif.style.animation = `slideOutRight var(--transition-speed) var(--animation-curve) forwards`;
                setTimeout(() => {
                    if (notif.parentNode) {
                        notif.remove();
                    }
                }, 400);
            }
        }

        return notification;
    }

    // ==================== 事件派发 ====================
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

    // ==================== 公共API ====================
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
        handleScroll: handleScroll,
        // 暴露 HDR 颜色计算功能，以便外部调用
        applyHDRColors: applyHDRColors,
        // 文件夹网格展开功能（同级展开）
        toggleFolderGrid: toggleFolderGrid,
        isFolderExpanded: isFolderExpanded,
        collapseAllFolders: collapseAllFolders,
        expandAllFolders: expandAllFolders
    };

    window.showNotification = showNotification;

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
        /* 文件夹子项卡片动画 */
        .folder-child-card {
            animation: cardAppear 0.4s var(--animation-curve);
        }
        .folder-child-card.folder-child-exit {
            animation: cardDisappear 0.3s var(--animation-curve) forwards;
        }
        @keyframes cardDisappear {
            from { opacity: 1; transform: scale(1) translateY(0); }
            to { opacity: 0; transform: scale(0.9) translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

})();

// ==================== 汉堡菜单 ====================
(function() {
    var isOpen = false;
    var btn, menu, overlay, headerRight;

    function init() {
        var header = document.querySelector('header .header-content');
        if (!header) return;
        if (document.querySelector('.hamburger-btn')) return;

        headerRight = header.querySelector('.header-right');
        if (!headerRight) return;

        btn = document.createElement('button');
        btn.className = 'hamburger-btn';
        btn.innerHTML = '<span></span><span></span><span></span>';

        menu = document.createElement('div');
        menu.className = 'mobile-menu';

        overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';

        header.appendChild(btn);
        document.body.appendChild(menu);
        document.body.appendChild(overlay);

        btn.addEventListener('click', toggle);
        overlay.addEventListener('click', toggle);

        // 监听窗口变化，移动端把 header-right 移入菜单，桌面端移回 header
        moveHeaderRight();
        window.addEventListener('resize', moveHeaderRight);
    }

    function moveHeaderRight() {
        var isMobile = window.innerWidth <= 800;
        var header = document.querySelector('header .header-content');
        if (!header || !headerRight) return;

        if (isMobile) {
            // 移动端：放入菜单
            if (headerRight.parentNode === header) {
                menu.insertBefore(headerRight, menu.firstChild);
            }
        } else {
            // 桌面端：放回 header
            if (headerRight.parentNode === menu) {
                header.appendChild(headerRight);
            }
            // 关闭菜单
            if (isOpen) toggle();
        }
    }

    function toggle() {
        isOpen = !isOpen;
        btn.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// ==================== HTML转义辅助函数（供全局使用） ====================
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;');
}
