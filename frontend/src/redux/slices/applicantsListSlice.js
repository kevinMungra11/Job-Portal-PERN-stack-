import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../services/api';
import { enableMapSet } from 'immer';

enableMapSet();

export const applicantsList = createAsyncThunk('applicantsList', async (header, params) => {
    return (await apiRequest('GET', '/user/all/jobs', '', header, params));
});

const initialState = {
    count: 0,
    jobs: [],
    user: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1
};

const applicantsListSlice = createSlice({
    name: 'applicantsList',
    initialState,
    reducers: {
        setApplicantsList(state, action) {
            state.applicantsList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(applicantsList.pending, (state) => {
                state.loading = true;
            })

            .addCase(applicantsList.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.count;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                const tempUser = []
                const tempJob = []
                action.payload.rows.forEach((data) => {
                    const { id, first_name, last_name, user_name, bio, title, gender, email } = data;
                    const jobInfos = data.Job_Infos;
                    if (jobInfos.length > 0) {
                        tempJob.push([id, ...jobInfos])
                        tempUser.push([id, { first_name, last_name, user_name, bio, title, gender, email }])
                    }
                })
                state.user = tempUser;
                state.jobs = tempJob;
            })
            .addCase(applicantsList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log(state.error);
            })
    }
});

export const { setApplicantsList, loadApplicants } = applicantsListSlice.actions;

export default applicantsListSlice.reducer;
