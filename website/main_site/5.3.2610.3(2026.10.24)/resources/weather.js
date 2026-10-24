// weather.js - 天气模块（可复用）
// 文件位置: /resources/weather.js
//
// 使用方式（在页面底部引入并在 DOMContentLoaded 后调用）：
//   <script src="/resources/weather.js"></script>
//   <script>
//     document.addEventListener('DOMContentLoaded', function () {
//       Weather.init({
//         widgetSelector: '#weatherWidget',
//         modalSelector:  '#weatherModal',
//         bodySelector:   '#weatherModalBody'
//       });
//     });
//   </script>
//
// 依赖：
//   - window.UI（可选，用于通知）→ /resources/ui.js
//   - 全局 escapeHtml（可选，若不存在则内部兜底）
//   - .loading-spinner / .loading-spinner.spinner-sm（loading.css）
//
// 数据源：
//   - IP 定位：https://freeipapi.com/api/json
//   - 反向地理编码：https://nominatim.openstreetmap.org/reverse
//   - 天气：https://api.open-meteo.com/v1/forecast
//
// 设计：
//   - 所有请求带 AbortController 超时控制（8s）
//   - 加载失败时显示明确错误信息 + 重试按钮（绝不回退到测试数据）
//   - 定位结果缓存 30 分钟，天气数据缓存 10 分钟
//   - 反向地理编码失败时降级为“纬度, 经度”
//   - 定位模式（IP / 浏览器）通过单个按钮互相切换
//   - loading 视觉复用 .loading-spinner（小组件用 .spinner-sm）

