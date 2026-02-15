// src/db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

// .envファイルの読み込み
dotenv.config();

// 接続プールを作成
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:password@localhost:5432/mydb",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// 接続確認
pool.on("connect", () => {
  console.log("データベースにつながりました");
});
export default pool;
