// React難しすぎるでしょ
"use client";

// import "./App.css"
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
    // 画面: CSSアートに合わせた深い濃紺ベースに変更 (bg-[#0b0e1b])
    <div className="relative !flex h-screen w-full items-center justify-center bg-[#0b0e1b] text-slate-100 font-sans p-4 lg:p-8 overflow-hidden">

      {/* --- 背景の幾何学的な光の演出（Tailwindだけで再現したCSSアート） --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 1. 左上の青紫の巨大な光 */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/40 rounded-full blur-[120px]" />

        {/* 2. 右上のオレンジの菱形 */}
        <div className="absolute top-[10%] right-[15%] w-64 h-64 bg-gradient-to-br from-orange-500/30 to-rose-500/30 rotate-45 blur-[50px]" />
        <div className="absolute top-[12%] right-[17%] w-40 h-40 bg-orange-400/40 rotate-45 blur-[40px] mix-blend-overlay" />

        {/* 3. 左下の青い三角形っぽい光 */}
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-blue-600/20 rotate-12 blur-[80px] rounded-[3rem]" />

        {/* 4. 中央右寄りの紫のオーブ */}
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-purple-800/20 rounded-full blur-[100px]" />

        {/* 5. 手前にある小さなオレンジの三角形アクセント */}
        <div className="absolute bottom-[20%] right-[25%] w-24 h-24 bg-gradient-to-t from-orange-600/40 to-yellow-500/40 rotate-[30deg] blur-[30px]" />

        {/* 6. ノイズフィルター */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* メインのガラスボードコンテナ: v0の構造を維持しつつCSSアート用に微調整 */}
      <div className="relative z-10 !flex h-full w-full max-w-[1920px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.01] shadow-2xl backdrop-blur-3xl">

        {/* 左サイドバー: ガラスカードの外に出して配置 */}
        <aside className="w-20 shrink-0 border-r border-white/5 bg-white/[0.02] !flex flex-col py-8 items-center shadow-2xl">
          <Sidebar />
        </aside>

        {/* 残りのエリア: v0のパディングとスクロール設定を適用 */}
        <main className="flex-1 flex flex-col p-8 overflow-hidden">

          {/* ヘッダーエリア（タイトル） */}
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h1 className="text-3xl font-black tracking-wide text-white drop-shadow-md">Bboard</h1>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-3 text-sm font-bold text-slate-400 cursor-pointer hover:text-slate-200 transition-colors">
                <div className="relative">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-11 h-6 bg-slate-700/50 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
                <span className="hidden sm:inline">Timeline View</span>
              </label>

              <button
                onClick={() => setCreateOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 border border-white/10"
              >
                New Reservation
              </button>
            </div>
          </div>

          {/* v0の gap-6 レイアウトを適用 */}
          <div className="flex-1 !grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
            {/* 中央のカレンダーエリア */}
            <section className="h-full !flex flex-col min-w-0">
              {/* カレンダーの外枠を少し暗くして奥行きを出すコンテナ */}
              <div className="flex-1 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-inner overflow-hidden p-1">
                <CalendarView
                  reservations={reservations}
                  // クリックされた日付でモーダルを開くように
                  onSelectDate={(date) => {
                    // デフォルトの開始と終了時刻のセット
                    const start = new Date(date);
                    start.setHours(9, 0, 0);
                    const end = new Date(date);
                    end.setHours(10, 0, 0);

                    // stateに保存するためにYYYY-MM-DDThh:mm形式でフォーマットしたい
                    const format = (fdate: Date) => {
                      const pad = (n: number) => n.toString().padStart(2, "0");
                      // pafstartで接頭に0をつける関数を作り包む
                      return `${fdate.getFullYear()}-${pad(fdate.getMonth() + 1)}-${pad(fdate.getDate())}T${pad(fdate.getHours())}:${pad(fdate.getMinutes())}`;
                    }
                    setstartTime(format(start));
                    setendTime(format(end));
                    // モーダルopen
                    setCreateOpen(true);
                  }} />
              </div>
            </section>

            {/* 予約リストエリア */}
            <section className="h-full overflow-y-auto min-w-0 !flex flex-col">
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