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

  console.log("描画");
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

  return (
    <div>
      <h1>予約システム</h1>
      <ul>
        {reservables.map((item) => (
          <li key={item.id}>
            {item.name} - {item.type}
          </li>
        ))}
      </ul>
    </div>
  );

}
