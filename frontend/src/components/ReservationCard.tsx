// ReservationListの子コンポーネント、App.tsxの孫コンポーネント

// type 型エイリアス定義の練習
import type { Reservation } from "../api/reservationApi";
// import { Mic, Monitor } from 'lucide-react';


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
    // すりガラス
    <div className="p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-white/50 transition hover:shadow-md bg-white/80 group">
      <div className="p-3 bg-white rounded-xl shadow-sm text-slate-600">
        {/* アイコンはとりあえず固定ですが、種別があれば分岐可能 */}
        {/* <Monitor size={20} /> */}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-slate-700 text-base truncate pr-2">
            {/* 名称（会議室の名前など） */}
            {reservation.useId || "未設定"}
          </h4>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-orange-100 text-orange-600 shrink-0">
            予約中
          </span>
        </div>

        <div className="flex justify-between items-end mt-1">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Time</p>
            <p className="text-sm font-medium text-slate-600">
              {new Date(reservation.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(reservation.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(reservation)} className="text-xs font-bold text-blue-500 hover:text-blue-700">Edit</button>
            <button onClick={() => onDelete(reservation.id)} className="text-xs font-bold text-red-400 hover:text-red-600">Del</button>
          </div>
        </div>
      </div>
    </div>
  )
};
export default ReservationCard;