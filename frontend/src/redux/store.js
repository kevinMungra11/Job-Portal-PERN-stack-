import { configureStore } from '@reduxjs/toolkit';
import jobsReducer, { setJobs, postJob } from './slices/jobSlice';
import companiesReducer, { setCompanies } from './slices/companiesSlice';
import appliedJobsReducer, { setAppliedJobs, applyForJob } from './slices/appliedJobsSlice';
import applicantsListReducer, { setApplicantsList, loadApplicants } from './slices/applicantsListSlice';
import thunk from 'redux-thunk';
import userReducer, { setUser } from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        jobs: jobsReducer,
        companies: companiesReducer,
        appliedJobs: appliedJobsReducer,
        applicantsList: applicantsListReducer,
    },
    middleware: [thunk]
});

export {
    setJobs,
    postJob,
    setCompanies,
    setAppliedJobs,
    applyForJob,
    setApplicantsList,
    loadApplicants,
    setUser
};

export default store;
