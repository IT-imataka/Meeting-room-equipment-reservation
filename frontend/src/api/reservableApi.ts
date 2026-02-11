// import { fetchReservables } from "./reservationApi";
import type { Reservable } from "./reservationApi";

// ポートは同じ場所を使う、エンドポイントを分ける
const API_BASE_PORT = 3000;
const API_BASE_URL = `:http://localhost:${API_BASE_PORT}`;

// 取得処理
export const fetchgReservables = async (): Promise<Reservable[]> => {
  const res = await fetch(`${API_BASE_URL}/reservables`);
  // okプロパティで存在確認
  if (!res.ok) throw new Error("データが取得できませんでした");
  // 値だけを返す値だけを返す値だけを返す値だけを返す値だけを返す値だけを返す値だけを返す値だけを返す
  // エラーハンドリングはhooksでやるエラーハンドリングはhooksでやるエラーハンドリングはhooksでやるエラーハンドリングはhooksでやる
  return res.json();
};

// 登録処理 idはサーバー側で決めるから不要 reservationsの時は特定のものを参照していたから必要だった
export const regReservables = async (
  name: string,
  type: "ROOM" | "EQUIPMENT",
): Promise<Reservable[]> => {
  const res = await fetch(`${API_BASE_URL}/reservables`, {
    // どの渡し方か
    method: "POST",
    // 何で渡すか
    headers: {
      "content-type": "application/json",
    },
    // どうやって、それを何で渡すか
    body: JSON.stringify({
      name: name,
      type: type,
      isActive: true,
    }),
  });
  if (!res.ok) throw new Error("登録に失敗しました");
  return res.json();
};

// 削除処理

// 更新処理
