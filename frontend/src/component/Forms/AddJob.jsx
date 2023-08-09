import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '../../services/api';
import '../../styles/style.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getToken } from '../../utils/auth';
import { postJob } from '../../redux/slices/jobSlice';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object().shape({
    jobDesignation: Yup.string().required('Job Designation is required'),
    header: Yup.string().required('Header is required'),
    description: Yup.string().required('Description is required'),
    location: Yup.string().required('Location is required'),
    companyInfo: Yup.string().required('Company Information is required'),
    salaryAndBenefits: Yup.string().required('Salary & Benefits is required'),
    applicationInstruction: Yup.string().required('Application Instruction is required'),
    jobType: Yup.string().required('Job Type is required'),
    educationRequirement: Yup.string().required('Education Level is required'),
    experienceLevel: Yup.string().required('Experience Level is required'),
    skillsRequirement: Yup.string().required('skills requirement is required'),
});

const AddJob = () => {
    const dispatch = useDispatch();
    const [companies, setCompanies] = useState([]);

    const jobs = useSelector((state) => state.jobs);
    const token = getToken();
    const payload = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        apiRequest(
            'GET',
            '/company/get/all',
            '',
            payload
        ).then((data) => setCompanies(data))
            .catch((err) => console.log(err))
    }, [])

    const formik = useFormik({
        initialValues: {
            jobDesignation: '',
            header: '',
            description: '',
            location: '',
            companyInfo: '',
            salaryAndBenefits: '',
            applicationInstruction: '',
            jobType: '',
            educationRequirement: '',
            experienceLevel: '',
            skillsRequirement: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            const res = await apiRequest('POST', '/job/add', values, payload);
            dispatch(postJob(res));
            console.log(res);
            console.log(jobs);
        },
    });
    return (
        <div>
            <div className='mainDiv'>
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="row gutters d-flex justify-content-center row gutters">
                        <h3 className="text-center">Add Job Form</h3>
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">
                                <form onSubmit={formik.handleSubmit} required>
                                    <div className="card-body">
                                        <div className="row gutters">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 className="mb-2 text-primary">Job Details</h6>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="jobDesignation">Job Designation</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="jobDesignation"
                                                        placeholder="Enter job designation"
                                                        {...formik.getFieldProps('jobDesignation')}
                                                    />
                                                    {formik.touched.jobDesignation && formik.errors.jobDesignation ? (
                                                        <div className="text-danger">{formik.errors.jobDesignation}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="header">Header</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="header"
                                                        placeholder="Enter job header"
                                                        {...formik.getFieldProps('header')}
                                                    />
                                                    {formik.touched.header && formik.errors.header ? (
                                                        <div className="text-danger">{formik.errors.header}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="description">Description</label>
                                                    <input
                                                        className="form-control"
                                                        id="description"
                                                        placeholder="Enter job description"
                                                        {...formik.getFieldProps('description')}
                                                    />
                                                    {formik.touched.description && formik.errors.description ? (
                                                        <div className="text-danger">{formik.errors.description}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="location">Location</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="location"
                                                        placeholder="Enter job location"
                                                        {...formik.getFieldProps('location')}
                                                    />
                                                    {formik.touched.location && formik.errors.location ? (
                                                        <div className="text-danger">{formik.errors.location}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="companyInfo">Company</label>
                                                    <select className="form-control" id="companyInfo" {...formik.getFieldProps('companyInfo')}>
                                                        <option value="">Select Company</option>
                                                        {companies.map((company, index) => {
                                                            return (
                                                                <option key={index} value={company.id}>{company.company_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    {formik.touched.companyInfo && formik.errors.companyInfo ? (
                                                        <div className="text-danger">{formik.errors.companyInfo}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="skillsRequirement">skills requirement</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="skillsRequirement"
                                                        placeholder="Enter skills requirements"
                                                        {...formik.getFieldProps('skillsRequirement')}
                                                    />
                                                    {formik.touched.skillsRequirement && formik.errors.skillsRequirement ? (
                                                        <div className="text-danger">{formik.errors.skillsRequirement}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="salaryAndBenefits">Salary & Benefits</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="salaryAndBenefits"
                                                        placeholder="Enter salary & benefits information"
                                                        {...formik.getFieldProps('salaryAndBenefits')}
                                                    />
                                                    {formik.touched.salaryAndBenefits && formik.errors.salaryAndBenefits ? (
                                                        <div className="text-danger">{formik.errors.salaryAndBenefits}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="applicationInstruction">Application Instruction</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="applicationInstruction"
                                                        placeholder="Enter application instruction"
                                                        {...formik.getFieldProps('applicationInstruction')}
                                                    />
                                                    {formik.touched.applicationInstruction && formik.errors.applicationInstruction ? (
                                                        <div className="text-danger">{formik.errors.applicationInstruction}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="jobType">Job Type</label>
                                                    <select className="form-control" id="jobType" {...formik.getFieldProps('jobType')}>
                                                        <option value="">Select job type</option>
                                                        <option value="Full time">Full Time</option>
                                                        <option value="Part time">Part Time</option>
                                                        <option value="Contract based">Contract based</option>
                                                    </select>
                                                    {formik.touched.jobType && formik.errors.jobType ? (
                                                        <div className="text-danger">{formik.errors.jobType}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="educationLevel">Education Level</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="educationRequirement"
                                                        placeholder="Enter application instruction"
                                                        {...formik.getFieldProps('educationRequirement')}
                                                    />
                                                    {formik.touched.educationRequirement && formik.errors.educationRequirement ? (
                                                        <div className="text-danger">{formik.errors.educationRequirement}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="experienceLevel">Experience Level</label>
                                                    <select className="form-control" id="experienceLevel" {...formik.getFieldProps('experienceLevel')}>
                                                        <option value="">Select experience level</option>
                                                        <option value="entry">Entry Level</option>
                                                        <option value="mid">Mid Level</option>
                                                        <option value="senior">Senior Level</option>
                                                    </select>
                                                    {formik.touched.experienceLevel && formik.errors.experienceLevel ? (
                                                        <div className="text-danger">{formik.errors.experienceLevel}</div>
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
        </div>
    )
}

export default AddJob
