import { Router } from "express";
// import getAll from "../controllers/"
import * as reservationControllers from "../controllers/reservationControllers";

const router = Router();

// 予約専用の窓口を作る
// 1.予約作成
router.post("/", reservationControllers.createReservation);

// 2.予約一覧の取得
router.get("/", reservationControllers.getAll);

export default router;
