//App.tsxの子コンポーネント 

// propsをインラインで受け取る記法の練習
import { type Reservation } from "../api/reservationApi";
import ReservationCard from "./ReservationCard";

// 1.関数を渡しますと宣言
// 2.該当の子コンポーネントに引数が渡されているか、その型定義がなされているかを確認しにいく
// 3.その子コンポーネントの中の孫コンポーネントにしっかり配線されているか
const ReservationList = ({ reservations, onDelete, onEdit, onAddClick, }: { reservations: Reservation[], onDelete: (id: string) => void, onEdit: (reservation: Reservation) => void, onAddClick: () => void }) => {
  return (
    // propsはタグを属性として渡すのではなく、要素として中身を展開する
    <div className="bg-white/30 backdrop-blur-md p-4 h-full rounded-2xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-hl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">本日の予約状況</h2>
        <div className="flex gap-2">
          {/* 件数表示 */}
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300 flex items-center">
            {reservations.length}件
          </span>
          {/* 新規予約ボタン */}
          <button
            // ※1
            onClick={onAddClick}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded shadow-lg transition-colors">新規予約</button>
        </div>
      </div>

      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onDelete={onDelete}
          onEdit={onEdit}
        />))}
    </div>
  )
};
export default ReservationList;