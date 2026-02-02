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
    // v0: bg-white/95 rounded-3xl p-8 shadow-2xl overflow-auto
    <div className="flex-1 bg-white/95 rounded-3xl p-8 shadow-2xl overflow-hidden flex flex-col h-full border border-white/20">

      {/* Header: v0のレイアウト (flex items-center justify-between) を適用 */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">本日の予約状況</h2>

        <div className="flex gap-3 shrink-0">
          {/* Timeline Viewボタン */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800 font-medium pointer-events-none">
            <CalendarIcon size={16} />Timeline View
            {/* <span>📅 Timeline View</span> */}
          </button>

          {/* 新規予約ボタン: v0のテーマに合わせて少し調整 (青系アクセントを入れるか、グレーで統一するかですが、視認性のため既存の機能色は維持しつつ形を合わせます) */}
          <button
            // ※1
            onClick={onAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md shadow-blue-500/30"
          >
            New Reservation
          </button>
        </div>
      </div>

      {/* 件数表示: デザインに合わせて少し控えめに配置 */}
      <div className="mb-4 px-1">
        <span className="text-xs font-semibold text-gray-500">Total: {reservations.length}</span>
      </div>

      {/* List Area: v0の space-y-4 を適用 */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onDelete={onDelete}
            onEdit={onEdit}
          />))}
      </div>

      {/* Footer Info: v0にあるフッター装飾を追加（ロジックには影響しません） */}
      <div className="mt-4 pt-6 border-t border-gray-200 text-center text-sm text-gray-500 shrink-0">
        Selected Date: {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  )
};
export default ReservationList;