// まずは型定義をインポート
import { Reservation } from "../types/models";

// 名前空間としてインポートすることでオブジェクトのように扱う
import * as reservationRepo from "../repositories/reservationRepositories";

// クライアントからくるデータの形
type CreateReservationRequest = {
  useId: string;
  userId: string;
  startTime: string;
  endTime: string;
};

export const createReservation = (
  data: CreateReservationRequest
): Reservation => {
  // こっからビジネスロジック

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
