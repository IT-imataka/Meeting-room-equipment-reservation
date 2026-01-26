// まずは型定義をインポート
import { Reservation } from "../types/models";

// * as で名前空間としてインポートしていたオブジェクトたちを1つの箱としてインポートする
import reservationRepository from "../repositories/reservationRepositories";
import { error } from "node:console";

// クライアントからくるデータの形
type CreateReservationRequest = {
  useId: string;
  userId: string;
  startTime: string;
  endTime: string;
};

// public と privateの使い分け
// 今回は全てのメソッドが外から呼ばれるため、全てpublic ※TSはデフォルトでpub
// privateは、そのクラスの中だけで使う秘密道具

// 作成と加工、コントローラーに渡す
export class ReservationService {
  createReservation(data: CreateReservationRequest): Reservation {
    // こっからビジネスロジック
    // 既存予約の取得
    const allReservations = reservationRepository.findAll();

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
    reservationRepository.create(newreservation);

    // 作成したデータを返す
    return newreservation;
  }

  // 予約状況の表示のためリストをAPIから取得する
  getAllreservations(): Reservation[] {
    return reservationRepository.findAll();
  }

  // MVCSのためデータの保存場所を触るために一度ビジネスロジックを経由する
  // そのあとはRepoにつなげる
  cancelReservation(id: string): void {
    const cancelId = reservationRepository.deleteById(id);
    if (!cancelId) {
      throw new Error("IDが見つかりませんでした");
    }
  }

  // ビジネスロジックを経由してControllerからRepoを呼ぶ
  // 窓口作成
  updateReservation(
    id: string,
    startTime: string,
    endTime: string,
  ): Reservation {
    // Repoに渡す時の型にも同様にPartialを使う
    const newData: Partial<Reservation> = {
      id: id,
      startTime: startTime,
      endTime: endTime,
    };
    const updated = reservationRepository.update(id, newData);
    if (!updated) {
      throw new Error("更新内容が見つかりません。");
    }
    return updated;
  }
}
export default new ReservationService();
