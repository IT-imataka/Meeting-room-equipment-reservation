const CalendarView = () => {
  return (
    <div className="w-full h-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/20 flex flex-col">

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-700">2023年9月</h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">‹</button>
          <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">›</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-xs text-slate-500 mb-2">
        <div className="text-center">日</div>
        <div className="text-center">月</div>
        <div className="text-center">火</div>
        <div className="text-center">水</div>
        <div className="text-center">木</div>
        <div className="text-center">金</div>
        <div className="text-center">土</div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm text-slate-700">
        {/* Static sample weeks to mimic design */}
        <div className="py-3 rounded-lg text-center text-slate-400">30</div>
        <div className="py-3 rounded-lg text-center">31</div>
        <div className="py-3 rounded-lg text-center">1</div>
        <div className="py-3 rounded-lg text-center">2</div>
        <div className="py-3 rounded-lg text-center">3</div>
        <div className="py-3 rounded-lg text-center">4</div>
        <div className="py-3 rounded-lg text-center">5</div>

        {/* A highlighted range */}
        <div className="col-span-7 h-0.5" />

        {/* Second week */}
        <div className="py-3 rounded-lg text-center">6</div>
        <div className="py-3 rounded-lg text-center">7</div>
        <div className="py-3 rounded-lg text-center">8</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl">9</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl">10</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl">11</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl">12</div>

        {/* Remaining rows - simplified */}
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-green-200 to-cyan-200 rounded-xl">13</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-green-200 to-cyan-200 rounded-xl">14</div>
        <div className="py-3 rounded-lg text-center">15</div>
        <div className="py-3 rounded-lg text-center">16</div>
        <div className="py-3 rounded-lg text-center">17</div>
        <div className="py-3 rounded-lg text-center">18</div>
        <div className="py-3 rounded-lg text-center">19</div>
      </div>

    </div>
  )
};
export default CalendarView;