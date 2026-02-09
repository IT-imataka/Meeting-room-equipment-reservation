// import { fetchReservables } from "./reservationApi";
import type { Reservable } from "./reservationApi";

// ポートは同じ場所を使う、エンドポイントを分ける
const API_BASE_PORT = 3000;
const API_BASE_URL = `:http://localhost:${API_BASE_PORT}`;

export const regReservables = async (): Promise<Reservable[]> => {
  const res = await fetch(`${API_BASE_URL}/reservables`);
  // okプロパティで存在確認
  if (!res.ok) throw new Error("データが取得できませんでした");
  // 値だけを返す値だけを返す値だけを返す値だけを返す値だけを返す値だけを返す値だけを返す値だけを返す
  // エラーハンドリングはhooksでやるエラーハンドリングはhooksでやるエラーハンドリングはhooksでやるエラーハンドリングはhooksでやる
  return res.json();
};
