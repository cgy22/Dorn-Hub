// loading.js - 页面加载遮罩控制

(function() {
    'use strict';

    /**
     * 加载遮罩控制模块
     * 功能: 控制页面加载时的遮罩显示、进度提示、中断加载等
     */

    function initLoadingMask() {
        console.log('初始化加载遮罩...');
        
        const loadingMask = document.getElementById('loading-mask');
        const stopButton = document.getElementById('stop-button');
        const stopText = document.getElementById('stop-text');
        const body = document.body;
        
        if (!loadingMask) {
            console.error('未找到加载遮罩元素');
            return;
        }
        
        console.log('找到加载遮罩元素');
        
        // 获取保存的颜色设置
        const storedColor = localStorage.getItem('primaryColor') || '#16DA49';
        
        // 设置CSS变量
        document.documentElement.style.setProperty('--loading-text-1-color', storedColor);
        document.documentElement.style.setProperty('--loading-text-2-bg', storedColor);
        
        // 初始时隐藏中断按钮和提示文字
        if (stopButton) stopButton.style.display = 'none';
        if (stopText) stopText.style.display = 'none';
        
        // 在加载遮罩显示时禁用body滚动
        body.style.overflow = 'hidden';
        
        let timer;
        
        // 设置一个定时器，在10秒后显示中断按钮和提示文字
        timer = setTimeout(function() {
            console.log('显示中断按钮');
            if (stopButton) stopButton.style.display = 'block';
            if (stopText) stopText.style.display = 'block';
        }, 10000);
        
        // 监听中断加载按钮的点击事件
        if (stopButton) {
            stopButton.addEventListener('click', function() {
                console.log('用户点击中断加载');
                clearTimeout(timer);
                window.stop();
                document.execCommand("Stop");
                removeLoadingMask();
            });
        }
        
        // 页面加载完成时移除遮罩
        function removeLoadingMask() {
            console.log('移除加载遮罩');
            loadingMask.style.opacity = '0';
            body.style.overflow = 'auto';
            setTimeout(() => {
                loadingMask.style.display = 'none';
            }, 300);
        }
        
        // 监听页面加载完成
        window.addEventListener('load', function() {
            console.log('页面加载完成事件触发');
            clearTimeout(timer);
            removeLoadingMask();
        });
        
        // 如果页面已经加载完成，立即移除遮罩
        if (document.readyState === 'complete') {
            console.log('页面已加载完成，立即移除遮罩');
            clearTimeout(timer);
            removeLoadingMask();
        }
    }
    
    // 多种方式确保初始化
    if (document.readyState === 'loading') {
        // 文档还在加载中，等待DOMContentLoaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOMContentLoaded事件触发');
            initLoadingMask();
        });
    } else {
        // DOM已经就绪，立即初始化
        console.log('DOM已就绪，立即初始化');
        setTimeout(initLoadingMask, 0);
    }
    
    // 额外添加window.onload确保捕获所有情况
    window.addEventListener('load', function() {
        console.log('window.load事件触发 - 备用');
        // 这里不需要重复执行，因为已经在initLoadingMask中处理了
    });
    
})();