import React from "react";
import "./App.css";
import useFetchJobs from "./useFetchJobs";
import { useState } from "react";
import Job from "./Job";
import JobPagination from "./JobPagination";
import SearchForms from "./SearchForms";

function App() {
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, err, hasNextPage } = useFetchJobs(param, page);

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParam(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <>
      <div className="container col-md-6 col-sm-12">
        <h1>GitHub jobs</h1>
        <SearchForms  params = {param} onParamChange ={handleParamChange} />
        <JobPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
        {loading && <h1>Loading...</h1>}
        {err && <h1>Error,Try Refreshing.</h1>}
        {jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
        <JobPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </>
  );
}
export default App;
