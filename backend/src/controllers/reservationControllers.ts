import { Request, Response } from "express";

// ビジネスロジックをインポート
// * as で名前空間としてインポートしていたオブジェクトたちをインスタンス化された1つの箱としてインポートする
import reservationService from "../services/reservationService";
import { Reservation } from "../types/models";

export class ReservationController {
  // Expressのルータがメソッドを関数として扱ってしまうため、Controllerではアロー関数プロパティなるものを使う

  createReservation = (req: Request, res: Response) => {
    // Serviceで返ってきたエラーをここでハンドリングしてステータスコードを返す
    try {
      // クライアントからのjsonデータを受け取る
      // index.tsでexpress.jsonのミドルの設定をしているのでbodyにある
      // 分割代入でぶっこむ
      const { useId, userId, startTime, endTime } = req.body;

      // Serviceのビジネスロジックに渡して処理
      // 変数は同じ変数名でもう一度宣言する
      const newreservation = reservationService.createReservation({
        useId,
        userId,
        startTime,
        endTime,
      });

      res.status(201).json(newreservation);
    } catch (error) {
      console.error(error);
      // ここでクライアント側に補足したエラーをステータスコードとして返す
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "予期せぬエラーが発生しました" });
      }
    }
  };

  // 全予約状況の取得
  // Controllerで受け取り受付から割り振る
  getAll = (req: Request, res: Response) => {
    try {
      // ビジネスロジックからデータを貰う
      const Allresev = reservationService.getAllreservations();
      res.status(200).json(Allresev);
    } catch (error) {
      // ビジネスロジックでエラーが起きても止まらないように
      console.error("エラーになります", error);
      res.status(500).json({ message: "予期せぬエラー" });
    }
  };

  // 削除したい予約の内容だけを削除する関数
  cancel = (req: Request, res: Response) => {
    const id = req.params.id;
    // ここで代入したidはexpressの仕様上未設定もあり得るらしい。なので存在確認をして早期returnを必ず挟む
    if (!id) {
      res.status(400).json({ message: "IDが必要です" });
      return;
    }
    try {
      reservationService.cancelReservation(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: "削除に失敗しました" });
    }
  };

  // 更新したい予約の内容だけを更新する関数
  update = (req: Request, res: Response) => {
    // 更新する情報を用意する
    const id = req.params.id;
    // console.log("id", id);
    const { startTime, endTime } = req.body;
    // console.log("【Controller】受け取ったID:", id);
    // console.log("【Controller】受け取ったBody:", req.body);
    // ガード節
    if (!id || !startTime || !endTime) {
      res.status(400).json({ message: "id,startTime,endTimeは必須です" });
      return;
    }
    try {
      const updata = reservationService.updateReservation(
        id,
        startTime,
        endTime,
      );
      res.status(200).json(updata);
    } catch (error) {
      res.status(404).json({ message: "更新失敗:予約が見つかりません" });
      // console.error("更新が見つかりません", error);
    }
  };
}
export default new ReservationController();
