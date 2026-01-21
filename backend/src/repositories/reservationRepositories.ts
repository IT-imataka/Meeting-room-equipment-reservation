// まず型定義から必要なものをインポート
import { Reservation } from "../types/models";

// メモリ上のDB初期化
const reservations: Reservation[] = [];

// 予約保存機能
export const create = (reservation: Reservation): void => {
  reservations.push(reservation);
};

// 予約削除機能
export const deleteById = (id: string): boolean => {
  // idを持つ予約が、配列の何番目にあるかを探す

  // indexOfよりfindeIndexが使いやすそう。戻り値は該当配列の添え字
  const indexId = reservations.findIndex((e) => e.id === id);

  // findIndexは該当しなければ-1のため、-1を考慮できる判定にする
  // if (indexId) reservations.splice(indexId,1);
  if (indexId === -1) {
    return false;
  }
  reservations.splice(indexId, 1);
  return true;
};

// 全予約を取得する機能
export const findAll = (): Reservation[] => {
  return reservations;
};
