// departments.js - 𣿅国国家机构完整数据
// 部门名称、职能、下辖部门、工作人员/职务、掌管权力
// 注意：所有姓名(name)字段已留空，仅保留职务/职位名称(title)

const departmentsData = {
    name: "总统",
    icon: "fa-flag-checkered",
    func: "国家最高领导人，全民直选，可无限连任。",
    staff: [{
        title: "总统",
        name: "",
        note: "全民直选产生，可无限连任"
    }],
    powers: [
        "统帅军队（通过国防部）",
        "任命各大部首长（需精英委员会简单多数同意）",
        "签署法令（有权退回精英委员会复议）",
        "宣布紧急状态（需7日内获立法会议追认）",
        "向最高法院提名大法官（需最高检察院同意）",
        "拥有宪法解释建议权"
    ],
    children: [{
            name: "总统府",
            icon: "fa-landmark",
            func: "总统直属办事机构，负责日常行政辅助与政策合规审查",
            staff: [{
                    title: "总理",
                    name: "",
                    note: "总统秘书/首席幕僚长"
                },
                {
                    title: "御𣿅大夫",
                    name: "",
                    note: "副总理级，拥有暂缓执行权"
                }
            ],
            powers: [
                "总理：协调各大部与总统沟通，起草总统行政命令",
                "御𣿅大夫：暂缓任何大部命令24小时并提请总统裁决，审查跨部政策合规性"
            ],
            children: [{
                    name: "总理（总统秘书）",
                    icon: "fa-user-tie",
                    func: "总统首席幕僚长，协调各大部与总统沟通",
                    staff: [{
                        title: "总理",
                        name: "",
                        note: "总统府秘书长升任"
                    }],
                    powers: ["统筹总统日程", "文件流转", "代表总统出席非正式会议"],
                    children: []
                },
                {
                    name: "御𣿅大夫（副总理）",
                    icon: "fa-gavel",
                    func: "内务监察长，拥有暂缓执行权，历史沿革自君主制枢密院",
                    staff: [{
                        title: "御𣿅大夫",
                        name: "",
                        note: "以刚正敢谏闻名"
                    }],
                    powers: ["暂缓执行权", "总统府内务监察", "跨大部政策合规审查"],
                    children: []
                },
                {
                    name: "连任事务办公室",
                    icon: "fa-vote-yea",
                    func: "策划总统连任竞选活动，协调选举年福利分配",
                    staff: [{
                        title: "连任事务专员",
                        name: "",
                        note: "总统直接任命"
                    }],
                    powers: ["制定连任竞选策略", "协调各大部选举年资源分配", "舆论监测与民意调研"],
                    children: []
                },
                {
                    name: "信访办公室",
                    icon: "fa-envelope",
                    func: "受理公民对政府的投诉与建议",
                    staff: [{
                        title: "主任",
                        name: "",
                        note: "由总统任命"
                    }],
                    powers: [
                        "受理公民来信来访",
                        "信访事项转办督办",
                        "重大信访问题直接向总统报告",
                        "信访数据统计分析"
                    ],
                    children: [{
                            name: "来信受理处",
                            icon: "fa-inbox",
                            func: "受理公民来信",
                            staff: [{
                                title: "处长",
                                name: "",
                                note: ""
                            }],
                            powers: ["信件登记分类", "转送相关部门", "回复办理结果"],
                            children: []
                        },
                        {
                            name: "来访接待处",
                            icon: "fa-users",
                            func: "接待来访群众",
                            staff: [{
                                title: "处长",
                                name: "",
                                note: ""
                            }],
                            powers: ["来访登记", "现场协调", "领导接访安排"],
                            children: []
                        },
                        {
                            name: "督查督办处",
                            icon: "fa-check-double",
                            func: "信访事项督查",
                            staff: [{
                                title: "处长",
                                name: "",
                                note: ""
                            }],
                            powers: ["办理时限监督", "疑难案件督办", "办理质量评估"],
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: "总统直辖独立机构",
            icon: "fa-shield-alt",
            func: "直接向总统报告，不隶属任何大部，保障监督独立性",
            staff: [{
                    title: "国家审计总署署长",
                    name: "",
                    note: "由立法会议推荐，总统任命"
                },
                {
                    title: "反腐败独立委员会主席",
                    name: "",
                    note: "需立法会议2/3多数同意"
                },
                {
                    title: "紧急状态管理署署长",
                    name: "",
                    note: "由总统直接任命"
                }
            ],
            powers: [
                "国家审计总署：独立审计所有政府机构财务，报告向全民公开",
                "反腐败独立委员会：调查总统以下所有官员贪腐，可移交司法大部国家调查部",
                "紧急状态管理署：统筹跨大部应急响应，协调军队与地方救灾"
            ],
            children: [{
                    name: "国家审计总署",
                    icon: "fa-chart-line",
                    func: "审计所有政府机构财务，报告公开",
                    staff: [{
                        title: "署长",
                        name: "",
                        note: ""
                    }],
                    powers: ["年度财政审计", "专项审计调查", "审计报告强制公开"],
                    children: []
                },
                {
                    name: "反腐败独立委员会",
                    icon: "fa-handcuffs",
                    func: "调查总统以下官员贪腐，移交司法大部",
                    staff: [{
                        title: "主席",
                        name: "",
                        note: ""
                    }],
                    powers: ["独立调查权", "资产冻结建议权", "案件移送权"],
                    children: []
                },
                {
                    name: "紧急状态管理署",
                    icon: "fa-bell",
                    func: "统筹自然灾害、内乱、战争状态应急响应",
                    staff: [{
                        title: "署长",
                        name: "",
                        note: ""
                    }],
                    powers: [
                        "跨部门应急协调",
                        "救灾物资调度（与粮食与物资储备局协同）",
                        "紧急状态建议权",
                        "战略物资储备协调"
                    ],
                    children: []
                }
            ]
        },
        {
            name: "国家立法会议",
            icon: "fa-gavel",
            func: "一院制立法机构，300席，多党比例代表制，每4年选举",
            staff: [{
                    title: "议长",
                    name: "",
                    note: "由全体议员选举产生"
                },
                {
                    title: "反对党领袖",
                    name: "",
                    note: "由最大反对党党魁担任"
                }
            ],
            powers: [
                "通过法律（总统可退回，但立法会议可2/3多数推翻）",
                "批准国家预算",
                "批准国际条约",
                "对各大部首长进行质询",
                "提出不信任案",
                "弹劾总统（需2/3多数，移交最高法院审理）"
            ],
            children: []
        },
        {
            name: "行政大部",
            icon: "fa-building",
            func: "中央行政协调、内政管理、人事与档案、选举事务",
            staff: [{
                    title: "行政大部部长",
                    name: "",
                    note: "由总统任命，精英委员会同意"
                },
                {
                    title: "副部长",
                    name: "",
                    note: "协助日常事务"
                }
            ],
            powers: [
                "向其他大部发出政策协调建议书",
                "管理局级以上官员任免考核",
                "统筹全国选举事务",
                "监督地方财政"
            ],
            children: [{
                    name: "精英委员会",
                    icon: "fa-users",
                    func: "跨大部协调机构，由六大部首长+总理+邦代表组成",
                    staff: [{
                            title: "主席",
                            name: "",
                            note: "由总统兼任"
                        },
                        {
                            title: "常任秘书",
                            name: "",
                            note: "负责日常事务"
                        }
                    ],
                    powers: ["协调跨大部重大政策", "审批总统对各部首长任命", "紧急状态时代行立法会议职权（限30天）"],
                    children: []
                },
                {
                    name: "内政部",
                    icon: "fa-city",
                    func: "国内地方行政指导与人事管理",
                    staff: [{
                            title: "国务卿（内政部部长）",
                            name: "",
                            note: "内政部最高长官"
                        },
                        {
                            title: "内阁成员",
                            name: "",
                            note: "本国人组成，内政部内部决策顾问团"
                        },
                        {
                            title: "外阁成员",
                            name: "",
                            note: "外国人组成，涉外咨询机构"
                        }
                    ],
                    powers: [
                        "指导省、市、县政府行政工作",
                        "管理局级以上官员任免考核",
                        "监督地方财政",
                        "组织全国选举",
                        "积分账户管理",
                        "政党注册与监管",
                        "地方行政长官选拔与任免建议"
                    ],
                    children: [{
                            name: "政务局",
                            icon: "fa-calendar-alt",
                            func: "指导省、市、县政府行政工作",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["地方行政指导", "地方政府绩效考核"],
                            children: []
                        },
                        {
                            name: "人事局",
                            icon: "fa-users-cog",
                            func: "管理官员任免考核与机构编制",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: [
                                "官员档案管理",
                                "任免审批",
                                "廉政审查",
                                "机构编制管理（部门设置、人员编制审批）"
                            ],
                            children: []
                        },
                        {
                            name: "档案局",
                            icon: "fa-archive",
                            func: "保管国家中央级文件档案",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["档案收集整理", "档案查询审批", "历史文件保管"],
                            children: []
                        },
                        {
                            name: "地方财政协调局",
                            icon: "fa-coins",
                            func: "监督地方财政收支",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["地方预算审核", "转移支付监督", "财政风险预警"],
                            children: []
                        },
                        {
                            name: "选举事务局",
                            icon: "fa-check-double",
                            func: "组织全国总统与立法会议选举",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["选区划分", "候选人资格审核", "计票监督", "选举争议处理"],
                            children: []
                        },
                        {
                            name: "积分管理局",
                            icon: "fa-chart-bar",
                            func: "纳税积分管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["纳税积分记录", "积分冻结与扣分", "福利积分核算"],
                            children: []
                        },
                        {
                            name: "政党管理局",
                            icon: "fa-flag-checkered",
                            func: "政党注册与监管",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: "需立法会议简单多数同意任免"
                            }],
                            powers: [
                                "政党注册与注销审批",
                                "政党章程、纲领备案审查",
                                "政党财务状况监督（竞选资金、捐赠来源）",
                                "政党行为合规审查（是否违反选举法、国家安全法）",
                                "政党争议调解",
                                "对违规政党处以罚款、暂停活动（解散需司法大部批准）"
                            ],
                            children: []
                        },
                        {
                            name: "民族与宗教事务局",
                            icon: "fa-hand-peace",
                            func: "民族政策与宗教事务管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: [
                                "民族政策制定与协调",
                                "民族团结进步促进",
                                "宗教团体登记管理",
                                "宗教活动场所审批",
                                "宗教事务执法"
                            ],
                            children: [{
                                    name: "民族事务处",
                                    icon: "fa-users",
                                    func: "民族事务管理",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["民族政策实施", "民族地区发展协调", "民族矛盾纠纷调解"],
                                    children: []
                                },
                                {
                                    name: "宗教事务处",
                                    icon: "fa-church",
                                    func: "宗教事务管理",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["宗教团体备案", "宗教活动审批", "宗教场所管理"],
                                    children: []
                                }
                            ]
                        },
                        {
                            name: "地方行政管理局",
                            icon: "fa-city",
                            func: "省长、市长、县长等地方行政长官的选拔、考核与任免管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: "由内政部部长提名，行政大部部长任命"
                            }],
                            powers: [
                                "制定省长、市长、县长选拔标准",
                                "组织地方行政长官考核评估",
                                "向内政部提出任免建议",
                                "地方官员培训与交流",
                                "地方行政效能监督"
                            ],
                            children: [{
                                    name: "选拔考核处",
                                    icon: "fa-clipboard-list",
                                    func: "地方官员选拔与考核",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["选拔标准制定", "年度考核组织", "后备干部库管理"],
                                    children: []
                                },
                                {
                                    name: "任免建议处",
                                    icon: "fa-file-signature",
                                    func: "任免材料整理与上报",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["任免材料审核", "报批流程管理", "任命文件起草"],
                                    children: []
                                },
                                {
                                    name: "培训交流处",
                                    icon: "fa-chalkboard-user",
                                    func: "地方官员培训与交流",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["培训计划制定", "跨省交流安排", "挂职锻炼管理"],
                                    children: []
                                },
                                {
                                    name: "效能监察处",
                                    icon: "fa-chart-line",
                                    func: "地方行政效能监督",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["行政效能评估", "不作为线索移送", "整改跟踪督办"],
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "特区事务部",
                    icon: "fa-star-of-life",
                    func: "负责联邦成员特区的日常联络与法律协调",
                    staff: [{
                            title: "特区事务部部长",
                            name: "",
                            note: ""
                        },
                        {
                            title: "特区长官（特区联络代表）",
                            name: "",
                            note: "各联邦成员特区派驻一名"
                        }
                    ],
                    powers: ["联邦成员特区法合规审查", "联邦成员特区财政转移支付计算", "中央与联邦成员特区争议预防调解"],
                    children: [{
                            name: "特区法律协调局",
                            icon: "fa-balance-scale",
                            func: "审查联邦成员特区法是否符合中央最低标准",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["联邦成员特区法备案审查", "违宪违法提示", "修法建议"],
                            children: []
                        },
                        {
                            name: "特区财政结算局",
                            icon: "fa-calculator",
                            func: "计算中央与联邦成员特区之间的财政转移支付",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["转移支付核算", "联邦成员特区税收分成计算", "财政数据审计"],
                            children: []
                        },
                        {
                            name: "跨区争端预防局",
                            icon: "fa-handshake",
                            func: "预防和调解中央与联邦成员特区之间的争议",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["争议早期预警", "调解谈判", "建议移送特区事务法庭"],
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: "资源与环境大部",
            icon: "fa-leaf",
            func: "自然资源管理、环境保护",
            staff: [{
                    title: "资源与环境大部部长",
                    name: "",
                    note: ""
                },
                {
                    title: "副部长",
                    name: "",
                    note: ""
                }
            ],
            powers: [
                "审批资源开发许可证",
                "关停违规排污企业",
                "制定环保标准",
                "全国资源调查与登记"
            ],
            children: [{
                    name: "环境部",
                    icon: "fa-globe-asia",
                    func: "污染治理、生态保护、环境监测",
                    staff: [{
                        title: "环境部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["环境质量标准制定", "环评审批", "污染源监管", "环保执法"],
                    children: [{
                            name: "生态治理局",
                            icon: "fa-recycle",
                            func: "污染场地修复、固废污水处理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["污染场地调查修复", "固废处理监管", "污水排放许可"],
                            children: []
                        },
                        {
                            name: "生态保护局",
                            icon: "fa-tree",
                            func: "自然保护区、生物多样性",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["自然保护区管理", "野生动植物保护", "生态红线监管"],
                            children: []
                        },
                        {
                            name: "环境监测局",
                            icon: "fa-chart-line",
                            func: "空气、水质、土壤实时监测",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["环境质量监测", "监测数据发布", "污染预警"],
                            children: []
                        }
                    ]
                },
                {
                    name: "资源部",
                    icon: "fa-database",
                    func: "资源开发许可与可持续管理",
                    staff: [{
                        title: "资源部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["资源开发许可证审批", "资源使用权拍卖", "资源税费征收", "资源调查登记"],
                    children: [{
                            name: "水利局",
                            icon: "fa-water",
                            func: "水资源管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["取水许可", "水资源费征收", "水利工程审批"],
                            children: []
                        },
                        {
                            name: "矿业局",
                            icon: "fa-gem",
                            func: "矿产开发许可",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["采矿权审批", "矿产储量登记", "矿山安全监管"],
                            children: []
                        },
                        {
                            name: "林业局",
                            icon: "fa-tree",
                            func: "森林资源保护",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["采伐许可", "林地审批", "森林防火"],
                            children: []
                        },
                        {
                            name: "农业局",
                            icon: "fa-tractor",
                            func: "农业生产指导",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["耕地保护", "农业补贴", "农产品质量监管"],
                            children: []
                        },
                        {
                            name: "牧业局",
                            icon: "fa-horse",
                            func: "畜牧业管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["草原使用审批", "畜牧防疫", "牧场管理"],
                            children: []
                        },
                        {
                            name: "能源局",
                            icon: "fa-bolt",
                            func: "能源资源管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["能源开发许可", "能源战略储备", "可再生能源推广"],
                            children: []
                        },
                        {
                            name: "土地局",
                            icon: "fa-map",
                            func: "土地规划与登记",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["土地使用权出让", "土地登记", "土地利用规划"],
                            children: []
                        },
                        {
                            name: "海洋局",
                            icon: "fa-water",
                            func: "海洋资源与环保",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["海域使用权审批", "海洋环境保护", "海洋调查"],
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: "民生大部",
            icon: "fa-heartbeat",
            func: "民生服务与公共设施",
            staff: [{
                    title: "民生大部部长",
                    name: "",
                    note: ""
                },
                {
                    title: "副部长",
                    name: "",
                    note: ""
                }
            ],
            powers: [
                "制定民生政策",
                "分配社会福利",
                "管理公共设施",
                "协调跨区域民生工程"
            ],
            children: [{
                    name: "卫生部",
                    icon: "fa-hospital",
                    func: "医疗卫生管理",
                    staff: [{
                        title: "卫生部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["药品审批", "医院评级", "疫情封锁建议", "医疗保险管理"],
                    children: [{
                            name: "疾病控制局",
                            icon: "fa-biohazard",
                            func: "疫情监测防控",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["传染病监测", "疫苗接种计划", "突发公卫事件处置"],
                            children: []
                        },
                        {
                            name: "医院管理局",
                            icon: "fa-clinic-medical",
                            func: "公立医院管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["公立医院考核", "医疗质量监管", "医患纠纷调解"],
                            children: []
                        },
                        {
                            name: "药品与医疗器械局",
                            icon: "fa-capsules",
                            func: "药品审批监管",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["新药审批", "药品抽检", "医疗器械注册"],
                            children: []
                        }
                    ]
                },
                {
                    name: "教育部",
                    icon: "fa-graduation-cap",
                    func: "国民教育管理",
                    staff: [{
                        title: "教育部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["教材审定", "学校设立许可", "高考命题", "教育经费分配"],
                    children: [{
                            name: "基础教育局",
                            icon: "fa-school",
                            func: "中小学教育",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["义务教育督导", "中小学教材审定", "教师编制管理"],
                            children: []
                        },
                        {
                            name: "高等教育局",
                            icon: "fa-university",
                            func: "大学教育",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["大学设立审批", "学科评估", "学位授予管理"],
                            children: []
                        },
                        {
                            name: "职业教育局",
                            icon: "fa-chalkboard-user",
                            func: "职业教育培训",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["职业院校管理", "技能等级认定", "校企合作指导"],
                            children: []
                        }
                    ]
                },
                {
                    name: "劳动部",
                    icon: "fa-briefcase",
                    func: "劳动关系、就业服务、劳动监察",
                    staff: [{
                        title: "劳动部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["最低工资制定（需财经大部会签）", "劳动争议仲裁", "就业服务", "劳动监察执法"],
                    children: [{
                            name: "劳动关系局",
                            icon: "fa-handshake",
                            func: "劳动关系协调",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["劳动合同备案", "集体合同审核", "三方协调机制"],
                            children: []
                        },
                        {
                            name: "就业服务局",
                            icon: "fa-briefcase",
                            func: "就业指导与职业介绍",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["就业信息发布", "职业培训补贴", "失业登记"],
                            children: []
                        },
                        {
                            name: "劳动监察局",
                            icon: "fa-shield-alt",
                            func: "劳动法执法检查",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["欠薪查处", "工时监管", "社保缴纳检查"],
                            children: []
                        }
                    ]
                },
                {
                    name: "福利部",
                    icon: "fa-hand-holding-heart",
                    func: "社会福利与保障，包括退役军人优待",
                    staff: [{
                        title: "福利部部长",
                        name: "",
                        note: ""
                    }],
                    powers: [
                        "福利金发放",
                        "低保审批",
                        "养老金管理",
                        "福利政策制定",
                        "退役军人安置与抚恤"
                    ],
                    children: [{
                            name: "积分福利核算局",
                            icon: "fa-chart-pie",
                            func: "根据积分计算福利",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["积分福利系数计算", "年度分红核算", "福利资格审核"],
                            children: []
                        },
                        {
                            name: "最低保障局",
                            icon: "fa-utensils",
                            func: "基础生存保障",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["低保资格认定", "临时救助审批", "特困人员供养"],
                            children: []
                        },
                        {
                            name: "积分养老金局",
                            icon: "fa-piggy-bank",
                            func: "养老金核算发放",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["养老金账户管理", "退休金计算", "养老金发放"],
                            children: []
                        },
                        {
                            name: "福利争议仲裁局",
                            icon: "fa-gavel",
                            func: "福利投诉仲裁",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["福利申请复议", "积分争议仲裁", "行政申诉处理"],
                            children: []
                        },
                        {
                            name: "退役军人事务局",
                            icon: "fa-user-shield",
                            func: "退役军人安置与优抚",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: [
                                "退役军人安置就业",
                                "优抚金发放",
                                "烈士褒扬",
                                "退役军人信访接待"
                            ],
                            children: []
                        }
                    ]
                },
                {
                    name: "规划发展部",
                    icon: "fa-chart-line",
                    func: "国家中长期发展规划",
                    staff: [{
                        title: "规划发展部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["起草国家发展规划", "重大项目审批", "区域发展协调", "政策评估"],
                    children: [{
                            name: "战略规划局",
                            icon: "fa-chart-line",
                            func: "中长期战略制定",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["五年规划起草", "远景目标设定", "战略咨询"],
                            children: []
                        },
                        {
                            name: "区域发展局",
                            icon: "fa-map-marked-alt",
                            func: "区域协调发展",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["区域政策制定", "跨省合作协调", "欠发达地区扶持"],
                            children: []
                        },
                        {
                            name: "重大项目局",
                            icon: "fa-hard-hat",
                            func: "重大工程审批监督",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["重大项目立项", "可行性研究评审", "项目进度监督"],
                            children: []
                        }
                    ]
                },
                {
                    name: "交通部",
                    icon: "fa-subway",
                    func: "交通运输管理",
                    staff: [{
                        title: "交通部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["公路、铁路、民航、水运管理", "交通规划", "运输安全监管"],
                    children: [{
                            name: "公路局",
                            icon: "fa-road",
                            func: "公路建设管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["国道省道规划", "高速公路审批", "公路养护监管"],
                            children: []
                        },
                        {
                            name: "铁路局",
                            icon: "fa-train",
                            func: "铁路运输",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["铁路网规划", "列车运行图", "铁路安全监管"],
                            children: []
                        },
                        {
                            name: "民航局",
                            icon: "fa-plane",
                            func: "民航管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["航线审批", "机场建设许可", "航空安全监管"],
                            children: []
                        },
                        {
                            name: "水运局",
                            icon: "fa-ship",
                            func: "水路运输",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["港口规划", "航道维护", "水运安全"],
                            children: []
                        },
                        {
                            name: "宇航局",
                            icon: "fa-rocket",
                            func: "民用航天与太空探索",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["民用航天器发射许可", "卫星频率分配", "太空探索计划"],
                            children: []
                        }
                    ]
                },
                {
                    name: "公共部",
                    icon: "fa-wrench",
                    func: "公共民生设施",
                    staff: [{
                        title: "公共部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["公共设施建设运营", "供水供气管网管理", "环卫管理", "区域供暖"],
                    children: [{
                            name: "供水管理局",
                            icon: "fa-tint",
                            func: "供水管网",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["自来水供应监管", "水质监测", "供水管网建设"],
                            children: []
                        },
                        {
                            name: "排水与环卫局",
                            icon: "fa-trash-alt",
                            func: "排水和垃圾处理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["污水处理", "垃圾清运", "环卫设施管理"],
                            children: []
                        },
                        {
                            name: "公共设施局",
                            icon: "fa-park",
                            func: "公园、公厕、路灯",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["城市公园管理", "公共厕所维护", "城市照明"],
                            children: []
                        },
                        {
                            name: "能源管网局",
                            icon: "fa-plug",
                            func: "燃气管网、热力管网",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["燃气管网审批", "供热管网监管", "能源输送安全"],
                            children: []
                        },
                        {
                            name: "区域供暖局",
                            icon: "fa-fire",
                            func: "北方地区供暖",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["供暖季安排", "供暖费标准", "供暖质量监管"],
                            children: []
                        },
                        {
                            name: "长距离输水管网局",
                            icon: "fa-water",
                            func: "跨区域调水工程",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["调水工程规划", "输水管线维护", "水资源调配"],
                            children: []
                        }
                    ]
                },
                {
                    name: "文化、旅游与体育部",
                    icon: "fa-landmark",
                    func: "文化事业、旅游推广、文化遗产保护、体育发展",
                    staff: [{
                        title: "部长",
                        name: "",
                        note: ""
                    }],
                    powers: [
                        "文化遗产保护与修复",
                        "旅游线路开发与推广",
                        "艺术团体扶持与管理",
                        "博物馆、图书馆、文化馆体系建设",
                        "文化产业政策制定",
                        "竞技体育与全民健身管理"
                    ],
                    children: [{
                            name: "文化局",
                            icon: "fa-mask",
                            func: "文化艺术事业管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["文学艺术创作扶持", "文艺院团管理", "非物质文化遗产保护"],
                            children: []
                        },
                        {
                            name: "文物局",
                            icon: "fa-landmark",
                            func: "不可移动文物保护",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["文物保护单位认定", "考古发掘审批", "文物修缮监管"],
                            children: []
                        },
                        {
                            name: "旅游局",
                            icon: "fa-umbrella-beach",
                            func: "旅游产业促进",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["A级景区评定", "旅行社资质审批", "旅游市场秩序监管"],
                            children: []
                        },
                        {
                            name: "博物馆与图书馆局",
                            icon: "fa-book",
                            func: "公共文化设施管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["国有博物馆管理", "公共图书馆体系建设", "馆藏文物修复监管"],
                            children: []
                        },
                        {
                            name: "文创产业局",
                            icon: "fa-lightbulb",
                            func: "文化创意产业扶持",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["文创产品开发扶持", "文化IP授权管理", "文化产业园认定"],
                            children: []
                        },
                        {
                            name: "体育局",
                            icon: "fa-futbol",
                            func: "体育事业管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: [
                                "竞技体育训练竞赛管理",
                                "全民健身活动推广",
                                "体育产业扶持",
                                "体育场馆管理",
                                "反兴奋剂工作"
                            ],
                            children: []
                        }
                    ]
                },
                {
                    name: "通信与信息化部",
                    icon: "fa-signal",
                    func: "通信、互联网、广播电视管理",
                    staff: [{
                        title: "通信与信息化部部长",
                        name: "",
                        note: ""
                    }],
                    powers: [
                        "电信运营商监管",
                        "频谱资源分配",
                        "互联网域名与IP地址管理",
                        "广播电视内容监管",
                        "无线电频率协调"
                    ],
                    children: [{
                            name: "电信管理局",
                            icon: "fa-phone-alt",
                            func: "电信行业监管",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["运营商牌照发放", "资费监管", "通信质量监督", "移动网络规划"],
                            children: []
                        },
                        {
                            name: "互联网管理局",
                            icon: "fa-globe",
                            func: "互联网资源与内容管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["域名注册管理", "IP地址分配", "互联网内容协调"],
                            children: []
                        },
                        {
                            name: "广播电视局",
                            icon: "fa-tv",
                            func: "广播电视行业管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["广播电视台审批", "节目内容监管", "卫星电视管理", "应急广播体系建设"],
                            children: []
                        },
                        {
                            name: "无线电管理局",
                            icon: "fa-broadcast-tower",
                            func: "无线电频率管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["频率分配", "无线电台执照", "干扰查处", "电磁兼容管理"],
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: "司法大部",
            icon: "fa-gavel",
            func: "司法行政、审判、检察、重大案件调查",
            staff: [{
                    title: "司法大部部长",
                    name: "",
                    note: "负责司法行政事务"
                },
                {
                    title: "最高法院首席大法官",
                    name: "",
                    note: "终身制"
                },
                {
                    title: "最高检察院检察长",
                    name: "",
                    note: "任期8年，不可连任"
                }
            ],
            powers: [
                "管理监狱、律师、公证",
                "终审权、司法解释权",
                "提起公诉、侦查监督",
                "独立调查重大案件"
            ],
            children: [{
                    name: "法务部",
                    icon: "fa-balance-scale",
                    func: "司法行政与法律服务管理",
                    staff: [{
                        title: "法务部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["监狱管理", "律师资格认证", "公证管理", "法制宣传", "知识产权管理"],
                    children: [{
                            name: "监狱管理局",
                            icon: "fa-building",
                            func: "监狱管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["监狱运营", "服刑人员管理", "减刑假释审核"],
                            children: []
                        },
                        {
                            name: "律师与公证管理局",
                            icon: "fa-file-signature",
                            func: "律师公证管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["律师资格认证", "律所注册", "公证处管理"],
                            children: []
                        },
                        {
                            name: "法制宣传局",
                            icon: "fa-chalkboard",
                            func: "普法教育",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["普法宣传", "法律咨询", "法治文化建设"],
                            children: []
                        },
                        {
                            name: "知识产权局",
                            icon: "fa-copyright",
                            func: "专利、商标、版权管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: [
                                "专利审查与授权",
                                "商标注册与管理",
                                "版权登记与保护",
                                "知识产权侵权纠纷处理",
                                "知识产权国际合作"
                            ],
                            children: [{
                                    name: "专利审查处",
                                    icon: "fa-file-alt",
                                    func: "专利申请审查",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["发明专利审查", "实用新型审查", "外观设计审查"],
                                    children: []
                                },
                                {
                                    name: "商标注册处",
                                    icon: "fa-trademark",
                                    func: "商标注册管理",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["商标申请审查", "商标续展", "商标争议处理"],
                                    children: []
                                },
                                {
                                    name: "版权管理处",
                                    icon: "fa-music",
                                    func: "版权登记保护",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["作品自愿登记", "版权合同备案", "版权纠纷调解"],
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "最高法院",
                    icon: "fa-gavel",
                    func: "国家最高审判机关",
                    staff: [{
                            title: "首席大法官",
                            name: "",
                            note: "由总统提名，立法会议同意"
                        },
                        {
                            title: "大法官",
                            name: "",
                            note: "共9人，终身制"
                        }
                    ],
                    powers: ["终审权", "司法解释权", "违宪审查权", "联邦事务终裁"],
                    children: []
                },
                {
                    name: "国家调查部",
                    icon: "fa-search",
                    func: "独立调查重大犯罪",
                    staff: [{
                        title: "国家调查部部长",
                        name: "",
                        note: "需立法会议2/3多数同意任免"
                    }],
                    powers: ["独立侦查贪腐案件", "有组织犯罪调查", "网络安全犯罪调查", "可直接向最高检察院移送"],
                    children: [{
                            name: "重大贪腐调查局",
                            icon: "fa-handcuffs",
                            func: "贪腐案件侦查",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["高官贪腐调查", "资产追缴", "洗钱侦查"],
                            children: []
                        },
                        {
                            name: "有组织犯罪调查局",
                            icon: "fa-users-slash",
                            func: "黑社会、贩毒等",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["黑社会性质组织侦查", "贩毒案件", "跨境犯罪"],
                            children: []
                        },
                        {
                            name: "网络安全调查局",
                            icon: "fa-shield-haltered",
                            func: "网络犯罪侦查",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["黑客攻击", "网络诈骗", "数据泄露调查"],
                            children: []
                        }
                    ]
                },
                {
                    name: "最高检察院",
                    icon: "fa-gavel",
                    func: "法律监督机关",
                    staff: [{
                        title: "检察长",
                        name: "",
                        note: "由总统提名，立法会议2/3多数同意"
                    }],
                    powers: ["提起公诉", "侦查监督", "审判监督", "抗诉权", "公益诉讼"],
                    children: [{
                            name: "公诉局",
                            icon: "fa-gavel",
                            func: "刑事公诉",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["审查起诉", "出庭支持公诉", "量刑建议"],
                            children: []
                        },
                        {
                            name: "侦查监督局",
                            icon: "fa-eye",
                            func: "侦查活动监督",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["批捕审查", "侦查合法性监督", "羁押必要性审查"],
                            children: []
                        },
                        {
                            name: "审判监督局",
                            icon: "fa-clipboard-list",
                            func: "审判活动监督",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["抗诉", "死刑复核监督", "再审检察建议"],
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: "财经大部",
            icon: "fa-chart-line",
            func: "财政、经济、金融、积分管理",
            staff: [{
                    title: "财经大部部长",
                    name: "",
                    note: ""
                },
                {
                    title: "中央银行行长",
                    name: "",
                    note: "任期8年，跨总统任期，法律保障独立性"
                }
            ],
            powers: [
                "编制国家预算",
                "征税与财政支出",
                "制定产业政策",
                "独立货币政策",
                "积分账户管理"
            ],
            children: [{
                    name: "财政部",
                    icon: "fa-coins",
                    func: "财政收支管理",
                    staff: [{
                        title: "财政部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["编制预算", "征税", "国库管理", "国债发行", "积分账户管理"],
                    children: [{
                            name: "积分管理局",
                            icon: "fa-chart-bar",
                            func: "公民积分账户管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["积分记录", "积分清算", "积分查询"],
                            children: []
                        },
                        {
                            name: "税率与积分换算局",
                            icon: "fa-calculator",
                            func: "税率与积分换算规则",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["累进积分率制定", "积分上限管理", "积分借款规则"],
                            children: []
                        },
                        {
                            name: "国债与股份局",
                            icon: "fa-chart-pie",
                            func: "国家股份凭证发行",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["国家股份发行", "国债承销", "债务管理"],
                            children: []
                        },
                        {
                            name: "预算管理局",
                            icon: "fa-file-invoice",
                            func: "预算编制执行",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["年度预算编制", "预算执行监督", "决算审核"],
                            children: []
                        },
                        {
                            name: "税务局",
                            icon: "fa-receipt",
                            func: "税收征管",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["税款征收", "税务稽查", "纳税服务"],
                            children: []
                        },
                        {
                            name: "国库局",
                            icon: "fa-building",
                            func: "国库资金管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["国库现金管理", "财政拨款", "政府账户"],
                            children: []
                        },
                        {
                            name: "债务管理办公室",
                            icon: "fa-file-invoice-dollar",
                            func: "政府债务管理",
                            staff: [{
                                title: "主任",
                                name: "",
                                note: ""
                            }],
                            powers: ["债务发行", "债务偿还", "债务风险监控"],
                            children: []
                        }
                    ]
                },
                {
                    name: "经济部",
                    icon: "fa-chart-simple",
                    func: "产业政策与经济增长",
                    staff: [{
                        title: "经济部部长",
                        name: "",
                        note: ""
                    }],
                    powers: [
                        "制定产业政策",
                        "反垄断执法",
                        "物价干预",
                        "经济统计",
                        "增长率目标设定",
                        "标准计量管理",
                        "战略储备管理"
                    ],
                    children: [{
                            name: "增长调控局",
                            icon: "fa-chart-line",
                            func: "经济增长目标管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["GDP目标制定", "经济形势分析", "调控政策建议"],
                            children: []
                        },
                        {
                            name: "福利浮动计算局",
                            icon: "fa-percent",
                            func: "浮动福利金计算",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["浮动福利金总额计算", "增长率挂钩系数设定", "下限保障"],
                            children: []
                        },
                        {
                            name: "积分红利分配局",
                            icon: "fa-chart-pie",
                            func: "年度积分分红计算",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["个人分红计算", "分红发放", "账户更新"],
                            children: []
                        },
                        {
                            name: "产业政策局",
                            icon: "fa-industry",
                            func: "产业规划与扶持",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["产业规划制定", "产业补贴审批", "重点产业扶持"],
                            children: []
                        },
                        {
                            name: "贸易促进局",
                            icon: "fa-globe",
                            func: "国内外贸易促进",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["出口促进", "进口管理", "贸易协定执行"],
                            children: []
                        },
                        {
                            name: "物价监管局",
                            icon: "fa-tags",
                            func: "市场价格监管",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["价格监测", "反垄断", "价格违法行为查处"],
                            children: []
                        },
                        {
                            name: "统计局",
                            icon: "fa-chart-bar",
                            func: "经济与社会统计",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["GDP核算", "CPI统计", "人口普查", "经济数据发布"],
                            children: []
                        },
                        {
                            name: "标准化与计量局",
                            icon: "fa-ruler",
                            func: "国家标准与计量监督",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: [
                                "国家标准制定与发布",
                                "计量器具检定监督",
                                "质量认证管理",
                                "检验检测机构资质认定"
                            ],
                            children: [{
                                    name: "国家标准处",
                                    icon: "fa-file-alt",
                                    func: "国家标准制定",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["国标立项审批", "标准审查发布", "国际标准采标"],
                                    children: []
                                },
                                {
                                    name: "计量监督处",
                                    icon: "fa-balance-scale",
                                    func: "计量监督管理",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["计量器具检定", "计量校准监督", "计量纠纷仲裁"],
                                    children: []
                                },
                                {
                                    name: "质量认证处",
                                    icon: "fa-certificate",
                                    func: "质量认证管理",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["产品认证", "体系认证监管", "认证机构管理"],
                                    children: []
                                }
                            ]
                        },
                        {
                            name: "粮食与物资储备局",
                            icon: "fa-warehouse",
                            func: "国家战略物资储备管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: [
                                "粮食储备管理与轮换",
                                "战略物资（石油、药品、救灾物资）储备",
                                "储备物资应急调拨",
                                "储备仓库监管"
                            ],
                            children: [{
                                    name: "粮食储备处",
                                    icon: "fa-wheat-alt",
                                    func: "粮食储备管理",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["中央储备粮管理", "粮食收购", "粮库监管"],
                                    children: []
                                },
                                {
                                    name: "战略物资储备处",
                                    icon: "fa-oil-can",
                                    func: "战略物资储备",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["石油储备", "药品储备", "应急物资储备"],
                                    children: []
                                },
                                {
                                    name: "救灾物资协调处",
                                    icon: "fa-truck",
                                    func: "救灾物资调拨",
                                    staff: [{
                                        title: "处长",
                                        name: "",
                                        note: ""
                                    }],
                                    powers: ["应急调拨指令执行", "物资运输协调", "与紧急状态管理署协同"],
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "中央银行",
                    icon: "fa-building-columns",
                    func: "货币发行与金融监管",
                    staff: [{
                            title: "行长",
                            name: "",
                            note: "任期8年，独立于政府"
                        },
                        {
                            title: "副行长",
                            name: "",
                            note: "协助货币政策"
                        }
                    ],
                    powers: ["发行货币", "制定货币政策", "管理外汇储备", "监督商业银行", "积分清算"],
                    children: [{
                            name: "货币政策局",
                            icon: "fa-chart-line",
                            func: "货币政策制定执行",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["利率调整", "存款准备金率", "公开市场操作"],
                            children: []
                        },
                        {
                            name: "外汇管理局",
                            icon: "fa-globe",
                            func: "外汇储备管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["外汇储备运营", "汇率管理", "跨境资本流动监管"],
                            children: []
                        },
                        {
                            name: "银行监管局",
                            icon: "fa-building",
                            func: "商业银行监管",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["银行准入", "资本充足率监管", "风险处置"],
                            children: []
                        },
                        {
                            name: "国家积分清算中心",
                            icon: "fa-credit-card",
                            func: "积分清算与转账",
                            staff: [{
                                title: "主任",
                                name: "",
                                note: ""
                            }],
                            powers: ["积分跨行清算", "积分借款发放", "积分账户异常监测"],
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: "国安大部",
            icon: "fa-shield-haltered",
            func: "国家安全、对外事务、边境控制、国防科研",
            staff: [{
                    title: "国安大部部长",
                    name: "",
                    note: ""
                },
                {
                    title: "国防部长",
                    name: "",
                    note: "总统任免"
                }
            ],
            powers: [
                "统帅𣿅国护卫队",
                "对外情报搜集",
                "国内治安管理",
                "外交谈判",
                "边境与海关管理",
                "国防科研"
            ],
            children: [{
                    name: "国防部",
                    icon: "fa-shield",
                    func: "国家军事防御",
                    staff: [{
                            title: "国防部长",
                            name: "",
                            note: ""
                        },
                        {
                            title: "𣿅国护卫队总司令",
                            name: "",
                            note: "由总统兼任"
                        }
                    ],
                    powers: ["军队指挥", "国防动员", "武器装备采购", "对外军事情报", "海上执法（海警职能由军队执行）"],
                    children: [{
                            name: "𣿅国护卫队",
                            icon: "fa-soldier",
                            func: "国家武装力量，执行包括海警在内的国防与执法任务",
                            staff: [{
                                title: "总司令",
                                name: "",
                                note: "总统兼任"
                            }],
                            powers: ["陆海空作战", "国防安全", "军事训练", "海上执法巡逻", "海洋权益维护"],
                            children: []
                        },
                        {
                            name: "国家情报局",
                            icon: "fa-eye",
                            func: "对外军事情报",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["战略情报搜集", "军事情报分析", "对外反间谍"],
                            children: []
                        }
                    ]
                },
                {
                    name: "外交部",
                    icon: "fa-globe",
                    func: "对外关系与国际事务",
                    staff: [{
                        title: "外交部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["外交谈判", "条约签订（需立法会议批准）", "侨民保护", "驻外使领馆管理"],
                    children: []
                },
                {
                    name: "公安部",
                    icon: "fa-police-badge",
                    func: "国内公共安全",
                    staff: [{
                        title: "公安部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["治安管理", "刑事侦查", "户籍管理", "网络安全监管", "消防与应急救援"],
                    children: [{
                            name: "消防局",
                            icon: "fa-fire-extinguisher",
                            func: "火灾预防与扑救、综合应急救援",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: [
                                "消防审批",
                                "火灾扑救",
                                "灾害救援（地震、洪涝、山体滑坡等）",
                                "应急预案制定与演练",
                                "应急救援队伍建设"
                            ],
                            children: []
                        },
                        {
                            name: "警察局",
                            icon: "fa-shield-haltered",
                            func: "治安与刑事侦查",
                            staff: [{
                                title: "警察局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["巡逻防控", "刑事案件侦查", "治安管理"],
                            children: []
                        },
                        {
                            name: "交通警察局",
                            icon: "fa-traffic-light",
                            func: "道路交通安全管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["交通秩序维护", "事故处理", "驾驶证管理"],
                            children: []
                        },
                        {
                            name: "网络安全保卫局",
                            icon: "fa-shield",
                            func: "国内网络安全",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["网络监控", "网络犯罪打击", "关键信息基础设施保护"],
                            children: []
                        }
                    ]
                },
                {
                    name: "国家科学院",
                    icon: "fa-flask",
                    func: "国防与安全科技研发，兼管基础科学研究",
                    staff: [{
                            title: "院长",
                            name: "",
                            note: ""
                        },
                        {
                            title: "首席科学家",
                            name: "",
                            note: ""
                        }
                    ],
                    powers: [
                        "国防科技研发",
                        "网络安全技术",
                        "航天技术",
                        "基础科学研究（物理、化学、生物、数学等）",
                        "可向民生领域转化"
                    ],
                    children: [{
                            name: "军事技术研究院",
                            icon: "fa-microchip",
                            func: "武器与装备研发",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["新型武器研发", "装备升级", "军事技术试验"],
                            children: []
                        },
                        {
                            name: "网络安全研究院",
                            icon: "fa-shield-haltered",
                            func: "网络防御技术",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["加密技术", "网络攻防", "安全协议"],
                            children: []
                        },
                        {
                            name: "航天研究院",
                            icon: "fa-rocket",
                            func: "航天与空间技术",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["卫星研制", "运载火箭", "深空探测"],
                            children: []
                        },
                        {
                            name: "物理研究院",
                            icon: "fa-atom",
                            func: "物理学基础研究与应用",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["量子物理", "高能物理", "凝聚态物理", "核物理研究"],
                            children: []
                        },
                        {
                            name: "化学研究院",
                            icon: "fa-flask",
                            func: "化学基础研究与应用",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["有机化学", "无机化学", "材料化学", "催化技术"],
                            children: []
                        },
                        {
                            name: "生物科学研究院",
                            icon: "fa-dna",
                            func: "生物学基础研究与应用",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["分子生物学", "遗传学", "生物技术", "生物安全评估"],
                            children: []
                        },
                        {
                            name: "数学与系统科学研究院",
                            icon: "fa-square-root-alt",
                            func: "数学基础与系统科学",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["纯数学研究", "应用数学", "运筹学", "系统建模"],
                            children: []
                        },
                        {
                            name: "土星科学研究院",
                            icon: "fa-globe-asia",
                            func: "土星科学基础研究",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["地质学", "大气科学", "卫星研究"],
                            children: []
                        },
                        {
                            name: "信息科学研究院",
                            icon: "fa-microchip",
                            func: "信息科学技术研究",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["人工智能", "大数据", "半导体技术", "通信技术"],
                            children: []
                        },
                        {
                            name: "医学研究院",
                            icon: "fa-heartbeat",
                            func: "医学与药物研发",
                            staff: [{
                                title: "院长",
                                name: "",
                                note: ""
                            }],
                            powers: ["新药研发", "疫苗技术", "基因治疗", "医疗器械创新"],
                            children: []
                        }
                    ]
                },
                {
                    name: "人口管理部",
                    icon: "fa-users",
                    func: "人口登记与边境管理",
                    staff: [{
                        title: "人口管理部部长",
                        name: "",
                        note: ""
                    }],
                    powers: ["人口普查", "国民身份证管理", "户籍流动管理", "海关监管", "移民审批"],
                    children: [{
                            name: "海关",
                            icon: "fa-boxes",
                            func: "进出口货物监管",
                            staff: [{
                                title: "关长",
                                name: "",
                                note: ""
                            }],
                            powers: ["关税征收", "走私打击", "进出口检验"],
                            children: []
                        },
                        {
                            name: "移民局",
                            icon: "fa-passport",
                            func: "出入境与居留管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["签证审批", "居留许可", "边境检查", "难民甄别"],
                            children: []
                        },
                        {
                            name: "人口普查局",
                            icon: "fa-chart-bar",
                            func: "人口统计调查",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["十年人口普查", "年度人口抽样", "人口数据发布"],
                            children: []
                        },
                        {
                            name: "国民身份管理局",
                            icon: "fa-id-card",
                            func: "身份证件管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["身份证发放", "生物识别信息", "身份认证"],
                            children: []
                        },
                        {
                            name: "户籍流动管理局",
                            icon: "fa-exchange-alt",
                            func: "人口迁徙管理",
                            staff: [{
                                title: "局长",
                                name: "",
                                note: ""
                            }],
                            powers: ["户籍迁移审批", "流动人口登记", "居住证管理"],
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
};

// 导出供 HTML 使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        departmentsData
    };
}