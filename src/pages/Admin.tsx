import { motion } from 'framer-motion';
import {
  LayoutDashboard, Database, Users, AlertTriangle, TrendingUp,
  Building2, UserCheck, FileText, Bell, Activity, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar,
} from 'recharts';
import { platformStats, chartData, laws, risks } from '../data';

function StatCard({ icon: Icon, label, value, change, trend, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass rounded-2xl p-5 card-hover"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-sky-400" />
        </div>
        {change && (
          <span className={`text-xs flex items-center gap-0.5 ${
            trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </motion.div>
  );
}

export default function Admin() {
  const recentScreenings = [
    { company: '北京某通航有限公司', aircraft: '直升机', area: '八达岭长城', score: 85, time: '2026-06-30 14:23', status: '通过' },
    { company: '怀柔某飞行俱乐部', aircraft: '动力伞', area: '慕田峪长城', score: 42, time: '2026-06-30 11:15', status: '不通过' },
    { company: '密云某航空运动公司', aircraft: '热气球', area: '密云水库', score: 68, time: '2026-06-29 16:42', status: '待整改' },
    { company: '延庆某通航公司', aircraft: '固定翼飞机', area: '京郊环线', score: 92, time: '2026-06-29 10:08', status: '通过' },
    { company: '平谷某飞行体验中心', aircraft: '三角翼', area: '平谷景区', score: 55, time: '2026-06-28 15:30', status: '待整改' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-sky-500/10 text-sky-400 mb-4">
              <LayoutDashboard className="w-3 h-3" /> 管理后台
            </span>
            <h1 className="text-3xl font-bold text-white mb-1">平台运营数据看板</h1>
            <p className="text-slate-400 text-sm">实时监控平台运营状态与服务数据</p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Database} label="收录法规总数" value={`${platformStats.totalLaws}部`} change="+3" trend="up" delay={0} />
          <StatCard icon={Building2} label="B端企业用户" value={`${platformStats.enterpriseUsers}家`} change="+5" trend="up" delay={0.1} />
          <StatCard icon={UserCheck} label="C端公益核验" value={`${platformStats.cEndVerifications}次`} change="+18%" trend="up" delay={0.2} />
          <StatCard icon={FileText} label="合规筛查报告" value={`${platformStats.bEndScreenings}份`} change="+12%" trend="up" delay={0.3} />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Compliance score trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                行业合规分趋势
              </h3>
              <span className="badge bg-green-500/10 text-green-400">↑ 17分</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.complianceScoreTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.05)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} domain={[40, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ fill: '#38bdf8', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Risk distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-gold-400" />
              风险类型分布
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Market growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                北京低空旅游市场规模（亿元）
              </h3>
              <span className="badge bg-green-500/10 text-green-400">年增长40%+</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.marketGrowth}>
                  <defs>
                    <linearGradient id="colorMarket2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
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
                  <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} fill="url(#colorMarket2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Compliance rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center"
          >
            <h3 className="text-sm font-semibold text-white mb-4 self-start">行业合规率</h3>
            <div className="relative w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={[{ value: platformStats.complianceRate, fill: '#0ea5e9' }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar background dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{platformStats.complianceRate}%</span>
                <span className="text-xs text-slate-400">合规率</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">较上月提升 5%</p>
          </motion.div>
        </div>

        {/* Recent screenings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              近期合规筛查记录
            </h3>
            <span className="text-xs text-slate-500">最近5条</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sky-500/10">
                  <th className="text-left py-2 px-3 text-xs font-medium text-slate-500">企业</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-slate-500">航空器</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-slate-500">区域</th>
                  <th className="text-center py-2 px-3 text-xs font-medium text-slate-500">合规分</th>
                  <th className="text-center py-2 px-3 text-xs font-medium text-slate-500">状态</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-slate-500">时间</th>
                </tr>
              </thead>
              <tbody>
                {recentScreenings.map((s, i) => (
                  <tr key={i} className="border-b border-sky-500/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-xs text-white">{s.company}</td>
                    <td className="py-3 px-3 text-xs text-slate-400">{s.aircraft}</td>
                    <td className="py-3 px-3 text-xs text-slate-400">{s.area}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-xs font-semibold ${
                        s.score >= 80 ? 'text-green-400' : s.score >= 60 ? 'text-gold-400' : 'text-red-400'
                      }`}>{s.score}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`badge text-[10px] ${
                        s.status === '通过' ? 'bg-green-500/10 text-green-400' :
                        s.status === '不通过' ? 'bg-red-500/10 text-red-400' :
                        'bg-gold-500/10 text-gold-400'
                      }`}>{s.status}</span>
                    </td>
                    <td className="py-3 px-3 text-right text-xs text-slate-500">{s.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Service distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: FileText, label: '定制化合规方案', value: '23', total: '份', color: 'gold' },
            { icon: Bell, label: '年度合规顾问', value: '15', total: '家', color: 'sky' },
            { icon: Users, label: '合规培训', value: '186', total: '人次', color: 'green' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="glass rounded-2xl p-5 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                item.color === 'gold' ? 'bg-gold-500/10' :
                item.color === 'sky' ? 'bg-sky-500/10' : 'bg-green-500/10'
              }`}>
                <item.icon className={`w-6 h-6 ${
                  item.color === 'gold' ? 'text-gold-400' :
                  item.color === 'sky' ? 'text-sky-400' : 'text-green-400'
                }`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{item.value}<span className="text-sm text-slate-400 ml-1">{item.total}</span></div>
                <div className="text-xs text-slate-400">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
