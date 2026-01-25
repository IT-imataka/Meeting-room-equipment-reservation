import { Reservable } from "../types/models";

// 暫定で用意
const reservable: Reservable[] = [
  {
    id: "1",
    name: "プロジェクター",
    type: "EQUIPMENT",
    isActive: true,
  },
  {
    id: "2",
    name: "A会議室",
    type: "ROOM",
    isActive: true,
  },
];

// 全データを返す関数でexportする
export const findAll = (): Reservable[] => {
  return reservable;
};
