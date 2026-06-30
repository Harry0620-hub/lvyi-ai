import { motion } from 'framer-motion';
import {
  LifeBuoy, Phone, Mail, FileText, ArrowRight, AlertTriangle,
  CheckCircle2, Info, Scale, ShieldCheck, ExternalLink, MessageSquare,
} from 'lucide-react';

const rightsSteps = [
  {
    step: 1,
    title: '确认权益受损',
    desc: '明确自身合法权益是否受到侵害，如：虚假宣传、安全装备不到位导致受伤、未经审批的"黑飞"项目、航班取消后拒绝退款等。',
    icon: AlertTriangle,
  },
  {
    step: 2,
    title: '固定与保存证据',
    desc: '及时保存相关证据，包括：旅游合同、付款凭证、宣传材料截图、现场照片/视频、医疗诊断证明、聊天记录、目击者联系方式等。',
    icon: FileText,
  },
  {
    step: 3,
    title: '与运营方协商',
    desc: '首先与低空旅游运营主体进行协商，明确诉求（退费、赔偿、道歉等），保留协商过程的书面记录。协商是最快捷的解决方式。',
    icon: MessageSquare,
  },
  {
    step: 4,
    title: '向监管部门投诉',
    desc: '协商不成时，可向以下部门投诉：12315消费者投诉热线、12301旅游投诉热线、民航华北地区管理局、北京市文旅局等。',
    icon: Phone,
  },
  {
    step: 5,
    title: '申请调解或仲裁',
    desc: '可向北京市消费者协会申请消费纠纷调解，或根据合同约定申请仲裁。调解与仲裁相对诉讼更为快捷、成本更低。',
    icon: Scale,
  },
  {
    step: 6,
    title: '提起诉讼',
    desc: '如以上途径均无法解决，可向人民法院提起民事诉讼。可根据情况主张退一赔三（消费欺诈）、人身损害赔偿等。',
    icon: ShieldCheck,
  },
];

const complaintChannels = [
  { name: '12315消费者投诉热线', phone: '12315', desc: '全国统一消费者投诉举报热线' },
  { name: '12301旅游投诉热线', phone: '12301', desc: '全国旅游服务质量投诉热线' },
  { name: '民航消费者事务中心', phone: '010-64287798', desc: '民航领域消费者投诉受理' },
  { name: '北京市文旅局', phone: '010-65158249', desc: '北京市旅游经营行为投诉' },
  { name: '北京市消协', phone: '010-88386919', desc: '北京市消费者权益保护' },
];

const legalBasis = [
  { law: '《消费者权益保护法》第55条', desc: '经营者提供商品或服务有欺诈行为的，消费者可要求退一赔三' },
  { law: '《民法典》第1198条', desc: '经营场所经营者未尽安全保障义务造成损害的，应承担侵权责任' },
  { law: '《民法典》第1217条', desc: '民用航空器造成他人损害的，经营者应承担侵权责任' },
  { law: '《旅游法》第79条', desc: '旅游经营者应对可能危及安全的事项作出真实说明和明确警示' },
];

export default function Rights() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-red-500/10 text-red-400 mb-4">
              <LifeBuoy className="w-3 h-3" /> 消费维权免费指引
            </span>
            <h1 className="text-3xl font-bold text-white mb-2">低空旅游消费维权指引</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              如果您在低空旅游消费过程中权益受损，请按以下步骤维护自身合法权益
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {rightsSteps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 flex gap-4 card-hover"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-red-400" />
                </div>
                {i < rightsSteps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-red-500/30 to-transparent mt-2" />
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-500">步骤 {item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Complaint channels */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-sky-400" />
            官方投诉渠道
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complaintChannels.map((ch, i) => (
              <div key={i} className="glass-light rounded-xl p-4 card-hover">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">{ch.name}</h4>
                </div>
                <p className="text-xs text-slate-400 mb-3">{ch.desc}</p>
                <a
                  href={`tel:${ch.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {ch.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Legal basis */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-gold-400" />
            维权法律依据
          </h3>
          <div className="space-y-3">
            {legalBasis.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-gold-500/5 rounded-xl p-4">
                <FileText className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.law}</h4>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="glass rounded-2xl p-6 border-sky-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-sky-400" />
            维权小贴士
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              '发现"黑飞"项目可向民航管理部门举报',
              '维权诉讼时效一般为3年，注意及时维权',
              '消费欺诈可主张"退一赔三"，最低500元',
              '人身损害赔偿包括医疗费、误工费、护理费等',
              '重大安全事故可同时追究运营方刑事责任',
              '保留所有证据原件，电子证据注意备份',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400/60 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
