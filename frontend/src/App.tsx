"use client";

import { useEffect, useState } from "react";
import "./App.css"

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
  const [startTime, setstartTime] = useState<string>("");
  const [endTime, setendTime] = useState<string>("");

  useEffect(() => {
    fetchReservables();
    fetchReservations();
  }, [])

  // 何を予約するのかを取得する関数
  const fetchReservables = async () => {
    try {
      console.log("データ取得中...");
      const res = await fetch("http://localhost:3000/");
      const data = await res.json();
      setReservables(data);
    } catch (error) {
      console.error("エラー発生", error);
    }
  }

  // 予約データ取得関数は、予約した時点以外にも画面を開いたタイミングでも出てくるように
  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:3000/reservations");
      const data = await res.json();
      setReservations(data);
    } catch (error) {
      console.error("予約が取得できませんでした", error)
    }
  }

  // 予約処理の関数
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
      const res = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          useId: reserveId,
          userId: "XXXX",
          startTime: startTime,
          endTime: endTime,
        })
      });
      if (!res.ok) {
        throw new Error("予約失敗");
      }
      const data = await res.json();
      alert(`予約完了ID：${data.useId}`);

      // 常に変わらないものは予約時に更新する必要がない(備品や会議室、プロジェクターなど)
      // fetchReservables();

      // 誰がいつ、何を予約するのかは変化するため、更新する必要がある
      fetchReservations();

    } catch (error) {
      console.error("エラーです", error);
    }
  };

  return (
    <div>
      <h1>予約システム</h1>
      <label htmlFor="stTime">開始時刻</label>
      <input type="datetime-local" name="stTime" value={startTime} onChange={(e) => { setstartTime(e.target.value) }} />
      <label htmlFor="edTime">終了時刻</label>
      <input type="datetime-local" name="edTime" value={endTime} onChange={(e) => { setendTime(e.target.value) }} />
      <ul>
        {reservables.map((item) => (
          <li key={item.id}>
            {item.name} - {item.type}
            <button onClick={() => handleReserve(item.id)}
              style={{ marginLeft: '10px' }}>予約する
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>予約者：{reservation.userId} <br />
            開始時刻：{reservation.startTime} - 終了時刻：{reservation.endTime}</li>
        ))}
      </ul>
    </div >
  );
}
