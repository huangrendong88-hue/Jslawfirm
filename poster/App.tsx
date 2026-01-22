
import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Palette, Type as TypeIcon, Music as MusicIcon, History, Trash2, Save } from 'lucide-react';
import { toPng } from 'html-to-image';
import { Poster } from './components/Poster';
import { generateBackgroundImage } from './services/gemini';
import { getAllPosters, savePoster, deletePoster } from './services/storage';
import { PosterData, SavedPoster } from './types';

const App: React.FC = () => {
  // --- 状态管理 ---
  const [data, setData] = useState<PosterData>({
    title: '真伪研发局',
    englishTitle: 'The Research Bureau',
    subtitle: '让法律充满音乐的温度',
    backgroundImage: '',
    isGenerating: false,
    progress: 66,
    currentTime: '02:14'
  });

  const [history, setHistory] = useState<SavedPoster[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const posterRef = useRef<HTMLDivElement>(null);

  // 加载初始数据和历史记录
  useEffect(() => {
    loadHistory();
    handleGenerateBackground();
  }, []);

  const loadHistory = async () => {
    try {
      const saved = await getAllPosters();
      setHistory(saved);
    } catch (err) {
      console.error('加载历史记录失败', err);
    }
  };

  // --- 事件处理 ---
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // 中英文自动拆分正则：匹配 [中文] + [空格] + [英文/数字/标点]
    const regex = /^([\u4e00-\u9fa5]+)\s+([a-zA-Z\s\d'!-]+)$/;
    const match = val.match(regex);

    if (match) {
      // 满足规则：自动把英文部分移动到副标题
      setData(prev => ({ 
        ...prev, 
        title: match[1],
        englishTitle: match[2]
      }));
    } else {
      // 不满足规则或纯输入：按原样处理，取消字数限制
      setData(prev => ({ ...prev, title: val }));
    }
  };

  const handleEnglishTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({ ...prev, englishTitle: e.target.value }));
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({ ...prev, subtitle: e.target.value }));
  };

  const generateRandomProgress = () => {
    const progress = Math.floor(Math.random() * 70) + 15;
    const totalSeconds = 272;
    const currentTotalSeconds = Math.floor((progress / 100) * totalSeconds);
    const mins = Math.floor(currentTotalSeconds / 60);
    const secs = currentTotalSeconds % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return { progress, timeStr };
  };

  const handleGenerateBackground = async () => {
    setData(prev => ({ ...prev, isGenerating: true }));
    
    const prompts = [
      "Soft morning sunlight hitting a minimalist room with music elements",
      "Abstract warm sunset landscape with ethereal vibes",
      "Close up of an aesthetic retro turntable in golden hour light",
      "Autumn leaves blur in warm sunshine with musical notes patterns",
      "Cozy cafe vibes with a warm orange glow and music record shadows",
      "Elegant minimalist legal desk with a violin or music notes in warm lighting"
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    
    const imageUrl = await generateBackgroundImage(randomPrompt);
    const { progress, timeStr } = generateRandomProgress();
    
    if (imageUrl) {
      const newData = { 
        ...data, 
        backgroundImage: imageUrl, 
        isGenerating: false,
        progress: progress,
        currentTime: timeStr
      };
      setData(newData);
      // 自动保存新生成的到数据库
      await savePoster(newData);
      loadHistory();
    } else {
      setData(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const handleManualSave = async () => {
    await savePoster(data);
    loadHistory();
    alert('已成功保存到本地库');
  };

  const handleRestore = (item: SavedPoster) => {
    // 将历史数据还原到当前状态，排除 ID 和时间戳
    const { id, timestamp, ...rest } = item;
    setData(rest);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // 防止触发还原
    if (confirm('确定要删除这条记录吗？')) {
      await deletePoster(id);
      loadHistory();
    }
  };

  const handleDownload = async () => {
    if (posterRef.current === null) return;
    try {
      const dataUrl = await toPng(posterRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `video-poster-${data.title || 'untitled'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('保存海报失败:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#faf9f6] text-gray-900 font-sans pwa-padding-bottom">
      {/* --- 左侧控制面板 --- */}
      <aside className="w-full md:w-96 bg-white border-r border-gray-100 p-8 flex flex-col gap-8 shadow-sm z-10 overflow-y-auto max-h-[50vh] md:max-h-screen">
        <div className="border-b border-gray-50 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <MusicIcon className="text-orange-500" size={24} />
              海报助手
            </h1>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Mobile App Mode Enabled</p>
          </div>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2 rounded-full transition-colors ${showHistory ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400'}`}
          >
            <History size={20} />
          </button>
        </div>

        {showHistory ? (
          /* 历史记录列表 */
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">历史库 ({history.length})</h2>
            <div className="grid grid-cols-2 gap-3">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleRestore(item)}
                  className="group relative aspect-[9/16] rounded-lg overflow-hidden border border-gray-100 cursor-pointer hover:border-orange-200 transition-all shadow-sm"
                >
                  <img src={item.backgroundImage} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-[9px] text-white font-bold truncate">{item.title}</p>
                    <p className="text-[7px] text-white/60">{new Date(item.timestamp).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={(e) => handleDelete(e, item.id)}
                    className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
            {history.length === 0 && <p className="text-xs text-gray-400 text-center py-10">暂无历史记录</p>}
          </div>
        ) : (
          /* 编辑表单 */
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">作品名称 (支持中英文自动拆分)</label>
              <input 
                type="text" 
                value={data.title} 
                onChange={handleTitleChange} 
                placeholder="例如：真伪研发局 Research"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">英文歌名/副标</label>
              <input type="text" value={data.englishTitle} onChange={handleEnglishTitleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">宣传语</label>
              <input type="text" value={data.subtitle} onChange={handleSubtitleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
            </div>

            <div className="grid grid-cols-1 gap-3 pt-4">
              <button 
                onClick={handleGenerateBackground}
                disabled={data.isGenerating}
                className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all active:scale-95 ${data.isGenerating ? 'bg-gray-100 text-gray-400' : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-100 shadow-sm'}`}
              >
                <RefreshCw size={18} className={data.isGenerating ? 'animate-spin' : ''} />
                {data.isGenerating ? '正在生成...' : '换一张背景'}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleManualSave} className="flex items-center justify-center gap-2 py-3 rounded-2xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all active:scale-95">
                  <Save size={16} /> 保存到库
                </button>
                <button onClick={handleDownload} className="flex items-center justify-center gap-2 py-3 rounded-2xl font-bold bg-gray-900 text-white hover:bg-black transition-all shadow-lg active:scale-95">
                  <Download size={16} /> 保存高清
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* --- 右侧预览区 --- */}
      <main className="flex-1 flex items-center justify-center p-6 bg-[#f5f4f0] overflow-hidden">
        <div className="relative group scale-[0.85] sm:scale-100 transition-transform duration-500">
          <div className="max-h-[80vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex items-center justify-center border-[8px] border-white ring-1 ring-black/5">
             <Poster data={data} posterRef={posterRef} />
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Mobile Studio</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
