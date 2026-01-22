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

// 予約情報の更新機能
// utility typeのPartialを使い、変更されるであろう各オブジェクトを任意にする
export const update = (
  id: string,
  newData: Partial<Reservation>,
): Reservation | null => {
  // console.log("【Repository】検索するID:", id);
  // console.log(
  //   "【Repository】今ある全ID:",
  //   reservations.map((r) => r.id),
  // );
  // 削除と同じ idと同じ予約が配列のどこにあるかを探す
  const index = reservations.findIndex((element) => element.id === id);
  if (index === -1) {
    return null;
  }
  // データの上書き 型推論に任せず、アサーションで明示する
  // idだけは変更されない可能性もあるため、受け取ったidでそのまま固定
  const updateReservation = {
    ...reservations[index],
    ...newData,
    id: id,
  } as Reservation;
  reservations[index] = updateReservation;
  return updateReservation;
};

// 全予約を取得する機能
export const findAll = (): Reservation[] => {
  return reservations;
};