(function (global) {
    'use strict';

    // ========== 常量 ==========
    var REQUEST_TIMEOUT = 8000;
    var LOCATION_CACHE_TTL = 30 * 60 * 1000;   // 30 分钟
    var WEATHER_CACHE_TTL  = 10 * 60 * 1000;   // 10 分钟

    var KEY_LOCATION      = 'weatherLocation';
    var KEY_LOCATION_TIME = 'weatherLocationTime';
    var KEY_LOCATION_MODE = 'weatherLocationMode'; // 'ip' | 'geo'
    var KEY_WEATHER_CACHE = 'weatherCache';
    var KEY_WEATHER_TIME  = 'weatherCacheTime';

    // ========== WMO 天气代码映射 ==========
    var WMO_MAP = {
        0:  { icon: 'fa-sun',                 text: '晴' },
        1:  { icon: 'fa-sun',                 text: '大部晴朗' },
        2:  { icon: 'fa-cloud-sun',           text: '多云' },
        3:  { icon: 'fa-cloud',               text: '阴' },
        45: { icon: 'fa-smog',                text: '雾' },
        48: { icon: 'fa-smog',                text: '雾凇' },
        51: { icon: 'fa-cloud-rain',          text: '小毛毛雨' },
        53: { icon: 'fa-cloud-rain',          text: '毛毛雨' },
        55: { icon: 'fa-cloud-rain',          text: '大毛毛雨' },
        56: { icon: 'fa-cloud-rain',          text: '冻毛毛雨' },
        57: { icon: 'fa-cloud-rain',          text: '强冻毛毛雨' },
        61: { icon: 'fa-cloud-rain',          text: '小雨' },
        63: { icon: 'fa-cloud-rain',          text: '中雨' },
        65: { icon: 'fa-cloud-showers-heavy', text: '大雨' },
        66: { icon: 'fa-cloud-rain',          text: '冻雨' },
        67: { icon: 'fa-cloud-showers-heavy', text: '强冻雨' },
        71: { icon: 'fa-snowflake',           text: '小雪' },
        73: { icon: 'fa-snowflake',           text: '中雪' },
        75: { icon: 'fa-snowflake',           text: '大雪' },
        77: { icon: 'fa-snowflake',           text: '雪粒' },
        80: { icon: 'fa-cloud-rain',          text: '阵雨' },
        81: { icon: 'fa-cloud-rain',          text: '强阵雨' },
        82: { icon: 'fa-cloud-showers-heavy', text: '暴雨' },
        85: { icon: 'fa-snowflake',           text: '阵雪' },
        86: { icon: 'fa-snowflake',           text: '强阵雪' },
        95: { icon: 'fa-cloud-bolt',          text: '雷阵雨' },
        96: { icon: 'fa-cloud-bolt',          text: '雷阵雨伴小冰雹' },
        99: { icon: 'fa-cloud-bolt',          text: '雷阵雨伴大冰雹' }
    };

    // ========== 工具函数 ==========
    function getWeatherInfo(code) {
        return WMO_MAP[code] || { icon: 'fa-cloud', text: '未知' };
    }

    function degreeToWindDirection(deg) {
        if (deg === null || deg === undefined || isNaN(deg)) return '--';
        var dirs = ['北', '东北偏北', '东北', '东北偏东', '东', '东南偏东', '东南', '东南偏南',
                    '南', '西南偏南', '西南', '西南偏西', '西', '西北偏西', '西北', '西北偏北'];
        var idx = Math.round((deg % 360) / 22.5) % 16;
        return dirs[idx];
    }

    function localEscapeHtml(str) {
        if (str === null || str === undefined) return '';
        if (typeof global.escapeHtml === 'function') return global.escapeHtml(str);
        return String(str).replace(/[&<>"']/g, function (m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }

    function notify(type, msg) {
        if (global.UI && typeof global.UI[type] === 'function') {
            global.UI[type](msg);
        } else if (global.showNotification) {
            global.showNotification(msg, type);
        }
    }

    function fetchWithTimeout(url, options, timeout) {
        timeout = timeout || REQUEST_TIMEOUT;
        var controller = new AbortController();
        var timer = setTimeout(function () { controller.abort(); }, timeout);
        var opts = Object.assign({}, options || {}, { signal: controller.signal });
        return fetch(url, opts).finally(function () { clearTimeout(timer); });
    }

    // ========== 定位 ==========
    function readCachedLocation() {
        try {
            var raw = localStorage.getItem(KEY_LOCATION);
            var t = parseInt(localStorage.getItem(KEY_LOCATION_TIME) || '0', 10);
            if (!raw || !t) return null;
            if (Date.now() - t > LOCATION_CACHE_TTL) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function writeCachedLocation(loc) {
        try {
            localStorage.setItem(KEY_LOCATION, JSON.stringify(loc));
            localStorage.setItem(KEY_LOCATION_TIME, String(Date.now()));
        } catch (e) { /* 忽略配额错误 */ }
    }

    // IP 定位
    async function locateByIP() {
        var res = await fetchWithTimeout('https://freeipapi.com/api/json');
        if (!res.ok) throw new Error('IP 定位请求失败（HTTP ' + res.status + '）');
        var data = await res.json();
        if (typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
            throw new Error('IP 定位未返回有效坐标');
        }
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            city: data.cityName || '',
            region: data.regionName || '',
            country: data.countryName || '',
            mode: 'ip'
        };
    }

    // 浏览器地理定位
    function locateByGeo() {
        return new Promise(function (resolve, reject) {
            if (!navigator.geolocation) {
                reject(new Error('当前浏览器不支持地理定位'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                function (pos) {
                    resolve({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        city: '',
                        region: '',
                        country: '',
                        mode: 'geo'
                    });
                },
                function (err) {
                    var msg = '获取位置失败';
                    if (err && err.code === 1) msg = '您拒绝了位置权限';
                    else if (err && err.code === 2) msg = '无法获取位置信息';
                    else if (err && err.code === 3) msg = '获取位置超时';
                    reject(new Error(msg));
                },
                { timeout: REQUEST_TIMEOUT, enableHighAccuracy: false, maximumAge: 5 * 60 * 1000 }
            );
        });
    }

    // 反向地理编码（失败不阻断，降级为坐标字符串）
    async function reverseGeocode(lat, lon) {
        try {
            var url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
                      encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) +
                      '&zoom=10&accept-language=zh-CN';
            var res = await fetchWithTimeout(url, {
                headers: { 'Accept': 'application/json' }
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            var data = await res.json();
            var addr = (data && data.address) || {};
            var city = addr.city || addr.town || addr.village || addr.county || addr.state || '';
            var country = addr.country || '';
            return { city: city, country: country };
        } catch (e) {
            return { city: '', country: '' };
        }
    }

    // 解析展示用位置文本
    function formatLocationText(loc) {
        if (!loc) return '';
        if (loc.city) return loc.city + (loc.country ? '，' + loc.country : '');
        if (loc.mode === 'geo') return '纬度 ' + loc.latitude.toFixed(2) + '，经度 ' + loc.longitude.toFixed(2);
        return '';
    }

    // ========== 天气 ==========
    function readCachedWeather() {
        try {
            var raw = localStorage.getItem(KEY_WEATHER_CACHE);
            var t = parseInt(localStorage.getItem(KEY_WEATHER_TIME) || '0', 10);
            if (!raw || !t) return null;
            if (Date.now() - t > WEATHER_CACHE_TTL) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function writeCachedWeather(data) {
        try {
            localStorage.setItem(KEY_WEATHER_CACHE, JSON.stringify(data));
            localStorage.setItem(KEY_WEATHER_TIME, String(Date.now()));
        } catch (e) { /* 忽略配额错误 */ }
    }

    async function fetchWeather(lat, lon) {
        var url = 'https://api.open-meteo.com/v1/forecast' +
                  '?latitude=' + encodeURIComponent(lat) +
                  '&longitude=' + encodeURIComponent(lon) +
                  '&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m' +
                  '&hourly=temperature_2m,precipitation,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m' +
                  '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant' +
                  '&timezone=auto&forecast_days=6&forecast_hours=24';
        var res = await fetchWithTimeout(url);
        if (!res.ok) throw new Error('天气数据请求失败（HTTP ' + res.status + '）');
        var data = await res.json();
        if (!data || !data.current) throw new Error('天气数据格式异常');
        return data;
    }

    // ========== 渲染 ==========
    function iconHTML(iconClass) {
        return '<i class="fas ' + iconClass + '"></i>';
    }

    // 小组件图标槽统一由 innerHTML 重写，避免依赖初始 DOM 的 <i id="weatherWidgetIcon">
    function renderWidget(weather, location, state) {
        var widget = document.querySelector(this._selectors.widget);
        if (!widget) return;
        var iconWrap = widget.querySelector('.weather-widget-icon');
        var textEl = widget.querySelector('#weatherWidgetText');
        widget.classList.remove('loading', 'error', 'ok');

        if (state === 'loading') {
            widget.classList.add('loading');
            // 复用 .loading-spinner 的迷你版，与模态框同源动画
            if (iconWrap) {
                iconWrap.innerHTML = '<span class="loading-spinner spinner-sm"></span>';
            }
            if (textEl) textEl.textContent = '加载中';
            widget.title = '正在获取天气…';
            return;
        }
        if (state === 'error') {
            widget.classList.add('error');
            if (iconWrap) {
                iconWrap.innerHTML = '<i class="fas fa-triangle-exclamation" id="weatherWidgetIcon"></i>';
            }
            if (textEl) textEl.textContent = '天气';
            widget.title = '天气加载失败，点击查看详情';
            return;
        }
        // ok
        widget.classList.add('ok');
        var cur = weather.current;
        var info = getWeatherInfo(cur.weather_code);
        if (iconWrap) {
            iconWrap.innerHTML = '<i class="fas ' + info.icon + '" id="weatherWidgetIcon"></i>';
        }
        if (textEl) {
            textEl.textContent = Math.round(cur.temperature_2m) + '°C';
        }
        var locText = formatLocationText(location || {});
        widget.title = '天气' + (locText ? '：' + locText : '');
    }

    function renderLoadingBody(bodyEl) {
        bodyEl.innerHTML =
            '<div class="weather-state">' +
                '<div class="loading-spinner" style="margin:0 auto 18px;"></div>' +
                '<div class="weather-state-title">正在获取天气…</div>' +
                '<div class="weather-state-desc">加载可能需要几秒钟，请稍候。</div>' +
            '</div>';
    }

    function renderErrorBody(bodyEl, message, canRetry) {
        var mode = 'ip';
        try { mode = localStorage.getItem(KEY_LOCATION_MODE) || 'ip'; } catch (e) {}
        var switchLabel = (mode === 'geo') ? '使用 IP 定位' : '使用当前位置';
        var switchIcon  = (mode === 'geo') ? 'fa-network-wired' : 'fa-location-crosshairs';
        var nextMode    = (mode === 'geo') ? 'ip' : 'geo';

        bodyEl.innerHTML =
            '<div class="weather-state error">' +
                '<i class="fas fa-triangle-exclamation weather-state-icon"></i>' +
                '<div class="weather-state-title">天气加载失败</div>' +
                '<div class="weather-state-desc">' + localEscapeHtml(message || '未知错误') + '</div>' +
                '<div class="weather-state-actions">' +
                    (canRetry ? '<button type="button" class="btn btn-primary" id="weatherRetryBtn"><i class="fas fa-rotate-right"></i> 重试</button>' : '') +
                    '<button type="button" class="btn btn-secondary" id="weatherSwitchLocateBtn" data-next-mode="' + nextMode + '"><i class="fas ' + switchIcon + '"></i> ' + switchLabel + '</button>' +
                '</div>' +
            '</div>';

        var self = this;
        var retryBtn = bodyEl.querySelector('#weatherRetryBtn');
        if (retryBtn) retryBtn.addEventListener('click', function () { self.refresh(true); });
        var switchBtn = bodyEl.querySelector('#weatherSwitchLocateBtn');
        if (switchBtn) {
            switchBtn.addEventListener('click', function () {
                self._locateAndLoad(switchBtn.getAttribute('data-next-mode') || 'ip', true);
            });
        }
    }

    function renderWeatherBody(bodyEl, weather, location, currentMode) {
        var cur = weather.current;
        var curInfo = getWeatherInfo(cur.weather_code);
        var locText = formatLocationText(location || {});
        var modeText = currentMode === 'geo' ? '浏览器定位' : 'IP 定位';

        // 头部
        var html = '';
        html += '<div class="weather-hero">';
        html +=   '<div class="weather-hero-row">';
        html +=     '<div class="weather-hero-icon">' + iconHTML(curInfo.icon) + '</div>';
        html +=     '<div class="weather-hero-main">';
        html +=       '<div class="weather-hero-temp">' + Math.round(cur.temperature_2m) + '°C</div>';
        html +=       '<div class="weather-hero-desc">' + localEscapeHtml(curInfo.text) +
                        (cur.relative_humidity_2m !== undefined ? ' · 湿度 ' + cur.relative_humidity_2m + '%' : '') +
                        (cur.wind_speed_10m !== undefined ? ' · 风速 ' + cur.wind_speed_10m + ' km/h' : '') +
                      '</div>';
        html +=       '<div class="weather-hero-location"><i class="fas fa-location-dot"></i>' +
                        localEscapeHtml(locText || '未知位置') +
                        '<span style="opacity:.6">（' + modeText + '）</span>' +
                      '</div>';
        html +=     '</div>';
        html +=   '</div>';

        // 操作区（单个切换按钮 + 刷新）
        html +=   '<div class="weather-hero-actions">';
        if (currentMode === 'geo') {
            html += '<button type="button" class="btn btn-primary" id="weatherSwitchLocateBtn" data-next-mode="ip"><i class="fas fa-network-wired"></i> 使用 IP 定位</button>';
        } else {
            html += '<button type="button" class="btn btn-primary" id="weatherSwitchLocateBtn" data-next-mode="geo"><i class="fas fa-location-crosshairs"></i> 使用当前位置</button>';
        }
        html +=     '<button type="button" class="btn btn-secondary" id="weatherRefreshBtn"><i class="fas fa-rotate-right"></i> 刷新</button>';
        html +=   '</div>';
        html += '</div>';

        // tabs
        html += '<div class="weather-tabs-wrapper">';
        html +=   '<button type="button" class="update-tab active" data-wtab="hourly">未来 5 小时</button>';
        html +=   '<button type="button" class="update-tab" data-wtab="daily">未来 5 天</button>';
        html += '</div>';

        // 面板
        html += '<div class="weather-panels">';
        html +=   '<div class="weather-panel" data-wpanel="hourly">' + buildHourlyHTML(weather) + '</div>';
        html +=   '<div class="weather-panel" data-wpanel="daily" style="display:none;">' + buildDailyHTML(weather) + '</div>';
        html += '</div>';

        // 脚注
        html += '<div class="weather-footnote">' +
                    '<p>> 所有日期和时间均为你所在地区的时间。</p>' +
                    '<p>> 地理位置（IP 定位）信息来源于 <a href="https://freeipapi.com/" target="_blank" rel="noopener noreferrer">Free IP API</a>。</p>' +
                    '<p>> 城市名称的反向地理编码服务由 <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noopener noreferrer">Nominatim (OpenStreetMap)</a> 提供。</p>' +
                    '<p>> 天气预报数据来源于 <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>。</p>' +
                '</div>';

        bodyEl.innerHTML = html;

        var self = this;

        // tabs 切换
        var tabs = bodyEl.querySelectorAll('.update-tab[data-wtab]');
        var panels = bodyEl.querySelectorAll('.weather-panel[data-wpanel]');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var key = tab.getAttribute('data-wtab');
                tabs.forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');
                panels.forEach(function (p) {
                    p.style.display = (p.getAttribute('data-wpanel') === key) ? 'block' : 'none';
                });
            });
        });

        // 刷新
        var refreshBtn = bodyEl.querySelector('#weatherRefreshBtn');
        if (refreshBtn) refreshBtn.addEventListener('click', function () { self.refresh(true); });

        // 切换定位模式（单个按钮，根据 data-next-mode 切到另一边）
        var switchBtn = bodyEl.querySelector('#weatherSwitchLocateBtn');
        if (switchBtn) {
            switchBtn.addEventListener('click', function () {
                self._locateAndLoad(switchBtn.getAttribute('data-next-mode') || 'ip', true);
            });
        }
    }

    function pad2(n) { return n < 10 ? '0' + n : '' + n; }

    function buildHourlyHTML(weather) {
        var hourly = weather.hourly || {};
        var times = hourly.time || [];
        var temps = hourly.temperature_2m || [];
        var precs = hourly.precipitation || [];
        var probs = hourly.precipitation_probability || [];
        var winds = hourly.wind_speed_10m || [];
        var windDirs = hourly.wind_direction_10m || [];
        var codes = hourly.weather_code || [];

        // 从当前时间起取 5 个未来小时
        var now = new Date();
        var startIdx = 0;
        for (var i = 0; i < times.length; i++) {
            var t = new Date(times[i]);
            if (t.getTime() >= now.getTime() - 60 * 60 * 1000) { startIdx = i; break; }
        }
        var count = Math.min(5, times.length - startIdx);

        if (count <= 0) {
            return '<div class="weather-state"><div class="weather-state-title">暂无逐小时数据</div></div>';
        }

        function colHeader(label, icon) {
            return '<div class="weather-cell label"><i class="fas ' + icon + '"></i>' + label + '</div>';
        }
        function timeCell(iso) {
            var d = new Date(iso);
            return '<div class="weather-cell value">' + pad2(d.getHours()) + ':00</div>';
        }
        function valueCell(v, unit) {
            return '<div class="weather-cell value">' + v + (unit || '') + '</div>';
        }
        function weatherCell(code) {
            var info = getWeatherInfo(code);
            return '<div class="weather-cell value"><span class="cell-icon">' + iconHTML(info.icon) + '</span><span class="cell-sub">' + localEscapeHtml(info.text) + '</span></div>';
        }

        var out = '<div class="weather-table">';
        // 时间
        out += colHeader('时间', 'fa-clock');
        for (var j = 0; j < count; j++) out += timeCell(times[startIdx + j]);
        // 天气
        out += colHeader('天气', 'fa-cloud-sun');
        for (var j = 0; j < count; j++) out += weatherCell(codes[startIdx + j]);
        // 温度
        out += colHeader('温度', 'fa-temperature-half');
        for (var j = 0; j < count; j++) out += valueCell(Math.round(temps[startIdx + j]), '°C');
        // 降水量
        out += colHeader('降水量', 'fa-droplet');
        for (var j = 0; j < count; j++) out += valueCell(precs[startIdx + j], ' mm');
        // 降水概率
        out += colHeader('降水概率', 'fa-umbrella');
        for (var j = 0; j < count; j++) out += valueCell(probs[startIdx + j], '%');
        // 风
        out += colHeader('风向/风速', 'fa-wind');
        for (var j = 0; j < count; j++) {
            var dir = degreeToWindDirection(windDirs[startIdx + j]);
            out += '<div class="weather-cell value">' + dir + '<span class="cell-sub">' + winds[startIdx + j] + ' km/h</span></div>';
        }
        out += '</div>';
        return out;
    }

    function buildDailyHTML(weather) {
        var daily = weather.daily || {};
        var times = daily.time || [];
        var codes = daily.weather_code || [];
        var tmax = daily.temperature_2m_max || [];
        var tmin = daily.temperature_2m_min || [];
        var probs = daily.precipitation_probability_max || [];
        var winds = daily.wind_speed_10m_max || [];
        var windDirs = daily.wind_direction_10m_dominant || [];

        var count = Math.min(5, times.length);
        if (count <= 0) {
            return '<div class="weather-state"><div class="weather-state-title">暂无逐日数据</div></div>';
        }

        function colHeader(label, icon) {
            return '<div class="weather-cell label"><i class="fas ' + icon + '"></i>' + label + '</div>';
        }
        function dateCell(iso) {
            var d = new Date(iso + 'T00:00:00');
            var mm = pad2(d.getMonth() + 1);
            var dd = pad2(d.getDate());
            return '<div class="weather-cell value">' + mm + '-' + dd + '<span class="cell-sub">周' + '日一二三四五六'[d.getDay()] + '</span></div>';
        }
        function weatherCell(code) {
            var info = getWeatherInfo(code);
            return '<div class="weather-cell value"><span class="cell-icon">' + iconHTML(info.icon) + '</span><span class="cell-sub">' + localEscapeHtml(info.text) + '</span></div>';
        }
        function valueCell(v, unit) {
            return '<div class="weather-cell value">' + v + (unit || '') + '</div>';
        }

        var out = '<div class="weather-table">';
        out += colHeader('日期', 'fa-calendar');
        for (var j = 0; j < count; j++) out += dateCell(times[j]);
        out += colHeader('天气', 'fa-cloud-sun');
        for (var j = 0; j < count; j++) out += weatherCell(codes[j]);
        out += colHeader('高温', 'fa-temperature-high');
        for (var j = 0; j < count; j++) out += valueCell(Math.round(tmax[j]), '°C');
        out += colHeader('低温', 'fa-temperature-low');
        for (var j = 0; j < count; j++) out += valueCell(Math.round(tmin[j]), '°C');
        out += colHeader('降水概率', 'fa-umbrella');
        for (var j = 0; j < count; j++) out += valueCell(probs[j], '%');
        out += colHeader('风向/风速', 'fa-wind');
        for (var j = 0; j < count; j++) {
            var dir = degreeToWindDirection(windDirs[j]);
            out += '<div class="weather-cell value">' + dir + '<span class="cell-sub">' + winds[j] + ' km/h</span></div>';
        }
        out += '</div>';
        return out;
    }

    // ========== 主模块 ==========
    var WeatherModule = {
        _selectors: { widget: '#weatherWidget', modal: '#weatherModal', body: '#weatherModalBody' },
        _weather: null,
        _location: null,
        _busy: false,

        init: function (options) {
            options = options || {};
            if (options.widgetSelector) this._selectors.widget = options.widgetSelector;
            if (options.modalSelector)  this._selectors.modal  = options.modalSelector;
            if (options.bodySelector)   this._selectors.body   = options.bodySelector;

            this._bindWidgetClick();
            this._bindModalClose();

            // 首屏预加载小组件数据（静默，不影响页面）
            this._updateWidgetFromCacheOrFetch();

            return this;
        },

        _bindWidgetClick: function () {
            var self = this;
            var widget = document.querySelector(this._selectors.widget);
            var modal = document.querySelector(this._selectors.modal);
            if (!widget || !modal) return;
            widget.addEventListener('click', function () {
                modal.style.display = 'flex';
                self._renderModal();
            });
        },

        _bindModalClose: function () {
            var modal = document.querySelector(this._selectors.modal);
            if (!modal) return;
            var closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function () { modal.style.display = 'none'; });
            }
            modal.addEventListener('click', function (e) {
                if (e.target === modal) modal.style.display = 'none';
            });
        },

        _isModalOpen: function () {
            var modal = document.querySelector(this._selectors.modal);
            return !!(modal && modal.style.display !== 'none' && modal.style.display !== '');
        },

        _getBodyEl: function () {
            return document.querySelector(this._selectors.body);
        },

        // 小组件：优先用缓存渲染，否则静默加载
        _updateWidgetFromCacheOrFetch: function () {
            var cachedW = readCachedWeather();
            var cachedL = readCachedLocation();
            if (cachedW && cachedL) {
                this._weather = cachedW;
                this._location = cachedL;
                renderWidget.call(this, cachedW, cachedL, 'ok');
                return;
            }
            // 没有缓存，静默加载（不弹错误，只让小组件显示 loading/error 状态）
            this._load(false).catch(function () { /* 小组件已呈现 error 状态 */ });
        },

        // 核心加载
        // forceRefresh = true 时忽略缓存
        _load: async function (forceRefresh) {
            if (this._busy) return;
            this._busy = true;
            try {
                var bodyEl = this._getBodyEl();
                var interactive = this._isModalOpen();

                if (interactive && bodyEl) renderLoadingBody(bodyEl);
                renderWidget.call(this, null, null, 'loading');

                // 1) 获取位置
                var location = null;
                if (!forceRefresh) {
                    location = readCachedLocation();
                }
                if (!location) {
                    var mode = 'ip';
                    try { mode = localStorage.getItem(KEY_LOCATION_MODE) || 'ip'; } catch (e) {}
                    if (mode === 'geo') {
                        location = await locateByGeo();
                    } else {
                        location = await locateByIP();
                    }
                    // 反地理编码（geo 模式下也做，用于补城市名）
                    if (!location.city) {
                        var geo = await reverseGeocode(location.latitude, location.longitude);
                        if (geo.city) location.city = geo.city;
                        if (geo.country) location.country = geo.country;
                    }
                    writeCachedLocation(location);
                    try { localStorage.setItem(KEY_LOCATION_MODE, location.mode || 'ip'); } catch (e) {}
                }

                this._location = location;

                // 2) 获取天气
                var weather = null;
                if (!forceRefresh) weather = readCachedWeather();
                if (!weather) {
                    weather = await fetchWeather(location.latitude, location.longitude);
                    writeCachedWeather(weather);
                }

                this._weather = weather;

                // 3) 渲染
                renderWidget.call(this, weather, location, 'ok');
                if (interactive && bodyEl) {
                    renderWeatherBody.call(this, bodyEl, weather, location, location.mode || 'ip');
                }

                // 事件
                try {
                    document.dispatchEvent(new CustomEvent('weatherUpdated', {
                        detail: { weather: weather, location: location }
                    }));
                } catch (e) {}
            } catch (err) {
                var msg = (err && err.message) ? err.message : '未知错误';
                renderWidget.call(this, null, null, 'error');
                var bodyEl2 = this._getBodyEl();
                if (this._isModalOpen() && bodyEl2) {
                    renderErrorBody.call(this, bodyEl2, msg, true);
                    notify('error', '天气加载失败：' + msg);
                }
                throw err;
            } finally {
                this._busy = false;
            }
        },

        // 打开弹窗时渲染（缓存优先）
        _renderModal: function () {
            var bodyEl = this._getBodyEl();
            if (!bodyEl) return;

            if (this._weather && this._location) {
                renderWeatherBody.call(this, bodyEl, this._weather, this._location, this._location.mode || 'ip');
                // 如果缓存已过期，后台静默刷新
                var w = readCachedWeather();
                var l = readCachedLocation();
                if (!w || !l) {
                    this._load(true).catch(function () {});
                }
                return;
            }

            renderLoadingBody(bodyEl);
            this._load(false).catch(function () { /* 错误已渲染 */ });
        },

        // 切换定位模式并强制加载（关键：写模式 + 清定位和天气缓存）
        _locateAndLoad: async function (mode, forceRefresh) {
            try { localStorage.setItem(KEY_LOCATION_MODE, mode); } catch (e) {}
            if (forceRefresh) {
                try {
                    localStorage.removeItem(KEY_LOCATION);
                    localStorage.removeItem(KEY_LOCATION_TIME);
                    localStorage.removeItem(KEY_WEATHER_CACHE);
                    localStorage.removeItem(KEY_WEATHER_TIME);
                } catch (e) {}
            }
            return this._load(true);
        },

        // 公共 API
        refresh: function (force) {
            return this._load(!!force);
        },
        getWeather: function () { return this._weather; },
        getLocation: function () { return this._location; },
        setMode: function (mode) {
            return this._locateAndLoad(mode === 'geo' ? 'geo' : 'ip', true);
        }
    };

    global.Weather = WeatherModule;
})(window);