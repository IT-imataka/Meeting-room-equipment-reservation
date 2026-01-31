// type 型エイリアス定義の練習
import type { Reservation } from "../api/reservationApi";


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
    <div className="group relative p-2 mb-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-all hover:bg-white/10 ">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-purpule-500 rounded-l-xl" />
      <div className="pl-4 flex justify-between items-start">
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-bold text-white mb-1 trancate">
            {/* 名称（会議室の名前など） */}
            Meeting : {reservation.useId || "未設定"}
          </h4>
          {/* ユーザー名 */}
          <p className="text-sm text-gray-300">User: {reservation.userId}</p>
          {/* 日付 */}
          <div className="mt-2 text-xs font-mono text-blue-200 bg-blue-500/20 px-2 py-1 rounded inline-block">
            {new Date(reservation.startTime).toLocaleString()} ~
          </div>
        </div>
        {/* ボタン */}
        <div className="flex gap-2 opcity-0 group-hover:opacity-100 transiton-opacity">
          <button onClick={() => onEdit(reservation)} className="p-1.5 text-xs bg-cyan-500/20 text-cyan-300 rounded hover:bg-cyan-500/40 whitespace-nowrap">編集</button>
          <button onClick={() => onDelete(reservation.id)} className="p-1.5 text-xs bg-red-500/20 text-red-300 rounded hover:bg-red-500/40 whitespace-nowrap">削除</button>
        </div>
      </div>
    </div>
  )
};
export default ReservationCard;