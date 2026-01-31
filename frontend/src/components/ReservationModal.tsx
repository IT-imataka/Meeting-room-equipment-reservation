// こちらはinterfaceで定義する記法の練習

interface Props {
  onSave: () => void;
  startTime: string;
  setstartTime: (value: string) => void;
  endTime: string;
  setendTime: (value: string) => void;
  editId: string | null;
  setEditId: (value: string | null) => void;
  newstartTime: string;
  setnewstartTime: (value: string) => void;
  newendTime: string;
  setnewendTime: (value: string) => void;
}

const ReservationModal = ({ startTime, setstartTime, endTime, setendTime, editId, newstartTime, setnewstartTime, setnewendTime }: Props) => {
  return (
    editId && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

        {/* モーダル本体 */}
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl w-full max-w-sm mx-4">

          <h3 className="text-xl font-bold text-white mb-4">予約時間の変更</h3>

          {/* 開始時間 */}
          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-1">開始時間</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setstartTime(e.target.value)}
              // カレンダーアイコンをクリックしやすくするおまじない
              onClick={(e) => e.currentTarget.showPicker()}
              className="w-full bg-slate-900 text-white border border-slate-600 rounded p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 終了時間 */}
          <div className="mb-6">
            <label className="block text-sm text-slate-400 mb-1">終了時間</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setendTime(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker()}
              className="w-full bg-slate-900 text-white border border-slate-600 rounded p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* ボタンエリア */}
          <div className="flex justify-end gap-3">
            <button
              onClick={!editId}
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30"
            >
              変更を保存
            </button>
          </div>

        </div>
      </div>
    )
  )
};

export default ReservationModal;