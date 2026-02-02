import { Home, Users, Folder, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    // v0: w-24 bg-gradient-to-b ...
    <div className="w-24 bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-lg border-r border-white/10 flex flex-col items-center py-8 gap-8 h-full">
      {/* ロゴ代わりのアイコン: v0のデザイン (rounded-lg, textあり) を適用 */}
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
        <span className="text-white font-bold text-lg">B</span>
      </div>

      <nav className="flex flex-col gap-6 flex-1 w-full items-center">
        {/* 各ボタン: v0のスタイル (w-12 h-12 rounded-lg bg-slate-700/30...) を適用 */}
        <button className="w-12 h-12 rounded-lg bg-slate-700/30 hover:bg-slate-600/40 transition-colors flex items-center justify-center text-slate-300 hover:text-white shadow-inner">
          <Home size={24} />
        </button>
        <button className="w-12 h-12 rounded-lg bg-slate-700/30 hover:bg-slate-600/40 transition-colors flex items-center justify-center text-slate-300 hover:text-white">
          <Users size={24} />
        </button>
        <button className="w-12 h-12 rounded-lg bg-slate-700/30 hover:bg-slate-600/40 transition-colors flex items-center justify-center text-slate-300 hover:text-white">
          <Folder size={24} />
        </button>
        <button className="w-12 h-12 rounded-lg bg-slate-700/30 hover:bg-slate-600/40 transition-colors flex items-center justify-center text-slate-300 hover:text-white">
          <Settings size={24} />
        </button>
      </nav>

      <div className="mt-auto">
        <button className="w-12 h-12 rounded-lg bg-slate-700/30 hover:bg-slate-600/40 transition-colors flex items-center justify-center text-slate-300 hover:text-white">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  )
};
export default Sidebar;