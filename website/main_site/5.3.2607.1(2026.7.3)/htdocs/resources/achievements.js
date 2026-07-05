// achievements.js - 成就元数据定义
// 文件位置: https://dornhub.eu.org/resources/achievements.js

/**
 * 成就元数据表
 * 每个成就包含:
 * - id: 成就唯一标识（字符串类型，支持字符）
 * - name: 成就名称
 * - description: 成就描述
 * - condition: 触发条件说明（仅用于展示）
 * - requiredHeight: 特殊高度要求（仅高度类成就）
 */

const ACHIEVEMENTS = [
    // ==================== 基础成就 ====================
    {
        id: "first_throw",
        name: "初试身手",
        description: "第一次抛出水壶",
        condition: "完成第一次抛射"
    },
    {
        id: "first_catch",
        name: "精准接壶",
        description: "第一次成功接住水壶",
        condition: "成功接住水壶1次"
    },
    
    // ==================== 高度成就（需接住） ====================
    {
        id: "height_100",
        name: "一飞冲天",
        description: "抛出水壶高度超过100米并成功接住",
        condition: "抛射高度 ≥ 100米并接住"
    },
    {
        id: "height_1000",
        name: "云霄飞壶",
        description: "抛出水壶高度超过1000米并成功接住",
        condition: "抛射高度 ≥ 1000米并接住"
    },
    {
        id: "height_5000",
        name: "平流层之旅",
        description: "抛出水壶高度超过5000米并成功接住",
        condition: "抛射高度 ≥ 5000米并接住"
    },
    {
        id: "height_10000",
        name: "太空漫游",
        description: "抛出水壶达到外太空（高度≥10000米）并成功接住",
        condition: "抛射高度 ≥ 10000米并接住"
    },
    
    // ==================== 特殊高度成就（需正好扔到并接住） ====================
    {
        id: "height_114",
        name: "冰雪节",
        description: "抛出水壶正好到达114米并成功接住",
        condition: "抛射高度 = 114米并接住",
        requiredHeight: 114
    },
    {
        id: "height_514",
        name: "情人节",
        description: "抛出水壶正好到达514米并成功接住",
        condition: "抛射高度 = 514米并接住",
        requiredHeight: 514
    },
    {
        id: "height_1017",
        name: "建国日",
        description: "抛出水壶正好到达1017米并成功接住",
        condition: "抛射高度 = 1017米并接住",
        requiredHeight: 1017
    },
    {
        id: "height_1221",
        name: "国庆节",
        description: "抛出水壶正好到达1221米并成功接住",
        condition: "抛射高度 = 1221米并接住",
        requiredHeight: 1221
    },
    {
        id: "height_1513",
        name: "海域面积",
        description: "抛出水壶正好到达1513米并成功接住",
        condition: "抛射高度 = 1513米并接住",
        requiredHeight: 1513
    },
    {
        id: "height_2006",
        name: "𣿅子生年",
        description: "抛出水壶正好到达2006米并成功接住",
        condition: "抛射高度 = 2006米并接住",
        requiredHeight: 2006
    },
    {
        id: "height_2021",
        name: "𣿅国成立",
        description: "抛出水壶正好到达2021米并成功接住",
        condition: "抛射高度 = 2021米并接住",
        requiredHeight: 2021
    },
    {
        id: "height_6649",
        name: "本土面积",
        description: "抛出水壶正好到达6649米并成功接住",
        condition: "抛射高度 = 6649米并接住",
        requiredHeight: 6649
    },
    
    // ==================== 连续接住成就（需接住） ====================
    {
        id: "streak_5",
        name: "五连绝世",
        description: "连续成功接住5次水壶",
        condition: "连续成功接住5次"
    },
    {
        id: "streak_15",
        name: "十五连超凡",
        description: "连续成功接住15次水壶",
        condition: "连续成功接住15次"
    },
    {
        id: "streak_22",
        name: "二十二连传说",
        description: "连续成功接住22次水壶",
        condition: "连续成功接住22次"
    },
    {
        id: "streak_45",
        name: "四十五连神话",
        description: "连续成功接住45次水壶",
        condition: "连续成功接住45次"
    },
    {
        id: "streak_114",
        name: "一百一十四连永恒",
        description: "连续成功接住114次水壶",
        condition: "连续成功接住114次"
    }
];

// 导出成就数据（用于浏览器环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ACHIEVEMENTS;
}

// 成就ID列表常量（便于前端判断）
const ACHIEVEMENT_IDS = {
    FIRST_THROW: "first_throw",
    FIRST_CATCH: "first_catch",
    HEIGHT_100: "height_100",
    HEIGHT_1000: "height_1000",
    HEIGHT_5000: "height_5000",
    HEIGHT_10000: "height_10000",
    HEIGHT_114: "height_114",
    HEIGHT_514: "height_514",
    HEIGHT_1017: "height_1017",
    HEIGHT_1221: "height_1221",
    HEIGHT_1513: "height_1513",
    HEIGHT_2006: "height_2006",
    HEIGHT_2021: "height_2021",
    HEIGHT_6649: "height_6649",
    STREAK_5: "streak_5",
    STREAK_15: "streak_15",
    STREAK_22: "streak_22",
    STREAK_45: "streak_45",
    STREAK_114: "streak_114"
};

// 特殊高度成就映射（用于快速判断）
const SPECIAL_HEIGHT_ACHIEVEMENTS = {
    114: "height_114",
    514: "height_514",
    1017: "height_1017",
    1221: "height_1221",
    1513: "height_1513",
    2006: "height_2006",
    2021: "height_2021",
    6649: "height_6649"
};