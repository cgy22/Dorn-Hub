// loading.js - Page loading overlay control

(function() {
    'use strict';

    /**
     * Loading Mask Control Module
     * Functionality: Controls the loading overlay display, progress indication, load interruption, etc.
     */

    function initLoadingMask() {
        console.log('Initializing loading mask...');
        
        const loadingMask = document.getElementById('loading-mask');
        const stopButton = document.getElementById('stop-button');
        const stopText = document.getElementById('stop-text');
        const body = document.body;
        
        if (!loadingMask) {
            console.error('Loading mask element not found');
            return;
        }
        
        console.log('Loading mask element found');
        
        // Get saved color settings
        const storedColor = localStorage.getItem('primaryColor') || '#16DA49';
        
        // Set CSS variables
        document.documentElement.style.setProperty('--loading-text-1-color', storedColor);
        document.documentElement.style.setProperty('--loading-text-2-bg', storedColor);
        
        // Initially hide stop button and hint text
        if (stopButton) stopButton.style.display = 'none';
        if (stopText) stopText.style.display = 'none';
        
        // Disable body scrolling while loading mask is visible
        body.style.overflow = 'hidden';
        
        let timer;
        
        // Set a timer to show stop button and hint text after 10 seconds
        timer = setTimeout(function() {
            console.log('Showing stop button');
            if (stopButton) stopButton.style.display = 'block';
            if (stopText) stopText.style.display = 'block';
        }, 10000);
        
        // Listen for stop loading button click event
        if (stopButton) {
            stopButton.addEventListener('click', function() {
                console.log('User clicked stop loading');
                clearTimeout(timer);
                window.stop();
                document.execCommand("Stop");
                removeLoadingMask();
            });
        }
        
        // Remove loading mask when page finishes loading
        function removeLoadingMask() {
            console.log('Removing loading mask');
            loadingMask.style.opacity = '0';
            body.style.overflow = 'auto';
            setTimeout(() => {
                loadingMask.style.display = 'none';
            }, 300);
        }
        
        // Listen for page load completion
        window.addEventListener('load', function() {
            console.log('Page load complete event triggered');
            clearTimeout(timer);
            removeLoadingMask();
        });
        
        // If page is already fully loaded, remove mask immediately
        if (document.readyState === 'complete') {
            console.log('Page already fully loaded, removing mask immediately');
            clearTimeout(timer);
            removeLoadingMask();
        }
    }
    
    // Multiple approaches to ensure initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOMContentLoaded event triggered');
            initLoadingMask();
        });
    } else {
        console.log('DOM already ready, initializing immediately');
        setTimeout(initLoadingMask, 0);
    }
    
    // Additional window.onload to capture all cases
    window.addEventListener('load', function() {
        console.log('window.load event triggered - fallback');
    });
    
})();
