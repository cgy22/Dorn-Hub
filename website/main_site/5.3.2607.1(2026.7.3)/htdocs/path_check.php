<?php
/**
 * path_check.php
 * 路径检测工具 - 运行一次显示当前目录及服务器信息
 * 使用方式：通过浏览器访问 或 命令行运行 php path_check.php
 */

echo "<!DOCTYPE html>\n";
echo "<html lang='zh-CN'>\n";
echo "<head>\n";
echo "    <meta charset='UTF-8'>\n";
echo "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n";
echo "    <title>路径检测工具</title>\n";
echo "    <style>\n";
echo "        body { font-family: 'Segoe UI', sans-serif; max-width: 900px; margin: 40px auto; padding: 20px; background: #f5f5f5; }\n";
echo "        .container { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }\n";
echo "        h1 { color: #16DA49; margin-top: 0; border-bottom: 2px solid #16DA49; padding-bottom: 15px; }\n";
echo "        .info-item { padding: 12px 15px; margin: 8px 0; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #16DA49; }\n";
echo "        .info-item strong { display: inline-block; min-width: 180px; color: #333; }\n";
echo "        .info-item .value { color: #0078d4; word-break: break-all; font-family: monospace; }\n";
echo "        .section { margin: 25px 0 15px; padding: 12px; background: #e8f5e9; border-radius: 6px; }\n";
echo "        .section-title { font-weight: bold; color: #2e7d32; }\n";
echo "        .file-list { max-height: 300px; overflow-y: auto; background: #f8f9fa; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 13px; }\n";
echo "        .file-list .dir { color: #0078d4; }\n";
echo "        .file-list .file { color: #333; }\n";
echo "        .file-list .html { color: #16DA49; font-weight: bold; }\n";
echo "        .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: bold; }\n";
echo "        .badge-green { background: #16DA49; color: white; }\n";
echo "        .badge-blue { background: #0078d4; color: white; }\n";
echo "        .badge-orange { background: #ff8c00; color: white; }\n";
echo "        .badge-red { background: #d13438; color: white; }\n";
echo "        .footer { margin-top: 25px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 13px; }\n";
echo "        .copy-btn { background: #0078d4; color: white; border: none; padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }\n";
echo "        .copy-btn:hover { background: #005a9e; }\n";
echo "    </style>\n";
echo "</head>\n";
echo "<body>\n";
echo "<div class='container'>\n";

// ============================================================
// 1. 基础路径信息
// ============================================================
echo "<h1>📂 路径检测报告</h1>\n";
echo "<div style='color: #666; margin-bottom: 20px;'>生成时间: " . date('Y-m-d H:i:s') . "</div>\n";

echo "<div class='section'>\n";
echo "    <span class='section-title'>📌 当前文件信息</span>\n";
echo "</div>\n";

$paths = [
    '当前脚本完整路径' => __FILE__,
    '当前脚本所在目录' => __DIR__,
    '当前脚本文件名' => basename(__FILE__),
];

foreach ($paths as $label => $value) {
    echo "<div class='info-item'>\n";
    echo "    <strong>$label:</strong>\n";
    echo "    <span class='value'>$value</span>\n";
    echo "</div>\n";
}

// ============================================================
// 2. 服务器信息
// ============================================================
echo "<div class='section'>\n";
echo "    <span class='section-title'>🖥️ 服务器信息</span>\n";
echo "</div>\n";

$serverInfo = [
    '文档根目录 (DOCUMENT_ROOT)' => $_SERVER['DOCUMENT_ROOT'] ?? '未设置',
    '服务器软件' => $_SERVER['SERVER_SOFTWARE'] ?? '未知',
    '服务器域名' => $_SERVER['SERVER_NAME'] ?? '未知',
    '当前请求URL' => (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . 
                     '://' . ($_SERVER['HTTP_HOST'] ?? '') . ($_SERVER['REQUEST_URI'] ?? ''),
    'PHP版本' => phpversion(),
    '内存限制' => ini_get('memory_limit'),
    '最大执行时间' => ini_get('max_execution_time') . '秒',
    '最大上传大小' => ini_get('upload_max_filesize'),
];

foreach ($serverInfo as $label => $value) {
    echo "<div class='info-item'>\n";
    echo "    <strong>$label:</strong>\n";
    echo "    <span class='value'>" . htmlspecialchars($value) . "</span>\n";
    echo "</div>\n";
}

// ============================================================
// 3. 父目录结构（显示当前目录及兄弟目录）
// ============================================================
echo "<div class='section'>\n";
echo "    <span class='section-title'>📁 当前目录结构</span>\n";
echo "    <span style='margin-left: 15px; font-size: 13px; color: #666;'>当前目录: " . __DIR__ . "</span>\n";
echo "</div>\n";

$parentDir = dirname(__DIR__);
echo "<div class='info-item'>\n";
echo "    <strong>上级目录:</strong>\n";
echo "    <span class='value'>$parentDir</span>\n";
echo "</div>\n";

// 列出上级目录的内容
if (is_dir($parentDir) && is_readable($parentDir)) {
    $items = scandir($parentDir);
    echo "<div style='margin-top: 10px;'><strong>上级目录内容:</strong></div>\n";
    echo "<div class='file-list'>\n";
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $fullPath = $parentDir . DIRECTORY_SEPARATOR . $item;
        if (is_dir($fullPath)) {
            echo "    <div class='dir'>📁 $item/</div>\n";
        } else {
            $ext = pathinfo($item, PATHINFO_EXTENSION);
            if ($ext === 'html' || $ext === 'htm') {
                echo "    <div class='file html'>📄 $item</div>\n";
            } else {
                echo "    <div class='file'>📄 $item</div>\n";
            }
        }
    }
    echo "</div>\n";
}

