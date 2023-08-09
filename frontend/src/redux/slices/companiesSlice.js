import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../services/api';

export const fetchCompanies = createAsyncThunk("fetchCompanies", async (header) => {
    return (await apiRequest('GET', '/company/all', '', header));
})

const initialState = {
    count: 0,
    companies: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1
}

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompanies(state, action) {
            state.companies = [...state.companies, action.payload];
        },
        postCompany(state, action) {
            state.count = ++state.count;
            state.totalPages = Math.ceil(state.count / 8);
            if (state.companies.length < 8) state.companies = [...state.companies, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.count;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.companies = action.payload.rows;
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log(state.error);
            })
    }
});

export const { setCompanies, postCompany } = companiesSlice.actions;

export default companiesSlice.reducer;
