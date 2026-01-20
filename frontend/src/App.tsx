"use client";

import { useEffect, useState } from "react";
import "./App.css"

type Reservable = {
  id: string;
  name: string;
  type: "ROOM" | "EQUIPMENT";
  isActive: boolean
}



export default function App() {
  const [reservables, setReservables] = useState<Reservable[]>([]);
  const [startTime, setstartTime] = useState<string>("");
  const [endTime, setendTime] = useState<string>("");

  useEffect(() => {
    // APIを叩く
    // JSONを取得する
    const fetchdata = async () => {
      try {
        console.log("データ取得中...");
        const res = await fetch("http://localhost:3000/");
        const data = await res.json();
        setReservables(data);
      } catch (error) {
        console.error("エラー発生", error);
      }
    }
    fetchdata();
  }, [])

  // 予約処理の関数
  const handleReserve = async (reserveId: string) => {
    // APIを叩く
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
      alert(`予約完了ID：${data.useId}`)
      // setReservables(data);
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
    </div >
  );
}
