// こちらはinterfaceで定義する記法の練習

import { X } from 'lucide-react';

interface Props {
  // 新規予約でも使いまわすためにpropsを汎用化
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
  // もらうpropsの名前は知らなくてよい
  startTime: string;
  setstartTime: (value: string) => void;
  endTime: string;
  setendTime: (value: string) => void;
  title?: string;
  saveTitle?: string;
}

const ReservationModal = ({ isOpen, onSave, onClose, startTime, endTime, setstartTime, setendTime, title = "予約時間の変更", saveTitle = "変更を保存" }: Props) => {
  // 開いていないときはnullで早期リターン
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景の暗幕 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* モーダル本体 */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl p-8 transform transition-all scale-100 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full text-slate-500 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* 開始時間 */}
        <div className="space-y-6 relative z-10">
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-600 uppercase mb-2 mb-1">開始時間</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setstartTime(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker()}
              className="w-full px-4 py-2 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 text-slate-700 font-medium transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* 終了時間 */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-slate-600 uppercase mb-2 mb-1">終了時間</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setendTime(e.target.value)}
            onClick={(e) => e.currentTarget.showPicker()}
            className="w-full px-4 py-2 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 text-slate-700 font-medium transition-all cursor-pointer"
          />
        </div>

        {/* ボタンエリア */}
        <div className="flex justify-end gap-3 pt-2">
          {/* キャンセルボタンは上の×で代用できるため、ここは保存ボタンを強調 */}
          <button
            onClick={onSave}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
          >
            {saveTitle}
          </button>
        </div>

      </div>
    </div>
  )
};

export default ReservationModal;