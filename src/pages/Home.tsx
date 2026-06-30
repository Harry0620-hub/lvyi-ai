import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, ShieldCheck, Search, Bell, Scale, GraduationCap, FileText,
  TrendingUp, Users, MapPin, AlertTriangle, CheckCircle2, ArrowRight,
  Database, BookOpen, Lightbulb, Heart, Building2, UserCheck, Sparkles,
  MessageSquare, Send, Zap, ArrowLeftRight, Bot, ChevronRight, Globe,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { platformStats, chartData, bEndServices, cEndServices } from '../data';

const iconMap: Record<string, any> = {
  ShieldCheck, FileText, Bell, Scale, GraduationCap,
  SearchCheck: Search, Search, LifeBuoy: Heart,
};

// ===== AI Chat Hero =====
const quickActions = [
  {
    icon: Building2,
    label: '我是运营方',
    desc: '合规筛查 · 风险预警 · 方案定制',
    to: '/b-end/screening',
    color: 'sky',
    gradient: 'from-sky-500/20 to-blue-600/10',
    border: 'border-sky-500/20 hover:border-sky-400/40',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
  },
  {
    icon: UserCheck,
    label: '我是游客',
    desc: '线路核验 · 维权指引 · 安全保障',
    to: '/c-end/verify',
    color: 'gold',
    gradient: 'from-gold-500/20 to-orange-600/10',
    border: 'border-gold-500/20 hover:border-gold-400/40',
    iconBg: 'bg-gold-500/10',
    iconColor: 'text-gold-400',
  },
  {
    icon: Database,
    label: '浏览法规库',
    desc: '60+部法规 · 北京专属规则',
    to: '/database',
    color: 'emerald',
    gradient: 'from-green-500/20 to-emerald-600/10',
    border: 'border-green-500/20 hover:border-green-40/40',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400',
  },
];

const aiWelcomeMessages = [
  '你好，我是律翼AI合规助手',
  '我可以帮你筛查运营合规风险',
  '也可以帮你核验飞行线路是否安全',
  '请选择你的身份，或直接告诉我你的需求',
];

function SkyParticles() {
  return (
    <div className="sky-particles">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="sky-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 8}s`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}
    </div>
  );
}

// AI Avatar component
function AIAvatar({ size = 'md', pulse = false }: { size?: 'sm' | 'md' | 'lg'; pulse?: boolean }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-11 h-11', lg: 'w-14 h-14' };
  const innerSizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' };
  return (
    <div className={`${sizes[size]} rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center relative ${pulse ? 'animate-pulse-slow' : ''}`}>
      <Bot className={`${innerSizes[size]} text-white`} />
      {pulse && (
        <>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 animate-ping opacity-20" />
          <div className={`absolute -inset-1 rounded-3xl bg-sky-400/5 blur-md`} />
        </>
      )}
    </div>
  );
}

function StatCard({ value, label, suffix, icon: Icon, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-2xl p-5 card-hover"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-sky-400" />
        </div>
      </div>
      <div className="text-3xl font-bold text-white tracking-tight">
        {value}<span className="text-lg text-sky-400 ml-1">{suffix}</span>
      </div>
      <div className="text-sm text-slate-400 mt-1">{label}</div>
    </motion.div>
  );
}

// ===== AI Chat Response Engine =====
interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  actions?: { label: string; to: string; icon?: any }[];
}

