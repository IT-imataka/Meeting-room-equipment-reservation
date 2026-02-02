//App.tsxの子コンポーネント 

// propsをインラインで受け取る記法の練習
import { type Reservation } from "../api/reservationApi";
import ReservationCard from "./ReservationCard";
import { Calendar as CalendarIcon } from 'lucide-react';

// 1.関数を渡しますと宣言
// 2.該当の子コンポーネントに引数が渡されているか、その型定義がなされているかを確認しにいく
// 3.その子コンポーネントの中の孫コンポーネントにしっかり配線されているか
const ReservationList = ({ reservations, onDelete, onEdit, onAddClick, }: { reservations: Reservation[], onDelete: (id: string) => void, onEdit: (reservation: Reservation) => void, onAddClick: () => void }) => {
  return (
    // propsはタグを属性として渡すのではなく、要素として中身を展開する
    // V0スタイル: 白ベースのガラスモーフィズム + 枠線
    // h-full で高さを親要素に合わせ、flex-col で中身を配置
    <div className="w-full h-full bg-white/80 backdrop-blur-sm rounded-[2rem] p-6 lg:p-8 shadow-2xl flex flex-col items-start border border-white/30 relative overflow-hidden">

      {/* ヘッダーエリア */}
      <div className="flex justify-between items-center mb-6 shrink-0 z-10">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">本日の予約状況</h2>

        <div className="flex gap-3">
          {/* Timeline View (見た目のみ) */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-slate-600 text-sm font-bold">
            <CalendarIcon size={16} />
            <span className="hidden md:inline">Timeline</span>
          </button>

          {/* 新規予約ボタン */}
          {/* ここで色を bg-blue-500 等に明示的に指定し、shadow をつけて強調します */}
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95"
          >
            新規予約
          </button>
        </div>
      </div>

      {/* 合計件数（控えめに表示） */}
      <div className="mb-4 px-1 shrink-0 z-10">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Total: {reservations.length} Reservations
        </span>
      </div>

      {/* リストエリア */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-4 custom-scrollbar relative z-10 pb-4">
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onDelete={onDelete}
            onEdit={onEdit}
          />))}
      </div>

      {/* 装飾: 背景の光（下部） */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />
    </div>
  )
};
export default ReservationList;