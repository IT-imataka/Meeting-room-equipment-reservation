import { useEffect, useState } from "react";
import type { Reservable } from "../api/reservationApi";
import { fetchReservables } from "../api/reservationApi";

// 名前自由関数で
export const useReservables = () => {
  const [reservables, setReserbables] = useState<Reservable[]>([]);

  // 画面描画時にレンダリング
  // フェッチしたデータで状態の更新を行う
  useEffect(() => {
    const loadData = async () => {
      try {
        const reservableData = await fetchReservables();
        setReserbables(reservableData);
      } catch (error) {
        console.error("データを取得できませんでした", error);
      }
      loadData();
    };
  }, []);
  return { reservables };
};
