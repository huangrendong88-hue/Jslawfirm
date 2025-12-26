import React, { useEffect, useState } from 'react';
import { ViewState } from '../App';

interface NavbarProps {
  isCrisisMode: boolean;
  toggleCrisisMode: () => void;
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isCrisisMode, toggleCrisisMode, currentView, setCurrentView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: ViewState }[] = [
    { label: '首页', value: 'home' },
    { label: '关于君熙', value: 'about' },
    { label: '专业领域', value: 'services' },
    { label: '成功案例', value: 'stats' },
  ];

  return (
    <nav className={`fixed top-0 w-full px-6 py-4 flex justify-between items-center z-50 transition-all duration-300 border-b ${scrolled ? 'bg-deep/95 backdrop-blur-md border-white/10 py-3' : 'bg-deep/50 border-transparent py-5'}`}>
      
      {/* Logo Area */}
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => setCurrentView('home')}
      >
        <div className={`w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] transition-colors duration-500 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] ${isCrisisMode ? 'border-t-ultra-red drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]' : 'border-t-ultra-blue'}`}></div>
        <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-all leading-none">
              君熙律所
            </span>
            <span className="text-[10px] text-slate-500 tracking-[0.3em] font-bold">JUNXI LAW FIRM</span>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-10 items-center">
        {navItems.map((item) => (
          <button 
            key={item.value} 
            onClick={() => {
                setCurrentView(item.value);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:bg-ultra-blue after:transition-all
                ${currentView === item.value 
                    ? 'text-ultra-blue drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] after:w-full' 
                    : 'text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] after:w-0 hover:after:w-1/2'}
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* SOS Button */}
      <button 
        onClick={toggleCrisisMode}
        className={`relative overflow-hidden px-5 py-2 rounded-sm border transition-all duration-300 flex items-center gap-2 font-bold text-xs tracking-wider uppercase
          ${isCrisisMode 
            ? 'bg-ultra-red/20 border-ultra-red text-ultra-red shadow-[0_0_20px_rgba(244,63,94,0.4)]' 
            : 'bg-transparent border-ultra-blue/30 text-ultra-blue hover:bg-ultra-blue/10 hover:border-ultra-blue hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]'
          }
        `}
      >
        <span className={`w-1.5 h-1.5 rounded-full bg-current ${isCrisisMode ? 'animate-blink-fast' : 'animate-pulse'}`}></span>
        {isCrisisMode ? '紧急援助模式已激活' : 'SOS 紧急法律援助'}
      </button>
    </nav>
  );
};

export default Navbar;