const aiResponses: { keywords: string[]; response: string; actions: ChatMessage['actions'] }[] = [
  {
    keywords: ['合规', '筛查', '运营', '资质', '企业', '公司', '开办', '申请', '审批', '办证', '风险预警'],
    response: '好的，我来帮你进行运营方合规分析。请选择你需要的服务：',
    actions: [
      { label: '智能合规筛查', to: '/b-end/screening', icon: ShieldCheck },
      { label: '定制化方案咨询', to: '/b-end/screening', icon: FileText },
      { label: '实时风险预警', to: '/b-end/portal', icon: Bell },
    ],
  },
  {
    keywords: ['核验', '线路', '安全', '飞行', '游客', '旅游', '体验', '能不能飞', '黑飞', '禁飞', '长城', '八达岭', '密云'],
    response: '明白了，你想确认飞行线路的安全性和合规性。让我帮你快速核验：',
    actions: [
      { label: '一键线路核验', to: '/c-end/verify', icon: Search },
      { label: '查看北京禁飞区', to: '/database', icon: MapPin },
      { label: '消费维权指引', to: '/c-end/rights', icon: Scale },
    ],
  },
  {
    keywords: ['法规', '法律', '条文', '规定', '政策', '查询', '搜索', '找法规', '低空经济', '民航法', '航空'],
    response: '律翼AI已收录60+部相关法规，涵盖国际公约、国家法律到北京地方规则。你可以：',
    actions: [
      { label: '浏览全部法规库', to: '/database', icon: Database },
      { label: '查看北京专属规则', to: '/database', icon: Globe },
    ],
  },
  {
    keywords: ['维权', '投诉', '纠纷', '赔偿', '权益', '受伤', '事故', '退款', '被骗', '维权指引'],
    response: '遇到消费纠纷别担心，律翼AI可以为你提供免费的维权指引：',
    actions: [
      { label: '获取维权指引', to: '/c-end/rights', icon: Scale },
      { label: '查看典型案例', to: '/database', icon: BookOpen },
    ],
  },
  {
    keywords: ['培训', '学习', '课程', '考试', '人员', '飞行员', '执照', '证书'],
    response: '律翼AI提供专业的合规培训服务，帮助你的团队提升合规能力：',
    actions: [
      { label: '了解培训服务', to: '/b-end/portal', icon: GraduationCap },
      { label: '运营方工作台', to: '/b-end/portal', icon: Building2 },
    ],
  },
];

