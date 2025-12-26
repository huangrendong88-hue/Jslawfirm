import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto animate-slide-up">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-8 w-1 bg-ultra-blue shadow-[0_0_10px_var(--ultra-blue)]"></div>
        <div>
          <h2 className="text-3xl font-bold text-white">关于君熙</h2>
          <span className="text-xs text-muted tracking-[0.2em] uppercase block mt-1">About Junxi Law Firm</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 text-slate-300 leading-loose">
          <p className="text-xl font-bold text-white">
            “哪怕只有一线希望，我们也会全力以赴。”
          </p>
          <p>
            广东君熙律师事务所成立于大湾区核心地带，是一家以商事争议解决、刑事辩护及企业合规为核心业务的精英化律所。我们不追求盲目的规模扩张，而是专注于每一个案件的极致打磨。
          </p>
          <p>
            如同光之卫士守护正义，君熙律师团队由红圈所资深律师、前资深法官及法学教授组成。我们摒弃传统的“万金油”服务模式，推行“专案专办、模拟法庭、大数据检索”三位一体的办案流程，确保每一位委托人的合法权益得到最坚实的捍卫。
          </p>
          <p>
            在这里，法律不仅是条文，更是守护自由与财产的雷霆手段。
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="p-4 border border-white/10 bg-card rounded">
                <h4 className="text-ultra-blue font-bold text-lg mb-1">极致专业</h4>
                <p className="text-xs text-muted">Precision</p>
            </div>
            <div className="p-4 border border-white/10 bg-card rounded">
                <h4 className="text-ultra-blue font-bold text-lg mb-1">绝对忠诚</h4>
                <p className="text-xs text-muted">Loyalty</p>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] w-full bg-slate-800 rounded-lg overflow-hidden border border-white/10 group">
             {/* Abstract visual representation of the firm */}
             <div className="absolute inset-0 bg-gradient-to-br from-deep to-slate-900 z-0"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border border-ultra-blue/30 rounded-full animate-pulse-slow flex items-center justify-center">
                    <div className="w-32 h-32 border border-ultra-blue/50 rounded-full flex items-center justify-center">
                        <div className="text-5xl">⚖️</div>
                    </div>
                </div>
             </div>
             {/* Tech lines */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ultra-blue/50 to-transparent"></div>
             <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ultra-blue/50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default About;