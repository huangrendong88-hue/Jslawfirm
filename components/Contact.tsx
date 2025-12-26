import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-sm relative overflow-hidden border border-white/10">
        
        {/* Glow corner effects */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-ultra-blue/10 blur-[50px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-ultra-red/10 blur-[50px] -z-10"></div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">立即预约咨询</h2>
          <p className="text-muted text-sm tracking-wider">专业律师团队将在 15 分钟内与您取得联系，您的信息将被严格保密。</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              required
              placeholder="您的姓名 / Name" 
              className="w-full bg-deep/50 border border-slate-700 text-white p-4 rounded-sm focus:outline-none focus:border-ultra-blue focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all placeholder:text-slate-600"
            />
            <input 
              type="text" 
              required
              placeholder="联系电话 / Phone Number" 
              className="w-full bg-deep/50 border border-slate-700 text-white p-4 rounded-sm focus:outline-none focus:border-ultra-blue focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all placeholder:text-slate-600"
            />
          </div>
          <textarea 
            rows={5} 
            required
            placeholder="请简要描述您的法律需求..." 
            className="w-full bg-deep/50 border border-slate-700 text-white p-4 rounded-sm focus:outline-none focus:border-ultra-blue focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all placeholder:text-slate-600 resize-none"
          ></textarea>
          
          <button 
            type="submit" 
            disabled={status !== 'idle'}
            className={`w-full py-4 font-bold tracking-widest uppercase rounded-sm transition-all duration-300 
              ${status === 'sending' ? 'bg-ultra-blue text-white cursor-wait' : ''}
              ${status === 'success' ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]' : ''}
              ${status === 'idle' ? 'bg-silver text-deep hover:bg-ultra-blue hover:text-white hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]' : ''}
            `}
          >
            {status === 'idle' && '提交咨询 (SUBMIT)'}
            {status === 'sending' && '正在建立加密连接...'}
            {status === 'success' && '提交成功，请保持电话畅通'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;