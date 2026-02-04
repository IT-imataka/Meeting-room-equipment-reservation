// v0が生成したロジックを利用して見た目を構築しますが、既存の構成（default exportなど）は維持します
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { Reservation } from '../api/reservationApi';

type Props = {
  reservations: Reservation[];
  onSelectDate: (data: Date) => void;
}

const CalendarView = ({ reservations, onSelectDate }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeDate, setactiveDate] = useState<Date | null>(null);

  // 当月末日の取得関数
  const getDateInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  // 当月の月初の曜日の取得関数
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  // 先月の描画関数
  const preMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  }
  // 来月の描画関数
  const nexMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  }

  // 月末日
  const daysInMonth = getDateInMonth(currentMonth);
  // 月初の曜日
  const firstDay = getFirstDayOfMonth(currentMonth);
  const prevMonthDate = getDateInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));

  const TOTAL_DAYS = 42;

  const days = [];
  // 当月日付の生成
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDate - i, currentMonth: false });
  }
  // 当月曜日の生成
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, currentMonth: true });
  }
  // 当月日付セルの生成
  for (let i = 1; days.length < TOTAL_DAYS; i++) {
    days.push({ day: i, currentMonth: false });
  }

  const monthYear = currentMonth.toLocaleString('ja-JP', { year: 'numeric', month: 'long' })
  const weekDays = ['日', '月', '火', '水', '木', '金', '土']

  // Color mapping for calendar dates based on the design
  // const getDateColor = (day: number): string => {
  //   if (!day) return ''
  //   // v0のカラーマップをそのまま利用してカラフルなデザインを再現
  //   const colorMap: { [key: number]: string } = {
  //     1: 'bg-white text-gray-800',
  //     2: 'bg-cyan-200 text-gray-800',
  //     3: 'bg-cyan-200 text-gray-800',
  //     4: 'bg-blue-300 text-white',
  //     5: 'bg-blue-200 text-white',
  //     6: 'bg-blue-300 text-white',
  //     10: 'bg-cyan-400 text-white',
  //     11: 'bg-blue-400 text-white',
  //     12: 'bg-purple-300 text-white',
  //     13: 'bg-cyan-200 text-gray-800',
  //     14: 'bg-blue-300 text-white',
  //     15: 'bg-blue-400 text-white',
  //     16: 'bg-purple-300 text-white',
  //     17: 'bg-purple-400 text-white',
  //     18: 'bg-pink-300 text-white',
  //     19: 'bg-pink-200 text-white',
  //     20: 'bg-purple-200 text-gray-800',
  //     21: 'bg-pink-200 text-white',
  //     22: 'bg-yellow-100 text-gray-800',
  //     23: 'bg-yellow-100 text-gray-800',
  //     24: 'bg-yellow-200 text-gray-800',
  //     25: 'bg-pink-100 text-gray-800',
  //     26: 'bg-orange-100 text-gray-800',
  //   }
  //   return colorMap[day] || 'bg-white text-gray-800'
  // }

  const hasReservation = (target: Date) => {
    return reservations.some((val) => {
      const reserveDateYear = new Date(val.startTime).getFullYear();
      const reserveDateMonth = new Date(val.startTime).getMonth();
      const reserveDay = new Date(val.startTime).getDate();
      return (
        reserveDateYear === target.getFullYear() &&
        reserveDateMonth === target.getMonth() &&
        reserveDay === target.getDate()
      );
    });
  };

  const isSelected = (targetDate: Date): boolean => {
    if (!activeDate) return false;
    // 比較するのはミリ秒ごと
    return (
      activeDate.getFullYear() === targetDate.getFullYear() &&
      activeDate.getMonth() === targetDate.getMonth() &&
      activeDate.getDate() === targetDate.getDate()
    );
  };
  return (
    // v0: w-96 bg-white rounded-3xl p-8 shadow-2xl
    // 変更: 親要素にフィットさせるため w-full h-full を追加
    <div className="w-full h-full bg-white rounded-3xl p-8 shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <button className="flex items-center gap-2 text-gray-800 font-semibold hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
          <span>{monthYear}</span>
          <ChevronRight size={20} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            onClick={preMonth}>
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            onClick={nexMonth}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 mb-4 shrink-0">
        {weekDays.map((day) => (
          <div key={day} className="h-10 flex items-center justify-center text-gray-500 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 gap-2 relative">
        {days.map((item, index) => {
          // 含まれていない年月は最初に定義したcurrentMonthから,
          // 触れられた対象の日付を取得する この発想出なかった
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), item.day);
          const isActive = item.currentMonth && isSelected(date);
          return (
            <button
              key={index}
              onClick={() => {
                if (!item.currentMonth) return;

                onSelectDate(date);
                // アクティブな日付のセット
                setactiveDate(date);
              }}
              // relative: ドットの基準点にする
              // flex flex-col: 中身を縦積みにする（数字とドットの重なり制御もしやすい）
              className={`
        relative w-full h-10 sm:h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
        ${!item.currentMonth ? 'text-slate-300 cursor-default' : 'cursor-pointer hover:bg-white/40'}
        ${/* 選択時のスタイル */ isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : item.currentMonth ? 'text-slate-700' : ''}
      `}
            >

              {item.currentMonth && hasReservation(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), item.day)) && (
                <div className="absolute top-10 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              )}

              <span className="z-10">{item.day}</span>
              {item.currentMonth && hasReservation(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), item.day)) && (
                // 数字の下に小さく光る点を配置
                // 選択されている日(isSelected)は背景が青なので、ドットを白くするなどの分岐を入れるとおしゃれです
                <span className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full shadow-sm ${isActive ? 'bg-white' : 'bg-rose-400 shadow-rose-400/50'}`} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
};
export default CalendarView;
