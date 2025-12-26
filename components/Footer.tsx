import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-white/5 bg-[#020408] text-slate-500 text-xs px-10 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="tracking-wider">
        © 2024 广东君熙律师事务所 | GUANGDONG JUNXI LAW FIRM
      </div>
      <div className="flex gap-4">
        <span>粤ICP备xxxxxxxx号</span>
        <span className="hover:text-ultra-blue cursor-pointer transition-colors">隐私政策</span>
        <span className="hover:text-ultra-blue cursor-pointer transition-colors">服务条款</span>
      </div>
    </footer>
  );
};

export default Footer;