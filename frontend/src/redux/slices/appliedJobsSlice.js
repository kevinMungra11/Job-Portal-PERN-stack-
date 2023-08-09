import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../services/api';

export const fetchAppliedJobList = createAsyncThunk("fetchAppliedJobList", async (header) => {
    const response = await apiRequest('GET', '/user/job', '', header);
    return response;
});

export const applyForAJob = createAsyncThunk('applyForAJob', async (header) => {
    const response = await apiRequest('/api/applied-jobs/list', header);
    return response;
});


const initialState = {
    loading: false,
    appliedJobs: [],
    error: null
};

const appliedJobsSlice = createSlice({
    name: 'appliedJobs',
    initialState,
    reducers: {
        setAppliedJobs(state, action) {
            state.appliedJobs = action.payload;
        },
        applyForJob(state, action) {
            state.appliedJobs.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppliedJobList.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchAppliedJobList.fulfilled, (state, action) => {
                state.loading = false;
                state.appliedJobs = action.payload.Job_Infos
            })
            .addCase(fetchAppliedJobList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log(state.error);
            })
            .addCase(applyForAJob.pending, (state) => {
                state.loading = true;
            })

            .addCase(applyForAJob.fulfilled, (state, action) => {
                state.loading = false;
                state.appliedJobs = [action.payload]
            })
            .addCase(applyForAJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log(state.error);
            })
    }
});

export const { setAppliedJobs, applyForJob } = appliedJobsSlice.actions;

export default appliedJobsSlice.reducer;
