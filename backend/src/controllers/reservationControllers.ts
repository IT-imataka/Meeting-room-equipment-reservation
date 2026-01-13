import { Request, Response } from "express";

// ビジネスロジックをインポート
import * as reservationService from "../services/reservationService";

export const createReservation = (req: Request, res: Response) => {
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

  // 結果を返す
  res.status(201).json(newreservation);
};
