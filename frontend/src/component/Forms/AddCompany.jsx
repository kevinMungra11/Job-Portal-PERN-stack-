import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postCompany } from '../../redux/slices/companiesSlice'
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../utils/auth';
import apiRequest from '../../services/api';

const validationSchema = Yup.object({
    companyName: Yup.string().required('Company name is required'),
    aboutCompany: Yup.string().required('About company is required'),
    CEO: Yup.string().required('CEO is required'),
    numberOfEmployee: Yup.number()
        .required('Number of employees is required')
        .positive('Number of employees must be positive'),
    companyAddress: Yup.string().required('Company address is required'),
    revenue: Yup.string().required('Revenue is required'),
    headquarter: Yup.string().required('Headquarter is required'),
    officialWebsite: Yup.string().required('Official website is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    dateOfFoundation: Yup.date().required('Date of foundation is required'),
});

const CompanyJobForm = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companies);
    const token = getToken();
    const payload = { Authorization: `Bearer ${token}` };

    const formik = useFormik({
        initialValues: {
            companyName: '',
            aboutCompany: '',
            CEO: '',
            numberOfEmployee: '',
            companyAddress: '',
            revenue: '',
            headquarter: '',
            officialWebsite: '',
            email: '',
            dateOfFoundation: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const res = await apiRequest('POST', '/company/add', values, payload);
            dispatch(postCompany(res));
            console.log(res);
            console.log(companies);
            console.log(values);
        },
    });

    return (
        <div>
            <div className='mainDiv'>
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="row gutters d-flex justify-content-center row gutters">
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <h3 className="text-center">Add Company</h3>
                            <div className="card h-100">
                                <form onSubmit={formik.handleSubmit} required>
                                    <div className="card-body">
                                        <div className="row gutters">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 className="mb-2 text-primary">Company Info</h6>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="companyName">Company name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="companyName"
                                                        placeholder="Enter name of company"
                                                        {...formik.getFieldProps('companyName')}
                                                    />
                                                    {formik.touched.companyName && formik.errors.companyName ? (
                                                        <div className="text-danger">{formik.errors.companyName}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="aboutCompany">About Company</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="aboutCompany"
                                                        placeholder="Enter details about company"
                                                        {...formik.getFieldProps('aboutCompany')}
                                                    />
                                                    {formik.touched.aboutCompany && formik.errors.aboutCompany ? (
                                                        <div className="text-danger">{formik.errors.aboutCompany}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="CEO">Description</label>
                                                    <input
                                                        className="form-control"
                                                        id="CEO"
                                                        placeholder="Enter CEO name"
                                                        {...formik.getFieldProps('CEO')}
                                                    />
                                                    {formik.touched.CEO && formik.errors.CEO ? (
                                                        <div className="text-danger">{formik.errors.CEO}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="numberOfEmployee">Number of employee</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="numberOfEmployee"
                                                        placeholder="Enter number of employee"
                                                        {...formik.getFieldProps('numberOfEmployee')}
                                                    />
                                                    {formik.touched.numberOfEmployee && formik.errors.numberOfEmployee ? (
                                                        <div className="text-danger">{formik.errors.numberOfEmployee}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="companyAddress">Company address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="companyAddress"
                                                        placeholder="Enter company address"
                                                        {...formik.getFieldProps('companyAddress')}
                                                    />
                                                    {formik.touched.companyAddress && formik.errors.companyAddress ? (
                                                        <div className="text-danger">{formik.errors.companyAddress}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="revenue">Revenue</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="revenue"
                                                        placeholder="Enter revenue of company"
                                                        {...formik.getFieldProps('revenue')}
                                                    />
                                                    {formik.touched.revenue && formik.errors.revenue ? (
                                                        <div className="text-danger">{formik.errors.revenue}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="headquarter">Headquarter</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="headquarter"
                                                        placeholder="Enter headquarter"
                                                        {...formik.getFieldProps('headquarter')}
                                                    />
                                                    {formik.touched.headquarter && formik.errors.headquarter ? (
                                                        <div className="text-danger">{formik.errors.headquarter}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="officialWebsite">Official web of company</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="officialWebsite"
                                                        placeholder="Enter official website"
                                                        {...formik.getFieldProps('officialWebsite')}
                                                    />
                                                    {formik.touched.officialWebsite && formik.errors.officialWebsite ? (
                                                        <div className="text-danger">{formik.errors.officialWebsite}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Enter email"
                                                        {...formik.getFieldProps('email')} />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div className="text-danger">{formik.errors.email}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="dateOfFoundation">Date of foundation</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="dateOfFoundation"
                                                        placeholder="Enter date of foundation"
                                                        {...formik.getFieldProps('dateOfFoundation')}
                                                    />
                                                    {formik.touched.dateOfFoundation && formik.errors.dateOfFoundation ? (
                                                        <div className="text-danger">{formik.errors.dateOfFoundation}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group">
                                                    <input type="submit" className='btn btn-primary mt-3' value='Submit' />
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
    );
};

export default CompanyJobForm;
