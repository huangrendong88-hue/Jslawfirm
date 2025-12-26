import React from 'react';

interface StatsProps {
    fullPage?: boolean;
}

const Stats: React.FC<StatsProps> = ({ fullPage = false }) => {
  const stats = [
    { value: "3,000+", label: "成功案例 (Cases)" },
    { value: "24h", label: "极速响应 (Response)" },
    { value: "98%", label: "胜诉/和解率 (Win Rate)" },
    { value: "¥20亿+", label: "挽回损失 (Value)" },
  ];

  const caseList = [
    { title: "某上市公司高管涉嫌挪用资金案", result: "无罪不起诉", tag: "刑事辩护" },
    { title: "跨国科技巨头商业秘密侵权纠纷", result: "胜诉获赔1.2亿", tag: "知识产权" },
    { title: "广东某大型房地产企业破产重整", result: "债务重组成功", tag: "破产重整" },
    { title: "涉案金额5亿的金融诈骗辩护", result: "刑期大幅减免", tag: "刑事辩护" },
  ];

  return (
    <section className={`py-20 border-y border-white/5 bg-gradient-to-r from-deep via-[#0f1623] to-deep relative overflow-hidden ${fullPage ? 'animate-slide-up' : ''}`}>
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      
      {/* Header if full page */}
      {fullPage && (
          <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
            <div className="flex items-center gap-4">
                <div className="h-8 w-1 bg-ultra-blue shadow-[0_0_10px_var(--ultra-blue)]"></div>
                <div>
                    <h2 className="text-3xl font-bold text-white">成功案例</h2>
                    <span className="text-xs text-muted tracking-[0.2em] uppercase block mt-1">Track Record</span>
                </div>
            </div>
          </div>
      )}

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10 mb-16">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <h4 className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-ultra-blue transition-colors duration-300 drop-shadow-lg">
              {stat.value}
            </h4>
            <p className="text-xs font-bold text-ultra-blue tracking-widest uppercase opacity-80 group-hover:opacity-100">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Case List (Only shown on full page view) */}
      {fullPage && (
          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseList.map((c, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-6 flex justify-between items-center hover:bg-white/10 transition-colors cursor-pointer group">
                          <div>
                              <div className="text-xs text-ultra-blue border border-ultra-blue/30 inline-block px-2 py-0.5 mb-2 rounded-sm">{c.tag}</div>
                              <h5 className="text-lg font-bold text-white group-hover:text-ultra-blue transition-colors">{c.title}</h5>
                          </div>
                          <div className="text-right">
                              <span className="block text-sm text-muted">案件结果</span>
                              <span className="text-xl font-bold text-emerald-400">{c.result}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </section>
  );
};

export default Stats;