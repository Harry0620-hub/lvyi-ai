import { Link } from 'react-router-dom';
import { Plane, MapPin, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-sky-500/10 bg-ink-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">律翼</span>
                <span className="text-[10px] text-sky-400/70 block">LÜ YI · COMPLIANCE</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              法治护航低空文旅，合规赋能产业发展。北京市低空旅游专属合规服务平台。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">企业服务</h4>
            <ul className="space-y-2">
              <li><Link to="/b-end/screening" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">智能合规筛查</Link></li>
              <li><Link to="/b-end" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">定制化合规方案</Link></li>
              <li><Link to="/b-end" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">实时风险预警</Link></li>
              <li><Link to="/b-end" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">合规培训</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">公益服务</h4>
            <ul className="space-y-2">
              <li><Link to="/c-end/verify" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">线路合规核验</Link></li>
              <li><Link to="/c-end/rights" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">消费维权指引</Link></li>
              <li><Link to="/database" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">法规数据库</Link></li>
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">关于我们</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">项目信息</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Shield className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>项目负责人：李昂</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>北京理工大学法学院</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sky-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2026 律翼 · 北京市低空旅游合规服务平台 | 项目负责人：李昂 · 北京理工大学法学院
          </p>
          <p className="text-xs text-slate-500">
            法治护航低空文旅 · 合规赋能产业发展
          </p>
        </div>
      </div>
    </footer>
  );
}
