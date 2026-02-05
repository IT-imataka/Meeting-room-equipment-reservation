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
    <div className="relative !flex h-screen w-full items-center justify-center bg-[#0B1A45] text-slate-100 font-sans p-4 lg:p-8 overflow-hidden">

      {/* --- 背景の幾何学的な光の演出（高発色・強配置バージョン） --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        {/* 1. 左上の青紫の巨大な光（色を濃く、不透明度アップ） */}
        <div className="absolute bottom-[15%] right-[20%] w-32 h-32 bg-gradient-to-t from-yellow-500 to-orange-500 rotate-[30deg] blur-2xl opacity-90" />

        <div className="absolute top-[5%] left-[-20%] w-[50%] h-[50%] bg-cyan-600/50 rounded-full blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[5%] w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-[90px]" />

        {/* 2. 右上のオレンジの菱形（鮮やかなグラデーションに変更） */}
        {/* mix-blend-screen を追加して、光っているように見せています */}
        <div className="absolute top-[5%] right-[10%] w-72 h-72 bg-gradient-to-br from-orange-500 to-pink-600 rotate-45 blur-4 opacity-70 mix-blend-screen" />
        <div className="absolute bottom-[5%] left-[20%] w-72 h-72 bg-gradient-to-br from-orange-500 to-pink-600 rotate-45 blur-[60px] opacity-70 rounded-full" />
        <div className="absolute bottom-[15%] left-[15%] w-32 h-32 bg-gradient-to-br from-purple-500 to-white-500/90 rotate-45 blur-[5px] rounded-full" />

        {/* 3. 左下の青い三角形（位置を少し上に、色を明るく） */}
        <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-cyan-600/40 rotate-12 blur-[8px] rounded-full" />
        <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-cyan-600/40 rotate-12 blur-[80px] rounded-full" />
        <div className="absolute top-[5%] right-[10%] w-72 h-72 bg-gradient-to-br from-orange-500 to-pink-600 rotate-45 blur-xs opacity-70 mix-blend-screen" />

        {/* 4. 中央右寄りの紫のオーブ（存在感を強調） */}
        <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-purple-600/40 rounded-full blur-[80px]" />
        <div className="absolute top-[5%] right-[10%] w-72 h-72 bg-purple-600/40 rounded-full blur-[80px]" />
        <div className="absolute bottom-[5%] left-[20%]  w-72 h-72 bg-purple-600/40 rounded-full blur-[50px]" />

        {/* 5. 手前にある小さなオレンジの三角形（アクセント） */}
        <div className="absolute bottom-[15%] right-[20%] w-32 h-32 bg-gradient-to-t from-yellow-500 to-orange-500 rotate-[30deg] blur-[40px] opacity-80" />

        {/* 6. ノイズフィルター */}
        {/* <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div> */}
      </div>

      {/* メインのガラスボードコンテナ: v0の構造を維持しつつCSSアート用に微調整 */}
      <div className="relative z-10 !flex h-full w-full max-w-[1920px] scale-90 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.01] shadow-2xl backdrop-blur-3xl">

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
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-95"
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