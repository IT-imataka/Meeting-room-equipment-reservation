import { Reservable } from "../types/models";
import reservableRepositories from "../repositories/reservableRepositories";
import { error } from "node:console";

// データ型の用意
type CreateReservableRequset = {
  id: string;
  name: string;
  type: "ROOM" | "EQUIPMENT";
  isActive: boolean;
};

// controllerに渡せるような状態に db経由による非同期処理
export class ReservableService {
  // 作成
  async CreateReservale(data: CreateReservableRequset): Promise<Reservable> {
    // repoからの取り出し
    const allReservables = await reservableRepositories.findAll();
    // 重複チェック
    for (const being of allReservables) {
      if (being.id !== data.id) {
        continue;
      }
      if (being) {
        console.error("予約が重複しています！", error);
        throw new Error("既に予約が入っています");
      }
    }
    // idは同様に日付で採番
    const newId = new Date().toString();
    const newReservables: Reservable = {
      id: newId,
      name: data.name,
      type: data.type,
      isActive: data.isActive,
    };
    // 保存
    await reservableRepositories.create(newReservables);
    // 返す
    return newReservables;
  }

  // 表示
  async getAllreservable(id: string): Promise<Reservable[]> {
    // 返す
    return await reservableRepositories.findAll();
  }

  // 削除
  async DeleteReservable(id: string): Promise<boolean> {
    // 削除
    const del = await reservableRepositories.delete(id);
    // 返す
    return del;
  }

  // 更新
  async UpdateReservable(
    id: string,
    name: string,
    type: "ROOM" | "EQUIPMENT",
    isActive: boolean,
  ): Promise<Reservable> {
    // updateは更新後のデータを用意する

    const newData: Partial<Reservable> = {
      id: id,
      name: name,
      type: type,
      isActive: isActive,
    };

    // 更新
    const updated = await reservableRepositories.update(id, newData);
    // 更新内容の確認
    if (!updated) {
      console.error("更新内容が見つかりません", error);
      throw new Error("更新内容がありません");
    }
    // 返す
    return updated;
  }
}
