const CalendarView = () => {
  return (
    <div className="h-full p-6 flex flex-col bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-lg text-slate-800">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-slate-700">2023年9月</h3>
        <div className="flex gap-2 text-slate-400">
          <button className="hover:text-slate-600 px-2">&lt;</button>
          <button className="hover:text-slate-600 px-2">&gt;</button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center text-slate-400">
        Calendar View Content
      </div>
    </div>
  )
};
export default CalendarView;