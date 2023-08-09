import { useDispatch, useSelector } from "react-redux"
import { getToken } from "../../utils/auth";
import { useEffect } from "react";
import { applicantsList } from '../../redux/slices/applicantsListSlice'
import { Link } from "react-router-dom";

const ApplicantList = () => {
    const dispatch = useDispatch();
    const token = getToken();
    const payload = { Authorization: `Bearer ${token}` };
    const applicants = useSelector((state) => state.applicantsList);

    useEffect(() => {
        dispatch(applicantsList(payload));
    }, []);

    console.log(applicants.user)

    return (
        <div>
            <div className="container mt-3">
                <h2 className="text-center mb-3 mt-0" >Applicants</h2>
                <div className="row">
                    {applicants.user.map((value, index) => {
                        return (
                            <div key={index} className="col-xl-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-start">
                                            <div><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                                            <div className="flex-1 ms-3">
                                                <h5 className="font-size-16 mb-1"><a href="#" className="text-dark">{value[1].first_name}</a></h5>
                                                <span className="badge badge-soft-success mb-0">Full Stack Developer</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-1">
                                            <p className="text-muted mb-0"><i className="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 070 2860 5375</p>
                                            <p className="text-muted mb-0 mt-2"><i className="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i>{value[1].email}</p>
                                        </div>
                                        <div className="d-flex gap-2 pt-4 justify-content-center">
                                            {/* <button type="button" className="btn btn-soft-primary btn-sm w-50"><i className="bx bx-user me-1"></i> Resume</button> */}
                                            <Link type="button" to={`/admin/jobs/${value[0]}`} className="btn btn-primary btn-sm w-50">Applied jobs</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ApplicantList
