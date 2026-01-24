// "use client";

// import { useState } from "react";

// type Reservable = {
//   id: string;
//   name: string;
//   type: "ROOM" | "EQUIPMENT";
//   isActive: boolean;
// };

// type Reservation = {
//   id: string;
//   useId: string;
//   userId: string;
//   startTime: string;
//   endTime: string;
// };

// const [reservables, setReservables] = useState<Reservable[]>([]);
// const [reservations, setReservations] = useState<Reservation[]>([]);
// const [startTime, setstartTime] = useState<string>("");
// const [endTime, setendTime] = useState<string>("");

// // 何を予約するのかを取得する関数
// export const fetchReservables = async () => {
//   try {
//     console.log("データ取得中...");
//     const res = await fetch("http://localhost:3000/");
//     const data = await res.json();
//     setReservables(data);
//   } catch (error) {
//     console.error("エラー発生", error);
//   }
// };

// // 予約データ取得関数は、予約した時点以外にも画面を開いたタイミングでも出てくるように
// export const fetchReservations = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/reservations");
//     const data = await res.json();
//     setReservations(data);
//   } catch (error) {
//     console.error("予約が取得できませんでした", error);
//   }
// };

// // 予約処理の関数
// export const handleReserve = async (reserveId: string) => {
//   // APIを叩く
//   // 入力時刻のバリデーション
//   if (!startTime || !endTime) {
//     window.alert("開始時刻と終了時刻を入力してください！");
//     return;
//   }
//   if (startTime >= endTime) {
//     window.alert("終了時刻は開始時刻よりも前を設定してください");
//     return;
//   }
//   try {
//     // fetchで統一する設計思想　データの設計図をexpressに渡す
//     // 誰が、いつ、どうしたいかを荷物にして伝票を送っているイメージ
//     const res = await fetch("http://localhost:3000/reservations", {
//       // 配送の種類
//       method: "POST",

//       // 品名
//       headers: {
//         "Content-type": "application/json",
//       },

//       // 中身
//       body: JSON.stringify({
//         useId: reserveId,
//         userId: "XXXX",
//         startTime: startTime,
//         endTime: endTime,
//       }),
//     });
//     if (!res.ok) {
//       throw new Error("予約失敗");
//     }
//     const data = await res.json();
//     alert(`予約完了ID：${data.useId}`);

//     // 常に変わらないものは予約時に更新する必要がない(備品や会議室、プロジェクターなど)
//     // fetchReservables();

//     // 誰がいつ、何を予約するのかは変化するため、更新する必要がある
//     fetchReservations();
//   } catch (error) {
//     console.error("エラーです", error);
//   }
// };

// // 削除処理の関数
// export const handleCancel = async (reservationId: string) => {
//   // if (window.confirm("本当に消しますか？")) {
//   //   await fetch(`http://localhost:3000/reservations${reservationId}`, {
//   //     method: "DELETE",
//   //   })
//   //   fetchReservations();
//   // }

//   // ↑でもよいが、インデントが深くなるので、ダメなら弾く、okなら通すでガード

//   if (!window.confirm("本当にキャンセルしますか？")) {
//     return;
//   }
//   try {
//     // methodの更新だけのため、変数にはいれない
//     await fetch(`http://localhost:3000/reservations/${reservationId}`, {
//       method: "DELETE",
//     });

//     alert("キャンセル完了");
//     fetchReservations();
//   } catch (error) {
//     console.error("キャンセルできませんでした", error);
//   }
// };
