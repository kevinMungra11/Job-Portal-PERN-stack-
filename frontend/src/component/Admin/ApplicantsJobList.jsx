import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { applicantsList } from "../../redux/slices/applicantsListSlice";
import JobCard from "../Jobs/JobCard";
import { getToken } from "../../utils/auth";

function ApplicantsJobList() {
    const dispatch = useDispatch();
    const applicants = useSelector((state) => state.applicantsList);
    const status = useSelector((state) => state.applicantsList.loading);
    const error = useSelector((state) => state.applicantsList.error);
    const token = getToken();
    const header = { Authorization: `Bearer ${token}` };
    const { id } = useParams();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [payload, setPayload] = useState({ page: 0, size: 8 });

    useEffect(() => {
        dispatch(applicantsList(header, payload));
    }, [dispatch, payload]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get("page") || 1;
        const size = params.get("size") || 8;
        setPage(Number(page));
        setPageSize(Number(size));
        setPayload({ page: page - 1, size: size });
    }, []);

    console.log(applicants.jobs)
    const temp = applicants.jobs.filter((val) => val[0] == id);
    const jobs = temp.map((val) => val[1]);
    console.log(jobs);

    const totalPages = Math.ceil(jobs.length / pageSize);
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

    return (
        <div style={{ background: "#eee" }}>
            <JobCard jobDetail={jobs} userId={id} />
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

export default ApplicantsJobList;
