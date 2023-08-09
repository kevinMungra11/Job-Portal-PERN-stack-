import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { } from "../../redux/slices/jobSlice";
import JobCard from "./JobCard";
import Header from '../coman/Header'
import Footer from '../coman/Footer'
import { getToken } from "../../utils/auth";
import { fetchAppliedJobList } from "../../redux/slices/appliedJobsSlice";

const AppliedJobs = () => {
    const dispatch = useDispatch();
    const { appliedJobs } = useSelector((state) => state.appliedJobs);
    const status = useSelector((state) => state.appliedJobs.loading);
    const error = useSelector((state) => state.appliedJobs.error);
    const token = getToken();

    useEffect(() => {
        dispatch(fetchAppliedJobList({ Authorization: `Bearer ${token}` }))
    }, [dispatch]);

    if (status) {
        return <h1>Loading</h1>
    }

    if (error) {
        return (
            <div>
                err
            </div>
        )
    }

    console.log(appliedJobs)
    return (
        <div>
            <div style={{ background: "#eee" }}>
                <JobCard jobDetail={appliedJobs} />
            </div>
        </div>
    )
}

export default AppliedJobs
