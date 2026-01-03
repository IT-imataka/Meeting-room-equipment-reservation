import { Router } from "express";
import { getHome } from "../controllers/homeControllers";

// Routes でどこに捌いてもらうかを決める
const router = Router();

router.get("/", getHome);

export default router;
