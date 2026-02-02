// こちらはinterfaceで定義する記法の練習

// import { X } from 'lucide-react';

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
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl shadow-2xl w-full max-w-sm mx-4 transform transition-all">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full text-slate-500 transition">
            {/* <X size={20} /> */}
          </button>
        </div>

        {/* 開始時間 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-600 mb-1">開始時間</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setstartTime(e.target.value)}
            onClick={(e) => e.currentTarget.showPicker()}
            className="w-full px-4 py-2 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-slate-700"
          />
        </div>

        {/* 終了時間 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-1">終了時間</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setendTime(e.target.value)}
            onClick={(e) => e.currentTarget.showPicker()}
            className="w-full px-4 py-2 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-slate-700"
          />
        </div>

        {/* ボタンエリア */}
        <div className="flex justify-end gap-3 pt-2">
          {/* キャンセルボタンは上の×で代用できるため、ここは保存ボタンを強調 */}
          <button
            onClick={onSave}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
          >
            {saveTitle}
          </button>
        </div>

      </div>
    </div>
  )
};

export default ReservationModal;