import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCompanies } from '../redux/slices/companiesSlice'
import { getToken } from '../utils/auth'
import ListJobs from '../component/Admin/ListJobs'
import { fetchJobs } from '../redux/slices/jobSlice'

const Admin = () => {
    const dispatch = useDispatch();
    const companies = useSelector(state => state.companies);
    const token = getToken();
    const payload = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        dispatch(fetchCompanies(payload));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchJobs(payload));
    }, [dispatch]);

    console.log(companies)
    return (
        <div>
            <ListJobs />
        </div>
    )
}

export default Admin
