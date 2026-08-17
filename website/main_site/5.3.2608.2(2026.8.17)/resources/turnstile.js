/**
 * Cloudflare Turnstile 统一管理模块
 * 自动在包含 data-turnstile 属性的表单中注入验证组件
 * 
 * 支持彩蛋：在身份证号输入框中输入 "我喜欢喝刺梨汁" 可跳过 Turnstile 验证
 */

const TurnstileManager = (function() {
    // 配置
    const SITE_KEY = '0x4AAAAAAC2E9TsjP-02HPpE';
    const VERIFY_API = '/php/verify_turnstile.php';
    
    // 彩蛋关键词
    const EASTER_EGG_KEYWORD = '我喜欢喝刺梨汁';
    
    // 存储已初始化的容器
    let initializedContainers = new Set();
    
    /**
     * 在指定容器中渲染 Turnstile
     */
    function render(container, callback) {
        if (!container || initializedContainers.has(container)) return;
        
        // 检查是否已有 Turnstile 实例
        if (container.querySelector('iframe')) return;
        
        turnstile.render(container, {
            sitekey: SITE_KEY,
            callback: function(token) {
                if (callback) callback(token);
                // 触发自定义事件
                container.dispatchEvent(new CustomEvent('turnstile-success', { detail: { token } }));
            },
            'error-callback': function() {
                container.dispatchEvent(new CustomEvent('turnstile-error'));
            },
            'expired-callback': function() {
                container.dispatchEvent(new CustomEvent('turnstile-expired'));
            }
        });
        
        initializedContainers.add(container);
    }
    
    /**
     * 重置指定容器中的 Turnstile
     */
    function reset(container) {
        if (container && typeof turnstile !== 'undefined') {
            turnstile.reset(container);
        }
    }
    
    /**
     * 通过选择器重置 Turnstile
     */
    function resetBySelector(selector) {
        const container = document.querySelector(selector);
        if (container) reset(container);
    }
    
    /**
     * 获取表单中的 Turnstile token
     */
    function getToken(form) {
        const tokenInput = form.querySelector('[name="cf-turnstile-response"]');
        return tokenInput ? tokenInput.value : null;
    }
    
    /**
     * 验证 token（调用后端）
     */
    async function verify(token) {
        if (!token) return { success: false, message: '缺少验证 token' };
        
        // 彩蛋 token 直接通过
        if (token === 'easter_egg_skip') {
            return { success: true, easter_egg: true };
        }
        
        try {
            const response = await fetch(VERIFY_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            });
            return await response.json();
        } catch (error) {
            console.error('Turnstile 验证失败:', error);
            return { success: false, message: '网络错误' };
        }
    }
    
    /**
     * 显示错误提示
     */
    function showError(container, message) {
        // 移除已有的错误提示
        const existingError = container.parentNode?.querySelector('.turnstile-error');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'turnstile-error';
        errorDiv.style.cssText = `
            color: #d13438;
            font-size: 12px;
            margin-top: 8px;
            text-align: center;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        container.parentNode?.insertBefore(errorDiv, container.nextSibling);
        
        // 3秒后自动消失
        setTimeout(() => errorDiv.remove(), 3000);
    }
    
    /**
     * ========== 彩蛋检测函数 ==========
     * 检查表单中是否包含彩蛋关键词
     */
    function checkEasterEgg(form) {
        // 检查身份证号输入框
        const queryIdInput = form.querySelector('#query-id-number');
        if (queryIdInput && queryIdInput.value.trim() === EASTER_EGG_KEYWORD) {
            return true;
        }
        return false;
    }
    
    /**
     * 自动扫描并初始化页面中所有需要 Turnstile 的表单
     */
    function autoInit() {
        if (typeof turnstile === 'undefined') {
            console.warn('Turnstile 脚本未加载，稍后重试...');
            const checkInterval = setInterval(function() {
                if (typeof turnstile !== 'undefined') {
                    clearInterval(checkInterval);
                    doAutoInit();
                }
            }, 100);
            return;
        }
        doAutoInit();
    }
    
    function doAutoInit() {
        // 查找所有标记了 data-turnstile 的表单
        const forms = document.querySelectorAll('form[data-turnstile]');
        
        forms.forEach(form => {
            const containerSelector = form.getAttribute('data-turnstile');
            if (!containerSelector) return;
            
            const container = form.querySelector(containerSelector);
            if (!container) return;
            
            // 渲染验证组件
            render(container);
            
            // 拦截表单提交
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // ========== 彩蛋检测（优先） ==========
                if (checkEasterEgg(form)) {
                    console.log('🎉 彩蛋触发，跳过 Turnstile 验证');
                    // 直接触发 turnstile-verified 事件，传递彩蛋标记
                    const customEvent = new CustomEvent('turnstile-verified', { 
                        detail: { token: 'easter_egg_skip', easter_egg: true } 
                    });
                    form.dispatchEvent(customEvent);
                    return;
                }
                
                const token = getToken(form);
                
                if (!token) {
                    showError(container, '请完成人机验证');
                    return false;
                }
                
                const result = await verify(token);
                
                if (!result.success) {
                    showError(container, result.message || '人机验证失败，请重试');
                    reset(container);
                    return false;
                }
                
                // 验证通过，触发表单的自定义提交事件
                const customEvent = new CustomEvent('turnstile-verified', { detail: { token } });
                form.dispatchEvent(customEvent);
            });
        });
    }
    
    /**
     * 手动初始化单个表单
     */
    function initForm(form, containerSelector) {
        if (!form) return;
        
        const container = form.querySelector(containerSelector);
        if (!container) return;
        
        render(container);
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // ========== 彩蛋检测 ==========
            if (checkEasterEgg(form)) {
                const customEvent = new CustomEvent('turnstile-verified', { 
                    detail: { token: 'easter_egg_skip', easter_egg: true } 
                });
                form.dispatchEvent(customEvent);
                return;
            }
            
            const token = getToken(form);
            
            if (!token) {
                showError(container, '请完成人机验证');
                return;
            }
            
            const result = await verify(token);
            
            if (!result.success) {
                showError(container, result.message || '人机验证失败，请重试');
                reset(container);
            }
        });
    }
    
    // 公开 API
    return {
        render: render,
        reset: reset,
        resetBySelector: resetBySelector,
        getToken: getToken,
        verify: verify,
        autoInit: autoInit,
        initForm: initForm,
        // 彩蛋检测函数（用于调试）
        checkEasterEgg: checkEasterEgg
    };
})();

// 页面加载完成后自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        TurnstileManager.autoInit();
    });
} else {
    TurnstileManager.autoInit();
}