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
    reservables,
    reservations,
    startTime,
    setstartTime,
    endTime,
    setendTime,
    editId,
    setEditId,
    newstartTime,
    setnewStartTime,
    newendTime,
    setnewEndTime,
    handleReserve,
    handleCancel,
    handleEditClick,
    savingchange,
  } = useReservations();

  return (
    // 画面
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-black text-slate-100 font-sans p-4 gap-4 over-flow-hidden">

      {/* 左サイドバー */}
      <aside className="w-20 shrink-0">
        <Sidebar />
      </aside>

      {/* 残りのエリア */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2gap-4">

        {/* 中央のカレンダーエリア */}
        <section className="h-full">
          <CalendarView />
        </section>

        {/* 予約リストエリア */}
        <section className="h-full">
          <ReservationList
            reservations={reservations}
            onDelete={handleCancel}
            onEdit={handleEditClick} />
        </section>
      </main>
      <ReservationModal
      ></ReservationModal>
    </div >
    // <div>
    //   <h2>予約システム&nbsp;v1.0</h2>
    //   <label htmlFor="stTime">開始時刻</label>
    //   {/* ユーザしか知らない時刻等はイベントオブジェクトとして渡したものをセットする必要がある */}
    //   <input type="datetime-local" name="stTime" value={startTime} onChange={(e) => { setstartTime(e.target.value) }} />
    //   <label htmlFor="edTime">終了時刻</label>
    //   <input type="datetime-local" name="edTime" value={endTime} onChange={(e) => { setendTime(e.target.value) }} />
    //   {/* 何を予約するか */}
    //   <div style={{
    //     display: "flex",
    //     flexWrap: "wrap",
    //     gap: "2rem",
    //     justifyContent: "center",
    //   }}>
    //     {reservables.map((reservable) => (
    //       <article style={{ width: "45%", minWidth: "300px", maxWidth: "400px", marginBottom: "0" }} key={reservable.id}>
    //         <header><strong>{reservable.name}</strong></header>
    //         <p>タイプ：{reservable.type}</p>
    //         <footer>
    //           <button onClick={() => handleReserve(reservable.id)}
    //             style={{ marginLeft: '10px' }}>予約する
    //           </button>
    //         </footer>
    //       </article>
    //     ))}
    //   </div>
    //   {/* いつ、誰が、何を予約したか */}
    //   <div style={{
    //     display: "flex",
    //     flexWrap: "wrap",
    //     gap: "2rem",
    //     justifyContent: "center",
    //   }}>
    //     {reservations.map((reservation) => (
    //       <article style={{ width: "45%", minWidth: "300px", maxWidth: "400px", marginBottom: "0" }} key={reservation.id}>
    //         <header>予約者：{reservation.userId} </header>
    //         <span style={{ display: "inline-block" }}>開始時刻：{reservation.startTime}</span>
    //         <span style={{ display: "inline-block" }}>終了時刻：{reservation.endTime}</span>
    //         <footer>
    //           <button onClick={() => { handleEditClick(reservation) }} style={{ backgroundColor: "cyan", color: "black" }}>
    //             内容を変更
    //           </button>
    //           <button onClick={() => handleCancel(reservation.id)}>キャンセル</button>
    //         </footer>
    //       </article>
    //     ))}
    //   </div>
    //   {/* モーダルのパーツ */}
    //   {
    //     editId && (
    //       <div style={{
    //         position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    //         // 背景を半透明の黒に
    //         backgroundColor: "rgba(0,0,0,0.5)",
    //         display: "flex", justifyContent: "center", alignItems: "center"
    //       }}>
    //         <div style={{
    //           backgroundColor: "white", padding: "30px", borderRadius: "8px", width: "300px",
    //           boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
    //         }}>
    //           {/* 中身 */}
    //           <h3 style={{ marginBlock: 0, color: "#000" }}>予約時間の変更</h3>
    //           <div style={{ marginBottom: "10px" }}>
    //             <label style={{ color: "#000" }}> 開始時間</label>
    //             <input type="datetime-local"
    //               value={newstartTime}
    //               onChange={(event) => { setnewStartTime(event.target.value) }}
    //               onClick={e => { e.currentTarget.showPicker() }}
    //               style={{ width: "100%", padding: "5px", }} />
    //           </div>

    //           <div style={{ marginBottom: "20px" }}>
    //             <label style={{ color: "#000" }}> 終了時間</label>
    //             <input type="datetime-local"
    //               value={newendTime}
    //               onChange={event => { setnewEndTime(event.target.value) }}
    //               onClick={e => { e.currentTarget.showPicker() }}
    //               style={{ width: "100%", padding: "5px", }} />
    //           </div>

    //           {/* 更新の実行か、キャンセルかのボタン */}
    //           <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", fontSize: "16px" }}>
    //             <button onClick={() => { setEditId(null) }}>キャンセル</button>
    //             {/* 引数がなければ関数式を渡して、起動してという命令でok
    //             引数がある場合等はラムダ式でワンクッション挟み、実行まで命令する必要がある
    //             1. onClick={savingchange()} → 画面描画時瞬間にそのまま実行される
    //             2. onClick={() => {savingchange} → ただ savingchange を確認してね（でも実行はしない）になる 
    //             下は savingchange という行動をしてね、と命令している
    //             一番は onClick = {savingchange} が可読性もよくスマート */}
    //             <button onClick={() => { savingchange() }}
    //               style={{ backgroundColor: "lightgreen", fontWeight: "bold" }}>予約更新</button>
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   }
    // </div >
  );
}
