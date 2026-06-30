import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart, Search, SearchCheck, LifeBuoy, ShieldCheck, AlertTriangle,
  CheckCircle2, ArrowRight, MapPin, Bot, Sparkles, Info,
} from 'lucide-react';
import { beijingRules } from '../data';

export default function CEndPortal() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero — AI Style */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
              <Bot className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs text-slate-300 font-medium">律翼AI · 游客服务 · 完全免费</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              飞得安心，<span className="bg-gradient-to-r from-gold-400 to-orange-400 bg-clip-text text-transparent">有律翼帮你把关</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
              打算去体验低空旅游？告诉律翼你要飞哪里，AI秒查线路是否安全合规——完全免费
            </p>

            {/* AI capability tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { icon: Sparkles, text: 'AI秒级核验' },
                { icon: MapPin, text: '北京禁飞区实时比对' },
                { icon: ShieldCheck, text: '黑飞项目识别' },
                { icon: Heart, text: '100%免费使用' },
              ].map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs text-slate-300">
                  <tag.icon className={`w-3 h-3 ${i === 3 ? 'text-gold-400' : 'text-gold-400/80'}`} />
                  {tag.text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 card-hover relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl" />
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gold-500/10 text-gold-400">
              <Sparkles className="w-2.5 h-2.5" />
              AI 核验
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/15 to-orange-500/10 flex items-center justify-center mb-4">
              <SearchCheck className="w-7 h-7 text-gold-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">线路安全吗？一查就知道</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              告诉律翼你想去的飞行项目和线路，AI自动核查运营方资质、禁飞限飞规则、文保限制等，
              秒出安全报告——别让"黑飞"毁了旅程。
            </p>
            <div className="space-y-2 mb-6">
              {['运营主体是否合法', '线路是否进入禁飞区', '是否有文保飞行限制', '简明安全提示报告'].map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400/60 flex-shrink-0" />
                  <span className="text-xs text-slate-300">{f}</span>
                </div>
              ))}
            </div>
            <Link
              to="/c-end/verify"
              className="inline-flex items-center gap-2 text-sm font-medium py-2.5 px-6 rounded-xl transition-all"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#fff',
              }}
            >
              <Sparkles className="w-4 h-4" />
              立即核验我的线路
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 card-hover relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full blur-3xl" />
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 text-red-400">
              <Info className="w-2.5 h-2.5" />
              免费
            </div>
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
              <LifeBuoy className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">遇到问题？维权指引来帮你</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              低空旅游中权益受损？不知道该找谁投诉？律翼为你提供完整的维权路径指引——
              从证据固定到官方渠道，全程免费。
            </p>
            <div className="space-y-2 mb-6">
              {['免费法律咨询', '维权流程一步步指引', '证据怎么保留才有效', '直接对接官方投诉渠道'].map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-400/60 flex-shrink-0" />
                  <span className="text-xs text-slate-300">{f}</span>
                </div>
              ))}
            </div>
            <Link
              to="/c-end/rights"
              className="btn-secondary text-sm py-2.5 px-6 inline-flex items-center gap-2"
            >
              获取维权指引
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Beijing no-fly zones info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-gold-400" />
            <h3 className="text-lg font-semibold text-white">北京这些地方不能随便飞</h3>
          </div>
          <p className="text-sm text-slate-400 mb-6">选低空旅游项目前，了解一下这些区域信息</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beijingRules.filter(r => r.type === '禁飞区' || r.type === '限飞区').slice(0, 6).map(rule => (
              <div key={rule.id} className="glass-light rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge text-[10px] ${
                    rule.type === '禁飞区' ? 'bg-red-500/10 text-red-400' : 'bg-gold-500/10 text-gold-400'
                  }`}>{rule.type}</span>
                  <span className="text-xs text-slate-500">{rule.area}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{rule.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{rule.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
