// import { error } from "console";
import { useReservables } from "../hooks/useReservables";

export default function testfunc() {
  const { reservables } = useReservables();
  console.log(reservables);
  return (
    <ul>
      {reservables.map((item) => <li>{item.id}</li>)}
    </ul>
  )

}
// if (error) return <p style={{ color: "red" }}>{error}</p>