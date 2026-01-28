// まず型定義から必要なものをインポート
import { Reservation } from "../types/models";
import pool from "../db";
import { start } from "node:repl";

export class ReservationRepository {
  // メモリ上のDB初期化
  // private reservations: Reservation[] = [];

  // 予約保存機能
  async create(reservation: Reservation): Promise<void> {
    // メモリはもう使わない
    // this.reservations.push(reservation);

    // 保存クエリ発行
    // $1~$5 プレースホルダー SQLインジェクション対策
    const query =
      "INSERT INTO reservations (id,use_id,user_id,start_time,end_time)VALUES($1,$2,$3,$4,$5)";

    const values = [
      reservation.id,
      reservation.useId,
      reservation.userId,
      reservation.startTime,
      reservation.endTime,
    ];
    await pool.query(query, values);
  }

  // 予約削除機能
  async deleteById(id: string): Promise<boolean> {
    const query = `DELETE FROM reservations WHERE id = $1`;

    // プレースホルダーにidを代入
    const result = await pool.query(query, [id]);
    // rowCount に削除された行数がはいる
    // 1行以上の削除でtrue,0ならfalse
    return (result.rowCount ?? 0) > 0;
  }

  // 予約情報の更新機能
  // utility typeのPartialを使い、変更されるであろう各オブジェクトを任意にする
  async update(
    id: string,
    newData: Partial<Reservation>,
  ): Promise<Reservation | null> {
    //
    const query =
      "UPDATE reservations SET start_time = $2,end_time = $3 WHERE id = $1 RETURNING *";

    //
    const value = [id, newData.startTime, newData.endTime];

    const result = await pool.query(query, value);

    if (result.rowCount === 0) {
      return null;
    }

    // スネークケースをキャメルケースに
    // キャメル(key) : スネーク(value)
    const row = result.rows[0];
    return {
      id: row.id,
      useId: row.use_id,
      userId: row.user_id,
      startTime: row.start_time,
      endTime: row.end_time,
    };
  }

  // 全予約を取得する機能
  async findAll(): Promise<Reservation[]> {
    // メモリはもう使わない
    // return this.reservations;

    // 取得クエリ発行
    const query = `SELECT * FROM reservations`;
    const result = await pool.query(query);

    // DBのスネークケースをキャメルケースに変換
    // key : value
    // キャメル : スネーク
    return result.rows.map((row) => ({
      id: row.id,
      useId: row.use_id,
      userId: row.user_Id,
      startTime: row.start_time,
      endTime: row.end_time,
    }));
  }
}
export default new ReservationRepository();
