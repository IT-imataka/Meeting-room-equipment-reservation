// 予約できるモノと予約できるコトについて分ける

// 1.モノ
export interface Reservable {
  id: string;
  name: string;
  type: "ROOM" | "EQUIPMENT";
  isActive: boolean;
}

// 2.コト
export interface Reservation {
  id: string;
  // なにを
  useId: string;
  // 誰が
  userId: string;
  // いつ
  startTime: string;
  endTime: string;
}
