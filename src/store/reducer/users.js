import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        login: '',
        key: '',
        remember: false,
        id_token: '',
        expires_in: '',
        refresh_token: '',
        scope: [],
        token_type: '',
        isAuth: false,
        forgotPassword: true
    },
    reducers: {
        setUser(state, action) {
            state.username = action.payload.username;
            state.remember = action.payload.remember;
            state.login = action.payload.login;
            state.id_token = action.payload.id_token;
            state.expires_in = action.payload.expires_in;
            state.refresh_token = action.payload.refresh_token;
            state.scope = action.payload.scope;
            state.token_type = action.payload.token_type;
            state.isAuth = action.payload.isAuth;
        },
        setUserConfirmCode(state, action) {
            state.login = action.payload.login;
            state.key = action.payload.key;
        },
        resetUserData(state) {
            state.username = '';
            state.remember = '';
            state.id_token = '';
            state.refresh_token = '';
            state.scope = [];
            state.token_type = '';
            state.isAuth = false;
            state.forgotPassword = false
        },

    },
});

export const { setUser, resetUserData, forgotPassword } = userSlice.actions;

export default userSlice.reducer;
