/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, isAdmin, isAuthenticated } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { fetchCompanies } from '../../redux/slices/companiesSlice';
import { fetchJobs } from '../../redux/slices/jobSlice';

const AdminRoute = ({ component: Component, ...rest }) => {
    const token = getToken();
    const payload = { Authorization: `Bearer ${token}` }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchJobs({ page: 0, size: 8 }));
        dispatch(fetchCompanies(payload));
    })

    if (isAuthenticated() && isAdmin()) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/user/signin" />
    }
}
export default AdminRoute;