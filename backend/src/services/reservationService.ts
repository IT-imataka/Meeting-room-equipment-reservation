// まずは型定義をインポート
import { Reservation } from "../types/models";

// 名前空間としてインポートすることでオブジェクトのように扱う
import * as reservationRepo from "../repositories/reservationRepositories";
import { error } from "node:console";
import { exit } from "node:process";

// クライアントからくるデータの形
type CreateReservationRequest = {
  useId: string;
  userId: string;
  startTime: string;
  endTime: string;
};

export const createReservation = (
  data: CreateReservationRequest,
): Reservation => {
  // こっからビジネスロジック
  // 既存予約の取得
  const allReservations = reservationRepo.findAll();
  // 重複チェック 既存予約それぞれにチェックを行う
  // 1. 会議室ID
  // 2. 時間

  // 会議室IDが同じの時のロジックでも悪くはないが、違う時に抜けた方がやりやすい
  for (const existing of allReservations) {
    if (existing.useId !== data.useId) {
      continue;
    }
    // 重複時間の領域はflagにしておく
    const overlapflag =
      data.startTime < existing.endTime && existing.startTime < data.endTime;
    if (overlapflag) {
      console.error("予約が重複しています！", error);
      throw new Error("既に予約が入っています。");
    }
  }

  // 日付で自動採番
  const newID = Date.now().toString();
  // Reservation型に成型する
  const newreservation: Reservation = {
    id: newID,
    useId: data.useId,
    userId: data.userId,
    startTime: data.startTime,
    endTime: data.endTime,
  };
  // リポジトリに保存
  reservationRepo.create(newreservation);

  // 作成したデータを返す
  return newreservation;
};