// ============================================================
// 4. 子目录检测（检测可能存在的其他站点目录）
// ============================================================
echo "<div class='section'>\n";
echo "    <span class='section-title'>🔍 检测到的子目录</span>\n";
echo "    <span style='margin-left: 15px; font-size: 13px; color: #666;'>（可能包含其他站点）</span>\n";
echo "</div>\n";

$subdirs = [];
if (is_dir(__DIR__) && is_readable(__DIR__)) {
    $items = scandir(__DIR__);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $fullPath = __DIR__ . DIRECTORY_SEPARATOR . $item;
        if (is_dir($fullPath)) {
            // 统计该目录下的HTML文件数
            $htmlCount = 0;
            $files = scandir($fullPath);
            foreach ($files as $file) {
                if (pathinfo($file, PATHINFO_EXTENSION) === 'html') {
                    $htmlCount++;
                }
            }
            $subdirs[] = ['name' => $item, 'htmlCount' => $htmlCount];
        }
    }
}

if (count($subdirs) > 0) {
    echo "<div class='file-list'>\n";
    foreach ($subdirs as $sub) {
        $badge = $sub['htmlCount'] > 0 ? "<span class='badge badge-green'>$sub[htmlCount] 个HTML</span>" : "<span class='badge badge-orange'>无HTML</span>";
        echo "    <div class='dir'>📁 {$sub['name']}/ $badge</div>\n";
    }
    echo "</div>\n";
} else {
    echo "<div style='color: #666; padding: 10px;'>当前目录下没有子目录</div>\n";
}

// ============================================================
// 5. 主站目录匹配检测（尝试匹配你需要的站点）
// ============================================================
echo "<div class='section'>\n";
echo "    <span class='section-title'>🎯 目标站点匹配检测</span>\n";
echo "</div>\n";

$targetSites = [
    'htdocs',
    'dhon.dorn.rf.gd',
    'dorn-old.dorn.rf.gd',
    'election.dorn.rf.gd',
    'games.dorn.rf.gd',
    'random.dorn.rf.gd',
    'random2.dorn.rf.gd',
    'valencia.dorn.rf.gd',
    'museum.dorn.rf.gd'
];

$parentDir = dirname(__DIR__);
echo "<div style='margin-bottom: 10px;'>在上级目录 <strong>$parentDir</strong> 中查找：</div>\n";

foreach ($targetSites as $site) {
    $fullPath = $parentDir . DIRECTORY_SEPARATOR . $site;
    if (is_dir($fullPath)) {
        $htmlCount = 0;
        if (is_readable($fullPath)) {
            $files = scandir($fullPath);
            foreach ($files as $file) {
                if (pathinfo($file, PATHINFO_EXTENSION) === 'html') {
                    $htmlCount++;
                }
            }
        }
        echo "<div class='info-item' style='border-left-color: #16DA49;'>\n";
        echo "    <strong>✅ 找到: $site</strong>\n";
        echo "    <span class='value' style='font-size: 14px;'>路径: $fullPath</span>\n";
        echo "    <span style='margin-left: 15px;'><span class='badge badge-green'>$htmlCount 个HTML</span></span>\n";
        echo "</div>\n";
    } else {
        echo "<div class='info-item' style='border-left-color: #d13438; opacity: 0.6;'>\n";
        echo "    <strong>❌ 未找到: $site</strong>\n";
        echo "    <span class='value' style='font-size: 14px;'>尝试路径: $fullPath</span>\n";
        echo "</div>\n";
    }
}

