import React from 'react';

export interface ServiceData {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
}

interface ServicesProps {
    limit?: number;
    showTitle?: boolean;
    navigateTo?: () => void;
    onServiceClick?: (service: ServiceData) => void;
}

const Services: React.FC<ServicesProps> = ({ limit, showTitle = true, navigateTo, onServiceClick }) => {
  const services: ServiceData[] = [
    {
      icon: "⚡",
      title: "刑事辩护",
      subtitle: "Criminal Defense",
      desc: "如光线般精准击破谎言与冤屈。针对经济犯罪、职务犯罪等复杂案件，提供强有力的法庭辩护与取保候审服务，直击要害。"
    },
    {
      icon: "🛡️",
      title: "企业风控与合规",
      subtitle: "Corporate Compliance",
      desc: "构筑360度法律防火墙。为企业隔离商业风险，建立刑事合规体系，抵御外部侵权，确保运营安全无虞。"
    },
    {
      icon: "👁️",
      title: "民商事争议解决",
      subtitle: "Dispute Resolution",
      desc: "运用敏锐的洞察力看穿资本迷雾。专注于重大合同纠纷、股权争夺及各类复杂的商业诉讼与仲裁。"
    },
    {
      icon: "🏗️",
      title: "建设工程与房地产",
      subtitle: "Construction & Real Estate",
      desc: "从土地一级开发到项目竣工验收，提供全流程法律风险管理，解决工程款结算与烂尾楼盘活难题。"
    },
    {
      icon: "💎",
      title: "私人财富管理",
      subtitle: "Wealth Management",
      desc: "为高净值人士提供家族信托、税务筹划及婚姻家事财富隔离服务，守护您的家族传承。"
    },
    {
      icon: "🌐",
      title: "知识产权保护",
      subtitle: "Intellectual Property",
      desc: "捍卫创新成果，打击专利侵权与商业秘密窃取，通过法律手段为企业的核心竞争力保驾护航。"
    }
  ];

  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto animate-slide-up">
      {showTitle && (
        <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
                <div className="h-8 w-1 bg-ultra-blue shadow-[0_0_10px_var(--ultra-blue)]"></div>
                <div>
                <h2 className="text-3xl font-bold text-white">专业领域</h2>
                <span className="text-xs text-muted tracking-[0.2em] uppercase block mt-1">Core Practice Areas</span>
                </div>
            </div>
            {limit && navigateTo && (
                <button onClick={navigateTo} className="text-sm text-ultra-blue hover:text-white transition-colors tracking-widest uppercase border-b border-ultra-blue pb-1">
                    查看全部业务 &rarr;
                </button>
            )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayServices.map((service, idx) => (
          <div 
            key={idx} 
            onClick={() => onServiceClick && onServiceClick(service)}
            className="group relative bg-card/50 backdrop-blur-sm border border-white/5 p-8 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-ultra-blue/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            {/* Hover Slide Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-ultra-blue to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            
            <div className="flex justify-between items-start mb-6">
                <div className="text-3xl text-ultra-blue group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
                {service.icon}
                </div>
                <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest group-hover:text-ultra-blue/50 transition-colors">
                    {service.subtitle}
                </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-ultra-blue transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed text-justify">
              {service.desc}
            </p>
            
            <div className="mt-6 flex items-center text-xs text-slate-500 font-bold tracking-wider uppercase group-hover:text-ultra-blue transition-colors">
               了解更多 <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
