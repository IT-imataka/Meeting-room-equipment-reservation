import { Request, Response } from "express";

// ビジネスロジックをインポート
import * as reservationService from "../services/reservationService";
import { Reservation } from "../types/models";

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

// コントローラーで受け取り受付から割り振る
export const getAll = (req: Request, res: Response) => {
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
