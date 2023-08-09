import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import apiRequest from "../../services/api";
import { getToken } from "../../utils/auth";
import { setAppliedJobs } from "../../redux/store";
import { useDispatch } from "react-redux";
import '../../styles/style.css';

const ApplyForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [job, setJob] = useState({});
    const token = getToken();

    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [experienceLetter, setExperienceLetter] = useState(null);

    const header = { Authorization: `Bearer ${token}` };

    const validationSchema = Yup.object().shape({
        workExperience: Yup.string().required("Work experience is required"),
        skills: Yup.string().required("Skills are required"),
        resume: Yup.mixed().required("Resume is required").test("fileFormat", "Only PDF files are allowed", (value) => (value)),
        coverLetter: Yup.mixed().required("Cover letter is required").test("fileFormat", "Only PDF files are allowed", (value) => (value)),
        experienceLetter: Yup.mixed().required("Experience letter is required").test("fileFormat", "Only PDF files are allowed", (value) => (value)),
    });

    useEffect(() => {
        apiRequest('GET', `/job/${id}`, '', header)
            .then((res) => { setJob(res) })
            .catch((err) => { console.log(err) })
    }, [])

    const formik = useFormik({
        initialValues: {
            workExperience: "",
            skills: "",
            resume: '',
            coverLetter: '',
            experienceLetter: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            var formData = new FormData();
            formData.append('resume', resume, 'resume');
            formData.append('coverLetter', coverLetter, 'converLetter');
            formData.append('experienceLetter', experienceLetter, 'experienceLetter');
            formData.append('skills', values.skills);
            formData.append('workExperience', values.workExperience);

            formData.forEach((val, key) => {
                console.log(key, val);
            })
            dispatch(setAppliedJobs(job));
            await apiRequest('POST', `/job/${id}/apply`, formData, header)
                .then((data) => { console.log(data) })
                .catch((err) => { console.log(err) })
        }
    });

    return (
        <div className='mainDiv'>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row gutters d-flex justify-content-center row gutters">
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <form onSubmit={formik.handleSubmit} encType="multipart/form-data" required>
                                <div className="card-body">
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mb-2 text-primary">Apply For Job</h6>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="workExperience">Work experience</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="workExperience"
                                                    placeholder="Enter work experience"
                                                    {...formik.getFieldProps('workExperience')}
                                                />
                                                {formik.touched.workExperience && formik.errors.workExperience ? (
                                                    <div className="text-danger">{formik.errors.workExperience}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="skills">Skills</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="skills"
                                                    placeholder="Enter skills"
                                                    {...formik.getFieldProps('skills')}
                                                />
                                                {formik.touched.skills && formik.errors.skills ? (
                                                    <div className="text-danger">{formik.errors.skills}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label htmlFor="resume">Resume</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="resume"
                                                    name="resume"
                                                    accept=".pdf"
                                                    placeholder="Enter cover letter"
                                                    // {...formik.getFieldProps('resume')}
                                                    onChange={(event) => {
                                                        const file = event.target.files[0];
                                                        console.log(file);
                                                        setResume(file);
                                                        formik.setFieldValue('resume', file);
                                                        formik.handleChange(event);
                                                    }}
                                                />
                                                {formik.touched.resume && formik.errors.resume ? (
                                                    <div className="text-danger">{formik.errors.resume}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="coverLetter">Cover letter</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="coverLetter"
                                                    name="coverLetter"
                                                    accept=".pdf"
                                                    placeholder="Enter cover letter"
                                                    // {...formik.getFieldProps('coverLetter')}
                                                    onChange={(event) => {
                                                        const file = event.target.files[0];
                                                        console.log(file);
                                                        setCoverLetter(file);
                                                        formik.setFieldValue('coverLetter', event.currentTarget.files[0]);
                                                        formik.handleChange(event);
                                                    }}
                                                />
                                                {formik.touched.coverLetter && formik.errors.coverLetter ? (
                                                    <div className="text-danger">{formik.errors.coverLetter}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="experienceLetter">Experience letter</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="experienceLetter"
                                                    name="experienceLetter"
                                                    accept=".pdf"
                                                    placeholder="Enter experience letter"
                                                    // {...formik.getFieldProps('experienceLetter')}
                                                    onChange={(event) => {
                                                        const file = event.target.files[0];
                                                        console.log(file);
                                                        setExperienceLetter(file);
                                                        formik.setFieldValue('experienceLetter', event.currentTarget.files[0]);
                                                        formik.handleChange(event);
                                                    }}
                                                />
                                                {formik.touched.experienceLetter && formik.errors.experienceLetter ? (
                                                    <div className="text-danger">{formik.errors.experienceLetter}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <input type="submit" className='btn btn-primary mt-2' value='Submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyForm;
