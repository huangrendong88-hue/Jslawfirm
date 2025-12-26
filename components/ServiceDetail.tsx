import React, { useEffect } from 'react';
import { ServiceData } from './Services';

interface ServiceDetailProps {
  service: ServiceData;
  onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // "Randomly" generated content based on the service title to simulate a real detail page
  const features = [
    { title: "全流程法律监控", desc: `针对${service.title}案件特点，提供从立案侦查到审判阶段的全流程法律风险监控与应对。` },
    { title: "专家团队协同", desc: "由资深合伙人牵头，组建包括前法官、行业专家在内的专案小组，确保办案质量。" },
    { title: "可视化案件管理", desc: "运用君熙独有的案件管理系统，实时反馈案件进度，让正义看得见。" },
    { title: "模拟法庭演练", desc: "针对疑难复杂案件，组织模拟法庭实战演练，预判庭审焦点，制定最优辩护/代理策略。" }
  ];

  const workflows = [
    { step: "01", title: "深度访谈", desc: "详细了解案情背景与核心诉求" },
    { step: "02", title: "大数据检索", desc: "类案检索与司法观点分析" },
    { step: "03", title: "策略制定", desc: "出具可视化诉讼/非诉方案" },
    { step: "04", title: "极致执行", desc: "全天候响应，高强度庭审对抗" },
  ];

  return (
    <div className="min-h-screen bg-deep text-silver animate-slide-up pb-20">
      {/* Header Banner */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/10">
         <div className="absolute inset-0 bg-gradient-to-b from-card to-deep opacity-90 z-10"></div>
         {/* Abstract BG */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ultra-blue/20 blur-[100px] rounded-full z-0`}></div>
         
         <div className="relative z-20 text-center px-6">
            <div className="text-6xl mb-4 text-ultra-blue drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{service.title}</h1>
            <p className="text-sm md:text-base text-ultra-blue font-bold tracking-[0.3em] uppercase">{service.subtitle}</p>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-30">
        <button 
            onClick={onBack}
            className="mb-8 px-6 py-2 bg-deep/80 border border-white/20 backdrop-blur hover:border-ultra-blue hover:text-ultra-blue transition-all flex items-center gap-2 text-sm font-bold tracking-wider uppercase rounded-sm group"
        >
            <span>&larr;</span> 返回列表 (BACK)
        </button>

        {/* Introduction Card */}
        <div className="bg-card border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent"></div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-ultra-blue"></span>
                业务综述
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed text-justify mb-6">
                {service.desc} 在当前的司法环境下，{service.title}领域的法律问题日益复杂，对律师的专业素养提出了极高的要求。君熙律师事务所依托强大的法律大数据平台与资深的专家顾问团队，致力于为客户提供具有前瞻性与可操作性的法律解决方案。
            </p>
            <p className="text-lg text-slate-300 leading-relaxed text-justify">
                我们深知每一个委托背后都是客户沉甸甸的信任。因此，我们始终坚持“极致专业、绝对忠诚”的服务理念，力求在每一个案件中挖掘出对客户最有利的法律事实。
            </p>
        </div>

        {/* Key Features Grid */}
        <div className="mb-16">
            <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4 inline-block">核心服务优势</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((item, idx) => (
                    <div key={idx} className="p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-sm group">
                        <h4 className="text-ultra-blue font-bold mb-3 group-hover:text-white transition-colors text-lg">
                           {item.title}
                        </h4>
                        <p className="text-sm text-muted leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* Workflow */}
        <div className="mb-16">
             <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4 inline-block">办案流程标准</h3>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 {workflows.map((flow, idx) => (
                     <div key={idx} className="relative p-6 border-l-2 border-slate-700 bg-gradient-to-r from-white/5 to-transparent">
                         <div className="text-4xl font-black text-white/10 absolute top-2 right-4">{flow.step}</div>
                         <h4 className="text-white font-bold mb-2 relative z-10">{flow.title}</h4>
                         <p className="text-xs text-muted relative z-10">{flow.desc}</p>
                     </div>
                 ))}
             </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-ultra-blue/10 to-transparent border border-ultra-blue/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm">
            <div>
                <h3 className="text-xl font-bold text-white mb-2">遇到{service.title}相关法律难题？</h3>
                <p className="text-sm text-ultra-blue">立即启动紧急法律援助程序，我们将在15分钟内响应。</p>
            </div>
            <button className="px-8 py-3 bg-ultra-blue text-deep font-bold tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all uppercase rounded-sm">
                预约专家律师
            </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetail;
