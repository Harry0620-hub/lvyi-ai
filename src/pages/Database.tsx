import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database as DatabaseIcon, Search, Filter, BookOpen, MapPin, AlertTriangle,
  FileText, Calendar, Building2, Tag, ChevronDown, X,
} from 'lucide-react';
import { laws, beijingRules, cases, risks } from '../data';

type Tab = 'laws' | 'beijing' | 'cases' | 'risks';

const categoryColors: Record<string, string> = {
  '国际公约': 'bg-indigo-500/10 text-indigo-400',
  '空域管理': 'bg-sky-500/10 text-sky-400',
  '运营资质': 'bg-blue-500/10 text-blue-400',
  '安全管理': 'bg-green-500/10 text-green-400',
  '文旅经营': 'bg-gold-500/10 text-gold-400',
  '应急处置': 'bg-orange-500/10 text-orange-400',
  '消费者权益保护': 'bg-red-500/10 text-red-400',
  '行政处罚与救济': 'bg-purple-500/10 text-purple-400',
};

export default function Database() {
  const [tab, setTab] = useState<Tab>('laws');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterScope, setFilterScope] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = ['all', '国际公约', '空域管理', '运营资质', '安全管理', '文旅经营', '应急处置', '消费者权益保护', '行政处罚与救济'];

  const filteredLaws = useMemo(() => {
    return laws.filter(law => {
      const matchSearch = !search ||
        law.title.includes(search) ||
        law.summary.includes(search) ||
        law.tags.some(t => t.includes(search));
      const matchCategory = filterCategory === 'all' || law.category === filterCategory;
      const matchScope = filterScope === 'all' || law.scope === filterScope;
      const matchLevel = filterLevel === 'all' || law.level === filterLevel;
      return matchSearch && matchCategory && matchScope && matchLevel;
    });
  }, [search, filterCategory, filterScope, filterLevel]);

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-sky-500/10 text-sky-400 mb-4">
              <DatabaseIcon className="w-3 h-3" /> 合规数据库
            </span>
            <h1 className="text-3xl font-bold text-white mb-2">北京市低空旅游专属合规数据库</h1>
            <p className="text-slate-400">{laws.length}部法规 · {beijingRules.length}项北京地域规则 · {cases.length}件典型案例 · {risks.length}项风险清单</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { key: 'laws' as Tab, label: '法规库', count: laws.length, icon: BookOpen },
            { key: 'beijing' as Tab, label: '北京专属规则', count: beijingRules.length, icon: MapPin },
            { key: 'cases' as Tab, label: '典型案例', count: cases.length, icon: FileText },
            { key: 'risks' as Tab, label: '风险清单', count: risks.length, icon: AlertTriangle },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setExpanded(null); }}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                tab === t.key
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20'
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                tab === t.key ? 'bg-white/20' : 'bg-white/5'
              }`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Filters (only for laws tab) */}
        {tab === 'laws' && (
          <div className="glass rounded-2xl p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder="搜索法规名称、关键词、标签..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              {/* Category filter */}
              <select
                className="input-field lg:w-40"
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'all' ? '全部分类' : c}</option>
                ))}
              </select>
              {/* Scope filter */}
              <select
                className="input-field lg:w-32"
                value={filterScope}
                onChange={e => setFilterScope(e.target.value)}
              >
                <option value="all">全部范围</option>
                <option value="国际">国际</option>
                <option value="国家级">国家级</option>
                <option value="北京市">北京市</option>
              </select>
              {/* Level filter */}
              <select
                className="input-field lg:w-36"
                value={filterLevel}
                onChange={e => setFilterLevel(e.target.value)}
              >
                <option value="all">全部类型</option>
                <option value="国际条约">国际条约</option>
                <option value="法律">法律</option>
                <option value="行政法规">行政法规</option>
                <option value="部门规章">部门规章</option>
                <option value="规范性文件">规范性文件</option>
                <option value="行业标准">行业标准</option>
                <option value="地方性法规">地方性法规</option>
              </select>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              共 {filteredLaws.length} 条结果
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Laws tab */}
            {tab === 'laws' && (
              <div className="space-y-3">
                {filteredLaws.map((law, i) => (
                  <motion.div
                    key={law.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="glass rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpanded(expanded === law.id ? null : law.id)}
                      className="w-full px-5 py-4 flex items-start gap-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`badge text-[10px] ${categoryColors[law.category] || 'bg-slate-500/10 text-slate-400'}`}>
                            {law.category}
                          </span>
                          <span className="badge text-[10px] bg-slate-500/10 text-slate-400">{law.level}</span>
                          <span className={`badge text-[10px] ${
                            law.scope === '国际' ? 'bg-indigo-500/10 text-indigo-400' :
                            law.scope === '国家级' ? 'bg-sky-500/10 text-sky-400' : 'bg-gold-500/10 text-gold-400'
                          }`}>{law.scope}</span>
                          <span className="badge text-[10px] bg-green-500/10 text-green-400">{law.status}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1">{law.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-1">{law.summary}</p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${
                        expanded === law.id ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <AnimatePresence>
                      {expanded === law.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-sky-500/10"
                        >
                          <div className="px-5 py-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="flex items-center gap-2 text-xs">
                                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                                <span className="text-slate-500">发布机关：</span>
                                <span className="text-slate-300">{law.issuingAuthority}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                                <span className="text-slate-500">生效日期：</span>
                                <span className="text-slate-300">{law.effectiveDate}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <Tag className="w-3.5 h-3.5 text-sky-400" />
                                <span className="text-slate-500">编号：</span>
                                <span className="text-slate-300">{law.id}</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-sky-400 mb-2">核心条款</h4>
                              <ul className="space-y-1.5">
                                {law.keyArticles.map((a, j) => (
                                  <li key={j} className="text-xs text-slate-300 flex items-start gap-2">
                                    <span className="text-sky-400 mt-0.5">·</span>
                                    {a}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-sky-400 mb-2">法规摘要</h4>
                              <p className="text-xs text-slate-400 leading-relaxed">{law.summary}</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {law.tags.map((tag, j) => (
                                <span key={j} className="text-[10px] px-2 py-0.5 rounded bg-ink-800/50 text-slate-400">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Beijing rules tab */}
            {tab === 'beijing' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {beijingRules.map((rule, i) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-xl p-5 card-hover"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`badge text-[10px] ${
                        rule.type === '禁飞区' ? 'bg-red-500/10 text-red-400' :
                        rule.type === '限飞区' ? 'bg-gold-500/10 text-gold-400' :
                        rule.type === '净空保护' ? 'bg-sky-500/10 text-sky-400' :
                        rule.type === '文保限制' ? 'bg-purple-500/10 text-purple-400' :
                        'bg-green-500/10 text-green-400'
                      }`}>{rule.type}</span>
                      <span className="text-xs text-slate-500">{rule.area}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">{rule.title}</h3>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{rule.description}</p>
                    <div className="space-y-1 mb-3">
                      {rule.restrictions.slice(0, 2).map((r, j) => (
                        <div key={j} className="flex items-start gap-1.5">
                          <span className="text-red-400 text-[10px] mt-0.5">●</span>
                          <span className="text-[11px] text-slate-400 line-clamp-1">{r}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] text-slate-500 pt-2 border-t border-sky-500/5">
                      管理部门：{rule.authority}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Cases tab */}
            {tab === 'cases' && (
              <div className="space-y-4">
                {cases.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-xl p-5 card-hover"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`badge text-[10px] ${
                          c.type === '行政处罚' ? 'bg-red-500/10 text-red-400' :
                          c.type === '安全事故' ? 'bg-orange-500/10 text-orange-400' :
                          c.type === '消费纠纷' ? 'bg-gold-500/10 text-gold-400' :
                          'bg-sky-500/10 text-sky-400'
                        }`}>{c.type}</span>
                        <span className="text-xs text-slate-500">{c.date}</span>
                        <span className="text-xs text-slate-500">·</span>
                        <span className="text-xs text-slate-500">{c.location}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">{c.title}</h3>
                    <p className="text-xs text-slate-400 mb-3">{c.summary}</p>
                    <div className="bg-ink-800/30 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-sky-400 font-semibold">裁判/处罚结果</span>
                      </div>
                      <p className="text-xs text-slate-300">{c.outcome}</p>
                    </div>
                    <div className="flex items-start gap-2 bg-gold-500/5 rounded-lg p-3">
                      <AlertTriangle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gold-300">{c.riskWarning}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Risks tab */}
            {tab === 'risks' && (
              <div className="space-y-3">
                {risks.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-xl p-5 card-hover"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`badge text-[10px] ${categoryColors[r.category]}`}>
                          {r.category}
                        </span>
                        <span className={`badge text-[10px] ${
                          r.level === '高风险' ? 'bg-red-500/10 text-red-400' :
                          r.level === '中风险' ? 'bg-gold-500/10 text-gold-400' :
                          'bg-sky-500/10 text-sky-400'
                        }`}>{r.level}</span>
                        <span className="badge text-[10px] bg-slate-500/10 text-slate-400">
                          {r.frequency}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">{r.title}</h3>
                    <p className="text-xs text-slate-400 mb-3">{r.description}</p>
                    <div className="text-xs text-sky-400 mb-2">法律依据：{r.legalBasis}</div>
                    <div>
                      <span className="text-[10px] text-green-400 font-semibold">应对措施：</span>
                      <div className="mt-1 space-y-1">
                        {r.mitigation.map((m, j) => (
                          <div key={j} className="flex items-start gap-1.5">
                            <span className="text-green-400 text-[10px] mt-0.5">✓</span>
                            <span className="text-[11px] text-slate-400">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
