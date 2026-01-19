import { Request, Response } from "express";

// ビジネスロジックをインポート
import * as reservationService from "../services/reservationService";

export const createReservation = (req: Request, res: Response) => {
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
