// まず型定義から必要なものをインポート
import { Reservation } from "../types/models";

// メモリ上のDB初期化
const reservations: Reservation[] = [];

// 予約保存機能
export const create = (reservation: Reservation): void => {
  reservations.push(reservation);
};

// 全予約を取得する機能
export const findAll = (): Reservation[] => {
  return reservations;
};
