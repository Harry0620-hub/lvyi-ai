import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, AlertTriangle, XCircle, ArrowRight, ArrowLeft,
  CheckCircle2, Loader2, FileCheck, Download, RefreshCw,
  Building2, Plane, User, MapPin, FileText, Bell, Scale, GraduationCap,
  Lightbulb,
} from 'lucide-react';
import { screeningOptions, risks, laws } from '../data';
import type { ScreeningResult } from '../types';

type FormData = {
  companyName: string;
  aircraftType: string;
  routeArea: string;
  qualifications: string[];
  pilotLicense: string;
  hasInsurance: boolean;
  hasContract: boolean;
  hasEmergencyPlan: boolean;
};

export default function Screening() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    aircraftType: '',
    routeArea: '',
    qualifications: [],
    pilotLicense: '',
    hasInsurance: false,
    hasContract: false,
    hasEmergencyPlan: false,
  });

  const steps = ['企业信息', '航空器与航线', '资质与人员', '安全管理'];

  const handleQualificationToggle = (qual: string) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.includes(qual)
        ? prev.qualifications.filter(q => q !== qual)
        : [...prev.qualifications, qual],
    }));
  };

  const runScreening = () => {
    setLoading(true);
    setTimeout(() => {
      const foundRisks: ScreeningResult['risks'] = [];

      // Check qualifications
      if (!formData.qualifications.includes('通用航空经营许可证')) {
        foundRisks.push({
          item: '未取得通用航空经营许可证',
          level: '高风险',
          detail: '运营主体未取得通用航空经营许可证即开展低空旅游经营活动，属于无证经营。',
          suggestion: '在开展经营活动前完成通用航空经营许可证申请，确保企业资质条件符合规章要求。',
        });
      }
      if (!formData.qualifications.includes('航空器适航证书')) {
        foundRisks.push({
          item: '航空器适航证书缺失',
          level: '高风险',
          detail: '使用未通过适航审定或适航证书缺失的航空器执行飞行任务，严重违反适航管理规定。',
          suggestion: '立即办理航空器适航证书，建立适航证书到期提醒机制，禁止使用无证航空器飞行。',
        });
      }

      // Check pilot license
      if (!formData.pilotLicense || formData.pilotLicense === '暂无') {
        foundRisks.push({
          item: '飞行人员执照缺失',
          level: '高风险',
          detail: '安排未取得相应飞行执照的飞行人员执行低空旅游飞行任务，严重违反民航管理规定。',
          suggestion: '确保所有飞行人员持有相应等级的有效执照，建立飞行人员资质审查制度。',
        });
      }

      // Check route area restrictions
      if (['八达岭长城', '慕田峪长城', '十三陵', '大运河文化带'].includes(formData.routeArea)) {
        foundRisks.push({
          item: '文保单位周边飞行需专项审批',
          level: '高风险',
          detail: `${formData.routeArea}为世界文化遗产/文物保护单位，周边低空飞行须取得文物保护专项审批。`,
          suggestion: '在文保单位周边飞行前须取得文物部门审批，开展文物保护影响评估。',
        });
      }
      if (formData.routeArea === '密云水库') {
        foundRisks.push({
          item: '水源保护区飞行限制',
          level: '中风险',
          detail: '密云水库为北京市重要饮用水源地，周边低空飞行活动受到水源保护与生态保护限制。',
          suggestion: '水库水面及周边500米范围内限制低空飞行，运营须经水务部门审批。',
        });
      }

      // Check contract
      if (!formData.hasContract) {
        foundRisks.push({
          item: '未与游客签订书面旅游合同',
          level: '中风险',
          detail: '低空旅游运营主体未与游客签订书面旅游合同，违反旅游法规要求。',
          suggestion: '制定标准化低空旅游服务合同模板，每次服务前与游客签订书面合同。',
        });
      }

      // Check insurance
      if (!formData.hasInsurance) {
        foundRisks.push({
          item: '未购买足额责任保险',
          level: '中风险',
          detail: '运营主体未购买航空器第三者责任险，在发生事故时无法有效赔偿受害者损失。',
          suggestion: '按规定购买航空器第三者责任险及乘客意外伤害险，定期评估保险额度。',
        });
      }

      // Check emergency plan
      if (!formData.hasEmergencyPlan) {
        foundRisks.push({
          item: '应急处置预案缺失',
          level: '中风险',
          detail: '运营主体未制定完善的应急处置预案，在突发事故时无法有效应对。',
          suggestion: '制定涵盖各类突发场景的应急处置预案，每季度至少组织一次应急演练。',
        });
      }

      // Calculate score
      const highRisks = foundRisks.filter(r => r.level === '高风险').length;
      const midRisks = foundRisks.filter(r => r.level === '中风险').length;
      const lowRisks = foundRisks.filter(r => r.level === '低风险').length;
      const score = Math.max(0, 100 - highRisks * 25 - midRisks * 10 - lowRisks * 5);

      const suggestions = [
        '建议定期（至少每季度）进行一次全面合规自查，及时更新合规档案。',
        '建议建立合规管理台账，对所有资质文件、审批文件进行集中管理与到期提醒。',
        '建议关注北京市低空经济政策动态，及时调整运营策略以符合最新监管要求。',
        '建议为全体员工定期开展合规培训，提升全员合规意识与风险防控能力。',
      ];

      setResult({
        passed: highRisks === 0,
        score,
        risks: foundRisks,
        suggestions,
      });
      setLoading(false);
    }, 2500);
  };

  const reset = () => {
    setStep(0);
    setResult(null);
    setFormData({
      companyName: '', aircraftType: '', routeArea: '',
      qualifications: [], pilotLicense: '', hasInsurance: false,
      hasContract: false, hasEmergencyPlan: false,
    });
  };

  // ===== Result View =====
  if (result) {
    return (
      <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Report header */}
            <div className="glass rounded-2xl p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FileCheck className="w-8 h-8 text-sky-400" />
                    <h1 className="text-2xl font-bold text-white">合规风险筛查报告</h1>
                  </div>
                  <p className="text-sm text-slate-400">
                    企业：{formData.companyName || '未填写'} | 航空器：{formData.aircraftType || '未选择'} | 航线区域：{formData.routeArea || '未选择'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">生成时间：{new Date().toLocaleString('zh-CN')}</p>
                </div>
                <button onClick={reset} className="btn-secondary text-xs py-2 px-4">
                  <RefreshCw className="w-3 h-3" /> 重新筛查
                </button>
              </div>

              {/* Score */}
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="rgba(56, 189, 248, 0.1)" strokeWidth="8" fill="none" />
                    <motion.circle
                      cx="64" cy="64" r="56"
                      stroke={result.score >= 80 ? '#22c55e' : result.score >= 60 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="8" fill="none" strokeLinecap="round"
                      initial={{ strokeDasharray: '0 352' }}
                      animate={{ strokeDasharray: `${(result.score / 100) * 352} 352` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className={`text-3xl font-bold ${
                      result.score >= 80 ? 'text-green-400' : result.score >= 60 ? 'text-gold-400' : 'text-red-400'
                    }`}>{result.score}</div>
                    <div className="text-xs text-slate-500">合规分</div>
                  </div>
                </div>
                <div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold mb-2 ${
                    result.passed
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {result.passed ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    {result.passed ? '基础合规通过' : '存在合规风险'}
                  </div>
                  <p className="text-sm text-slate-400">
                    发现 {result.risks.length} 项风险点
                    （高风险 {result.risks.filter(r => r.level === '高风险').length} 项 ·
                    中风险 {result.risks.filter(r => r.level === '中风险').length} 项）
                  </p>
                </div>
              </div>
            </div>

            {/* Risk items */}
            {result.risks.length > 0 && (
              <div className="glass rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-gold-400" />
                  风险点详情
                </h3>
                <div className="space-y-4">
                  {result.risks.map((risk, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`rounded-xl p-4 border ${
                        risk.level === '高风险'
                          ? 'bg-red-500/5 border-red-500/20'
                          : risk.level === '中风险'
                          ? 'bg-gold-500/5 border-gold-500/20'
                          : 'bg-sky-500/5 border-sky-500/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            risk.level === '高风险' ? 'bg-red-400' : 'bg-gold-400'
                          }`} />
                          <h4 className="text-sm font-semibold text-white">{risk.item}</h4>
                        </div>
                        <span className={`badge text-[10px] ${
                          risk.level === '高风险'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-gold-500/10 text-gold-400'
                        }`}>{risk.level}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{risk.detail}</p>
                      <div className="flex items-start gap-2 mt-2 pt-2 border-t border-white/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-sky-300">{risk.suggestion}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-sky-400" />
                合规改进建议
              </h3>
              <div className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/10 flex items-center justify-center text-xs text-sky-400 font-semibold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-300">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related services */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">推荐服务</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-light rounded-xl p-4 card-hover">
                  <FileText className="w-6 h-6 text-gold-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">定制化合规方案</h4>
                  <p className="text-xs text-slate-400 mb-3">针对风险点提供定制化合规落地方案</p>
                  <span className="text-xs text-gold-400">2000-20000元/项目</span>
                </div>
                <div className="glass-light rounded-xl p-4 card-hover">
                  <Bell className="w-6 h-6 text-sky-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">实时风险预警</h4>
                  <p className="text-xs text-slate-400 mb-3">法规更新实时推送，资质到期提醒</p>
                  <span className="text-xs text-sky-400">8000-30000元/年</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ===== Loading View =====
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-sky-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-400 animate-spin" />
            <ShieldCheck className="w-8 h-8 text-sky-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">正在进行合规筛查...</h3>
          <p className="text-sm text-slate-400">系统正在匹配86部法规数据库</p>
          <div className="flex justify-center gap-2 mt-4">
            {['资质核查', '航线比对', '风险评估', '报告生成'].map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.5 }}
                className="text-xs text-sky-400"
              >
                {s}{i < 3 ? ' ·' : ''}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===== Form View =====
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="badge bg-sky-500/10 text-sky-400 mb-4">
            <ShieldCheck className="w-3 h-3" /> 免费智能合规筛查
          </span>
          <h1 className="text-3xl font-bold text-white mb-2">低空旅游合规风险筛查</h1>
          <p className="text-slate-400">填写以下信息，系统自动匹配法规数据库，生成合规风险报告</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                i === step ? 'bg-sky-500 text-white' : i < step ? 'bg-green-500/20 text-green-400' : 'bg-ink-800 text-slate-500'
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`ml-2 text-xs hidden sm:inline ${
                i === step ? 'text-white' : 'text-slate-500'
              }`}>{s}</span>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded ${i < step ? 'bg-green-500/30' : 'bg-ink-700'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="glass rounded-2xl p-6 sm:p-8 min-h-[320px]">
          <AnimatePresence mode="wait">
            {/* Step 0: Company info */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-sky-400" /> 企业/俱乐部名称
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入企业全称"
                    value={formData.companyName}
                    onChange={e => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Plane className="w-4 h-4 text-sky-400" /> 航空器类型
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {screeningOptions.aircraftTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setFormData({...formData, aircraftType: type})}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          formData.aircraftType === type
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                            : 'bg-ink-800/50 text-slate-400 border border-transparent hover:border-sky-500/20'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-400" /> 飞行航线/区域
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {screeningOptions.routeAreas.map(area => (
                      <button
                        key={area}
                        onClick={() => setFormData({...formData, routeArea: area})}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          formData.routeArea === area
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                            : 'bg-ink-800/50 text-slate-400 border border-transparent hover:border-sky-500/20'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Qualifications */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-sky-400" /> 已取得的资质许可（多选）
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {screeningOptions.qualifications.map(qual => (
                      <button
                        key={qual}
                        onClick={() => handleQualificationToggle(qual)}
                        className={`px-3 py-2.5 rounded-lg text-sm text-left transition-all flex items-center gap-2 ${
                          formData.qualifications.includes(qual)
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                            : 'bg-ink-800/50 text-slate-400 border border-transparent hover:border-sky-500/20'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          formData.qualifications.includes(qual)
                            ? 'bg-sky-500 border-sky-500'
                            : 'border-slate-600'
                        }`}>
                          {formData.qualifications.includes(qual) && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                        {qual}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-sky-400" /> 飞行人员执照情况
                  </label>
                  <select
                    className="input-field"
                    value={formData.pilotLicense}
                    onChange={e => setFormData({...formData, pilotLicense: e.target.value})}
                  >
                    <option value="">请选择...</option>
                    <option value="商用驾驶员执照（直升机）">商用驾驶员执照（直升机）</option>
                    <option value="运动飞行执照">运动飞行执照</option>
                    <option value="私用驾驶员执照">私用驾驶员执照</option>
                    <option value="无人机操控员执照">无人机操控员执照</option>
                    <option value="暂无">暂无执照</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 2: Safety management */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="text-sm text-slate-400 mb-4">请如实勾选以下安全管理事项：</p>
                {[
                  { key: 'hasInsurance', label: '已购买航空器第三者责任险及乘客意外险', icon: ShieldCheck },
                  { key: 'hasContract', label: '已与游客签订标准化书面旅游合同', icon: FileText },
                  { key: 'hasEmergencyPlan', label: '已制定完善的应急处置预案并定期演练', icon: AlertTriangle },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setFormData({...formData, [item.key]: !formData[item.key as keyof FormData]})}
                    className={`w-full px-4 py-3 rounded-xl text-left transition-all flex items-center gap-3 ${
                      formData[item.key as keyof FormData]
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-ink-800/50 border border-transparent hover:border-sky-500/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                      formData[item.key as keyof FormData]
                        ? 'bg-green-500 border-green-500'
                        : 'border-slate-600'
                    }`}>
                      {formData[item.key as keyof FormData] && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <item.icon className={`w-4 h-4 ${
                      formData[item.key as keyof FormData] ? 'text-green-400' : 'text-slate-500'
                    }`} />
                    <span className={`text-sm ${formData[item.key as keyof FormData] ? 'text-white' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white mb-4">确认信息</h3>
                <div className="space-y-3">
                  {[
                    { label: '企业名称', value: formData.companyName || '未填写' },
                    { label: '航空器类型', value: formData.aircraftType || '未选择' },
                    { label: '飞行区域', value: formData.routeArea || '未选择' },
                    { label: '已取得资质', value: formData.qualifications.length > 0 ? formData.qualifications.join('、') : '无' },
                    { label: '飞行人员执照', value: formData.pilotLicense || '未选择' },
                    { label: '责任保险', value: formData.hasInsurance ? '已购买' : '未购买' },
                    { label: '书面合同', value: formData.hasContract ? '已签订' : '未签订' },
                    { label: '应急预案', value: formData.hasEmergencyPlan ? '已制定' : '未制定' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-sky-500/5">
                      <span className="text-sm text-slate-400">{item.label}</span>
                      <span className="text-sm text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-sky-500/5 rounded-xl p-4 mt-4">
                  <p className="text-xs text-slate-400">
                    ※ 本筛查基于北京市低空旅游专属合规数据库（86部法规）进行自动化匹配，
                    生成的基础报告仅供参考。如需深度合规分析，建议使用定制化合规方案服务。
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-sky-500/10">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className={`btn-secondary text-sm py-2 px-4 ${
                step === 0 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> 上一步
            </button>

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="btn-primary text-sm py-2 px-4"
              >
                下一步 <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={runScreening}
                className="btn-primary text-sm py-2 px-6"
              >
                <ShieldCheck className="w-4 h-4" /> 开始合规筛查
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

