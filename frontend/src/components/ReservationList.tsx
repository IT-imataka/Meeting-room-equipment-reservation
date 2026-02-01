//App.tsxの子コンポーネント 

// propsをインラインで受け取る記法の練習
import { type Reservation } from "../api/reservationApi";
import ReservationCard from "./ReservationCard";
// import { Calendar as CalendarIcon } from 'lucide-react';

// 1.関数を渡しますと宣言
// 2.該当の子コンポーネントに引数が渡されているか、その型定義がなされているかを確認しにいく
// 3.その子コンポーネントの中の孫コンポーネントにしっかり配線されているか
const ReservationList = ({ reservations, onDelete, onEdit, onAddClick, }: { reservations: Reservation[], onDelete: (id: string) => void, onEdit: (reservation: Reservation) => void, onAddClick: () => void }) => {
  return (
    // propsはタグを属性として渡すのではなく、要素として中身を展開する
    <div className="h-full p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white/40 shadow-lg text-slate-800 relative overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-xl font-bold text-slate-800">本日の予約状況</h2>
        <div className="flex gap-3 shrink-0">
          {/* Timeline Viewボタン風（実際は新規予約トリガーとして機能させても、見た目だけ変えてもOKですが、今回は既存のボタンをスタイル変更します） */}
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white/50 hover:bg-white/70 rounded-full text-sm font-medium transition shadow-sm border border-white/40 text-slate-600 pointer-events-none">
            {/* <CalendarIcon size={16} /> */}
            Timeline View
          </button>

          {/* 新規予約ボタン */}
          <button
            // ※1
            onClick={onAddClick}
            className="bg-white/20 hover:bg-white/30 text-slate-800 px-4 py-1.5 rounded-xl font-medium backdrop-blur-md border border-white/20 shadow-lg transition-all text-sm"
          >New Reservation</button>
        </div>
      </div>

      {/* 件数表示などはデザイン上ヘッダーに入れなかったので、必要ならここに残すか、デザインに合わせて隠します。一旦リスト上部に配置 */}
      <div className="mb-2 px-1">
        <span className="text-xs font-semibold text-slate-500">Total: {reservations.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onDelete={onDelete}
            onEdit={onEdit}
          />))}
      </div>
    </div>
  )
};
export default ReservationList;