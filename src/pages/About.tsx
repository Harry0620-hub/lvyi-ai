import { motion } from 'framer-motion';
import {
  Plane, Target, Lightbulb, Users, Award, BookOpen,
  Heart, ShieldCheck, MapPin, Shield,
} from 'lucide-react';
import { roadmap } from '../data';

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto mb-6">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">关于律翼</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto text-balance">
              法治护航低空文旅，合规赋能产业发展。北京市低空旅游专属合规服务平台。
            </p>
          </motion.div>
        </div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-sky-400" />
            <h2 className="text-xl font-bold text-white">项目愿景</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-sky-400 mb-2">短期愿景</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                打磨出贴合北京低空旅游行业实际需求的合规服务产品，成为北京区域内中小微低空旅游运营主体认可的合规服务伙伴，助力行业整体合规风险防控能力提升。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gold-400 mb-2">长期愿景</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                在北京市场模式成熟后，逐步向全国低空经济试点城市复制推广，打造国内领先的低空旅游垂直合规服务品牌，为我国低空经济的安全、有序发展贡献青年力量。
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {[
            { icon: Lightbulb, title: '专业', desc: '以严谨审慎的态度对待每一条法规的梳理与拆解，杜绝专业疏漏', color: 'sky' },
            { icon: Heart, title: '公益', desc: '为C端游客提供完全免费的合规核验与维权指引服务', color: 'gold' },
            { icon: ShieldCheck, title: '务实', desc: '不盲目追求规模扩张，优先保障项目的专业性与实用性', color: 'green' },
          ].map((v, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center">
              <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                v.color === 'sky' ? 'bg-sky-500/10' : v.color === 'gold' ? 'bg-gold-500/10' : 'bg-green-500/10'
              }`}>
                <v.icon className={`w-6 h-6 ${
                  v.color === 'sky' ? 'text-sky-400' : v.color === 'gold' ? 'text-gold-400' : 'text-green-400'
                }`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{v.title}</h3>
              <p className="text-xs text-slate-400">{v.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-sky-400" />
            <h2 className="text-xl font-bold text-white">团队介绍</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">核心团队</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                项目核心团队均为在校大学生，来自法学、人工智能、工科试验班等专业，形成了优势互补、能力全面的跨专业团队。团队成员均具备扎实的专业基础，建立了常态化的学习机制。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">项目负责人</h3>
              <div className="bg-ink-800/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-semibold text-white">李昂</span>
                  <span className="text-xs text-slate-500">北京理工大学法学院</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  负责本项目的整体策划、产品设计与合规体系搭建，主导北京市低空旅游专属合规数据库的法规梳理与结构化拆解工作，统筹团队推进项目落地运营。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-center"
        >
          <h2 className="text-xl font-bold text-white mb-6">联系我们</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-sky-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">项目负责人</h4>
              <p className="text-sm text-slate-400">李昂</p>
              <p className="text-xs text-slate-500 mt-1">北京理工大学法学院</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-gold-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">项目性质</h4>
              <p className="text-sm text-slate-400">大学生创业项目</p>
              <p className="text-xs text-slate-500 mt-1">低空旅游垂直合规服务</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">所在院校</h4>
              <p className="text-sm text-slate-400">北京理工大学</p>
              <p className="text-xs text-slate-500 mt-1">报告撰写：2026年3月</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
