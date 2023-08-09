// import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/style.css';
import apiRequest from '../../services/api';
import { getToken, isAdmin } from '../../utils/auth';
import { useEffect, useState } from 'react';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});
    const token = getToken();
    const navigate = useNavigate();

    useEffect(() => {
        apiRequest('GET', `/job/${id}`, null, { Authorization: `Bearer ${token}` })
            .then((res) => { setJob(res) })
            .catch((err) => { console.log(err) })
    }, []);

    if (!job.job_designation) {
        return <div>Loading...</div>;
    }
    console.log(job);
    console.log(id);
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="job-detail-container">
                            <h1 className="mb-4">Job Designation: <span className="text-primary">{job.job_designation}</span></h1>
                            <h2>Title:
                                <span className="text-secondary">{job.title}</span>
                            </h2>
                            <h2>Description</h2>
                            <p className="lead">{job.description}</p>
                            <h2>Location: <span className="text-secondary">{job.location}</span></h2>
                            <h2>Salary and Benefits</h2>
                            <ul>
                                <li>{job.salary_and_benefits}</li>
                            </ul>
                            <h2>Application Instructions</h2>
                            <p className="lead">{job.application_instruction}<a href="mailto:jobs@example.com">jobs@example.com</a>.
                            </p>
                            <h2>Company Info</h2>
                            <p className="lead">{job.Company_Detail.about_company}</p>
                            <h2>Job Type: <span className="text-secondary">{job.job_type}</span></h2>
                            <h2>Experience Level: <span className="text-secondary">{job.experience_level}</span></h2>
                            <h2>Educational Requirement: <span className="text-secondary">{job.educational_requirement}</span></h2>
                            <h2>Skills Requirement</h2>
                            <ul>
                                <li>{job.skills_requirement}</li>
                            </ul>
                            <hr />
                            {!isAdmin() && <button className="btn btn-primary" onClick={() => navigate(`/user/apply/${id}`)} >Apply Now</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobDetail
