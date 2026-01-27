// src/db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

// .envファイルの読み込み
dotenv.config();

// 接続プールを作成
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 接続確認
pool.on("connect", () => {
  console.log("データベースにつながりました");
});
export default pool;
