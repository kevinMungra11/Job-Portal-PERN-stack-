import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiRequest from '../../services/api';

export const fetchJobs = createAsyncThunk("fetchJobs", async ({ search, page, size }) => {
    const endpoint = ((search) && (search !== '')) ? '/job/search' : '/job/all';
    return await apiRequest('GET', endpoint, '', {}, { search, page, size });
});

export const addJob = createAsyncThunk("addJob", async (job, header) => {
    return (await apiRequest('POST', '/job/add', job, header))
})

const initialState = {
    count: 0,
    jobs: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJobs(state, action) {
            state.jobs = [...state.jobs, action.payload];
        },
        postJob(state, action) {
            state.count = ++state.count;
            state.totalPages = Math.ceil(state.count / 8);
            if (state.jobs.length < 8) state.jobs = [...state.jobs, action.payload];
        },
        deleteJob(state, action) {
            state.jobs = state.jobs.filter(job => job.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.count;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.jobs = action.payload.rows;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log(state.error);
            })
            .addCase(addJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(addJob.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log(state.error);
            })
    }
});

export const { setJobs, postJob } = jobsSlice.actions;

export default jobsSlice.reducer;