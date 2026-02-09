// ポート番号の設定
const API_BASE_PORT = 3001;
const API_BASE_URL = `:http://localhost:${API_BASE_PORT}`;

// 型定義
export interface Reservable {
  id: string;
  name: string;
  type: "ROOM" | "EQUIPMENT";
  isActive: boolean;
}
