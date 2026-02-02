// v0が生成したロジックを利用して見た目を構築しますが、既存の構成（default exportなど）は維持します
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const CalendarView = () => {
  // --- v0からのロジック移植（見た目再現のため必要） ---
  // ※実際のアプリではpropsで渡すことが多いですが、現状ロジックがないため内部stateで持ちます
  const [currentMonth] = useState(new Date(2023, 8)) // 2023年9月固定
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
    <div className="w-full h-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/20 flex flex-col">

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-700">2023年9月</h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">‹</button>
          <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200">›</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-xs text-slate-500 mb-2">
        <div className="text-center">日</div>
        <div className="text-center">月</div>
        <div className="text-center">火</div>
        <div className="text-center">水</div>
        <div className="text-center">木</div>
        <div className="text-center">金</div>
        <div className="text-center">土</div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm text-slate-700">
        {/* Static sample weeks to mimic design */}
        <div className="py-3 rounded-lg text-center text-slate-400">30</div>
        <div className="py-3 rounded-lg text-center">31</div>
        <div className="py-3 rounded-lg text-center">1</div>
        <div className="py-3 rounded-lg text-center">2</div>
        <div className="py-3 rounded-lg text-center">3</div>
        <div className="py-3 rounded-lg text-center">4</div>
        <div className="py-3 rounded-lg text-center">5</div>

        {/* A highlighted range */}
        <div className="col-span-7 h-0.5" />

        {/* Second week */}
        <div className="py-3 rounded-lg text-center">6</div>
        <div className="py-3 rounded-lg text-center">7</div>
        <div className="py-3 rounded-lg text-center">8</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl">9</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl">10</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl">11</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl">12</div>

        {/* Remaining rows - simplified */}
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-green-200 to-cyan-200 rounded-xl">13</div>
        <div className="py-3 rounded-lg text-center bg-gradient-to-r from-green-200 to-cyan-200 rounded-xl">14</div>
        <div className="py-3 rounded-lg text-center">15</div>
        <div className="py-3 rounded-lg text-center">16</div>
        <div className="py-3 rounded-lg text-center">17</div>
        <div className="py-3 rounded-lg text-center">18</div>
        <div className="py-3 rounded-lg text-center">19</div>
      </div>

    </div>
  )
};
export default CalendarView;