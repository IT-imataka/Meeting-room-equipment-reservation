// ロジックの切り出し
"use client";

import { useEffect, useState } from "react";
import { type Reservable, type Reservation } from "../api/reservationApi";
import * as reservationAPI from "../api/reservationApi";

export default function useReservations() {
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
    };
    loadData();
  }, []);

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
  };

  // 予約更新
  const handleUpdate = async (
    id: string,
    startTime: string,
    endTime: string,
  ) => {
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
  };

  // 編集用ボタンを押した時の予約されている状態の情報をセットする関数
  const handleEditClick = (reservation: Reservation) => {
    setEditId(reservation.id);
    setnewStartTime(reservation.startTime);
    setnewEndTime(reservation.endTime);
  };

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
  };
  return {
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
    handleUpdate,
    handleEditClick,
    savingchange,
  };
}
