// cookie-consent.js - 100% 正确版（允许：cookie_consent_v2 + lastVisitedVersion）
(function() {
    const CONSENT_KEY = 'cookie_consent_v2';
    const VERSION_KEY = 'lastVisitedVersion'; // ✅ 你要的版本键名
    const GA_MEASUREMENT_ID = 'G-T6QTPSWXPV';

    // 全局样式
    const baseStyle = document.createElement('style');
    baseStyle.textContent = `
        .main-link a { color: #16DA49 !important; text-decoration: none !important; }
        .main-link a:hover { text-decoration: underline !important; }
    `;
    document.head.appendChild(baseStyle);

    let _consent = getConsent();
    const functionalAllowed = _consent ? _consent.functional === true : false;

    // ==============================================
    // ✅ 白名单：这两个永远允许读写、不删除
    // ==============================================
    const ALLOWED_KEYS = [CONSENT_KEY, VERSION_KEY];

    // 重写 localStorage，只放行白名单
    if (!functionalAllowed) {
        const originalSetItem    = localStorage.setItem.bind(localStorage);
        const originalGetItem    = localStorage.getItem.bind(localStorage);
        const originalRemoveItem = localStorage.removeItem.bind(localStorage);

        localStorage.setItem = function(key, value) {
            if (ALLOWED_KEYS.includes(key)) {
                return originalSetItem(key, value);
            }
            console.warn('localStorage 已禁用（功能Cookie未授权）：', key);
        };
        localStorage.getItem = function(key) {
            if (ALLOWED_KEYS.includes(key)) {
                return originalGetItem(key);
            }
            console.warn('localStorage 已禁用（功能Cookie未授权）：', key);
            return null;
        };
        localStorage.removeItem = function(key) {
            if (ALLOWED_KEYS.includes(key)) return;
            originalRemoveItem(key);
        };
    }

    function getAnimationCurve() {
        return getComputedStyle(document.documentElement).getPropertyValue('--animation-curve') || 'cubic-bezier(0.4, 0, 0.2, 1)';
    }

    function getConsent() {
        try {
            const saved = window.localStorage.getItem(CONSENT_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    }

    function saveConsent(preferences) {
        try {
            window.localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
        } catch (e) {}

        if (preferences.analytics) {
            enableGA();
        } else {
            disableGA();
        }

        if (!preferences.functional) {
            // 只删除非白名单数据
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (!ALLOWED_KEYS.includes(key)) {
                    try {
                        localStorage.removeItem(key);
                    } catch (e) {}
                }
            }
            setTimeout(() => location.reload(), 300);
        }

        hideSimpleBanner();
        hideDetailModal();
    }

    // ==============================================
    // GA 统计
    // ==============================================
    function enableGA() {
        if (_consent && !_consent.analytics) return;

        disableGA();
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;

        gtag('consent', 'default', { analytics_storage: 'granted' });

        const s = document.createElement('script');
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(s);

        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, { storage: 'none', send_page_view: false });
    }

    function disableGA() {
        if (window.gtag) {
            gtag('consent', 'update', { analytics_storage: 'denied' });
        }
        window.gtag = function() {};
        window.dataLayer = [];
    
        // 获取所有 Cookie
        const cookies = document.cookie.split('; ');
        for (const c of cookies) {
            const name = c.split('=')[0];
            // 清除 Google Analytics 相关的 Cookie
            if (name.startsWith('_ga') || name === '_gid' || name === '_gat' || name === '_dc_gtm_') {
                // 方法1: 不带 domain 参数清除
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
                
                // 方法2: 带当前 domain 清除
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
                
                // 方法3: 如果当前域名有子域名，尝试清除父域
                const hostParts = window.location.hostname.split('.');
                if (hostParts.length > 2) {
                    const parentDomain = '.' + hostParts.slice(-2).join('.');
                    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${parentDomain}`;
                }
            }
        }
        
        // 额外：清除可能存在的 localStorage 中的 GA 数据
        const gaKeys = ['ga_client_id', '_ga', '_gid'];
        gaKeys.forEach(key => {
            try {
                localStorage.removeItem(key);
                sessionStorage.removeItem(key);
            } catch(e) {}
        });
    }

    // ========== Cookie 弹窗 UI ==========
    function showSimpleBanner() {
        if (document.getElementById('cookie-simple-banner')) return;
        const b = document.createElement('div');
        b.id = 'cookie-simple-banner';
        b.className = 'cookie-simple-hidden';
        b.innerHTML = `
            <div class="cookie-simple-content">
                <div class="cookie-simple-text">
                    <i class="fas fa-cookie-bite"></i>
                    <span>欢迎来到Dorn Hub🎉！我们很感谢您的访问。不过，在开始之前，请您知悉：
                    我们使用 Cookie 来改善您的浏览体验。继续使用本网站即代表同意
                    <div class="main-link">
                        <a href="https://dornhub.eu.org/privacy-policy.html" target="_blank">隐私政策</a> |
                        <a href="https://dornhub.eu.org/terms.html" target="_blank">使用条款</a> |
                        <a href="https://dornhub.eu.org/cookie-policy.html" target="_blank">Cookie 政策</a> |
                        <a href="https://dornhub.eu.org/disclaimer.html" target="_blank">免责声明</a>
                    </div>
                    </span>
                </div>
                <div class="cookie-simple-buttons">
                    <button id="cookie-simple-accept" class="cookie-simple-btn cookie-simple-accept">接受</button>
                    <button id="cookie-simple-settings" class="cookie-simple-btn cookie-simple-settings">偏好设置</button>
                    <button id="cookie-simple-decline" class="cookie-simple-btn cookie-simple-decline">拒绝</button>
                </div>
            </div>`;
        addSimpleStyles();
        document.body.appendChild(b);
        setTimeout(() => {
            b.classList.remove('cookie-simple-hidden');
            b.classList.add('cookie-simple-visible');
        }, 10);

        document.getElementById('cookie-simple-accept').onclick = () => saveConsent({
            functional: true, analytics: true
        });
        document.getElementById('cookie-simple-decline').onclick = () => saveConsent({
            functional: false, analytics: false
        });
        document.getElementById('cookie-simple-settings').onclick = showDetailModal;
    }

    function hideSimpleBanner() {
        const b = document.getElementById('cookie-simple-banner');
        if (!b) return;
        b.classList.remove('cookie-simple-visible');
        b.classList.add('cookie-simple-hidden');
        setTimeout(() => b.remove(), 300);
    }

    function showDetailModal() {
        if (document.getElementById('cookie-detail-modal')) return;
        const m = document.createElement('div');
        m.id = 'cookie-detail-modal';
        m.className = 'cookie-modal-hidden';
        m.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <i class="fas fa-cookie-bite"></i>
                    <h3>Cookie 偏好设置</h3>
                    <button class="cookie-modal-close" id="cookie-modal-close">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <div class="cookie-option">
                        <label class="cookie-switch">
                            <input type="checkbox" checked disabled>
                            <span class="cookie-slider"></span>
                        </label>
                        <div class="cookie-option-text">
                            <strong>必要 Cookie</strong>
                            <small>网站正常运行所需，无法禁用</small>
                        </div>
                    </div>
                    <div class="cookie-option">
                        <label class="cookie-switch">
                            <input type="checkbox" id="cookie-functional" checked>
                            <span class="cookie-slider"></span>
                        </label>
                        <div class="cookie-option-text">
                            <strong>功能 Cookie</strong>
                            <small>记住主题、个性化设置</small>
                            <div class="cookie-warning" id="functional-warning" style="display:none;">
                                <i class="fas fa-exclamation-triangle"></i> 禁用后主题与设置将丢失
                            </div>
                        </div>
                    </div>
                    <div class="cookie-option">
                        <label class="cookie-switch">
                            <input type="checkbox" id="cookie-analytics" checked>
                            <span class="cookie-slider"></span>
                        </label>
                        <div class="cookie-option-text">
                            <strong>分析 Cookie</strong>
                            <small>Google Analytics 匿名统计</small>
                            <div class="cookie-warning" id="analytics-warning" style="display:none;">
                                <i class="fas fa-exclamation-triangle"></i> 禁用后将无法收集访问数据
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button id="cookie-detail-accept-all" class="cookie-modal-btn cookie-modal-btn-accept">接受全部</button>
                    <button id="cookie-detail-save" class="cookie-modal-btn cookie-modal-btn-primary">保存选择</button>
                    <button id="cookie-detail-decline-all" class="cookie-modal-btn cookie-modal-btn-decline">拒绝全部</button>
                </div>
                <div class="cookie-modal-footer-links">
                    <a href="https://dornhub.eu.org/privacy-policy.html" target="_blank">隐私政策</a> |
                    <a href="https://dornhub.eu.org/terms.html" target="_blank">使用条款</a> |
                    <a href="https://dornhub.eu.org/cookie-policy.html" target="_blank">Cookie 政策</a> |
                    <a href="https://dornhub.eu.org/disclaimer.html" target="_blank">免责声明</a>
                </div>
            </div>`;
        addDetailStyles();
        document.body.appendChild(m);
        setTimeout(() => {
            m.classList.remove('cookie-modal-hidden');
            m.classList.add('cookie-modal-visible');
        }, 10);

        document.getElementById('cookie-modal-close').onclick = hideDetailModal;
        m.querySelector('.cookie-modal-overlay').onclick = hideDetailModal;

        const f = document.getElementById('cookie-functional');
        const a = document.getElementById('cookie-analytics');
        const fw = document.getElementById('functional-warning');
        const aw = document.getElementById('analytics-warning');

        f.onchange = () => fw.style.display = f.checked ? 'none' : 'block';
        a.onchange = () => aw.style.display = a.checked ? 'none' : 'block';

        document.getElementById('cookie-detail-accept-all').onclick = () => {
            f.checked = a.checked = true;
            fw.style.display = aw.style.display = 'none';
            saveConsent({ functional: true, analytics: true });
        };
        document.getElementById('cookie-detail-save').onclick = () => {
            saveConsent({ functional: f.checked, analytics: a.checked });
        };
        document.getElementById('cookie-detail-decline-all').onclick = () => {
            f.checked = a.checked = false;
            fw.style.display = aw.style.display = 'block';
            saveConsent({ functional: false, analytics: false });
        };
    }

    function hideDetailModal() {
        const m = document.getElementById('cookie-detail-modal');
        if (!m) return;
        m.classList.remove('cookie-modal-visible');
        m.classList.add('cookie-modal-hidden');
        setTimeout(() => m.remove(), 300);
    }

    // ========== 样式 ==========
    function addSimpleStyles() {
        if (document.getElementById('cookie-simple-style')) return;
        const curve = getAnimationCurve();
        const s = document.createElement('style');
        s.id = 'cookie-simple-style';
        s.textContent = `
            #cookie-simple-banner{position:fixed;bottom:20px;left:20px;right:20px;max-width:600px;margin:0 auto;background:var(--card-bg,rgba(255,255,255,0.98));backdrop-filter:blur(12px);border:1px solid var(--border-color,rgba(224,224,224,0.5));border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.12);z-index:10001;padding:16px 20px;transition:transform 0.3s ${curve},opacity 0.3s ${curve},visibility 0.3s ${curve}}
            #cookie-simple-banner.cookie-simple-hidden{transform:translateY(100%);opacity:0;visibility:hidden}
            #cookie-simple-banner.cookie-simple-visible{transform:translateY(0);opacity:1;visibility:visible}
            .cookie-simple-content{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
            .cookie-simple-text{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--text-color,#333);flex:1}
            .cookie-simple-text i{font-size:20px;color:var(--primary-color,#16DA49)}
            .cookie-simple-buttons{display:flex;gap:12px}
            .cookie-simple-btn{padding:8px 20px;border:none;border-radius:40px;cursor:pointer;font-size:14px;font-weight:500;transition:all 0.2s ${curve}}
            .cookie-simple-accept{background:var(--primary-color,#16DA49);color:white}
            .cookie-simple-accept:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(22,218,73,0.3)}
            .cookie-simple-settings{background:transparent;color:var(--primary-color,#16DA49);border:1px solid var(--primary-color,#16DA49)}
            .cookie-simple-settings:hover{background:var(--primary-color,#16DA49);color:white;transform:translateY(-2px)}
            .cookie-simple-decline{background:var(--secondary-color,#f0f0f0);color:var(--text-color,#666);border:1px solid var(--border-color,#ddd)}
            .cookie-simple-decline:hover{background:var(--border-color,#e0e0e0);transform:translateY(-2px)}
            @media(max-width:560px){.cookie-simple-content{flex-direction:column;text-align:center}.cookie-simple-buttons{width:100%;justify-content:center}}`;
        document.head.appendChild(s);
    }

    function addDetailStyles() {
        if (document.getElementById('cookie-detail-style')) return;
        const curve = getAnimationCurve();
        const s = document.createElement('style');
        s.id = 'cookie-detail-style';
        s.textContent = `
            #cookie-detail-modal{position:fixed;top:0;left:0;right:0;bottom:0;z-index:10002;display:flex;align-items:center;justify-content:center;transition:visibility 0.3s ${curve}}
            #cookie-detail-modal.cookie-modal-hidden{visibility:hidden}
            #cookie-detail-modal.cookie-modal-visible{visibility:visible}
            .cookie-modal-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);transition:opacity 0.3s ${curve}}
            .cookie-modal-hidden .cookie-modal-overlay{opacity:0}
            .cookie-modal-visible .cookie-modal-overlay{opacity:1}
            .cookie-modal-content{position:relative;max-width:500px;width:90%;max-height:85vh;overflow-y:auto;background:var(--card-bg,rgba(255,255,255,0.98));backdrop-filter:blur(12px);border:1px solid var(--border-color,rgba(224,224,224,0.5));border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.2);transition:transform 0.3s ${curve},opacity 0.3s ${curve}}
            .cookie-modal-hidden .cookie-modal-content{transform:scale(0.95);opacity:0}
            .cookie-modal-visible .cookie-modal-content{transform:scale(1);opacity:1}
            .cookie-modal-header{display:flex;align-items:center;gap:12px;padding:20px 24px;border-bottom:1px solid var(--border-color,rgba(224,224,224,0.5))}
            .cookie-modal-header i{font-size:28px;color:var(--primary-color,#16DA49)}
            .cookie-modal-header h3{flex:1;margin:0;font-size:20px}
            .cookie-modal-close{background:none;border:none;font-size:28px;cursor:pointer;color:var(--text-secondary,#999);transition:transform 0.2s ${curve},color 0.2s ${curve}}
            .cookie-modal-close:hover{color:var(--text-color,#333);transform:rotate(90deg)}
            .cookie-modal-body{padding:20px 24px}
            .cookie-option{display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid var(--border-color,rgba(224,224,224,0.3))}
            .cookie-option:last-child{border-bottom:none}
            .cookie-option-text{flex:1}
            .cookie-option-text strong{display:block;font-size:15px;margin-bottom:4px}
            .cookie-option-text small{font-size:12px;color:var(--text-secondary,#666);display:block;margin-bottom:6px}
            .cookie-warning{margin-top:8px;padding:8px 12px;background:rgba(209,52,56,0.1);border-left:3px solid #d13438;border-radius:6px;font-size:12px;color:#d13438}
            .cookie-warning i{margin-right:6px}
            .cookie-switch{position:relative;display:inline-block;width:48px;height:26px;flex-shrink:0}
            .cookie-switch input{opacity:0;width:0;height:0}
            .cookie-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:0.25s ${curve};border-radius:34px}
            .cookie-slider:before{position:absolute;content:"";height:20px;width:20px;left:3px;bottom:3px;background-color:white;transition:0.25s ${curve};border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.2)}
            input:checked + .cookie-slider{background-color:var(--primary-color,#16DA49)}
            input:checked + .cookie-slider:before{transform:translateX(22px)}
            input:disabled + .cookie-slider{opacity:0.6;cursor:not-allowed}
            .cookie-modal-footer{display:flex;gap:12px;padding:16px 24px;border-top:1px solid var(--border-color,rgba(224,224,224,0.5));flex-wrap:wrap}
            .cookie-modal-btn{flex:1;padding:10px 16px;border:none;border-radius:40px;cursor:pointer;font-size:14px;font-weight:500;transition:all 0.2s ${curve}}
            .cookie-modal-btn-accept{background:var(--primary-color,#16DA49);color:white}
            .cookie-modal-btn-accept:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(22,218,73,0.3)}
            .cookie-modal-btn-primary{background:var(--primary-color,#16DA49);color:white;opacity:0.85}
            .cookie-modal-btn-primary:hover{opacity:1;transform:translateY(-2px)}
            .cookie-modal-btn-decline{background:var(--secondary-color,#f0f0f0);color:var(--text-color,#333);border:1px solid var(--border-color,#ddd)}
            .cookie-modal-btn-decline:hover{background:var(--border-color,#e0e0e0);transform:translateY(-2px)}
            .cookie-modal-footer-links{text-align:center;padding:12px 24px 20px;font-size:12px;border-top:1px solid var(--border-color,rgba(224,224,224,0.3))}
            .cookie-modal-footer-links a{color:var(--primary-color,#16DA49);text-decoration:none;margin:0 6px}
            .cookie-modal-footer-links a:hover{text-decoration:underline}
            @media(max-width:560px){.cookie-modal-footer{flex-direction:column}.cookie-modal-btn{width:100%}}`;
        document.head.appendChild(s);
    }

    // ==============================================
    // 页面加载完成后再初始化
    // ==============================================
    function init() {
        const c = getConsent();
        if (!c) {
            setTimeout(showSimpleBanner, 500);
            return;
        }
        if (c.analytics) enableGA();
        else disableGA();
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(init, 100);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

})();