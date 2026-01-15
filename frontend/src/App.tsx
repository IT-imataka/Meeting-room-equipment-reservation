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
    try {
      const res = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          useId: reserveId,
          userId: "XXXX",
          startTime: "2026-01-01",
          endTime: "2026-01-02"
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
    </div>
  );
}
