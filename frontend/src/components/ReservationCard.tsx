// ReservationListの子コンポーネント、App.tsxの孫コンポーネント

// type 型エイリアス定義の練習
import type { Reservation } from "../api/reservationApi";
import { Monitor, Mic, MoreHorizontal } from 'lucide-react';


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
    // カード本体: 白ベースのガラスモーフィズム + ホバー時の浮き上がり
    <div className="group relative w-full bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-4">

      {/* アイコンエリア */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 shadow-sm flex items-center justify-center text-slate-500 shrink-0 border border-slate-100">
        {/* 仮のアイコンロジック: ID等によって出し分けも可能 */}
        <Monitor size={20} />
      </div>

      {/* 情報エリア */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-slate-700 text-sm truncate pr-2">
            {reservation.useId || "名称未設定"}
          </h4>
          {/* ステータスバッジ */}
          <span className="shrink-0 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200/50">
            RESERVED
          </span>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs font-medium text-slate-400 mb-0.5">Time Slot</p>
            <p className="text-xs font-bold text-slate-600 bg-slate-200/50 px-2 py-1 rounded-md inline-block">
              {new Date(reservation.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(reservation.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>

      {/* Avatar (placeholder) */}
      <div className="absolute top-4 right-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-orange-300 text-white flex items-center justify-center text-xs font-bold shadow-sm">
          {reservation.useId ? reservation.useId[0] : "U"}
        </div>
      </div>

      {/* 操作ボタンエリア (ホバーで表示、あるいは常時表示でもおしゃれに) */}
      <div className="flex flex-col gap-2 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(reservation)}
          className="text-[10px] font-bold bg-white text-blue-500 border border-blue-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
        >
          編集
        </button>
        <button
          onClick={() => onDelete(reservation.id)}
          className="text-[10px] font-bold bg-white text-rose-500 border border-rose-100 hover:bg-rose-50 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
        >
          削除
        </button>
      </div>

    </div>
  )
};
export default ReservationCard;