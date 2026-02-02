import { Home, Users, Folder, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    // V0スタイル: ガラスの質感とグラデーション背景
    // h-full で高さを確保し、親要素(App.tsxのaside)いっぱいに広げます
    <div className="w-28 h-full bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-6 gap-6">

      {/* ロゴ部分: グラデーションのアイコン */}
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0 transform transition-transform hover:scale-105">
        <span className="text-white font-bold text-2xl">B</span>
      </div>

      {/* ナビゲーションメニュー */}
      <nav className="flex flex-col gap-6 flex-1 w-full items-center justify-start pt-4">
        {/* Home */}
        <button className="w-14 h-14 rounded-xl bg-slate-700/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 transition-all duration-300 flex items-center justify-center group relative">
          <Home size={24} />
          {/* ツールチップ的な装飾（必要なければ削除可） */}
          <div className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Home
          </div>
        </button>

        {/* Users */}
        <button className="w-14 h-14 rounded-xl hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-center">
          <Users size={24} />
        </button>

        {/* Folder/Projects */}
        <button className="w-14 h-14 rounded-xl hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-center">
          <Folder size={24} />
        </button>

        {/* Settings */}
        <button className="w-14 h-14 rounded-xl hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-center">
          <Settings size={24} />
        </button>
      </nav>

      {/* 下部ログアウトボタン */}
      <div className="mt-auto mb-6">
        <button className="w-14 h-14 rounded-xl hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all duration-300 flex items-center justify-center">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  )
};
export default Sidebar;