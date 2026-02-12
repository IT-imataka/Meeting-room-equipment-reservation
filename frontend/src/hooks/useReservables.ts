import { useEffect, useState } from "react";
import type { Reservable } from "../api/reservationApi";
import { fetchReservables } from "../api/reservationApi";
import * as reservableAPI from "../api/reservableApi";

// 名前自由関数で
export const useReservables = () => {
  // 情報を持っておく箱
  const [reservables, setReservables] = useState<Reservable[]>([]);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<"ROOM" | "EQUIPMENT">("ROOM");

  // 画面描画時にレンダリング
  // フェッチしたデータで状態の更新を行う
  useEffect(() => {
    const loadData = async () => {
      try {
        const reservableData = await fetchReservables();
        setReservables(reservableData);
      } catch (error) {
        console.error("データを取得できませんでした", error);
      }
    };
    loadData();
  }, []);

  // hooksの中は処理だけさせる
  // フェッチしたデータで更新
  const handleRegister = async () => {
    try {
      // 実行
      await reservableAPI.regReservables(name, type);
      // 更新後を取得
      const data = await fetchReservables();
      setReservables(data);
    } catch (error) {
      console.error("登録に失敗しました", error);
    }
  };

  // 削除
  // フェッチしたデータで更新
  const deleteRegister = async (id: number) => {
    try {
      await reservableAPI.deleteReservable(id);
      const data = await fetchReservables();
      setReservables(data);
    } catch (error) {
      console.error("削除に失敗しました", error);
    }
  };

  // 更新
  // fetchしたデータで更新
  const updateRegister = async (name: string, type: "ROOM" | "EQUIPMENT") => {
    try {
      await reservableAPI.updateReservable(name, type);
      const data = await fetchReservables();
      setReservables(data);
    } catch (error) {
      console.error("更新に失敗しました", error);
    }
  };

  return {
    reservables,
    handleRegister,
    deleteRegister,
    updateRegister,
    name,
    setName,
    type,
    setType,
  };
};
