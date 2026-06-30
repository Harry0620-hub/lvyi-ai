// 平台统计数据
export const platformStats = {
  totalLaws: 60,
  internationalTreaties: 11,
  nationalLaws: 13,
  nationalRegulations: 7,
  departmentalRules: 10,
  policyDocuments: 9,
  beijingLaws: 8,
  industryStandards: 2,
  categories: 8,
  cases: 50,
  riskItems: 30,
  beijingRules: 12,
  enterpriseUsers: 30,
  routes: 20,
  annualVisitors: 100000,
  marketGrowth: 40,
  marketSize2025: 2, // 亿元
  marketSize2028: 8, // 亿元
  cEndVerifications: 12000,
  bEndScreenings: 850,
  complianceRate: 68,
};

// B端服务模块
export const bEndServices = [
  {
    id: 'screening',
    title: '智能合规筛查',
    subtitle: '基础免费服务',
    description: '输入企业资质、机型、人员、航线等信息，系统自动匹配法规数据库，一键生成《合规风险筛查报告》',
    icon: 'ShieldCheck',
    features: ['多维度合规检测', '自动匹配全量法规库', '风险点标注与法规依据', '整改建议生成'],
    price: '免费',
    priceNote: '基础服务免费，降低企业使用门槛',
    color: 'sky',
  },
  {
    id: 'custom-plan',
    title: '定制化合规方案',
    subtitle: '核心付费服务',
    description: '针对新航线设计、资质办理指引、安全制度搭建、应急预案制定等个性化需求，提供定制化合规落地方案',
    icon: 'FileText',
    features: ['新航线合规论证', '运营资质办理指引', '安全生产制度搭建', '应急处置预案制定'],
    price: '2000-20000元/项目',
    priceNote: '定价为传统律所的30%-50%',
    color: 'gold',
  },
  {
    id: 'risk-warning',
    title: '实时风险预警',
    subtitle: '年度顾问服务',
    description: '实时跟踪法规更新、禁飞区调整、监管要求变化，推送针对性风险预警与合规指引',
    icon: 'Bell',
    features: ['法规更新实时推送', '禁飞区调整预警', '资质年审到期提醒', '培训考核事项提醒'],
    price: '8000-30000元/年',
    priceNote: '中小微企业年度顾问服务费',
    color: 'primary',
  },
  {
    id: 'dispute',
    title: '争议解决支持',
    subtitle: '专项服务',
    description: '针对合同纠纷、消费纠纷、行政处罚应对等事项，提供法律咨询、证据梳理、文书撰写、维权方案',
    icon: 'Scale',
    features: ['法律咨询与方案制定', '证据梳理与固定', '法律文书撰写', '行政处罚应对'],
    price: '1000-10000元/件',
    priceNote: '固定服务费，部分案件可风险代理',
    color: 'red',
  },
  {
    id: 'training',
    title: '合规培训',
    subtitle: '增值服务',
    description: '为企业负责人、安全管理人员、飞行人员、一线服务人员等不同岗位，打造定制化合规培训课程',
    icon: 'GraduationCap',
    features: ['法律法规解读', '合规风险防控', '应急处置流程', '消费者权益保护'],
    price: '线上99-299元/人，线下2000-10000元/场',
    priceNote: '线上标准化课程+线下定制化实训',
    color: 'green',
  },
];

// C端服务模块
export const cEndServices = [
  {
    id: 'route-verify',
    title: '线路合规一键核验',
    description: '输入运营机构名称与飞行线路，快速核验主体资质与线路合规性，出具风险提示报告',
    icon: 'SearchCheck',
    features: ['运营主体资质核验', '飞行线路合规检查', '禁飞区/限飞区比对', '风险提示报告'],
    price: '免费',
  },
  {
    id: 'rights-guide',
    title: '消费维权免费指引',
    description: '提供免费法律咨询、维权流程指引、证据固定建议、官方投诉渠道对接等服务',
    icon: 'LifeBuoy',
    features: ['免费法律咨询', '维权流程指引', '证据固定建议', '官方投诉渠道对接'],
    price: '免费',
  },
];

// 合规筛查选项
export const screeningOptions = {
  aircraftTypes: [
    '直升机', '固定翼飞机', '动力伞', '热气球', '三角翼', '无人机编队', '低空跳伞',
  ],
  routeAreas: [
    '八达岭长城', '慕田峪长城', '密云水库', '十三陵', '大运河文化带', '京郊环线', '平谷景区', '其他',
  ],
  qualifications: [
    '通用航空经营许可证', '旅行社业务经营许可证', '安全生产许可证', '航空器适航证书', '飞行人员执照', '暂无',
  ],
};

// 图表数据
export const chartData = {
  marketGrowth: [
    { year: '2024', value: 1.2 },
    { year: '2025', value: 2.0 },
    { year: '2026', value: 3.5 },
    { year: '2027', value: 5.5 },
    { year: '2028', value: 8.0 },
  ],
  visitorGrowth: [
    { year: '2024', value: 6.5 },
    { year: '2025', value: 12 },
    { year: '2026', value: 18 },
    { year: '2027', value: 24 },
    { year: '2028', value: 30 },
  ],
  riskDistribution: [
    { name: '国际公约', value: 11, color: '#818cf8' },
    { name: '空域管理', value: 18, color: '#0ea5e9' },
    { name: '运营资质', value: 10, color: '#2563eb' },
    { name: '安全管理', value: 8, color: '#7dd3fc' },
    { name: '文旅经营', value: 6, color: '#fbbf24' },
    { name: '应急处置', value: 2, color: '#f59e0b' },
    { name: '消费者权益', value: 8, color: '#ef4444' },
    { name: '行政处罚', value: 3, color: '#dc2626' },
  ],
  complianceScoreTrend: [
    { month: '1月', score: 55 },
    { month: '2月', score: 58 },
    { month: '3月', score: 62 },
    { month: '4月', score: 65 },
    { month: '5月', score: 68 },
    { month: '6月', score: 72 },
  ],
};

// 运营规划
export const roadmap = [
  {
    phase: '第一阶段',
    title: '试点打磨',
    duration: '1个月',
    status: '进行中',
    goals: [
      '完成合规数据库最终校验与优化',
      '上线微信小程序测试版',
      '与2-3家低空旅游运营企业达成免费试点合作',
      '完善项目专业顾问支持体系',
    ],
  },
  {
    phase: '第二阶段',
    title: '推广落地',
    duration: '2个月',
    status: '待启动',
    goals: [
      '正式上线小程序完整版',
      '与行业协会、文旅局、通航机构达成合作',
      '实现稳定现金流',
      '达成15家以上付费合作，覆盖30%目标客群',
    ],
  },
  {
    phase: '第三阶段',
    title: '优化升级',
    duration: '3个月',
    status: '待启动',
    goals: [
      '拓展合规+审批、合规+保险等增值服务',
      '覆盖80%以上目标客群',
      '成为北京低空旅游合规服务标杆品牌',
      '完成标准化模式沉淀，准备全国推广',
    ],
  },
];
