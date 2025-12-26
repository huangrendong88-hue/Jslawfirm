import React from 'react';

interface HeroProps {
  isCrisisMode: boolean;
  navigateTo?: () => void;
}

const Hero: React.FC<HeroProps> = ({ isCrisisMode, navigateTo }) => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
      
      {/* Radial Gradient Background Accent */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] -z-10 transition-colors duration-1000 ${isCrisisMode ? 'bg-ultra-red/10' : 'bg-ultra-blue/10'}`}></div>

      {/* Core Identity Symbol */}
      <div className="relative mb-12 group cursor-pointer transition-transform duration-500 hover:scale-105">
        {/* Outer Ring */}
        <div className="w-40 h-40 rounded-full border-4 border-slate-300/20 relative flex items-center justify-center bg-slate-800/40 backdrop-blur-sm shadow-2xl">
           {/* Metallic Decoration */}
           <div className="absolute -top-4 w-48 h-24 border-t-2 border-slate-400/20 rounded-[100%]"></div>
           
           {/* The Light */}
           <div className={`w-32 h-32 rounded-full transition-all duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.5)]
             ${isCrisisMode 
               ? 'bg-gradient-radial from-rose-400 to-rose-700 shadow-[0_0_60px_rgba(244,63,94,0.8)] animate-blink-fast' 
               : 'bg-gradient-radial from-sky-300 to-blue-600 shadow-[0_0_50px_rgba(56,189,248,0.6)] animate-pulse-slow'
             }
           `}></div>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-[0.5em] text-ultra-blue uppercase">Guangdong Junxi Law Firm</h2>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent px-4">
            广东君熙律师事务所
        </h1>
      </div>
      
      <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-12 px-6 leading-relaxed">
        {isCrisisMode 
          ? <span className="text-ultra-red font-bold animate-pulse">检测到紧急法律援助请求。专家律师团队正在介入...</span>
          : "正义的最后一道防线。我们以极致的专业素养，为您构建坚不可摧的法律屏障。"
        }
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-6 z-10">
          <button 
            onClick={navigateTo}
            className="px-8 py-3 bg-ultra-blue/10 border border-ultra-blue text-ultra-blue font-bold tracking-widest hover:bg-ultra-blue hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]"
          >
              探索专业领域
          </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-float flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-ultra-blue to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;