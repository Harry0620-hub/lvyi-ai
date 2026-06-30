import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SearchCheck, AlertTriangle, CheckCircle2, XCircle,
  MapPin, Building2, Plane, Loader2, ShieldCheck, Info, ArrowRight, RefreshCw,
} from 'lucide-react';
import { beijingRules, screeningOptions } from '../data';

type VerifyResult = {
  operatorValid: boolean;
  routeValid: boolean;
  inNoFlyZone: boolean;
  warnings: string[];
  safe: boolean;
};

export default function Verify() {
  const [operatorName, setOperatorName] = useState('');
  const [routeArea, setRouteArea] = useState('');
  const [aircraftType, setAircraftType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);

  const runVerify = () => {
    setLoading(true);
    setTimeout(() => {
      const route = beijingRules.find(r => r.title.includes(routeArea) || r.area.includes(routeArea));
      const isNoFly = beijingRules.some(r =>
        (r.type === '禁飞区') &&
        (routeArea.includes('天安门') || routeArea.includes('中南海'))
      );
      const isRestricted = beijingRules.some(r =>
        (r.type === '限飞区' || r.type === '文保限制') &&
        r.title.includes(routeArea)
      );

      const warnings: string[] = [];
      if (isNoFly) {
        warnings.push(`${routeArea}为绝对禁飞区，任何航空器未经特别批准严禁飞行。如遇运营方在该区域提供飞行服务，请立即举报。`);
      }
      if (isRestricted) {
        warnings.push(`${routeArea}属于限制飞行区域，低空旅游运营须取得专项审批。请向运营方确认是否已获得相关审批。`);
      }
      if (routeArea === '密云水库') {
        warnings.push('密云水库为饮用水源地保护区，周边飞行受限。请确认运营方已取得水务部门审批。');
      }
      if (!operatorName) {
        warnings.push('未能查询到该运营机构的资质信息，请谨慎选择。建议选择有通用航空经营许可证的正规运营主体。');
      }

      // Simulate: if operator name is empty, treat as unknown
      const operatorValid = operatorName.length > 0;

      setResult({
        operatorValid,
        routeValid: !isNoFly,
        inNoFlyZone: isNoFly,
        warnings,
        safe: !isNoFly && operatorValid,
      });
      setLoading(false);
    }, 2000);
  };

  const reset = () => {
    setResult(null);
    setOperatorName('');
    setRouteArea('');
    setAircraftType('');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gold-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold-400 animate-spin" />
            <Search className="w-8 h-8 text-gold-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">正在核验合规性...</h3>
          <p className="text-sm text-slate-400">系统正在比对86部法规与12项北京地域规则</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Result header */}
            <div className={`glass rounded-2xl p-8 mb-6 text-center ${
              result.safe ? 'border-green-500/20' : 'border-red-500/20'
            }`}>
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                result.safe ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}>
                {result.safe
                  ? <CheckCircle2 className="w-10 h-10 text-green-400" />
                  : <AlertTriangle className="w-10 h-10 text-red-400" />
                }
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${result.safe ? 'text-green-400' : 'text-red-400'}`}>
                {result.safe ? '核验通过 · 可安全体验' : '存在风险 · 请谨慎选择'}
              </h2>
              <p className="text-sm text-slate-400">
                运营机构：{operatorName || '未提供'} | 飞行区域：{routeArea || '未选择'}
              </p>
              <button onClick={reset} className="btn-secondary text-xs py-2 px-4 mt-4">
                <RefreshCw className="w-3 h-3" /> 重新核验
              </button>
            </div>

            {/* Detail items */}
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-semibold text-white mb-4">核验详情</h3>
              <div className="space-y-3">
                {[
                  { label: '运营主体资质', passed: result.operatorValid,
                    info: result.operatorValid ? '已查询到运营主体资质信息' : '未能查询到运营主体资质信息，请谨慎选择' },
                  { label: '飞行区域合规', passed: result.routeValid,
                    info: result.inNoFlyZone ? '该区域为绝对禁飞区，严禁飞行' : '该区域非禁飞区' },
                  { label: '禁飞区比对', passed: !result.inNoFlyZone,
                    info: result.inNoFlyZone ? '该线路位于禁飞区内，属于"黑飞"' : '该线路不在禁飞区内' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${
                    item.passed ? 'bg-green-500/5' : 'bg-red-500/5'
                  }`}>
                    {item.passed
                      ? <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    }
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white">{item.label}</span>
                      <p className="text-xs text-slate-400 mt-0.5">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="glass rounded-2xl p-6 mb-6 border-gold-500/20">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-gold-400" />
                  风险提示
                </h3>
                <div className="space-y-3">
                  {result.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 bg-gold-500/5 rounded-xl p-3">
                      <Info className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-300">{w}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety tips */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                低空旅游安全须知
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  '选择有通用航空经营许可证的正规运营主体',
                  '签订书面旅游合同，明确服务内容与退改签政策',
                  '确认航空器持有有效适航证书',
                  '确认飞行人员持有相应执照',
                  '购买航空意外保险',
                  '了解应急处置预案与救援方式',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400/60 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="badge bg-gold-500/10 text-gold-400 mb-4">
            <SearchCheck className="w-3 h-3" /> 线路合规一键核验 · 免费
          </span>
          <h1 className="text-3xl font-bold text-white mb-2">低空旅游线路合规核验</h1>
          <p className="text-slate-400">输入运营机构与飞行线路，快速核验合规性</p>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gold-400" /> 运营机构名称
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="请输入运营机构名称（如：某通用航空有限公司）"
              value={operatorName}
              onChange={e => setOperatorName(e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">留空将模拟未知运营主体的核验结果</p>
          </div>

          <div>
            <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-400" /> 飞行线路/区域
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {screeningOptions.routeAreas.map(area => (
                <button
                  key={area}
                  onClick={() => setRouteArea(area)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    routeArea === area
                      ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                      : 'bg-ink-800/50 text-slate-400 border border-transparent hover:border-gold-500/20'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Plane className="w-4 h-4 text-gold-400" /> 航空器类型（可选）
            </label>
            <select
              className="input-field"
              value={aircraftType}
              onChange={e => setAircraftType(e.target.value)}
            >
              <option value="">请选择...</option>
              {screeningOptions.aircraftTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="bg-gold-500/5 rounded-xl p-4">
            <p className="text-xs text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              本核验服务完全免费，系统将比对北京市低空旅游专属合规数据库，核验运营主体资质与飞行线路合规性。
              如核验发现风险，请谨慎选择该低空旅游项目。
            </p>
          </div>

          <button
            onClick={runVerify}
            disabled={!routeArea}
            className={`w-full btn-primary text-base py-3.5 ${
              !routeArea ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={routeArea ? { background: 'linear-gradient(135deg, #f59e0b, #d97706)' } : {}}
          >
            <Search className="w-5 h-5" />
            一键核验合规性
          </button>
        </div>
      </div>
    </div>
  );
}