// ============================================================
// 6. 统计信息
// ============================================================
echo "<div class='section'>\n";
echo "    <span class='section-title'>📊 统计信息</span>\n";
echo "</div>\n";

// 统计当前目录的HTML文件
$htmlFiles = [];
if (is_readable(__DIR__)) {
    $files = scandir(__DIR__);
    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'html') {
            $htmlFiles[] = $file;
        }
    }
}

echo "<div class='info-item'>\n";
echo "    <strong>当前目录HTML文件数:</strong>\n";
echo "    <span class='value'>" . count($htmlFiles) . " 个</span>\n";
echo "</div>\n";

if (count($htmlFiles) > 0) {
    echo "<div style='margin-top: 10px;'><strong>HTML文件列表:</strong></div>\n";
    echo "<div class='file-list' style='max-height: 150px;'>\n";
    foreach ($htmlFiles as $file) {
        echo "    <div class='file html'>📄 $file</div>\n";
    }
    echo "</div>\n";
}

// ============================================================
// 7. 一键复制路径
// ============================================================
echo "<div class='section'>\n";
echo "    <span class='section-title'>📋 一键复制</span>\n";
echo "</div>\n";

echo "<div style='display: flex; gap: 10px; flex-wrap: wrap;'>\n";
echo "    <button class='copy-btn' onclick='copyText(\"" . addslashes(__DIR__) . "\")'>📋 复制当前目录路径</button>\n";
echo "    <button class='copy-btn' onclick='copyText(\"" . addslashes(dirname(__DIR__)) . "\")'>📋 复制上级目录路径</button>\n";
echo "    <button class='copy-btn' onclick='copyText(\"" . addslashes($parentDir . '/htdocs') . "\")'>📋 复制主站路径 (htdocs)</button>\n";
echo "</div>\n";

echo "<div id='copyMessage' style='margin-top: 10px; color: #16DA49; font-size: 14px;'></div>\n";

// ============================================================
// 8. 生成PHP配置代码
// ============================================================
echo "<div class='section'>\n";
echo "    <span class='section-title'>⚙️ build_index.php 配置代码（可直接复制）</span>\n";
echo "</div>\n";

$configCode = "private \$siteConfigs = [\n";
$configCode .= "    'dornhub.eu.org' => '" . __DIR__ . "',\n";

// 检测上级目录中的其他站点
foreach ($targetSites as $site) {
    if ($site === 'htdocs') continue; // 跳过htdocs，因为已经作为主站
    $fullPath = $parentDir . DIRECTORY_SEPARATOR . $site;
    if (is_dir($fullPath)) {
        $domain = $site;
        $configCode .= "    '$domain' => '$fullPath',\n";
    }
}
$configCode .= "];";

echo "<div style='background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 13px; overflow-x: auto; white-space: pre;'>";
echo htmlspecialchars($configCode);
echo "</div>\n";

echo "<button class='copy-btn' style='margin-top: 10px;' onclick='copyText(`" . addslashes($configCode) . "`)'>📋 复制配置代码</button>\n";

// ============================================================
// Footer
// ============================================================
echo "<div class='footer'>\n";
echo "    <p>路径检测工具 v1.0 | 将此文件放在需要检测的目录下，通过浏览器访问即可查看路径信息</p>\n";
echo "    <p style='font-size: 11px; color: #999;'>💡 提示：如果检测不到某些站点，请确认目录名称是否正确</p>\n";
echo "</div>\n";

echo "</div>\n"; // container

// ============================================================
// JavaScript
// ============================================================
echo "<script>\n";
echo "function copyText(text) {\n";
echo "    navigator.clipboard.writeText(text).then(() => {\n";
echo "        document.getElementById('copyMessage').textContent = '✅ 已复制到剪贴板';\n";
echo "        setTimeout(() => { document.getElementById('copyMessage').textContent = ''; }, 3000);\n";
echo "    }).catch(() => {\n";
echo "        // 降级方案\n";
echo "        const textarea = document.createElement('textarea');\n";
echo "        textarea.value = text;\n";
echo "        document.body.appendChild(textarea);\n";
echo "        textarea.select();\n";
echo "        document.execCommand('copy');\n";
echo "        document.body.removeChild(textarea);\n";
echo "        document.getElementById('copyMessage').textContent = '✅ 已复制到剪贴板';\n";
echo "        setTimeout(() => { document.getElementById('copyMessage').textContent = ''; }, 3000);\n";
echo "    });\n";
echo "}\n";
echo "</script>\n";

echo "</body>\n";
echo "</html>\n";
?>