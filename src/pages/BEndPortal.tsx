import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, FileText, Bell, Scale, GraduationCap,
  CheckCircle2, ArrowRight, Building2, Bot, Sparkles, Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { bEndServices } from '../data';

const iconMap: Record<string, any> = {
  ShieldCheck, FileText, Bell, Scale, GraduationCap,
};

export default function BEndPortal() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero — AI style */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
              <Bot className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs text-slate-300 font-medium">律翼AI · 运营方服务</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              你的AI合规<span className="gradient-text">智能助手</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
              告诉律翼你的运营情况，AI自动匹配60+部法规，从资质到运营、从风险到维权，全流程为你把关
            </p>

            {/* AI capability tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { icon: Sparkles, text: 'AI智能匹配' },
                { icon: Zap, text: '60部法规实时比对' },
                { icon: ShieldCheck, text: '北京地域专属' },
                { icon: FileText, text: '一键生成报告' },
              ].map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs text-slate-300">
                  <tag.icon className="w-3 h-3 text-sky-400" />
                  {tag.text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {bEndServices.map((service, i) => {
            const Icon = iconMap[service.icon] || ShieldCheck;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 card-hover group relative overflow-hidden"
              >
                {/* AI badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-500/10 text-sky-400">
                  <Sparkles className="w-2.5 h-2.5" />
                  AI 驱动
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <span className={`badge ${
                    service.price === '免费'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-sky-500/10 text-sky-400'
                  }`}>{service.subtitle}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{service.description}</p>
                <div className="space-y-2 mb-4">
                  {service.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-400/60 flex-shrink-0" />
                      <span className="text-xs text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-sky-500/10 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-white">{service.price}</span>
                    <p className="text-[10px] text-slate-500">{service.priceNote}</p>
                  </div>
                  {service.id === 'screening' && (
                    <Link to="/b-end/screening" className="btn-primary text-xs py-2 px-4">
                      立即体验 <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA — AI Chat Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-center relative overflow-hidden glow-blue"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-500/8 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">先试试免费的AI合规筛查</h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              输入企业资质、机型、人员、航线等信息，律翼AI自动匹配法规数据库，一键生成《合规风险筛查报告》
            </p>
            <Link to="/b-end/screening" className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              开始AI筛查
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
