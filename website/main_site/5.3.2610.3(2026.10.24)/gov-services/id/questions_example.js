const questionBank = [
    // 政治与政府（12题）
    {
        question: "𣿅国的首都是？",
        options: ["内支特别市", "臭都特别市", "总统（𣿅赫）特别市", "臭都特别行政区"],
        correctAnswer: 1,
        explanation: "臭都特别市是𣿅国的首都。𣿅国有6个特别市、4个直辖市、4个特别行政区和32个省。"
    },
    {
        question: "𣿅国的国家元首是？",
        options: ["总统", "国王", "主席", "总理"],
        correctAnswer: 0,
        explanation: "𣿅国实行总统共和制，国家元首是总统。政权组织采用'一一四五一四'配置原则。"
    },
    {
        question: "法律规定𣿅国内阁有几位？",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "𣿅国法律规定主干官员要遵顼'一一四五一四'的配置原则，即一个总统、一个总理、四个内阁、五个外阁、一个国务卿、四个御𣿅大夫。"
    },
    {
        question: "𣿅国的特别市有多少个？",
        options: ["3", "4", "5", "6"],
        correctAnswer: 3,
        explanation: "分别是臭都特别市、内支特别市、新内支特别市、总统（𣿅赫）特别市、瑞丰特别市和武宗特别市。"
    },
    {
        question: "𣿅国的特别行政区有多少个？",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "分别是东𣿅特别行政区、四九特别行政区、王德发特别行政区和出塞特别行政区。"
    },
    {
        question: "𣿅国的直辖市有多少个？",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "分别是马尔通市、尼根市、立里市和白告市。"
    },
    {
        question: "𣿅国是？",
        options: ["一党制", "两党制", "多党制", "无党制"],
        correctAnswer: 2,
        explanation: "目前有四大政党，分别是内卷党、躺平党、主干党和当当当党，四者皆可执政。"
    },
    {
        question: "𣿅国的最高司法机关是什么？",
        options: ["总统", "最高法院", "𣿅国公民", "内阁"],
        correctAnswer: 1,
        explanation: "𣿅国最高司法机关是最高法院，负责司法审判和宪法解释。"
    },
    {
        question: "𣿅国公民多少岁及以上可以参与大总统选举？",
        options: ["0", "5", "18", "20"],
        correctAnswer: 1,
        explanation: "𣿅国公民5岁及以上就可以参与大总统选举，体现了广泛的民主参与。"
    },
    {
        question: "总体上看，𣿅国的政权组织形式最像什么？",
        options: ["君主立宪制", "议会民主共和制", "总统共和制", "人民代表制"],
        correctAnswer: 2,
        explanation: "𣿅国实行总统共和制，总统作为国家元首拥有较大权力。"
    },
    {
        question: "𣿅国的总统是如何产生的？",
        options: ["家族继承", "全体公民选举", "公民代表选举", "国家领导层选举"],
        correctAnswer: 1,
        explanation: "𣿅国总统通过全体公民选举产生，体现了民主原则。"
    },
    {
        question: "𣿅国开国元勋是哪个党派的？",
        options: ["内卷党", "躺平党", "主干党", "当当当党"],
        correctAnswer: 0,
        explanation: "𣿅国开国元勋属于内卷党，为国家建立做出了重要贡献。"},

    // 历史与文化（12题）
    {
        question: "𣿅国的建国年份是？",
        options: ["2006年", "2020年", "2021年", "2022年"],
        correctAnswer: 2,
        explanation: "𣿅国于2021年建国。重要日期包括：建国日（10月17日）、国庆节（12月21日）。"
    },
    {
        question: "𣿅国的国庆日是？",
        options: ["1月1日", "5月14日", "10月17日", "12月21日"],
        correctAnswer: 3,
        explanation: "𣿅国国庆日是12月21日，因为这是Tonh的生日。"
    },
    {
        question: "𣿅国的传统节日打𣿅节在哪一天？",
        options: ["12月21日", "12月22日", "12月20日", "12月23日"],
        correctAnswer: 2,
        explanation: "打𣿅节在12月20日，传统习俗是与总统打闹。很好记，在国庆节前一天。"
    },
    {
        question: "𣿅国的传统节日朝圣节在哪一天？",
        options: ["12月21日", "12月22日", "12月20日", "12月23日"],
        correctAnswer: 1,
        explanation: "朝圣节在12月22日，传统是在圣堂朝圣。很好记，在国庆节后一天。"
    },
    {
        question: "𣿅国的情人节在哪一天？",
        options: ["1月14日", "5月14日", "5月15日", "12月15日"],
        correctAnswer: 1,
        explanation: "𣿅国情人节是5月14日，这是Tonh被甩日。"
    },
    {
        question: "𣿅国四大名著没有下列哪本？",
        options: ["《𣿅子》", "《主干子》", "《学霸男神攻略》", "《看天下》"],
        correctAnswer: 3,
        explanation: "𣿅国四大名著是：《𣿅子》、《主干子》、《花火》、《学霸男神攻略》。"
    },
    {
        question: "𣿅国四大名著之一《𣿅子》共有几部？",
        options: ["3", "7", "10", "15"],
        correctAnswer: 2,
        explanation: "《𣿅子》共有10部，是语录体散文，详细记载了𣿅国的思想和文化。"
    },
    {
        question: "𣿅国历史阶段中，没有下列哪个时代？",
        options: ["登陆时代", "统一时代", "深空时代", "星环时代"],
        correctAnswer: 3,
        explanation: "𣿅国先后经历了史前时期、前登陆时代、登陆时代、邦国时代、统一时代、深空时代等多个时期。"
    },
    {
        question: "𣿅国南北战争，双方分别是？",
        options: ["总统和国务卿", "总统和内阁", "总统和外阁", "总统和𣿅国夫人"],
        correctAnswer: 1,
        explanation: "南北战争是总统Tonh和内阁Wuzonhr之间的冲突，起因是初中时在教学楼五楼嬉戏不小心把保温杯掉下。"
    },
    {
        question: "打𣿅节的传统习俗是什么？",
        options: ["与总统打闹", "在圣堂朝圣", "采摘刺梨", "进入总统居所参观"],
        correctAnswer: 0,
        explanation: "打𣿅节传统习俗是与总统打闹，朝圣节是在圣堂朝圣，刺梨节是采摘刺梨。"
    },
    {
        question: "𣿅国有一个人叫'多恩哈布'，他/她是谁？",
        options: ["艺术家", "政治家", "教育家", "不知道"],
        correctAnswer: 3,
        explanation: "'多恩哈布'在𣿅国的意思相当于'佚名'。常用用法是'多恩哈布曾经说过……'。"
    },
    {
        question: "𣿅国著名诸子之一主干子说过：'给大家_____秒钟的时间，背完这个思维导图。'",
        options: ["20", "30", "60", "10"],
        correctAnswer: 1,
        explanation: "主干子说'给大家30秒钟的时间'，体现了𣿅国教育的特色。"},

    // 地理与行政区划（10题）
    {
        question: "𣿅国的能源中心是？",
        options: ["瑞丰特别市", "核平城", "北𣿅市", "铁山市"],
        correctAnswer: 1,
        explanation: "核平城是𣿅国的能源中心，为国家提供重要的能源支持。"
    },
    {
        question: "以下哪个城市位于北𣿅高原上？",
        options: ["多恩市", "大声江市", "瓦莱莉市", "刺梨市"],
        correctAnswer: 1,
        explanation: "大声江市位于北𣿅省，北𣿅省完全坐落于北𣿅高原上。"
    },
    {
        question: "以下哪个城市位于西𣿅沙漠中？",
        options: ["多恩市", "大声江市", "瓦莱莉市", "刺梨市"],
        correctAnswer: 2,
        explanation: "瓦莱莉市位于瓦莱莉省，在西𣿅沙漠中，是𣿅国重要的'重工业之城'。"
    },
    {
        question: "被誉为'重工业之城'的𣿅国城市是哪一个？",
        options: ["瓦莱莉市", "核平城", "瑞丰特别市", "武宗特别市"],
        correctAnswer: 0,
        explanation: "瓦莱莉市是'重工业之城'，核平城是'能源中心'。"
    },
    {
        question: "多恩市大致位于𣿅国的哪个方位？",
        options: ["东部", "中部", "南部", "北部"],
        correctAnswer: 1,
        explanation: "多恩市位于刺梨省，是𣿅国中部组成首都圈城市群的重要城市之一。"
    },
    {
        question: "𣿅国的最高山峰是？",
        options: ["铁山", "𣿅山", "梅花山", "雪瑞峰"],
        correctAnswer: 0,
        explanation: "铁山是𣿅国最高山峰，是𣿅国的重要地理标志。"
    },
    {
        question: "𣿅国的父亲河是？",
        options: ["大声江", "𣿅江", "东𣿅运河", "南𣿅运河"],
        correctAnswer: 0,
        explanation: "大声江是𣿅国的父亲河，又名'江城'，在𣿅国文化中具有重要地位。"
    },
    {
        question: "𣿅国位于哪块大陆上？",
        options: ["八𣿅大陆", "马里诺大陆", "阿斯加大陆", "北极大陆"],
        correctAnswer: 0,
        explanation: "𣿅国位于八𣿅大陆上，与多个国家接壤。"
    },
    {
        question: "𣿅国的大区有多少个？",
        options: ["2", "4", "8", "12"],
        correctAnswer: 2,
        explanation: "东、南、西、北、东南、西南、中、群岛8个大区。"
    },
    {
        question: "𣿅国有几个时区？",
        options: ["1", "2", "3", "4"],
        correctAnswer: 3,
        explanation: "分别是西部时区、中部时区、东部时区和群岛时区。"},

    // 语言与教育（10题）
    {
        question: "𣿅国的官方语言之一是？",
        options: ["英语", "土星语", "𣿅语", "法语"],
        correctAnswer: 2,
        explanation: "𣿅国的官方语言是中文和𣿅语，通用语言是英语和法语。"
    },
    {
        question: "𣿅语单词Smar的中文意思是？",
        options: ["再见", "你好", "谢谢", "对不起"],
        correctAnswer: 1,
        explanation: "Smar是你好的非正式用语，是𣿅语中常用的问候语。"
    },
    {
        question: "𣿅语中一共有多少个字母？",
        options: ["23", "26", "29", "32"],
        correctAnswer: 2,
        explanation: "𣿅语有29个字母，就是26个标准英语字母，加上æ、œ和ê。"
    },
    {
        question: "𣿅语拉丁字母中，'u'的发音是什么？",
        options: ["音如'乌'", "音如'优'", "音如'多'", "音如'之'"],
        correctAnswer: 3,
        explanation: "𣿅语字母'u'发音如'之'，这是𣿅语的特殊发音规则。"
    },
    {
        question: "𣿅语拉丁字母组合中，'hhr'的发音是什么？",
        options: ["音如弹舌", "音如吐痰", "音如偷笑", "音如大风"],
        correctAnswer: 1,
        explanation: "'hhr'发音如吐痰，是𣿅语中特有的发音方式。"
    },
    {
        question: "𣿅国教育体系中，小学需要读几年？",
        options: ["1", "3", "5", "7"],
        correctAnswer: 2,
        explanation: "𣿅国实行小学至高中11年义务教育制，小学4至8岁共5年。"
    },
    {
        question: "𣿅国教育体系中，每个学年有多少个学期？",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
        explanation: "𣿅国学校每年有三个学期，分别是春学期、夏学期和秋学期。"
    },
    {
        question: "𣿅国教育体系中，寒假从哪一天开始？",
        options: ["12月1日", "12月19日", "12月31日", "1月13日"],
        correctAnswer: 1,
        explanation: "寒假从12月19日开始，目的是为了让所有𣿅国人参加打𣿅节、国庆节和朝圣节。"
    },
    {
        question: "𣿅国教育体系中，哪个不是学校必须教授的课程？",
        options: ["法语", "社会", "通用技术", "逻辑"],
        correctAnswer: 3,
        explanation: "必须教授的课程包括中文、𣿅语、数学、英语、法语、物理、化学、社会、政治、历史等。"
    },
    {
        question: "被誉为'教育大省'的是哪个省？",
        options: ["塔马省", "四六省", "后雄省", "光安省"],
        correctAnswer: 2,
        explanation: "后雄省被誉为'教育大省'，在𣿅国教育体系中占有重要地位。"},

    // 经济与科技（8题）
    {
        question: "𣿅国的货币𣿅元与CNY的汇率是？",
        options: ["1D=0.415CNY", "1CNY=0.415D", "1D=4.615CNY", "1CNY=4.615D"],
        correctAnswer: 2,
        explanation: "𣿅元与人民币的汇率是1D=4.615CNY，这是官方确定的汇率。"
    },
    {
        question: "𣿅国的标准家庭电压是多少？",
        options: ["220V", "110V", "114V", "514V"],
        correctAnswer: 3,
        explanation: "𣿅国标准家庭电压是514V，与大多数国家不同，体现了𣿅国的技术特色。"
    },
    {
        question: "𣿅国的标准交流电频率是多少？",
        options: ["49.22Hz", "45.15Hz", "50.00Hz", "45.22Hz"],
        correctAnswer: 0,
        explanation: "𣿅国标准交流电频率是49.22Hz，这是国家电力标准。"
    },
    {
        question: "𣿅国发行货币的银行之一是哪个？",
        options: ["𣿅国银行", "𣿅国商业银行", "𣿅国工业银行", "𣿅国农业银行"],
        correctAnswer: 0,
        explanation: "𣿅国银行是发行货币的主要银行之一，负责货币政策和金融稳定。"
    },
    {
        question: "𣿅国有一种矿产非常丰富，它的简写是？",
        options: ["Do", "Dn", "Le", "Va"],
        correctAnswer: 3,
        explanation: "Va是𣿅元素。𣿅国生产𣿅元素，并以此强大。北𣿅高原是最主要的𣿅矿产区。"
    },
    {
        question: "长期吸食哪种𣿅国化学物质耳朵会变大？",
        options: ["臭𣿅", "𣿅绿", "四氧化三𣿅", "碱式碳酸𣿅"],
        correctAnswer: 0,
        explanation: "长期吸食臭𣿅会导致耳朵变大，这是𣿅国特有的化学现象。"
    },
    {
        question: "𣿅国物理的基础思想是什么？",
        options: ["相对论", "原子学说", "人的主观能动性", "唯物论"],
        correctAnswer: 0,
        explanation: "𣿅国物理的基础思想是相对论，这影响了𣿅国的科学发展方向。"
    },
    {
        question: "在𣿅国，多少岁及以上可以考取驾照？",
        options: ["15", "18", "20", "22"],
        correctAnswer: 0,
        explanation: "在𣿅国，15岁及以上就可以考取驾照，共需要学习3个科目。"},

    // 社会与文化（10题）
    {
        question: "𣿅国的国旗主色调是？",
        options: ["红色", "绿色", "蓝色", "黄色"],
        correctAnswer: 1,
        explanation: "𣿅国国旗主色调为绿色，官方名称为'大耳旗'。"
    },
    {
        question: "𣿅国的国家象征动物是？",
        options: ["龙", "凤凰", "百灵鸟", "鸡"],
        correctAnswer: 1,
        explanation: "𣿅国国家象征动物是凤凰，因为总统爱好凤爪。"
    },
    {
        question: "𣿅国的其中一种国花是？",
        options: ["兰花", "梅花", "桃花", "菊花"],
        correctAnswer: 0,
        explanation: "𣿅国国花是兰花和刺梨花，分别代表不同的文化含义。"
    },
    {
        question: "𣿅国的国饮是？",
        options: ["刺梨汁", "蜂蜜柚子茶", "冰糖雪梨", "泡面汤"],
        correctAnswer: 0,
        explanation: "刺梨汁是𣿅国国饮，传统饮用方法是直接饮用刺梨原液。"
    },
    {
        question: "𣿅国热梗：头上三尺有监控，身前九寸是______？",
        options: ["总统", "原神", "方舟", "崩铁"],
        correctAnswer: 1,
        explanation: "完整梗是'头上三尺有监控，身前九寸是原神'，反映𣿅国文化特色。"
    },
    {
        question: "𣿅国人敬礼一般用哪只手？",
        options: ["左手", "右手", "左右都可以", "敬礼不用手"],
        correctAnswer: 2,
        explanation: "𣿅国人敬礼，左右手都可以，但是不同党派对于敬礼的手势有一些略微不同的要求。"
    },
    {
        question: "𣿅国军队的名称叫什么？",
        options: ["𣿅民军队", "护卫队", "皇家军队", "侵略队"],
        correctAnswer: 1,
        explanation: "𣿅国军队称为护卫队，负责国家安全和国防任务。"
    },
    {
        question: "𣿅国公民中有几种种姓？",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "分别是𣿅罗门、𣿅帝利、𣿅舍和𣿅陀罗，体现了𣿅国的社会结构。"
    },
    {
        question: "𣿅国人认为什么颜色的兰花最优雅？",
        options: ["粉色", "紫色", "绿色", "白色"],
        correctAnswer: 1,
        explanation: "𣿅国人认为紫色的兰花最优雅，这是文化传统的一部分。"
    },
    {
        question: "𣿅国人认为什么面相最吉祥？",
        options: ["道貌岸然", "肥头大耳", "明眸皓齿", "眉清目秀"],
        correctAnswer: 1,
        explanation: "𣿅国人认为肥头大耳的面相最吉祥，这反映了𣿅国的审美观念。"},

    // 总统与名人（8题）
    {
        question: "总统喜欢吃很多东西，除了？",
        options: ["泡面", "炸鸡", "薯片", "油条"],
        correctAnswer: 3,
        explanation: "总统不喜欢油条，但喜欢泡面、炸鸡、薯片等食物。"
    },
    {
        question: "总统喜欢玩很多游戏，一下哪一个是𣿅子最不喜欢的？",
        options: ["原神", "Phigros", "100%鲜橙汁", "崩坏星穹铁道"],
        correctAnswer: 2,
        explanation: "总统喜欢玩原神、Phigros、崩坏星穹铁道，但从来没见过总统玩100%鲜橙汁。"
    },
    {
        question: "根据《𣿅子》，总统最喜欢？",
        options: ["艾雅法拉", "安洁莉娜", "薄绿", "阿米娅"],
        correctAnswer: 3,
        explanation: "根据《𣿅子》记载，总统最喜欢阿米娅。"
    },
    {
        question: "总统玩游戏时，最不可能出现在？",
        options: ["教室讲台上", "实验室", "总统居所", "英语小教室"],
        correctAnswer: 2,
        explanation: "总统玩游戏时最不可能出现在总统居所，通常在其他地方玩游戏。"
    },
    {
        question: "总统的法语名是什么？",
        options: ["Valery", "Valéry", "Valérie", "Valéhhir"],
        correctAnswer: 1,
        explanation: "如果你连这个都不知道，你不配当𣿅国人。"
    },
    {
        question: "总统最喜欢玩什么球类运动？",
        options: ["篮球", "足球", "排球", "𣿅国栏球"],
        correctAnswer: 1,
        explanation: "总统最喜欢足球，这是总统最喜爱的球类运动。"
    },
    {
        question: "总统最擅长的乐器是什么？",
        options: ["𣿅号", "卡祖笛", "小提琴", "钢琴"],
        correctAnswer: 2,
        explanation: "总统最擅长小提琴，有'小提琴首席'的称号。"
    },
    {
        question: "总统喝水只喝？",
        options: ["百岁山", "农夫山泉", "依云水", "怡宝"],
        correctAnswer: 0,
        explanation: "总统喝水只喝百岁山，这是总统的个人偏好。"}

];