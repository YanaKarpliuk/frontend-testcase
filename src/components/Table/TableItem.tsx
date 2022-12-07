// import { useDispatch } from "react-redux";
// import { cartActions } from "../store/cartSlice";
// import { Notify } from "notiflix/build/notiflix-notify-aio";

type TableItemProps = {
  id: string;
  name: string;
  email: string;
  feedback: string;
  grade: number;
  passed: string;
};

export default function TableItem({
  id,
  name,
  email,
  feedback,
  grade,
  passed,
}: TableItemProps) {
  return (
    <tr className="">
      <td>
        <p className="">{name}</p>
      </td>
      <td className="">
        <p className="mx-[10px]">{email}</p>
      </td>
      <td>
        <p className="feedback-cell">{feedback}</p>
      </td>
      <td>
        <p className="">{grade}</p>
      </td>
      <td>
        {passed === "no" ? (
          <i className="bi bi-x-circle"></i>
        ) : (
          <i className="bi bi-check-circle"></i>
        )}
      </td>
    </tr>
  );
}