function getAIResponse(input: string): { response: string; actions: ChatMessage['actions'] } {
  const lower = input.toLowerCase();
  for (const item of aiResponses) {
    if (item.keywords.some(k => lower.includes(k))) {
      return { response: item.response, actions: item.actions };
    }
  }
  return {
    response: '我是律翼AI，专注于北京市低空旅游领域的合规服务。我可以帮你做这些事情：',
    actions: [
      { label: '运营合规筛查', to: '/b-end/screening', icon: ShieldCheck },
      { label: '线路安全核验', to: '/c-end/verify', icon: Search },
      { label: '浏览法规库', to: '/database', icon: Database },
      { label: '维权指引', to: '/c-end/rights', icon: Scale },
    ],
  };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'traveler'>('enterprise');
  const [chatInput, setChatInput] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [showChatResult, setShowChatResult] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for AI welcome message
  useEffect(() => {
    if (messageIndex >= aiWelcomeMessages.length) return;
    const msg = aiWelcomeMessages[messageIndex];
    let i = 0;
    setTypedMessage('');
    const interval = setInterval(() => {
      if (i < msg.length) {
        setTypedMessage(msg.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setMessageIndex(prev => prev + 1);
          setTypedMessage('');
        }, messageIndex === aiWelcomeMessages.length - 1 ? 99999999 : 1500);
      }
    }, 50 + Math.random() * 30);
    return () => clearInterval(interval);
  }, [messageIndex]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = { role: 'user', content: chatInput };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');
    
    // Show thinking
    setIsThinking(true);
    setShowChatResult(true);
    
    // Simulate AI thinking + generate response
    setTimeout(() => {
      const { response, actions } = getAIResponse(chatInput);
      const aiMessage: ChatMessage = { role: 'ai', content: response, actions };
      setChatHistory(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div className="overflow-hidden">
      {/* ===== Hero - AI Chat Style ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/6 rounded-full blur-[100px]" />
          <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-gold-500/4 rounded-full blur-[80px]" />
        </div>
        <SkyParticles />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Brand */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <AIAvatar size="lg" pulse={true} />
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">律翼</h1>
                <p className="text-sm text-sky-400/80 font-medium tracking-widest mt-0.5">LÜ YI AI AGENT</p>
              </div>
            </div>

            {/* AI Chat Bubble Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="glass rounded-2xl p-6 relative">
                <div className="absolute -top-3 left-6">
                  <AIAvatar size="sm" />
                </div>
                <div className="pl-2 pt-2">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={messageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white text-lg font-medium leading-relaxed"
                    >
                      {typedMessage || '\u00A0'}
                      {typedMessage && typedMessage === aiWelcomeMessages[messageIndex]?.slice(0, typedMessage.length) && !typedMessage.endsWith('。') && !typedMessage.endsWith('？') && (
                        <span className="inline-block w-0.5 h-5 bg-sky-400 animate-pulse ml-0.5 align-middle" />
                      )}
                    </motion.p>
                  </AnimatePresence>

                  {/* Quick action cards inside chat bubble */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.5 }}
                    className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    {quickActions.map((action) => (
                      <Link
                        key={action.label}
                        to={action.to}
                        className={`group relative overflow-hidden rounded-xl border ${action.border} ${action.gradient} p-4 transition-all duration-300 hover:scale-[1.02]`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center flex-shrink-0`}>
                            <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">{action.label}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{action.desc}</p>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${action.iconColor} opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0 self-center`} />
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* AI Input bar — fully functional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              {/* Chat History (appears after first interaction) */}
              <AnimatePresence>
                {showChatResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar"
                  >
                    {chatHistory.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        {msg.role === 'ai' && <AIAvatar size="sm" />}
                        {msg.role === 'user' && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                            <UserCheck className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-sky-500/20 border border-sky-500/20'
                            : 'glass border border-sky-500/10'
                        }`}>
                          <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-slate-200'}`}>
                            {msg.content}
                          </p>
                          {msg.actions && msg.actions.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {msg.actions.map((action) => {
                                const ActionIcon = action.icon || ArrowRight;
                                return (
                                  <Link
                                    key={action.label}
                                    to={action.to}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/20 hover:border-sky-400/40 text-xs font-medium text-sky-300 hover:text-sky-200 transition-all"
                                  >
                                    <ActionIcon className="w-3.5 h-3.5" />
                                    {action.label}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Thinking indicator */}
                    {isThinking && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                      >
                        <AIAvatar size="sm" />
                        <div className="glass rounded-2xl rounded-bl-md px-5 py-3 border border-sky-500/10">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-xs text-slate-400 ml-1">律翼AI正在分析...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleChatSubmit} className="relative">
                <div className="glass rounded-2xl p-2 glow-blue focus-within:ring-2 focus-within:ring-sky-400/30 transition-all">
                  <div className="flex items-center gap-3 px-2">
                    <Sparkles className="w-5 h-5 text-sky-400/60 flex-shrink-0" />
                    <input
                      ref={chatInputRef}
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="描述你的需求，例如：帮我查一下八达岭长城低空游览的合规要求..."
                      className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm py-3 outline-none"
                    />
                    {isThinking ? (
                      <div className="flex items-center gap-1.5 mr-1">
                        <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <button type="submit" disabled={!chatInput.trim()} className="btn-primary py-2 px-4 text-sm !rounded-xl disabled:opacity-40 disabled:cursor-not-allowed">
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-gold-400/60" /> AI驱动 · 60部法规实时匹配
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-green-400/60" /> 北京地域专属
                  </span>
                  {showChatResult && (
                    <button
                      onClick={() => { setChatHistory([]); setShowChatResult(false); }}
                      className="text-xs text-slate-500 hover:text-sky-400 flex items-center gap-1 transition-colors"
                    >
                      重新开始 ↺
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10"
            >
              <StatCard value={platformStats.totalLaws} label="收录法规" suffix="部" icon={BookOpen} delay={0.1} />
              <StatCard value={platformStats.enterpriseUsers} label="覆盖运营主体" suffix="家+" icon={Building2} delay={0.2} />
              <StatCard value={platformStats.marketGrowth} label="行业年增长" suffix="%" icon={TrendingUp} delay={0.3} />
              <StatCard value={platformStats.cEndVerifications} label="公益核验服务" suffix="次" icon={UserCheck} delay={0.4} />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
      </section>

      {/* ===== Dual Track Model — Redesigned as Role Selection ===== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
              <Bot className="w-3 h-3 text-sky-400" />
              <span className="text-xs text-slate-300 font-medium">AI 双轨智能服务</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              选择你的身份，<span className="gradient-text">获取定制方案</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              不同角色，不同的合规需求——律翼AI为你匹配最精准的服务
            </p>
          </motion.div>

          {/* Tab switch — role-based */}
          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`px-7 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === 'enterprise'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              我是运营方
            </button>
            <button
              onClick={() => setActiveTab('traveler')}
              className={`px-7 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === 'traveler'
                  ? 'bg-gradient-to-r from-gold-500 to-orange-500 text-white shadow-lg shadow-gold-500/25'
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" />
              我是游客
            </button>
          </div>

          {/* Service cards */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(activeTab === 'enterprise' ? bEndServices : cEndServices).map((service, i) => {
              const Icon = iconMap[service.icon] || ShieldCheck;
              return (
                <div
                  key={service.id}
                  className="glass rounded-2xl p-6 card-hover group relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* AI badge on card */}
                  <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    activeTab === 'enterprise' ? 'bg-sky-500/10 text-sky-400' : 'bg-gold-500/10 text-gold-400'
                  }`}>
                    <Sparkles className="w-2.5 h-2.5" />
                    AI 驱动
                  </div>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    activeTab === 'enterprise' ? 'bg-sky-500/10' : 'bg-gold-500/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${activeTab === 'enterprise' ? 'text-sky-400' : 'text-gold-400'}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{service.description}</p>
                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 4).map((f, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-400/60 flex-shrink-0" />
                        <span className="text-xs text-slate-300">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-sky-500/10">
                    <span className={`text-sm font-semibold ${
                      service.price === '免费' ? 'text-green-400' : activeTab === 'enterprise' ? 'text-sky-400' : 'text-gold-400'
                    }`}>
                      {service.price}
                    </span>
                    <Link
                      to={activeTab === 'enterprise' ? '/b-end/screening' : '/c-end/verify'}
                      className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors"
                    >
                      开始使用 <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Database Showcase ===== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
                <Database className="w-3 h-3 text-sky-400" />
                <span className="text-xs text-slate-300 font-medium">核心知识引擎</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                AI 的<span className="gradient-text">法律大脑</span>
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                律翼AI的知识底座——整合国际条约、国家法规、部门规章、政策文件与北京地方规则，
                全部结构化为机器可理解的标签体系，让AI精准匹配每一项合规需求。
              </p>

              <div className="space-y-4">
                {[
                  { icon: Globe, title: '国际到地方全覆盖', desc: '从芝加哥公约到北京禁飞规则，11部国际条约+49部国内规范' },
                  { icon: MapPin, title: '北京地域专属引擎', desc: '净空保护、文保限制、禁飞限飞、航线审批等地域特色规则' },
                  { icon: AlertTriangle, title: '风险智能识别矩阵', desc: '50余件典型案例训练，30余项高频风险自动预警' },
                  { icon: CheckCircle2, title: '动态更新机制', desc: '新规发布7个工作日内入库，月度校验，双重审核' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/database" className="btn-primary mt-8 inline-flex items-center gap-2">
                <Database className="w-4 h-4" />
                探索知识库
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Database visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-6 glow-blue">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <AIAvatar size="sm" />
                    <h4 className="text-sm font-semibold text-white">知识库结构</h4>
                  </div>
                  <span className="text-xs text-slate-500">{platformStats.totalLaws}部法规</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData.riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartData.riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(15, 23, 42, 0.95)',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          borderRadius: '0.75rem',
                          fontSize: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {chartData.riskDistribution.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
                      <span className="text-xs text-slate-400">{item.name}</span>
                      <span className="text-xs text-white font-medium ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Market Analysis ===== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-ink-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
              <TrendingUp className="w-3 h-3 text-gold-400" />
              <span className="text-xs text-slate-300 font-medium">行业洞察</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">低空旅游市场爆发式增长</h2>
            <p className="text-slate-400">北京低空旅游市场规模年增长稳定在40%以上</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-white">市场规模趋势（亿元）</h4>
                <span className="badge bg-green-500/10 text-green-400">年增40%+</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData.marketGrowth}>
                    <defs>
                      <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.05)" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        borderRadius: '0.75rem',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      fill="url(#colorMarket)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-white">年接待游客量（万人次）</h4>
                <span className="badge bg-sky-500/10 text-sky-400">2028预计30万</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.visitorGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.05)" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        borderRadius: '0.75rem',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="value" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Pain points */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white text-center mb-8">律翼AI解决的核心问题</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, title: '法规分散难找', desc: '80+部法规分散多部门，通用工具无法适配北京', level: '71%' },
                { icon: AlertTriangle, title: '合规成本太高', desc: '70%中小微主体无力承担专业法务费用', level: '70%' },
                { icon: ShieldCheck, title: '全流程缺失', desc: '缺乏从资质到维权的完整合规闭环', level: '85%' },
                { icon: Users, title: '游客无法辨别', desc: '85%游客判断不了线路是否安全合规', level: '85%' },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 card-hover"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <p.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-2xl font-bold text-red-400/80">{p.level}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{p.title}</h4>
                  <p className="text-xs text-slate-400">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Innovation — AI-focused ===== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span className="text-xs text-slate-300 font-medium">为什么是律翼AI</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">不只是检索，<span className="gradient-text">是真正理解</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Lightbulb,
                title: '内容创新',
                subtitle: '北京专属"多规合一"知识图谱',
                desc: '首次将北京低空旅游领域多层级法规构建为关联知识图谱，AI可跨法规推理，而非简单关键词匹配。',
                color: 'sky',
              },
              {
                icon: ShieldCheck,
                title: '模式创新',
                subtitle: '"事前-事中-事后"AI闭环',
                desc: 'AI驱动的全流程合规：事前智能筛查、事中实时预警、事后维权辅助——让合规从被动变主动。',
                color: 'gold',
              },
              {
                icon: ArrowLeftRight,
                title: '双轨创新',
                subtitle: '运营方+游客双向赋能',
                desc: '同时为B端企业提供专业合规服务，为C端游客提供免费安全保障，形成产业与消费端的良性循环。',
                color: 'green',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-6 card-hover relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 ${
                  item.color === 'sky' ? 'bg-sky-400' : item.color === 'gold' ? 'bg-gold-400' : 'bg-green-400'
                }`} />
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                  item.color === 'sky' ? 'bg-sky-500/10' : item.color === 'gold' ? 'bg-gold-500/10' : 'bg-green-500/10'
                }`}>
                  <item.icon className={`w-7 h-7 ${
                    item.color === 'sky' ? 'text-sky-400' : item.color === 'gold' ? 'text-gold-400' : 'text-green-400'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className={`text-sm font-medium mb-3 ${
                  item.color === 'sky' ? 'text-sky-400' : item.color === 'gold' ? 'text-gold-400' : 'text-green-400'
                }`}>{item.subtitle}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA — AI Style ===== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center relative overflow-hidden glow-blue"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-600/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]" />

            <div className="relative z-10">
              <AIAvatar size="lg" pulse={true} />
              <h2 className="text-3xl font-bold text-white mt-6 mb-4">
                让律翼AI帮你一步到位
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                不论你是低空旅游的运营者还是体验者，
                告诉律翼你的需求，剩下的交给AI。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/b-end/screening" className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  我是运营方
                </Link>
                <Link to="/c-end/verify" className="btn-secondary text-base px-8 py-3.5 inline-flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  我是游客
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
