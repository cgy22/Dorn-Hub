// websites.js - 网站数据（带分类）
// 文件位置: http://resources.dorn.rf.gd/websites.js

// 定义网站分类
const categories = {
    official: { name: "官方服务", icon: "fa-crown", order: 1 },
    entertainment: { name: "娱乐游戏", icon: "fa-gamepad", order: 2 },
    culture: { name: "文化历史", icon: "fa-landmark", order: 3 },
    classic: { name: "经典版本", icon: "fa-history", order: 4 },
    ancient: { name: "远古时期（这些网站已暂停支持）", icon: "fa-fossil", order: 5 },
    //other: { name: "其他", icon: "fa-ellipsis-h", order: 6 }
};

const websites = [
    // 官方服务类
    //{ name: "𣿅国电子文史资料库", url: "https://dornhub.eu.org/cloud", icon: "fa-book", category: "official" },
    //{ name: "𣿅国电子文史资料库-文件上传", url: "https://dornhub.eu.org/upload", icon: "fa-upload", category: "official" },
    { name: "𣿅国小百科竞赛", url: "https://dornhub.eu.org/games/contest.html", icon: "fa-trophy", category: "entertainment" },
	{ name: "𣿅国诗词大会", url: "https://dornhub.eu.org/games/literature-contest.html", icon: "fa-trophy", category: "entertainment" },
	{ name: "你是哪位𣿅𣿅？", url: "https://dornhub.eu.org/games/which-dondon.html", icon: "fas fa-user", category: "entertainment" },
    { name: "国民身份管理局", url: "https://dornhub.eu.org/gov-services/id/index.html", icon: "fa-id-card", category: "official" },
	{ name: "𣿅国国家机构树状图", url: "https://dornhub.eu.org/departments.html", icon: "fa-landmark", category: "official" },
    { name: "𣿅国股市", url: "https://dornhub.eu.org/stock-market.html", icon: "fa-chart-line", category: "official" },
	{ name: "议事日程管理", url: "https://knowl.rf.gd/", icon: "fa-border-all", category: "official" },
    { name: "𣿅国大总统选举", url: "http://election.dorn.rf.gd", icon: "fa-vote-yea", category: "official" },
	{ name: "𣿅国福利部", url: "https://dornhub.eu.org/gov-services/welfare-dep.html", icon: "fas fa-heart", category: "official" },
	//{ name: "团队价值观与理念", url: "https://dornhub.eu.org/values.html", icon: "fa-flag", category: "official" },
    //{ name: "𣿅国国家博物馆", url: "http://museum.dorn.rf.gd", icon: "fa-landmark", category: "ancient" },
    { name: "多恩官方", url: "http://official.dorn.rf.gd", icon: "fa-crown", category: "ancient" },
    { name: "多恩官方-旧", url: "https://dornhub.github.io/index2", icon: "fa-crown", category: "ancient" },
    
    // 娱乐游戏类
    { name: "Dorn大转盘", url: "https://dornhub.eu.org/games/lottery.html", icon: "fa-dice", category: "entertainment" },
    { name: "武宗子抛水壶-提升反应能力的𣿅子主题小游戏", url: "https://dornhub.eu.org/games/bottle.html", icon: "fa-kitchen-set", category: "entertainment" },
    { name: "𣿅国夫人爱购物-训练记忆能力的𣿅子主题小游戏", url: "https://dornhub.eu.org/games/shopping.html", icon: "fa-shopping-bag", category: "entertainment" },
	{ name: "江城子的打字竞速-练习打字熟练度的𣿅子主题小游戏", url: "https://dornhub.eu.org/games/type.html", icon: "fa-keyboard", category: "entertainment" },
    { name: "吃𣿅人-提升反应与决策能力的𣿅子主题小游戏", url: "https://dorngames.gamer.gd/eatdorn", icon: "fa-gamepad", category: "entertainment" },
    { name: "博饼-闽南传统文化游戏（1站）", url: "https://dorngames.github.io/boabia/index.html", icon: "fa-dice", category: "entertainment" },
    { name: "博饼-闽南传统文化游戏（2站）", url: "https://dorngames.gamer.gd/buabia", icon: "fa-dice", category: "entertainment" },
    { name: "𣿅国国运模拟器-1站", url: "https://dornhub.github.io/valeriette/donh-destiny-forecast.html", icon: "fa-chart-line", category: "entertainment" },
    { name: "𣿅国国运模拟器-2站", url: "https://dorngames.gamer.gd/nationdestin", icon: "fa-chart-line", category: "entertainment" },
    { name: "多恩游戏-旧", url: "http://games.dorn.rf.gd", icon: "fa-gamepad", category: "ancient" },
    
    // 文化历史类
    { name: "𣿅国名人堂-1站", url: "http://dhof.dorn.rf.gd", icon: "fa-star", category: "culture" },
    { name: "𣿅国名人堂-2站", url: "https://cgy22.github.io/dhof/", icon: "fa-star", category: "culture" },
    { name: "瓦莱希雅大辞典-1站", url: "http://valencia.dorn.rf.gd", icon: "fa-book-open", category: "culture" },
    { name: "瓦莱希雅大辞典-2站", url: "https://cgy22.github.io/valencia/", icon: "fa-book-open", category: "culture" },
    //{ name: "𣿅国画廊-总统篇", url: "https://cgy22.github.io/paintings/tonh", icon: "fa-palette", category: "culture" },
    //{ name: "多恩音乐", url: "http://music.dorn.rf.gd", icon: "fa-music", category: "culture" },
	{ name: "《𣿅子集校注》——有关𣿅子的文言语录体散文", url: "https://dornhub.eu.org/library/Tonh-Tze-Anthology-with-Correction-and-Annotation.pdf", icon: "fa-book-open", category: "culture" },
	{ name: "国饮刺梨汁宣传片", url: "https://dornhub.eu.org/library/prickly-pear.mp4", icon: "fa-book-open", category: "culture" },
	
    
    // 经典版本类
    { name: "Dorn主页-1站", url: "https://dornhub.eu.org", icon: "fa-globe", category: "classic" },
    { name: "Dorn主页-2站", url: "https://dornhub.github.io", icon: "fa-globe-asia", category: "classic" },
    { name: "Dorn主页-版本4.3", url: "https://dornhub.eu.org/index-v4.3.html", icon: "fas fa-search", category: "classic" },
    { name: "Dorn主页-版本4", url: "https://dornhub.eu.org/index-v4.html", icon: "fas fa-search", category: "classic" },
    { name: "Dorn主页-版本3.2", url: "http://dorn-old.dorn.rf.gd", icon: "fa-home", category: "classic" },
    { name: "Dorn主页-版本3", url: "https://cgy22.github.io/dorn/dornsearch", icon: "fas fa-search", category: "classic" },
    { name: "Dorn主页-版本2", url: "https://cgy22.github.io/dorn/dornsearch_en", icon: "fas fa-search", category: "classic" },
    
    // 远古时期类
    { name: "随机抽号器", url: "http://random.dorn.rf.gd", icon: "fa-random", category: "entertainment" },
    { name: "随机抽号器2", url: "http://random2.dorn.rf.gd", icon: "fa-random", category: "entertainment" },
    { name: "远古时期-随机抽号器", url: "https://dornhub.github.io/classtools/get-random-number.html", icon: "fa-random", category: "ancient" },
    { name: "远古时期-随机抽皓器", url: "https://dornhub.github.io/classtools/get-random-tonh.html", icon: "fa-random", category: "ancient" },
    { name: "远古时期-𣿅国主页", url: "https://dornhub.github.io/dgzl.html", icon: "fa-flag", category: "ancient" },
    { name: "远古时期-多功能机器人小懂", url: "https://dornhub.github.io/valeriette/index.html", icon: "fa-smile", category: "ancient" },
    //{ name: "远古时期-𣿅国商城", url: "https://dornstore.wordpress.com", icon: "fa-shopping-bag", category: "ancient" },
    //{ name: "远古时期-𣿅国百科", url: "https://dornhubpedia.wordpress.com", icon: "fas fa-atlas", category: "ancient" },
    
    // 其他类
    //{ name: "羟基人快乐老家", url: "https://dornhub.github.io/irelav/", icon: "fa-smile", category: "other" }
];

// 按分类获取网站
function getWebsitesByCategory(category) {
    return websites.filter(site => site.category === category);
}

// 获取所有分类（按order排序）
function getCategories() {
    return Object.entries(categories)
        .sort((a, b) => a[1].order - b[1].order)
        .map(([key, value]) => ({ key, ...value }));
}