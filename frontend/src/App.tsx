// React難しすぎるでしょ
"use client";

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
    // 画面: v0のグラデーション背景とflexコンテナを適用
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 font-sans">

      {/* --- 背景の幾何学的な光の演出（v0の装飾スタイルを適用） --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* メインコンテンツエリア: v0の構造（relative z-10 flex w-full）を適用 */}
      <div className="relative z-10 flex w-full">

        {/* 左サイドバー: ガラスカードの外に出して配置 */}
        <Sidebar />

        {/* 残りのエリア: v0のパディングとスクロール設定を適用 */}
        <main className="flex-1 flex flex-col p-8 overflow-hidden">

          {/* ヘッダーエリア（タイトル） */}
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">Bboard</h1>
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

          {/* v0の gap-6 レイアウトを適用 */}
          <div className="flex-1 flex gap-6 overflow-hidden">
            {/* 中央のカレンダーエリア */}
            <div className="w-5/12 h-full">
              <CalendarView />
            </div>

            {/* 予約リストエリア */}
            <div className="w-7/12 h-full">
              <ReservationList
                reservations={reservations}
                // ※1 ボタンを押下したというpropsを渡す
                onAddClick={() => setCreateOpen(true)}
                onDelete={handleCancel}
                onEdit={handleEditClick} />
            </div>
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