/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom';
import '../../styles/style.css';
import { getToken, isAdmin } from '../../utils/auth';
import apiRequest from '../../services/api';

const JobCard = ({ jobDetail, userId }) => {
    const location = useLocation();
    const path = location.pathname === `/admin/jobs/${userId}`;
    console.log(path)
    const handleClick = (url) => {
        window.open(`http://localhost:1111/user/${url}`, '_blank', 'noopener,noreferrer');
    }
    console.log(jobDetail);
    const token = getToken();
    const changeStatus = async (status) => {
        await apiRequest('PUT', `/job/${status.jobId}/update-status`, status, { Authorizarion: `Bearer ${token}` })
    }

    return (
        <div className="container">
            <div className="text-center m-4">
                <h1>Featured Jobs</h1>
            </div>
            {jobDetail.map((job, index) => {
                return (<div key={index} className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex flex-column flex-lg-row">
                            <span className="avatar avatar-text rounded-3 me-4 mb-2 fs-5">{job.job_designation.split(" ").length > 1 ? job.job_designation.split(" ")[0].charAt(0) + job.job_designation.split(" ")[1].charAt(0) : job.job_designation.split(" ")[0].charAt(0)}</span>
                            <div className="row flex-fill">
                                <div className="col-sm-5">
                                    <h4 className="h5">{job.job_designation}</h4>
                                    <span className="badge bg-secondary fs-md">{job.location}</span>
                                </div>
                                {job.Company_Detail && <><div className="col-sm-4 py-2">
                                    <h1 className="badge bg-secondary">
                                        {job.Company_Detail.company_name}
                                    </h1>
                                </div><div className="col-sm-3 text-lg-end">
                                        <Link to={`/user/${job.id}`} className="btn btn-primary stretched-link m-2">Detail</Link>
                                    </div></>
                                }
                                {path && isAdmin() && <>
                                    <div className="row-sm-3 text-lg-end ">
                                        {(job.Job_Application &&
                                            job.Job_Application.status !== 'Accepted') &&
                                            <><button onClick={() => changeStatus({ userId, jobId: job.id, status: 'Accepted' })} className="btn btn-primary m-2">Accept</button>
                                                <button onClick={() => changeStatus({ userId, jobId: job.id, status: 'Denied' })} className="btn btn-primary m-2">Reject</button>
                                            </>}

                                        <button onClick={() => handleClick(`resume/${userId}${job.id}`)} className="btn btn-primary m-2">Resume</button>
                                        <button onClick={() => handleClick(`cover-letter/${userId + job.id}`)} className="btn btn-primary m-2">CV</button>
                                        <button onClick={() => handleClick(`certificate/${userId + job.id}`)} className="btn btn-primary m-2">Exp. Letter</button>
                                    </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>)
            }
            )}
        </div>

    )
}


export default JobCard