"use client";

import { useEffect, useState } from "react";
import "./App.css"
import * as reservationAPI from "./api/reservationApi"
// import { Reservable, Reservation } from "./api/reservationApi";

type Reservable = {
  id: string;
  name: string;
  type: "ROOM" | "EQUIPMENT";
  isActive: boolean
}

type Reservation = {
  id: string;
  useId: string;
  userId: string;
  startTime: string;
  endTime: string;
}

export default function App() {
  const [reservables, setReservables] = useState<Reservable[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // 入力フォーム用
  const [startTime, setstartTime] = useState<string>("");
  const [endTime, setendTime] = useState<string>("");

  // 予約編集モーダル用
  const [editId, setEditId] = useState<string | null>(null);
  const [newstartTime, setnewStartTime] = useState("");
  const [newendTime, setnewEndTime] = useState("");

  useEffect(() => {
    // 非同期でデータを貰い、Stateの更新だけを行うように変更
    const loadData = async () => {
      try {
        const reservablesData = await reservationAPI.fetchReservables();
        const reservationData = await reservationAPI.fetchReservations();

        setReservables(reservablesData);
        setReservations(reservationData);
      } catch (error) {
        console.error("データ取得エラー", error);
      }
    }
    loadData();
  }, [])

  // 予約処理
  const handleReserve = async (reserveId: string) => {
    // APIを叩く
    // 入力時刻のバリデーション
    if (!startTime || !endTime) {
      window.alert("開始時刻と終了時刻を入力してください！");
      return;
    }
    if (startTime >= endTime) {
      window.alert("終了時刻は開始時刻よりも前を設定してください");
      return;
    }
    try {
      // 処理だけさせる
      // const data = await reservationAPI.handleReserve(reserveId, startTime, endTime);
      await reservationAPI.handleReserve(reserveId, startTime, endTime);

      // 更新されたデータを再取得
      const data = await reservationAPI.fetchReservations();

      // 受け取ったデータで画面更新
      setReservations(data);
      alert(`予約完了`);

    } catch (error) {
      console.error("エラーです", error);
    }
  };

  // // 削除処理
  const handleCancel = async (reservationId: string) => {
    // if (window.confirm("本当に消しますか？")) {
    //   await fetch(`http://localhost:3000/reservations${reservationId}`, {
    //     method: "DELETE",
    //   })
    //   fetchReservations();
    // }
    // ↑でもよいが、インデントが深くなるので、ダメなら弾く、okなら通すでガード

    if (!window.confirm("本当にキャンセルしますか？")) {
      return;
    }
    try {
      await reservationAPI.handleCancel(reservationId);

      // 更新データを再取得
      const data = await reservationAPI.fetchReservations();

      // 受け取ったデータで画面更新
      setReservations(data);

      alert("キャンセル完了");

    } catch (error) {
      alert("キャンセルできませんでした");
      console.error("エラー", error);
    }
  }

  // 予約更新
  const handleUpdate = async (id: string, startTime: string, endTime: string) => {
    try {
      await reservationAPI.handleUpdate(id, startTime, endTime);

      // データ再取得
      const data = await reservationAPI.fetchReservations();

      // 受け取ったデータで画面更新
      setReservations(data);

      alert(`予約更新完了`);

    } catch (error) {
      alert("エラー：予約を更新できませんでした");
    }
  }

  // 編集用ボタンを押した時の予約されている状態の情報をセットする関数
  const handleEditClick = (reservation: Reservation) => {
    setEditId(reservation.id);
    setnewStartTime(reservation.startTime);
    setnewEndTime(reservation.endTime);
  }

  const savingchange = async () => {
    // idの存在チェック
    console.log(editId);
    if (!editId) return;
    // 予約更新関数の実行
    if (newstartTime >= newendTime) {
      window.alert("終了時刻は開始時刻よりも前を設定してください");
      return;
    }
    await handleUpdate(editId, newstartTime, newendTime);

    setEditId(null);
  }

  return (
    <div>
      <h1>予約システム</h1>
      <label htmlFor="stTime">開始時刻</label>
      {/* ユーザしか知らない時刻等はイベントオブジェクトとして渡したものをセットする必要がある */}
      <input type="datetime-local" name="stTime" value={startTime} onChange={(e) => { setstartTime(e.target.value) }} />
      <label htmlFor="edTime">終了時刻</label>
      <input type="datetime-local" name="edTime" value={endTime} onChange={(e) => { setendTime(e.target.value) }} />
      {/* 何を予約するか */}
      <ul>
        {reservables.map((reservable) => (
          <li key={reservable.id}>
            {reservable.name} - {reservable.type}
            <button onClick={() => handleReserve(reservable.id)}
              style={{ marginLeft: '10px' }}>予約する
            </button>
          </li>
        ))}
      </ul>
      {/* いつ、誰が、何を予約したか */}
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>予約者：{reservation.userId} <br />
            開始時刻：{reservation.startTime} - 終了時刻：{reservation.endTime}
            <button onClick={() => handleCancel(reservation.id)}>キャンセル</button>
            <button onClick={() => { handleEditClick(reservation) }}>
              編集用ボタンテスト
            </button>
          </li>
        ))}
      </ul>
      {/* モーダルのパーツ */}
      {
        editId && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            // 背景を半透明の黒に
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            <div style={{
              backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "300px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}>
              {/* 中身 */}
              <h3 style={{ marginTop: 0, color: "#000" }}>予約の編集</h3>
              <div style={{ marginBottom: "10px" }}>
                <label> 開始時間：</label>
                <input type="datetime-local"
                  value={newstartTime}
                  onChange={(event) => { setnewStartTime(event.target.value) }}
                  style={{ width: "100%", padding: "5px", }} />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label> 終了時間：</label>
                <input type="datetime-local"
                  value={newendTime}
                  onChange={event => { setnewEndTime(event.target.value) }}
                  style={{ width: "100%", padding: "5px", }} />
              </div>

              {/* 更新の実行か、キャンセルかのボタン */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => { setEditId(null) }}>キャンセル</button>
                {/* 引数がなければ関数式を渡して、起動してという命令でok
                引数がある場合等はラムダ式でワンクッション挟み、実行まで命令する必要がある
                1. onClick={savingchange()} → 画面描画時瞬間にそのまま実行される
                2. onClick={() => {savingchange} → ただ savingchange を確認してね（でも実行はしない）になる 
                下は savingchange という行動をしてね、と命令している
                一番は onClick = {savingchange} が可読性もよくスマート */}
                <button onClick={() => { savingchange() }}
                  style={{ backgroundColor: "lightgreen", fontWeight: "bold" }}>予約更新</button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
