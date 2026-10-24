const festivals = {
  international: [
    // ===== 固定日期 =====
    { name: "元旦", month: 1, day: 1, icon: "🎊", themeColor: "#16DA49", themeLabel: "新年主题", themeDays: 1 },
    //{ name: "情人节", month: 2, day: 14, icon: "💘", themeColor: "#EC7063", themeLabel: "情人节主题", themeDays: 1 },
    { name: "愚人节", month: 4, day: 1, icon: "🃏", themeColor: "#F39C12", themeLabel: "愚人节主题", themeDays: 1 },
    { name: "国际劳动节", month: 5, day: 1, icon: "🛠️", themeColor: "#E67E22", themeLabel: "劳动节主题", themeDays: 1 },
    { name: "万圣节", month: 10, day: 31, icon: "🎃", themeColor: "#E67E22", themeLabel: "万圣节主题", themeDays: 1 },
    { name: "圣诞节", month: 12, day: 25, icon: "🎄", themeColor: "#C0392B", themeLabel: "圣诞节主题", themeDays: 1 },
    //{ name: "跨年夜", month: 12, day: 31, icon: "🎆", themeColor: "#8E44AD", themeLabel: "跨年夜主题", themeDays: 1 },

    // ===== 浮动日期：第 N 个星期 X =====
    // weekday: 0=周日, 1=周一, ..., 6=周六
    { name: "母亲节", rule: "nth-weekday", month: 5, nth: 2, weekday: 0, icon: "💐", themeColor: "#EC7063", themeLabel: "母亲节主题", themeDays: 1 },
    { name: "父亲节", rule: "nth-weekday", month: 6, nth: 3, weekday: 0, icon: "👔", themeColor: "#5DADE2", themeLabel: "父亲节主题", themeDays: 1 },
    { name: "感恩节", rule: "nth-weekday", month: 11, nth: 4, weekday: 4, icon: "🦃", themeColor: "#D68910", themeLabel: "感恩节主题", themeDays: 1 },

    // ===== 浮动日期：某月最后一个星期 X =====
    //{ name: "阵亡将士纪念日", rule: "last-weekday", month: 5, weekday: 1, icon: "🎖️", themeColor: "#7F8C8D", themeLabel: "阵亡将士纪念日主题", themeDays: 1 },
    //{ name: "美国劳动节", rule: "nth-weekday", month: 9, nth: 1, weekday: 1, icon: "🛠️", themeColor: "#E67E22", themeLabel: "美国劳动节主题", themeDays: 1 },

    // ===== 浮动日期：复活节（西方） =====
    { name: "复活节", rule: "easter", icon: "🐣", themeColor: "#AF7AC5", themeLabel: "复活节主题", themeDays: 1 }
  ],
  donhNation: [
    { name: "冰雪节", month: 1, day: 14, icon: "❄️", themeColor: "#5DADE2", themeLabel: "冰雪节主题", themeDays: 3, vacationDays: 3 },
    { name: "神兽日与儿童节", month: 4, day: 14, icon: "🐉", themeColor: "#AF7AC5", themeLabel: "神兽日与儿童节主题", themeDays: 1, vacationDays: 1 },
    { name: "情人节", month: 5, day: 14, icon: "💗", themeColor: "#EC7063", themeLabel: "情人节主题", themeDays: 1, vacationDays: 1 },
    { name: "工业日与劳动节", month: 7, day: 14, icon: "⚙️", themeColor: "#F39C12", themeLabel: "工业日与劳动节主题", themeDays: 3, vacationDays: 3 },
    { name: "刺梨日与丰收节", month: 9, day: 14, icon: "🌾", themeColor: "#D4AC0D", themeLabel: "刺梨日与丰收节主题", themeDays: 1, vacationDays: 0 },
    { name: "建国日", month: 10, day: 17, icon: "🏛️", themeColor: "#16DA49", themeLabel: "建国日主题", themeDays: 1, vacationDays: 1 },
    { name: "打𣿅节", month: 12, day: 20, icon: "🥁", themeColor: "#16DA49", themeLabel: "打𣿅节主题", themeDays: 1, vacationDays: 1 },
    { name: "国庆节", month: 12, day: 21, icon: "🎉", themeColor: "#16DA49", themeLabel: "国庆节主题", themeDays: 1, vacationDays: 1 },
    { name: "朝圣节", month: 12, day: 22, icon: "🕯️", themeColor: "#16DA49", themeLabel: "朝圣节主题", themeDays: 1, vacationDays: 1 }
  ]
};