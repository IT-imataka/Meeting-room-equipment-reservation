import { Router } from "express";
import { getHome } from "../controllers/homeControllers";
import { createReservation } from "../controllers/reservationControllers";

// Routes でどこに捌いてもらうかを決める
const router = Router();

router.get("/", getHome);
// postでreservationsエンドポイントの時にデータを登録する
router.post("/reservations", createReservation);

export default router;
