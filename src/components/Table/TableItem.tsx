type TableItemProps = {
  id?: string;
  name: string;
  email: string;
  feedback: string;
  grade: number;
  passed: string;
};

export default function TableItem({
  name,
  email,
  feedback,
  grade,
  passed,
}: TableItemProps) {
  return (
    <tr>
      <td>
        <p>{name}</p>
      </td>
      <td>
        <p className="mx-[10px]">{email}</p>
      </td>
      <td>
        <p className="feedback-cell">{feedback}</p>
      </td>
      <td>
        <p>{grade}</p>
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
