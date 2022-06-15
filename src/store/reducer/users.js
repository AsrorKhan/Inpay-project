import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        access_token: '',
        refresh_token: '',
        scope: [],
        token_type: '',
        isAuth: true,
    },
    reducers: {
        setUser(state, action) {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.scope = action.payload.scope;
            state.token_type = action.payload.token_type;
            state.isAuth = action.payload.isAuth;
        },
        resetUserData(state) {
            state.access_token = '';
            state.refresh_token = '';
            state.scope = [];
            state.token_type = '';
            state.isAuth = false;
        },
    },
});

export const { setUser, resetUserData } = userSlice.actions;

export default userSlice.reducer;
