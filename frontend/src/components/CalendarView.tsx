// v0が生成したロジックを利用して見た目を構築しますが、既存の構成（default exportなど）は維持します
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const CalendarView = () => {
  // --- v0からのロジック移植（見た目再現のため必要） ---
  // ※実際のアプリではpropsで渡すことが多いですが、現状ロジックがないため内部stateで持ちます
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 8)) // 2023年9月固定
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 8, 10))

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const prevMonthDays = getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))

  const days = []
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, currentMonth: false })
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, currentMonth: true })
  }
  for (let i = 1; days.length < 42; i++) {
    days.push({ day: i, currentMonth: false })
  }

  const monthYear = currentMonth.toLocaleString('en-US', { year: 'numeric', month: 'long' })
  const weekDays = ['日', '月', '火', '水', '木', '金', '土']

  // Color mapping for calendar dates based on the design
  const getDateColor = (day: number): string => {
    if (!day) return ''
    // v0のカラーマップをそのまま利用してカラフルなデザインを再現
    const colorMap: { [key: number]: string } = {
      1: 'bg-white text-gray-800',
      2: 'bg-cyan-200 text-gray-800',
      3: 'bg-cyan-200 text-gray-800',
      4: 'bg-blue-300 text-white',
      5: 'bg-blue-200 text-white',
      6: 'bg-blue-300 text-white',
      10: 'bg-cyan-400 text-white',
      11: 'bg-blue-400 text-white',
      12: 'bg-purple-300 text-white',
      13: 'bg-cyan-200 text-gray-800',
      14: 'bg-blue-300 text-white',
      15: 'bg-blue-400 text-white',
      16: 'bg-purple-300 text-white',
      17: 'bg-purple-400 text-white',
      18: 'bg-pink-300 text-white',
      19: 'bg-pink-200 text-white',
      20: 'bg-purple-200 text-gray-800',
      21: 'bg-pink-200 text-white',
      22: 'bg-yellow-100 text-gray-800',
      23: 'bg-yellow-100 text-gray-800',
      24: 'bg-yellow-200 text-gray-800',
      25: 'bg-pink-100 text-gray-800',
      26: 'bg-orange-100 text-gray-800',
    }
    return colorMap[day] || 'bg-white text-gray-800'
  }

  const isSelected = (day: number) => {
    return day === selectedDate.getDate() && selectedDate.getMonth() === currentMonth.getMonth()
  }
  // -----------------------------------------------------

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
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
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
      <div className="flex-1 grid grid-cols-7 gap-2">
        {days.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (item.currentMonth) {
                setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), item.day))
              }
            }}
            // v0のデザインクラスを適用
            // 親コンテナに合わせて高さを自動調整できるよう h-auto aspect-square などにしても良いですが、
            // ここではv0のデザイン（h-12 rounded-full）を維持しつつ、flexで中央寄せします。
            className={`
              h-10 w-10 sm:h-12 sm:w-12 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all
              ${!item.currentMonth ? 'text-gray-300 cursor-default' : ''}
              ${item.currentMonth ? `${getDateColor(item.day)} cursor-pointer hover:shadow-md` : ''}
              ${isSelected(item.day) ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            {item.day}
          </button>
        ))}
      </div>
    </div>
  )
};
export default CalendarView;