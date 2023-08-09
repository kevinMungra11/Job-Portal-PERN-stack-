import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchJobs } from "../../redux/slices/jobSlice";
import apiRequest from "../../services/api";
import { getToken } from "../../utils/auth";

const ListJobs = () => {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.jobs);
  const status = useSelector((state) => state.jobs.loading);
  const error = useSelector((state) => state.jobs.error);
  const token = getToken();
  const header = { Authorization: `Bearer ${token}` };
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [payload, setPayload] = useState({ page: 0, size: 8 });

  useEffect(() => {
    dispatch(fetchJobs(payload));
  }, [dispatch, payload]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || 1;
    const size = params.get("size") || 8;
    setPage(Number(page));
    setPageSize(Number(size));
    setPayload({ page: page - 1, size: size });
  }, []);

  const totalPages = Math.ceil(job.count / pageSize);
  const maxButtonsToShow = 3;
  const startButtonIndex = Math.max(page - Math.floor(maxButtonsToShow / 2), 1);
  const endButtonIndex = Math.min(startButtonIndex + maxButtonsToShow, totalPages);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    setPayload({ page: pageNumber - 1, size: pageSize });
    const urlParams = new URLSearchParams({ page: pageNumber, size: pageSize });
    window.history.pushState(null, null, `?${urlParams.toString()}`);
  };

  if (status) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const deleteJob = async (id) => {
    console.log("working")
    const res = await apiRequest('DELETE', `/job/${id}/delete`, '', header);
    dispatch(fetchJobs(payload));
    console.log(res);
  }

  console.log(job.jobs)
  return (
    <div className="container mt-5">
      <table className="table table-hover table-striped table-bordered border shadow">
        <thead className="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Job Description</th>
            <th scope="col">Delete Job</th>
          </tr>
        </thead>
        <tbody>
          {job.jobs.map((job, index) => {
            return (<tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{job.job_designation}</td>
              <td>
                <button onClick={() => deleteJob(job.id)} type="button" className="btn btn-danger me-2">
                  Delete
                </button>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageClick(page - 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {[...Array(endButtonIndex - startButtonIndex + 1)].map((_, index) => {
            const buttonPageIndex = startButtonIndex + index;
            return (
              <li
                key={buttonPageIndex}
                className={`page-item ${page === buttonPageIndex ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => handlePageClick(buttonPageIndex)}>
                  {buttonPageIndex}
                </button>
              </li>
            );
          })}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageClick(page + 1)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ListJobs;
