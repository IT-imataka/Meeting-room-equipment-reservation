// import { Home, Users, Folder, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-20 border-r border-white/10 flex flex-col items-center py-8 gap-8 backdrop-blur-sm bg-white/5 h-full">
      {/* ロゴ代わりのアイコン */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 mb-4 shadow-lg shadow-purple-500/30 shrink-0" />

      <nav className="flex flex-col gap-8 flex-1 w-full items-center">
        <button className="p-3 rounded-xl bg-white/20 text-white shadow-inner transition-all duration-300">
          {/* <Home size={24} /> */}
        </button>
        <button className="p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300">
          {/* <Users size={24} /> */}
        </button>
        <button className="p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300">
          {/* <Folder size={24} /> */}
        </button>
        <button className="p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300">
          {/* <Settings size={24} /> */}
        </button>
      </nav>

      <div className="mt-auto">
        <button className="p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300">
          {/* <LogOut size={24} /> */}
        </button>
      </div>
    </div>
  )
};
export default Sidebar;