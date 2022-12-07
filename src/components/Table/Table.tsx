import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCandidateData,
  selectIsLoading,
  selectTotal,
  selectPage,
} from "../Store/dataSlice";
import TableItem from "./TableItem";
import { fetchCandidates } from "../Store/operations";

export default function CandidateTable() {
  const data = useSelector(selectCandidateData);
  const page = useSelector(selectPage);
  const total = useSelector(selectTotal);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch<any>();

  if (!page || !total) return null;

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status" className="loader">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <>
        <InfiniteScroll
          dataLength={page * 10}
          next={() => dispatch(fetchCandidates(page + 1))}
          hasMore={data.length < total} //
          loader={
            <Spinner animation="border" role="status" className="loader">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have reviewed all the information</b>
            </p>
          }
          style={{ overflowY: 'hidden' }}
        >
          <Table striped bordered hover className="table mt-5">
            <colgroup>
              <col span={1} style={{ width: "20%" }} />
              <col span={1} style={{ width: "20%" }} />
              <col span={1} style={{ width: "40%" }} />
              <col span={1} style={{ width: "10%" }} />
              <col span={1} style={{ width: "10%" }} />
            </colgroup>
            <thead className="">
              <tr className="">
                <th className="">NAME</th>
                <th className="">EMAIL</th>
                <th className="">FEEDBACK</th>
                <th className="">GRADE</th>
                <th className="">PASSED</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((item: any) => (
                <TableItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  email={item.email}
                  feedback={item.feedback}
                  grade={item.grade}
                  passed={item.passed}
                />
              ))}
            </tbody>
          </Table>
        </InfiniteScroll>
      </>
    </>
  );
}

// function newest(a: CandidateData, b: CandidateData) {
//   const dateA = new Date(a.createdAt);
//   const dateB = new Date(b.createdAt);

//   if (dateA < dateB) {
//     return 1;
//   }

//   if (dateA > dateB) {
//     return -1;
//   }

//   return 0;
// }
