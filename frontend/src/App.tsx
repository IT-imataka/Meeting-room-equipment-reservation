// React難しすぎるでしょ
"use client";

import "./App.css"
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
    // 画面
    <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4 sm:p-8 font-sans overflow-hidden relative">

      {/* --- 背景の幾何学的な光の演出（ロジックに影響しない装飾要素） --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/40 rounded-full blur-[100px]" />
      <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-orange-500/30 rounded-full blur-[80px]" />

      {/* メインのガラスボードコンテナ */}
      <div className="w-full max-w-6xl h-[85vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-2xl flex overflow-hidden relative z-10 text-slate-100">

        {/* 左サイドバー */}
        <Sidebar />

        {/* 残りのエリア */}
        <main className="flex-1 flex flex-col p-8 overflow-y-auto">

          {/* ヘッダーエリア（タイトルと予約室bboardの表示位置調整） */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">予約室bboard</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* 中央のカレンダーエリア */}
            <div className="lg:w-5/12 h-full">
              <CalendarView />
            </div>

            {/* 予約リストエリア */}
            <div className="lg:w-7/12 h-full">
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