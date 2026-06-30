import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plane, Menu, X, ChevronDown, Bot } from 'lucide-react';

const navItems = [
  { path: '/', label: '首页' },
  { path: '/b-end', label: '运营方服务', sub: [
    { path: '/b-end', label: '服务总览' },
    { path: '/b-end/screening', label: 'AI合规筛查' },
    { path: '/b-end/database', label: '合规数据库' },
  ]},
  { path: '/c-end', label: '游客服务', sub: [
    { path: '/c-end', label: '服务总览' },
    { path: '/c-end/verify', label: '线路核验' },
    { path: '/c-end/rights', label: '维权指引' },
  ]},
  { path: '/database', label: '法规库' },
  { path: '/admin', label: '管理后台' },
  { path: '/about', label: '关于' },
];

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg opacity-90 group-hover:opacity-100 transition-opacity" />
              <Bot className="w-5 h-5 text-white relative z-10" />
              <div className="absolute inset-0 bg-sky-400/30 rounded-lg blur-md group-hover:blur-lg transition-all" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-white tracking-tight">律翼</span>
              <span className="text-[10px] text-sky-400/70 font-medium tracking-wider">AI COMPLIANCE AGENT</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => setDropdownOpen(item.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={item.path}
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname.startsWith(item.path) && item.path !== '/'
                      ? 'text-sky-400 active'
                      : location.pathname === '/'
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.sub && <ChevronDown className="inline-block w-3 h-3 ml-0.5" />}
                </Link>
                {item.sub && dropdownOpen === item.label && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-48 glass rounded-xl overflow-hidden shadow-xl"
                    >
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-sky-500/10 hover:text-sky-400 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/c-end/verify" className="text-sm text-slate-300 hover:text-gold-400 transition-colors font-medium flex items-center gap-1.5">
              游客入口
            </Link>
            <Link
              to="/b-end/screening"
              className="btn-primary text-sm py-2 px-4"
            >
              运营方入口
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass overflow-hidden border-t border-sky-500/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                      location.pathname === item.path
                        ? 'bg-sky-500/10 text-sky-400'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.sub && (
                    <div className="pl-6 space-y-1">
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-3 py-1.5 text-xs text-slate-400 hover:text-sky-400"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
