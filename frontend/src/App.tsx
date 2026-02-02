// React難しすぎるでしょ
"use client";

// import "./App.css" // ← スタイル崩れの原因になるのでコメントアウト推奨
import useReservations from "./hooks/useReservations";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";
// import ReservationCard from "./components/ReservationCard";
import ReservationList from "./components/ReservationList";
import ReservationModal from "./components/ReservationModal";

export default function App() {

  // hooksに切り出した処理達分割代入でぶっこむ
  const {
    // reservables,
    reservations,
    // 予約ボタンの開閉
    isCreateOpen,
    setCreateOpen,
    onSaveCreate,
    // 新規予約用
    // handleReserve,
    startTime,
    setstartTime,
    endTime,
    setendTime,
    // 既存予約変更用
    handleEditClick,
    editId,
    setEditId,
    newstartTime,
    setnewStartTime,
    newendTime,
    setnewEndTime,
    handleCancel,
    savingchange,
  } = useReservations();


  return (
    // 画面: V0のグラデーション背景を適用
    <div className="flex h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 text-slate-100 font-sans overflow-hidden relative">

      {/* --- 背景の装飾（V0のデザイン要素） --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* メインコンテンツ（z-10で背景の上に表示） */}
      <div className="relative z-10 flex w-full h-full">

        {/* 左サイドバー */}
        {/* 固定幅を与えてレイアウトの安定性を向上させる */}
        <aside className=" shrink-0 h-full">
          <Sidebar />
        </aside>

        {/* 残りのエリア */}
        <main className="flex-1 flex flex-col p-6 lg:p-8 gap-6 overflow-hidden min-w-0">

          {/* ヘッダーエリア */}
          <div className="flex justify-between items-center shrink-0">
            <h1 className="text-2xl font-bold text-white drop-shadow-md">予約室bboard</h1>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-200">
                <input type="checkbox" className="w-10 h-5 rounded-full appearance-none bg-slate-600 checked:bg-blue-500 relative shadow-inner" />
                <span className="ml-2 hidden sm:inline">Timeline</span>
              </label>
              <button
                onClick={() => setCreateOpen(true)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition"
              >
                New Reservation
              </button>
            </div>
          </div>

          {/* コンテンツエリア：GridではなくFlexを使用 */}
          <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">

            {/* 中央のカレンダーエリア */}
            {/* lg:w-[420px] のように固定幅を与えることで、画面が狭くなってもカレンダーが潰れるのを防ぎます */}
            <section className="h-full w-full lg:w-[400px] xl:w-[450px] shrink-0">
              <CalendarView />
            </section>

            {/* 予約リストエリア */}
            {/* flex-1 で残りの幅を全て使います。min-w-0 はFlexboxの子要素がはみ出すのを防ぐ魔法の呪文です */}
            <section className="h-full flex-1 min-w-0">
              <ReservationList
                reservations={reservations}
                // ※1 ボタンを押下したというpropsを渡す
                onAddClick={() => setCreateOpen(true)}
                onDelete={handleCancel}
                onEdit={handleEditClick} />
            </section>

          </div>
        </main>
      </div>

      {/* 新規予約用 */}
      <ReservationModal
        // Modalの表示可否の状態を渡す
        isOpen={isCreateOpen}
        // 新規の時はその予約を保存し、開閉状態を更新する関数としてpropsを渡す
        onSave={onSaveCreate}
        // 新規の時はfalseを宣言した状態を更新する関数を渡して閉じる
        onClose={() => setCreateOpen(false)}
        startTime={startTime}
        setstartTime={setstartTime}
        endTime={endTime}
        setendTime={setendTime}
        title="新規予約"
        saveTitle="新しく予約する"
      >
      </ReservationModal>
      {/* modal用 */}
      <ReservationModal
        // Modalの表示可否の状態を渡す
        isOpen={!!editId}
        // 既存の時は対象の予約を変更し、開閉状態ではなく対象のidをnullにする事で閉じる
        onSave={savingchange}
        // 既存の時は変更対象の予約idをなかったことにして閉じる
        onClose={() => setEditId(null)}
        startTime={newstartTime}
        setstartTime={setnewStartTime}
        endTime={newendTime}
        setendTime={setnewEndTime}
        title="予約時間の変更"
        saveTitle="変更を保存"
      ></ReservationModal>
    </div >
  );
}