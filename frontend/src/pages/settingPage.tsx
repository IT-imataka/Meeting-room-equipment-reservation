// import { error } from "console";
import { useReservables } from "../hooks/useReservables";
import ReservableList from "../components/ReservableList";


export default function SettingPage() {
  const { reservables, handleRegister, name, setName, type, setType } = useReservables();
  // console.log(reservables);
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">会議室・備品の管理</h1>

      {/* --- 入力フォームエリア --- */}
      <div className="bg-white p-4 rounded shadow mb-8 border">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            className="border p-2 rounded flex-1"
            placeholder="例: 会議室A"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={type}
            onChange={(e) => setType(e.target.value as "ROOM" | "EQUIPMENT")}
          >
            <option value="ROOM">会議室</option>
            <option value="EQUIPMENT">備品</option>
          </select>
        </div>
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full font-bold"
        >
          追加する
        </button>
      </div>

      {/* --- リスト表示エリア --- */}
      <h2 className="text-xl font-bold mb-4">登録済みリスト</h2>
      <ReservableList reservables={reservables} />
    </div>
  );
};

// if (error) return <p style={{ color: "red" }}>{error}</p>