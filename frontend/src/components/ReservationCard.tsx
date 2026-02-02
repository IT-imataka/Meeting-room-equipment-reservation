// ReservationListの子コンポーネント、App.tsxの孫コンポーネント

// type 型エイリアス定義の練習
import type { Reservation } from "../api/reservationApi";
import { Mic, Monitor } from 'lucide-react';


type Props = {

  reservation: Reservation,

  //  () => {}ではなく、 () => {}なのは、nullやundefinedが入ってくる可能性を考慮してスルーしたいから
  // :() => void のままだと、引数の指定がないため、渡ってきた予約情報の何をターゲットにするのか不明、バグの元なので指定する
  onDelete: (id: string) => void;

  // onEdit :(reservation:Reservation)の理由はhooksに渡すときに内部のhandleEditIdがオブジェクト全てを参照できるようにするため。
  // reservation.idとすると、idのみを参照しに行く。onDeleteの際はそれでも問題ないが、onEditの場合は異なる
  onEdit: (reservation: Reservation) => void;
}
const ReservationCard = ({ reservation, onDelete, onEdit }: Props) => {
  return (
    // v0: bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 ...
    <div className="group bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-200 flex items-center gap-4">

      {/* Icon Area: v0の w-12 h-12 rounded-lg bg-gray-200 ... */}
      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 shrink-0">
        {/* アイコンはとりあえず固定ですが、種別があれば分岐可能 */}
        <Monitor size={24} />
      </div>

      {/* Content Area: flex-1 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold text-gray-800 truncate">
            {/* 名称（会議室の名前など） */}
            {reservation.useId || "未設定"}
          </h3>
          {/* Status Badge: v0のスタイル (text-xs font-semibold px-3 py-1 rounded-full) */}
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-600 shrink-0">
            予約中
          </span>
        </div>

        <div className="text-sm text-gray-500 mb-0.5">Time Slot A</div>
        <div className="text-sm font-medium text-gray-700">
          {new Date(reservation.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(reservation.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* Edit/Delete Buttons: v0のデザインにはありませんでしたが、機能として必要なので、既存のロジック通り配置（ホバーで表示） */}
        <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(reservation)} className="text-xs font-bold text-blue-500 hover:text-blue-700">Edit</button>
          <button onClick={() => onDelete(reservation.id)} className="text-xs font-bold text-red-400 hover:text-red-600">Delete</button>
        </div>
      </div>

      {/* Avatar Area: v0の w-12 h-12 rounded-full border-2 ... */}
      {/* ユーザーアバター画像がないため、userIdのイニシャルを表示するデザインにします */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0 bg-gray-100 flex items-center justify-center">
        {/* <img src={...} /> の代わりに文字を表示 */}
        <span className="text-xs text-gray-500 font-bold truncate px-1">
          {reservation.userId || "User"}
        </span>
      </div>

    </div>
  )
};
export default ReservationCard;