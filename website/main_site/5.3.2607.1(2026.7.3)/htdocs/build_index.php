<?php
/**
 * build_index.php
 * 支持 HTTP 触发的多站点索引生成器
 */

// ============================================================
// 🎯 检测触发模式
// ============================================================
$isTrigger = isset($_GET['trigger']) && $_GET['trigger'] == '1';
$isSilent = isset($_GET['silent']) && $_GET['silent'] == '1';

if ($isTrigger) {
    set_time_limit(300);
    $logFile = __DIR__ . '/index_build_log.txt';
    $logMessage = date('Y-m-d H:i:s') . " - 索引构建触发 (来源: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . ")\n";
    
    if ($isSilent) {
        ob_start();
        runIndexer();
        $output = ob_get_clean();
        file_put_contents($logFile, $logMessage . "状态: 成功 (静默)\n", FILE_APPEND);
        http_response_code(200);
        exit;
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        echo "📋 索引构建触发 - " . date('Y-m-d H:i:s') . "\n";
        echo "========================================\n\n";
        runIndexer();
        file_put_contents($logFile, $logMessage . "状态: 成功 (输出)\n", FILE_APPEND);
        exit;
    }
}

if (php_sapi_name() === 'cli') {
    runIndexer();
    exit;
}

echo "⚠️ 请使用 ?trigger=1 参数触发索引构建\n";
echo "示例: " . $_SERVER['SCRIPT_NAME'] . "?trigger=1\n";
exit;

// ============================================================
// 🎯 核心类
// ============================================================
function runIndexer() {
    $indexer = new SiteSearchIndexer();
    $indexer->checkPaths();
    echo "\n";
    $indexer->scan();
    $indexer->save();
    echo "\n✨ 索引生成完成！\n";
}

class SiteSearchIndexer {
    private $index = [];
    private $excludeFiles = [
        '400.html', '401.html', '403.html', '404.html',
        '502.html', '503.html',
        'googlefb51695e61f36029.html',
        'reset-password.html', 'test_sensitive.html'
    ];
    private $fileCount = 0;
    private $excludedCount = 0;

    // ============================================================
    // 🎯 站点配置
    // ============================================================
    private $siteConfigs = [
        'dornhub.eu.org' => '/home/vol10_4/epizy.com/epiz_33946305/htdocs',
        'dhof.dorn.rf.gd' => '/home/vol10_4/epizy.com/epiz_33946305/dhof.dorn.rf.gd/htdocs',
        'dorn-old.dorn.rf.gd' => '/home/vol10_4/epizy.com/epiz_33946305/dorn-old.dorn.rf.gd/htdocs',
        'election.dorn.rf.gd' => '/home/vol10_4/epizy.com/epiz_33946305/election.dorn.rf.gd/htdocs',
        'games.dorn.rf.gd' => '/home/vol10_4/epizy.com/epiz_33946305/games.dorn.rf.gd/htdocs',
        'random.dorn.rf.gd' => '/home/vol10_4/epizy.com/epiz_33946305/random.dorn.rf.gd/htdocs',
        'random2.dorn.rf.gd' => '/home/vol10_4/epizy.com/epiz_33946305/random2.dorn.rf.gd/htdocs',
        'valencia.dorn.rf.gd' => '/home/vol10_4/epizy.com/epiz_33946305/valencia.dorn.rf.gd/htdocs',
        'museum.dorn.rf.gd' => '/home/vol10_4/epizy.com/epiz_33946305/museum.dorn.rf.gd/htdocs',
    ];
    // ============================================================

    public function scan() {
        echo "🔍 开始扫描多站点索引...\n";
        echo "📋 排除文件: " . implode(', ', $this->excludeFiles) . "\n";
        echo "📁 扫描站点数: " . count($this->siteConfigs) . "\n";
        echo "----------------------------------------\n";

        foreach ($this->siteConfigs as $domain => $path) {
            if (!is_dir($path)) {
                echo "⚠️  警告: 目录不存在，跳过: $path ($domain)\n";
                continue;
            }
            if (!is_readable($path)) {
                echo "⚠️  警告: 目录不可读，跳过: $path ($domain)\n";
                continue;
            }
            echo "\n📁 扫描站点: $domain\n";
            echo "   📂 路径: $path\n";
            $this->scanDirectory($path, $domain);
        }

        echo "\n----------------------------------------\n";
        echo "✅ 扫描完成！\n";
        echo "   📄 索引页面: {$this->fileCount} 个\n";
        echo "   ⏭️  排除页面: {$this->excludedCount} 个\n";
        echo "   💾 索引大小: " . $this->formatSize(strlen(json_encode($this->index))) . "\n";
    }

