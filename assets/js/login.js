// login.js - 统一登录模块
// 包含：登录模态框HTML、下拉菜单HTML、登录状态管理、用户信息显示、登录/登出逻辑
// 依赖：ui.js (用于通知功能)
// 使用方式：在页面中引入此文件，然后调用 LoginModule.init() 初始化

(function() {
    'use strict';

    // ==================== 配置 ====================
    const CONFIG = {
        // 登录模态框配置
        loginModalId: 'loginModal',
        loginFormId: 'loginForm',
        idNumberInputId: 'idNumber',
        passwordInputId: 'password',
        loginMessageId: 'loginMessage',
        turnstileContainerId: 'loginTurnstileContainer',
        
        // 下拉菜单配置
        menuContainerClass: 'user-menu-container',
        loginBtnId: 'loginBtn',
        loginTextId: 'loginText',
        dropdownArrowId: 'dropdownArrow',
        userDropdownId: 'userDropdown',
        userNicknameDisplayId: 'userNicknameDisplay',
        userCertificationDisplayId: 'userCertificationDisplay',
        userFundsDisplayId: 'userFundsDisplay',
        userDaysDisplayId: 'userDaysDisplay',
        personalCenterBtnId: 'personalCenterBtn',
        dropdownUpdateLogBtnId: 'dropdownUpdateLogBtn',
        logoutBtnId: 'logoutBtn',
        
        // 其他
        insiderBadgeClass: 'insider-badge'
    };

    // ==================== 状态管理 ====================
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    // ==================== HTML 模板 ====================

    /**
     * 获取登录模态框 HTML
     */
    function getLoginModalHTML() {
        return `
            <div class="modal" id="${CONFIG.loginModalId}">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>登录</h2>
                        <button class="close-btn" id="closeLoginBtn">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="${CONFIG.loginFormId}" data-turnstile="#${CONFIG.turnstileContainerId}">
                            <div class="form-group">
                                <label for="${CONFIG.idNumberInputId}">𣿅国身份证号</label>
                                <input type="text" id="${CONFIG.idNumberInputId}" placeholder="请输入𣿅国身份证号">
                            </div>
                            <div class="form-group">
                                <label for="${CONFIG.passwordInputId}">密码</label>
                                <input type="password" id="${CONFIG.passwordInputId}" placeholder="请输入密码">
                            </div>
                            <div style="text-align: left; margin: 10px 0;">
                                <a href="https://dornhub.eu.org/forgot-password.html" style="color: var(--primary-color); text-decoration: none; font-size: 13px;">
                                    <i class="fas fa-key"></i> 忘记密码？！
                                </a>
                            </div>
                            <div style="text-align: left; margin: 10px 0;">
                                <a href="https://dornhub.eu.org/gov-services/id/index.html" style="color: var(--primary-color); text-decoration: none; font-size: 13px;">
                                    <i class="fas fa-user-plus"></i> 还没有账号？点此注册
                                </a>
                            </div>
                            
                            <!-- Turnstile 容器 -->
                            <div id="${CONFIG.turnstileContainerId}"></div>
                            
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary" id="submitLoginBtn">登录</button>
                                <button type="button" class="btn btn-secondary" id="cancelLoginBtn">取消</button>
                            </div>
                            <div id="${CONFIG.loginMessageId}" style="margin-top: 15px; text-align: center;"></div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 获取下拉菜单 HTML
     */
    function getDropdownHTML() {
        return `
            <div class="${CONFIG.menuContainerClass}">
                <button class="login-btn btn" id="${CONFIG.loginBtnId}">
                    <span id="${CONFIG.loginTextId}">登录/注册</span>
                    <i class="fas fa-chevron-down" id="${CONFIG.dropdownArrowId}"></i>
                </button>
                <div class="user-dropdown" id="${CONFIG.userDropdownId}">
                    <!-- 用户信息区域 -->
                    <div class="user-info-section">
                        <div class="user-nickname" id="${CONFIG.userNicknameDisplayId}"></div>
                        <div class="user-certification" id="${CONFIG.userCertificationDisplayId}"></div>
                        <div class="user-funds" id="${CONFIG.userFundsDisplayId}"></div>
                        <div class="user-days" id="${CONFIG.userDaysDisplayId}"></div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item" id="${CONFIG.personalCenterBtnId}">
                        <i class="fas fa-user"></i>
                        <span>个人中心</span>
                    </div>

                    <div class="dropdown-item" id="${CONFIG.logoutBtnId}">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>退出登录</span>
                    </div>
                </div>
            </div>
        `;
    }
	// <div class="dropdown-item" id="${CONFIG.dropdownUpdateLogBtnId}">
	//     <i class="fas fa-history"></i>
	//     <span>查看更新说明</span>
	// </div>

    // ==================== DOM 操作 ====================

    /**
     * 注入登录模态框到页面
     */
    function injectLoginModal() {
        // 检查是否已存在
        if (document.getElementById(CONFIG.loginModalId)) {
            return;
        }
        document.body.insertAdjacentHTML('beforeend', getLoginModalHTML());
    }

    /**
     * 注入下拉菜单到指定容器
     * @param {string|Element} container - 容器选择器或 DOM 元素
     */
    function injectDropdown(container) {
        // 检查是否已存在
        if (document.querySelector(`.${CONFIG.menuContainerClass}`)) {
            return;
        }

        let targetContainer = container;
        if (typeof container === 'string') {
            targetContainer = document.querySelector(container);
        }

        if (!targetContainer) {
            console.warn('LoginModule: 下拉菜单容器不存在，将使用 header .header-right');
            const headerRight = document.querySelector('.header-right');
            if (headerRight) {
                targetContainer = headerRight;
            } else {
                // 如果找不到容器，创建一个
                const header = document.querySelector('header .header-content');
                if (header) {
                    const right = document.createElement('div');
                    right.className = 'header-right';
                    header.appendChild(right);
                    targetContainer = right;
                } else {
                    console.error('LoginModule: 无法找到合适的容器注入下拉菜单');
                    return;
                }
            }
        }

        targetContainer.insertAdjacentHTML('beforeend', getDropdownHTML());
    }

    /**
     * 获取 DOM 元素（带缓存）
     */
    function getElements() {
        return {
            loginModal: document.getElementById(CONFIG.loginModalId),
            loginForm: document.getElementById(CONFIG.loginFormId),
            idNumberInput: document.getElementById(CONFIG.idNumberInputId),
            passwordInput: document.getElementById(CONFIG.passwordInputId),
            loginMessage: document.getElementById(CONFIG.loginMessageId),
            closeLoginBtn: document.getElementById('closeLoginBtn'),
            cancelLoginBtn: document.getElementById('cancelLoginBtn'),
            submitLoginBtn: document.getElementById('submitLoginBtn'),
            turnstileContainer: document.getElementById(CONFIG.turnstileContainerId),
            
            loginBtn: document.getElementById(CONFIG.loginBtnId),
            loginText: document.getElementById(CONFIG.loginTextId),
            dropdownArrow: document.getElementById(CONFIG.dropdownArrowId),
            userDropdown: document.getElementById(CONFIG.userDropdownId),
            userNicknameDisplay: document.getElementById(CONFIG.userNicknameDisplayId),
            userCertificationDisplay: document.getElementById(CONFIG.userCertificationDisplayId),
            userFundsDisplay: document.getElementById(CONFIG.userFundsDisplayId),
            userDaysDisplay: document.getElementById(CONFIG.userDaysDisplayId),
            personalCenterBtn: document.getElementById(CONFIG.personalCenterBtnId),
            dropdownUpdateLogBtn: document.getElementById(CONFIG.dropdownUpdateLogBtnId),
            logoutBtn: document.getElementById(CONFIG.logoutBtnId),
            insiderBadges: document.querySelectorAll(`.${CONFIG.insiderBadgeClass}`)
        };
    }

    // ==================== 核心功能 ====================

    /**
     * 计算公民天数
     */
    function calculateCitizenDays(issueDate) {
        const issue = new Date(issueDate);
        const today = new Date();
        const diffTime = Math.abs(today - issue);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * 更新用户信息显示
     */
    function updateUserInfoDisplay(elements) {
        if (!isLoggedIn || !currentUser) {
            return;
        }

        const el = elements || getElements();

        if (el.userNicknameDisplay) {
            el.userNicknameDisplay.textContent = currentUser.nickname || currentUser.name;
        }

        if (el.userCertificationDisplay) {
            if (currentUser.certification && currentUser.certification.trim() !== '') {
                el.userCertificationDisplay.textContent = currentUser.certification;
                el.userCertificationDisplay.style.display = 'block';
            } else {
                el.userCertificationDisplay.style.display = 'none';
            }
        }

        if (el.userFundsDisplay) {
            const funds = currentUser.funds || 50.00;
            el.userFundsDisplay.innerHTML = `<i class="fas fa-coins"></i> ${Number(funds).toFixed(2)} 𣿅元`;
        }

        if (el.userDaysDisplay) {
            const issueDate = currentUser.issue_date;
            if (issueDate) {
                el.userDaysDisplay.textContent = `已成为𣿅国公民 ${calculateCitizenDays(issueDate)} 天`;
            } else {
                el.userDaysDisplay.textContent = '欢迎新公民！';
            }
        }
    }

    /**
     * 更新登录状态显示
     */
    function updateLoginState(elements) {
        const el = elements || getElements();

        if (isLoggedIn && currentUser) {
            // 已登录
            if (el.loginText) {
                el.loginText.textContent = currentUser.nickname || currentUser.name;
            }
            // 显示 Insider 徽章
            el.insiderBadges.forEach(badge => {
                badge.style.display = 'inline-block';
            });
            // 更新用户信息
            updateUserInfoDisplay(el);
            // 保持下拉菜单关闭状态
            if (el.userDropdown) {
                el.userDropdown.classList.remove('active');
            }
            if (el.dropdownArrow) {
                el.dropdownArrow.style.transform = 'rotate(0deg)';
            }
        } else {
            // 未登录
            if (el.loginText) {
                el.loginText.textContent = '登录/注册';
            }
            el.insiderBadges.forEach(badge => {
                badge.style.display = 'none';
            });
            if (el.userDropdown) {
                el.userDropdown.classList.remove('active');
            }
            if (el.dropdownArrow) {
                el.dropdownArrow.style.transform = 'rotate(0deg)';
            }
        }
    }

    /**
     * 加载用户设置
     */
    function loadUserSettings() {
        if (!isLoggedIn || !currentUser) return;
    
        fetch(`https://dornhub.eu.org/php/user_settings.php?id_number=${currentUser.id_number}&type=settings`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data) {
                    const userSettings = data.data;
                    
                    // 🔴 关键修复：只在本地没有值时，才从服务器加载
                    // 这样用户手动修改的设置永远不会被服务器覆盖
                    
                    if (userSettings.theme && !localStorage.getItem('theme')) {
                        localStorage.setItem('theme', userSettings.theme);
                        if (window.UI) window.UI.setTheme(userSettings.theme);
                    }
                    
                    if (userSettings.primary_color && !localStorage.getItem('primaryColor')) {
                        localStorage.setItem('primaryColor', userSettings.primary_color);
                        if (window.UI) window.UI.setColor(userSettings.primary_color);
                    }
                    
                    if (userSettings.show_pinned !== undefined && localStorage.getItem('showPinned') === null) {
                        localStorage.setItem('showPinned', userSettings.show_pinned);
                    }
                    if (userSettings.show_navigation !== undefined && localStorage.getItem('showNavigation') === null) {
                        localStorage.setItem('showNavigation', userSettings.show_navigation);
                    }
                    if (userSettings.show_announcement !== undefined && localStorage.getItem('showAnnouncement') === null) {
                        localStorage.setItem('showAnnouncement', userSettings.show_announcement);
                    }
                    if (userSettings.show_date !== undefined && localStorage.getItem('showDate') === null) {
                        localStorage.setItem('showDate', userSettings.show_date);
                    }
                    if (userSettings.show_time !== undefined && localStorage.getItem('showTime') === null) {
                        localStorage.setItem('showTime', userSettings.show_time);
                    }
                    if (userSettings.background_type && !localStorage.getItem('backgroundType')) {
                        localStorage.setItem('backgroundType', userSettings.background_type);
                        if (window.UI) window.UI.setBackground(userSettings.background_type);
                    }
                    if (userSettings.search_engine && !localStorage.getItem('searchEngine')) {
                        localStorage.setItem('searchEngine', userSettings.search_engine);
                    }
                    
                    document.dispatchEvent(new CustomEvent('userSettingsLoaded', { 
                        detail: userSettings 
                    }));
                }
            })
            .catch(() => {
                console.warn('LoginModule: 加载用户设置失败，使用本地缓存');
            });
    }

    /**
     * 保存用户设置
     */
    function saveUserSettings() {
        if (!isLoggedIn || !currentUser) return;

        const theme = localStorage.getItem('theme') || 'auto';
        const primaryColor = localStorage.getItem('primaryColor') || '#16DA49';
        const showPinned = localStorage.getItem('showPinned') !== 'false' ? 1 : 0;
        const showNavigation = localStorage.getItem('showNavigation') !== 'false' ? 1 : 0;
        const showDate = localStorage.getItem('showDate') !== 'false' ? 1 : 0;
        const showTime = localStorage.getItem('showTime') !== 'false' ? 1 : 0;
        const showAnnouncement = localStorage.getItem('showAnnouncement') !== 'false' ? 1 : 0;
        const backgroundType = localStorage.getItem('backgroundType') || 'default';
        const searchEngine = localStorage.getItem('searchEngine') || 'bing';

        const userSettings = {
            action: 'save_settings',
            id_number: currentUser.id_number,
            theme: theme,
            primary_color: primaryColor,
            show_pinned: showPinned,
            show_navigation: showNavigation,
            show_date: showDate,
            show_time: showTime,
            show_announcement: showAnnouncement,
            background_type: backgroundType,
            search_engine: searchEngine
        };

        fetch('https://dornhub.eu.org/php/user_settings.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userSettings)
        }).catch(error => console.error('保存用户设置失败:', error));
    }

    /**
     * 保存固定网站到服务器
     */
    function savePinnedWebsitesToServer(pinnedWebsites) {
        if (!isLoggedIn || !currentUser) return;

        const pinnedData = {
            action: 'save_pinned_websites',
            id_number: currentUser.id_number,
            websites: pinnedWebsites
        };

        fetch('https://dornhub.eu.org/php/user_settings.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pinnedData)
        }).catch(error => console.error('保存固定网址失败:', error));
    }

    /**
     * 从服务器加载固定网站
     * @param {Function} callback - 加载完成后的回调函数
     */
    function loadPinnedWebsitesFromServer(callback) {
        if (!isLoggedIn || !currentUser) {
            if (callback) callback([]);
            return;
        }

        fetch(`https://dornhub.eu.org/php/user_settings.php?id_number=${currentUser.id_number}&type=pinned_websites`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data) {
                    localStorage.setItem('pinnedWebsites', JSON.stringify(data.data));
                    if (callback) callback(data.data);
                } else {
                    const local = JSON.parse(localStorage.getItem('pinnedWebsites') || '[]');
                    if (callback) callback(local);
                }
            })
            .catch(() => {
                const local = JSON.parse(localStorage.getItem('pinnedWebsites') || '[]');
                if (callback) callback(local);
            });
    }

    /**
     * 处理退出登录
     */
    function handleLogout() {
        // 先保存设置
        saveUserSettings();
        
        // 保存固定网站
        const pinnedWebsites = JSON.parse(localStorage.getItem('pinnedWebsites') || '[]');
        savePinnedWebsitesToServer(pinnedWebsites);

        // 清除本地存储
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        
        isLoggedIn = false;
        currentUser = null;

        // 更新UI
        const elements = getElements();
        updateLoginState(elements);

        // 关闭下拉菜单
        if (elements.userDropdown) {
            elements.userDropdown.classList.remove('active');
        }
        if (elements.dropdownArrow) {
            elements.dropdownArrow.style.transform = 'rotate(0deg)';
        }

        // 显示通知
        if (window.UI && window.UI.success) {
            window.UI.success('已成功退出登录');
        }

        // 触发退出事件
        document.dispatchEvent(new CustomEvent('userLoggedOut'));
    }

    /**
     * 执行签到
     */
    function performDropdownCheckin() {
        if (!isLoggedIn || !currentUser) {
            if (window.UI && window.UI.error) {
                window.UI.error('请先登录');
            }
            return;
        }

        fetch('https://dornhub.eu.org/php/checkin.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_number: currentUser.id_number })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                currentUser.funds = parseFloat(currentUser.funds || 10.00) + data.total_amount;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateLoginState();
                if (window.UI && window.UI.success) {
                    window.UI.success(`🎉 签到成功！获得 ${data.total_amount.toFixed(2)}𣿅元，连续签到 ${data.streak_days} 天`);
                }
            } else {
                if (window.UI && window.UI.error) {
                    window.UI.error('签到失败: ' + (data.error || '未知错误'));
                }
            }
        })
        .catch(error => {
            console.error('签到请求失败:', error);
            if (window.UI && window.UI.error) {
                window.UI.error('网络错误，请刷新页面后重试');
            }
        });
    }

    /**
     * 添加签到按钮到下拉菜单
     */
    function addCheckinToDropdown() {
        const personalCenterBtn = document.getElementById(CONFIG.personalCenterBtnId);
        if (!personalCenterBtn) return;

        // 检查是否已添加
        if (document.getElementById('dropdownCheckinBtn')) return;

        const checkinItem = document.createElement('div');
        checkinItem.className = 'dropdown-item';
        checkinItem.id = 'dropdownCheckinBtn';
        checkinItem.innerHTML = `
            <i class="fas fa-calendar-check"></i>
            <span>每日签到（以UTC时间计）</span>
        `;
        checkinItem.addEventListener('click', function(e) {
            e.stopPropagation();
            performDropdownCheckin();
            const userDropdown = document.getElementById(CONFIG.userDropdownId);
            if (userDropdown) {
                userDropdown.classList.remove('active');
            }
            const dropdownArrow = document.getElementById(CONFIG.dropdownArrowId);
            if (dropdownArrow) {
                dropdownArrow.style.transform = 'rotate(0deg)';
            }
        });
        personalCenterBtn.parentNode.insertBefore(checkinItem, personalCenterBtn);
    }

    // ==================== 初始化事件 ====================

    /**
     * 初始化用户菜单事件
     */
    function initUserMenu() {
        const elements = getElements();

        // 登录按钮点击事件
        if (elements.loginBtn) {
            elements.loginBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (isLoggedIn) {
                    // 已登录：切换下拉菜单
                    if (elements.userDropdown) {
                        elements.userDropdown.classList.toggle('active');
                    }
                    if (elements.dropdownArrow) {
                        elements.dropdownArrow.style.transform = 
                            elements.userDropdown && elements.userDropdown.classList.contains('active') 
                                ? 'rotate(180deg)' 
                                : 'rotate(0deg)';
                    }
                } else {
                    // 未登录：显示登录模态框
                    if (elements.loginModal) {
                        elements.loginModal.style.display = 'flex';
                    }
                    if (elements.userDropdown) {
                        elements.userDropdown.classList.remove('active');
                    }
                    if (elements.dropdownArrow) {
                        elements.dropdownArrow.style.transform = 'rotate(0deg)';
                    }
                }
            });
        }

        // 点击外部关闭菜单
        const menuContainer = document.querySelector(`.${CONFIG.menuContainerClass}`);
        if (menuContainer) {
            document.addEventListener('click', function(e) {
                if (!menuContainer.contains(e.target)) {
                    if (elements.userDropdown) {
                        elements.userDropdown.classList.remove('active');
                    }
                    if (elements.dropdownArrow) {
                        elements.dropdownArrow.style.transform = 'rotate(0deg)';
                    }
                }
            });
        }

        // 个人中心按钮
        if (elements.personalCenterBtn) {
            elements.personalCenterBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                window.location.href = 'account.html';
                if (elements.userDropdown) {
                    elements.userDropdown.classList.remove('active');
                }
                if (elements.dropdownArrow) {
                    elements.dropdownArrow.style.transform = 'rotate(0deg)';
                }
            });
        }

        // 查看更新说明按钮（如果有外部函数，由外部覆盖）
        if (elements.dropdownUpdateLogBtn) {
            elements.dropdownUpdateLogBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                // 触发自定义事件，由外部页面监听处理
                document.dispatchEvent(new CustomEvent('openUpdateLog'));
                if (elements.userDropdown) {
                    elements.userDropdown.classList.remove('active');
                }
                if (elements.dropdownArrow) {
                    elements.dropdownArrow.style.transform = 'rotate(0deg)';
                }
            });
        }

        // 退出登录按钮
        if (elements.logoutBtn) {
            elements.logoutBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleLogout();
            });
        }

        // 添加签到按钮
        addCheckinToDropdown();
    }

    /**
     * 初始化登录表单事件
     */
    function initLoginForm() {
        const elements = getElements();

        if (!elements.loginForm) return;

        // 监听 turnstile-verified 事件
        elements.loginForm.addEventListener('turnstile-verified', async function(e) {
            const idNumber = elements.idNumberInput ? elements.idNumberInput.value.trim() : '';
            const password = elements.passwordInput ? elements.passwordInput.value.trim() : '';

            if (!idNumber || !password) {
                if (elements.loginMessage) {
                    elements.loginMessage.textContent = '请输入身份证号和密码';
                    elements.loginMessage.style.color = '#d13438';
                }
                return;
            }

            if (elements.loginMessage) {
                elements.loginMessage.textContent = '登录中...';
                elements.loginMessage.style.color = 'var(--primary-color)';
            }

            try {
                const response = await fetch('https://dornhub.eu.org/php/query_citizen.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_number: idNumber, password: password })
                });

                const data = await response.json();

                if (data.success) {
                    isLoggedIn = true;
                    currentUser = data.data;
                    if (!currentUser.nickname) currentUser.nickname = currentUser.name;
                    if (!currentUser.funds) currentUser.funds = 50.00;

                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));

                    // 关闭模态框
                    if (elements.loginModal) {
                        elements.loginModal.style.display = 'none';
                    }

                    // 清空输入
                    if (elements.idNumberInput) elements.idNumberInput.value = '';
                    if (elements.passwordInput) elements.passwordInput.value = '';
                    if (elements.loginMessage) elements.loginMessage.textContent = '';

                    // 更新UI
                    updateLoginState();

                    // 加载用户设置
                    loadUserSettings();

                    // 触发登录事件
                    document.dispatchEvent(new CustomEvent('userLoggedIn', { 
                        detail: { user: currentUser } 
                    }));

                    if (window.UI && window.UI.success) {
                        window.UI.success('登录成功！');
                    }
                } else {
                    if (elements.loginMessage) {
                        elements.loginMessage.textContent = data.error || '登录失败，请重试';
                        elements.loginMessage.style.color = '#d13438';
                    }
                    // 重置 Turnstile
                    if (elements.turnstileContainer && typeof turnstile !== 'undefined') {
                        turnstile.reset(elements.turnstileContainer);
                    }
                }
            } catch (error) {
                console.error('登录请求失败:', error);
                if (elements.loginMessage) {
                    elements.loginMessage.textContent = '出错啦！请刷新页面后重试';
                    elements.loginMessage.style.color = '#d13438';
                }
                if (elements.turnstileContainer && typeof turnstile !== 'undefined') {
                    turnstile.reset(elements.turnstileContainer);
                }
            }
        });

        // 关闭按钮
        if (elements.closeLoginBtn) {
            elements.closeLoginBtn.addEventListener('click', function() {
                if (elements.loginModal) elements.loginModal.style.display = 'none';
                if (elements.idNumberInput) elements.idNumberInput.value = '';
                if (elements.passwordInput) elements.passwordInput.value = '';
                if (elements.loginMessage) elements.loginMessage.textContent = '';
                if (elements.turnstileContainer && typeof turnstile !== 'undefined') {
                    turnstile.reset(elements.turnstileContainer);
                }
            });
        }

        // 取消按钮
        if (elements.cancelLoginBtn) {
            elements.cancelLoginBtn.addEventListener('click', function() {
                if (elements.loginModal) elements.loginModal.style.display = 'none';
                if (elements.idNumberInput) elements.idNumberInput.value = '';
                if (elements.passwordInput) elements.passwordInput.value = '';
                if (elements.loginMessage) elements.loginMessage.textContent = '';
                if (elements.turnstileContainer && typeof turnstile !== 'undefined') {
                    turnstile.reset(elements.turnstileContainer);
                }
            });
        }

        // 点击模态框外部关闭
        if (elements.loginModal) {
            elements.loginModal.addEventListener('click', function(e) {
                if (e.target === elements.loginModal) {
                    elements.loginModal.style.display = 'none';
                    if (elements.idNumberInput) elements.idNumberInput.value = '';
                    if (elements.passwordInput) elements.passwordInput.value = '';
                    if (elements.loginMessage) elements.loginMessage.textContent = '';
                    if (elements.turnstileContainer && typeof turnstile !== 'undefined') {
                        turnstile.reset(elements.turnstileContainer);
                    }
                }
            });
        }
    }

    // ==================== 公共API ====================

    const LoginModule = {
        /**
         * 初始化登录模块
         * @param {string|Element} dropdownContainer - 下拉菜单容器
         */
        init: function(dropdownContainer) {
            // 注入登录模态框
            injectLoginModal();

            // 注入下拉菜单
            injectDropdown(dropdownContainer);

            // 初始化事件
            initUserMenu();
            initLoginForm();

            // 更新登录状态
            updateLoginState();

            // 如果已登录，加载用户设置和固定网站
            if (isLoggedIn) {
                loadUserSettings();
                // 触发登录事件
                document.dispatchEvent(new CustomEvent('userLoggedIn', { 
                    detail: { user: currentUser } 
                }));
            }

            console.log('LoginModule: 初始化完成，登录状态:', isLoggedIn);
        },

        /**
         * 获取当前登录状态
         */
        isLoggedIn: function() {
            return isLoggedIn;
        },

        /**
         * 获取当前用户信息
         */
        getCurrentUser: function() {
            return currentUser;
        },

        /**
         * 刷新登录状态（当外部修改 localStorage 时调用）
         */
        refresh: function() {
            isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
            updateLoginState();
        },

        /**
         * 手动显示登录模态框
         */
        showLoginModal: function() {
            const modal = document.getElementById(CONFIG.loginModalId);
            if (modal) {
                modal.style.display = 'flex';
            }
        },

        /**
         * 手动关闭登录模态框
         */
        closeLoginModal: function() {
            const modal = document.getElementById(CONFIG.loginModalId);
            if (modal) {
                modal.style.display = 'none';
            }
            const idNumberInput = document.getElementById(CONFIG.idNumberInputId);
            const passwordInput = document.getElementById(CONFIG.passwordInputId);
            const loginMessage = document.getElementById(CONFIG.loginMessageId);
            const turnstileContainer = document.getElementById(CONFIG.turnstileContainerId);
            
            if (idNumberInput) idNumberInput.value = '';
            if (passwordInput) passwordInput.value = '';
            if (loginMessage) loginMessage.textContent = '';
            if (turnstileContainer && typeof turnstile !== 'undefined') {
                turnstile.reset(turnstileContainer);
            }
        },

        /**
         * 执行退出登录
         */
        logout: function() {
            handleLogout();
        },

        /**
         * 执行签到
         */
        checkin: function() {
            performDropdownCheckin();
        },

        /**
         * 加载用户设置
         */
        loadSettings: function() {
            loadUserSettings();
        },

        /**
         * 保存用户设置
         */
        saveSettings: function() {
            saveUserSettings();
        },

        /**
         * 加载固定网站
         */
        loadPinnedWebsites: function(callback) {
            loadPinnedWebsitesFromServer(callback);
        },

        /**
         * 保存固定网站
         */
        savePinnedWebsites: function(pinnedWebsites) {
            savePinnedWebsitesToServer(pinnedWebsites);
        },

        /**
         * 更新用户信息显示
         */
        updateUserInfo: function() {
            updateUserInfoDisplay();
        },

        /**
         * 更新登录状态显示
         */
        updateLoginState: function() {
            updateLoginState();
        },

        /**
         * 获取配置
         */
        getConfig: function() {
            return { ...CONFIG };
        }
    };

    // ==================== 导出 ====================

    // 暴露到全局
    window.LoginModule = LoginModule;

    // 如果页面已经加载完成，自动初始化（可选）
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // 不自动初始化，由页面调用 LoginModule.init()
    }

})();