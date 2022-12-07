import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CandidateForm from "./Form/Form";
import { fetchCandidates } from "./Store/operations";
import CandidateTable from "./Table/Table";
import Title from "./Title/Title";

function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchCandidates(1));
  }, []);

  return (
    <div className="container">
      <Title />
      <CandidateForm />
      <div className="table-container">
        <CandidateTable />
      </div>
    </div>
  );
}

export default App;