    private function scanDirectory($dir, $domain) {
        if (!is_readable($dir)) return;
        $files = scandir($dir);
        if ($files === false) return;
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            $path = $dir . DIRECTORY_SEPARATOR . $file;
            if (is_dir($path)) {
                $dirName = basename($path);
                if (in_array($dirName, ['.git', 'node_modules', 'vendor', 'cache', 'logs', '.well-known', 'cgi-bin'])) {
                    continue;
                }
                $this->scanDirectory($path, $domain);
            } elseif (is_file($path)) {
                $extension = pathinfo($file, PATHINFO_EXTENSION);
                if ($extension === 'html' || $extension === 'htm') {
                    $this->processFile($path, $domain);
                }
            }
        }
    }

    private function processFile($filePath, $domain) {
        $filename = basename($filePath);
        if (in_array($filename, $this->excludeFiles)) {
            $this->excludedCount++;
            echo "   ⏭️  跳过: $filename (黑名单)\n";
            return;
        }
        $html = @file_get_contents($filePath);
        if ($html === false) {
            echo "   ⚠️  警告: 无法读取 $filename\n";
            return;
        }
        $title = $this->extractTitle($html);
        $text = $this->extractText($html);
        if (strlen($text) < 10) {
            $this->excludedCount++;
            echo "   ⏭️  跳过: $filename (内容过少)\n";
            return;
        }
        $siteRoot = $this->siteConfigs[$domain];
        $relativePath = str_replace($siteRoot . DIRECTORY_SEPARATOR, '', $filePath);
        $relativePath = str_replace('\\', '/', $relativePath);
        $url = "https://{$domain}/" . $relativePath;
        $urlParts = explode('/', $url);
        $encodedParts = array_map(function($part) {
            return rawurlencode($part);
        }, $urlParts);
        $url = implode('/', $encodedParts);
        $url = str_replace('https%3A//', 'https://', $url);
        $url = str_replace('http%3A//', 'http://', $url);
        $summary = mb_substr($text, 0, 200, 'UTF-8');
        if (mb_strlen($text, 'UTF-8') > 200) {
            $summary .= '...';
        }
        $this->index[] = [
            'title' => $title ?: $filename,
            'url' => $url,
            'text' => $text,
            'summary' => $summary,
            'file' => $filename,
            'domain' => $domain
        ];
        $this->fileCount++;
        if ($this->fileCount % 50 === 0) {
            echo "   ... 已索引 {$this->fileCount} 个页面\n";
        }
    }

    private function extractTitle($html) {
        if (preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $matches)) {
            return trim(strip_tags($matches[1]));
        }
        return null;
    }

    private function extractText($html) {
        $html = preg_replace('/<script[^>]*>.*?<\/script>/is', ' ', $html);
        $html = preg_replace('/<style[^>]*>.*?<\/style>/is', ' ', $html);
        $html = preg_replace('/<noscript[^>]*>.*?<\/noscript>/is', ' ', $html);
        $html = preg_replace('/<!--.*?-->/s', ' ', $html);
        $text = strip_tags($html);
        $text = preg_replace('/\s+/', ' ', $text);
        return trim($text);
    }

    public function save() {
        $json = json_encode($this->index, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        $filePath = __DIR__ . DIRECTORY_SEPARATOR . 'search_index.json';
        if (file_put_contents($filePath, $json) !== false) {
            echo "💾 索引已保存: $filePath\n";
            echo "   📦 文件大小: " . $this->formatSize(strlen($json)) . "\n";
            return true;
        } else {
            echo "❌ 错误: 无法保存索引文件\n";
            return false;
        }
    }

    private function formatSize($bytes) {
        if ($bytes < 1024) return $bytes . ' B';
        if ($bytes < 1024 * 1024) return round($bytes / 1024, 1) . ' KB';
        return round($bytes / (1024 * 1024), 2) . ' MB';
    }

    public function checkPaths() {
        echo "🔍 检查目录路径...\n";
        echo "----------------------------------------\n";
        foreach ($this->siteConfigs as $domain => $path) {
            if (is_dir($path)) {
                $htmlCount = 0;
                $this->countHtmlFiles($path, $htmlCount);
                echo "✅ $domain: $path (存在, $htmlCount 个HTML文件)\n";
            } else {
                echo "❌ $domain: $path (不存在!)\n";
            }
        }
        echo "----------------------------------------\n";
    }

    private function countHtmlFiles($dir, &$count) {
        if (!is_readable($dir)) return;
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            $path = $dir . DIRECTORY_SEPARATOR . $file;
            if (is_dir($path)) {
                $this->countHtmlFiles($path, $count);
            } elseif (is_file($path)) {
                $ext = pathinfo($file, PATHINFO_EXTENSION);
                if ($ext === 'html' || $ext === 'htm') {
                    $count++;
                }
            }
        }
    }
}
?>