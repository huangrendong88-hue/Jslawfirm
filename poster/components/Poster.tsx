
import React from 'react';
import { Play, SkipBack, SkipForward, Music } from 'lucide-react';
import { PosterData } from '../types';

interface PosterProps {
  data: PosterData; // 海报的所有动态数据
  posterRef: React.RefObject<HTMLDivElement>; // 用于截图下载的引用
}

export const Poster: React.FC<PosterProps> = ({ data, posterRef }) => {
  const { title, englishTitle, subtitle, backgroundImage, progress, currentTime } = data;

  // 默认标题处理
  const displayTitle = title || '真伪研发局';
  // 如果标题超过5个字，我们会考虑自动换行排版
  const isLongTitle = displayTitle.length > 5;
  
  /**
   * 标题渲染逻辑
   * 采用不同的 tracking (字间距) 和 size (字号) 来适配不同长度的标题
   */
  const renderTitle = () => {
    if (!isLongTitle) {
      return (
        <h1 className="title-font text-6xl md:text-7xl drop-shadow-lg leading-tight whitespace-nowrap tracking-tighter text-white">
          {displayTitle}
        </h1>
      );
    }

    // 长标题自动切分两行
    const mid = Math.ceil(displayTitle.length / 2);
    const line1 = displayTitle.slice(0, mid);
    const line2 = displayTitle.slice(mid);

    return (
      <h1 className="title-font text-5xl md:text-6xl drop-shadow-lg leading-[1.1] flex flex-col items-center tracking-wide text-white">
        <span>{line1}</span>
        <span>{line2}</span>
      </h1>
    );
  };

  return (
    <div 
      ref={posterRef}
      // 这里的 360x640 是标准的 9:16 比例
      className="relative w-[360px] h-[640px] bg-[#121212] overflow-hidden select-none"
      style={{ aspectRatio: '9/16' }}
    >
      {/* --- 背景层 --- */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage || 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=720&h=1280'} 
          alt="Background" 
          className="w-full h-full object-cover scale-110" // 稍微放大防止白边
        />
        {/* 覆盖一层黑色的渐变遮罩，确保文字在亮色背景下也能清晰阅读 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      {/* --- 内容布局容器 --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-16 px-10 text-white text-center">
        
        {/* 1. 顶部文字区 */}
        <div className="w-full flex flex-col items-center relative pt-8">
           {/* 品牌/频道名称微型标识 */}
           <div className="flex items-center justify-center gap-2 mb-4 opacity-70">
             <Music size={12} className="text-orange-200" />
             <span className="text-[10px] tracking-[0.4em] uppercase font-light">Join&Share Music </span>
           </div>
           
           {/* 中文大标题 (使用站酷小薇体) */}
           <div className="z-10 relative">
            {renderTitle()}
           </div>

           {/* 英文副标题 (使用手写体，颜色偏金) */}
           <div className="relative z-20 w-full px-2 mt-2">
             <p className={`script-font text-orange-200/90 drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis leading-none ${
               (englishTitle?.length || 0) > 18 ? 'text-2xl' : 'text-3xl md:text-4xl'
             }`}>
               {englishTitle || 'The Research Bureau'}
             </p>
           </div>

           {/* 宣传金句 (使用思源宋体，增加间距提升呼吸感) */}
           <div className="mt-2">
             <p className="text-[11px] md:text-xs tracking-[0.4em] font-light opacity-80 poster-font italic">
               {subtitle || '让法律充满音乐的温度'}
             </p>
           </div>
        </div>

        {/* 2. 模拟唱片播放区 */}
        <div className="relative translate-y-4">
          {/* 外圈装饰与旋转动画 (animate-spin-slow 在 index.html 定义) */}
          <div className="w-48 h-48 rounded-full border-[10px] border-white/5 shadow-2xl relative overflow-hidden animate-spin-slow">
            <div className="absolute inset-0 bg-[#080808] rounded-full flex items-center justify-center">
               {/* 模拟黑胶唱片的沟槽纹理 */}
               {[...Array(8)].map((_, i) => (
                 <div 
                   key={i} 
                   className="absolute border border-white/[0.03] rounded-full" 
                   style={{ inset: `${(i + 1) * 8}px` }} 
                 />
               ))}
               {/* 中心图片标签 */}
               <div className="w-14 h-14 rounded-full bg-white relative overflow-hidden z-10 shadow-inner">
                 <img 
                  src={backgroundImage || 'https://picsum.photos/200/200'} 
                  alt="Label" 
                  className="w-full h-full object-cover brightness-90 saturate-50"
                 />
                 <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-white/20" />
                 </div>
               </div>
            </div>
          </div>
          {/* 光盘表面的反光效果 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </div>

        {/* 3. 底部播放控制区 */}
        <div className="w-full space-y-7">
          {/* 进度条逻辑 */}
          <div className="space-y-4 px-2 mt-10">
            <div className="h-[2px] bg-white/20 w-full rounded-full relative">
              {/* 进度条填充 */}
              <div 
                className="absolute h-full bg-white/80 rounded-full transition-all duration-700 ease-in-out" 
                style={{ width: `${progress}%` }}
              />
              {/* 进度条小圆点 */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50 transition-all duration-700 ease-in-out" 
                style={{ left: `${progress}%` }}
              />
            </div>
            {/* 时间数值显示 */}
            <div className="flex justify-between text-[8px] tracking-[0.2em] opacity-40 font-mono">
              <span>{currentTime}</span>
              <span>04:32</span>
            </div>
          </div>

          {/* 播放控制图标按钮组 */}
          <div className="flex items-center justify-center gap-12">
            <SkipBack className="opacity-80 hover:opacity-100 cursor-pointer transition-all active:scale-90" size={24} />
            {/* 播放按钮圆环 */}
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/5 transition-all cursor-pointer active:scale-95 group">
              <Play fill="currentColor" size={20} className="ml-1 opacity-80 group-hover:opacity-100" />
            </div>
            <SkipForward className="opacity-80 hover:opacity-100 cursor-pointer transition-all active:scale-90" size={24} />
          </div>

          {/* 底部版权声明 */}
          <div className="pt-2">
             <p className="text-[9px] tracking-[0.4em] uppercase opacity-30 font-light">
               DESIGN BY JOIN&SHARE LAWFIRM
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
