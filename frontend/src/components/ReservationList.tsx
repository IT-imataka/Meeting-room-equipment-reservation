import { type Reservation } from "../api/reservationApi";
import ReservationCard from "./ReservationCard";

// propsをインラインで受け取る記法
// 1.関数を渡しますと宣言
// 2.該当の子コンポーネントに引数が渡されているか、その型定義がなされているかを確認しにいく
// 3.その子コンポーネントの中の孫コンポーネントにしっかり配線されているか
const ReservationList = ({ reservations, onDelete, onEdit }: { reservations: Reservation[], onDelete: (id: string) => void, onEdit: (reservation: Reservation) => void }) => {
  return (
    // propsはタグを属性として渡すのではなく、要素として中身を展開する
    <div className="bg-white/30 backdrop-blur-md p-4 h-full rounded-2xl border border-white/20">

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