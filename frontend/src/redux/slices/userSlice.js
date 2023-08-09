import { createSlice } from '@reduxjs/toolkit';
import { isAdmin, isAuthenticated } from '../../utils/auth';

const initialState = {
    isSignedIn: isAuthenticated(),
    isAdmin: isAdmin(),
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser(state, action) {
            state.isSignedIn = isAuthenticated();
            state.isAdmin = isAdmin();
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;