// ポート番号の設定
import { fetchReservables } from "./reservationApi";
import type { Reservable } from "./reservationApi";

// ポートは同じ場所を使う、エンドポイントを分ける
const API_BASE_PORT = 3000;
const API_BASE_URL = `:http://localhost:${API_BASE_PORT}`;

export const regReservables = async (): Promise<Reservable[]> => {
  await fetch(`${API_BASE_URL}/reservables`);
  // return;
};
