// まず型定義から必要なものをインポート
import { Reservation } from "../types/models";

export class ReservationRepository {
  // メモリ上のDB初期化
  private reservations: Reservation[] = [];

  // 予約保存機能
  create(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  // 予約削除機能
  deleteById(id: string): boolean {
    // idを持つ予約が、配列の何番目にあるかを探す
    // indexOfよりfindeIndexが使いやすそう。戻り値は該当配列の添え字
    const indexId = this.reservations.findIndex((e) => e.id === id);
    // findIndexは該当しなければ-1のため、-1を考慮できる判定にする
    // if (indexId) reservations.splice(indexId,1);
    if (indexId === -1) {
      return false;
    }
    this.reservations.splice(indexId, 1);
    return true;
  }

  // 予約情報の更新機能
  // utility typeのPartialを使い、変更されるであろう各オブジェクトを任意にする
  update(id: string, newData: Partial<Reservation>): Reservation | null {
    // 削除と同じ idと同じ予約が配列のどこにあるかを探す
    const index = this.reservations.findIndex((element) => element.id === id);
    if (index === -1) {
      return null;
    }

    // データの上書き 型推論に任せず、アサーションで明示する
    // idだけは変更されない可能性もあるため、受け取ったidでそのまま固定
    const updateReservation = {
      ...this.reservations[index],
      ...newData,
      id: id,
    } as Reservation;

    this.reservations[index] = updateReservation;
    return updateReservation;
  }

  // 全予約を取得する機能
  findAll(): Reservation[] {
    return this.reservations;
  }
}
export default new ReservationRepository();
