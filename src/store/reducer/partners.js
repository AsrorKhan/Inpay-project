import {createSlice} from "@reduxjs/toolkit";

export const PartnersSlice = createSlice({
    name: 'partners',
    initialState: {
        age: '',
        phoneNumber: '',
        status: '',
        password: ''
    },
    reducers: {
        setPartners(state, action) {
            state.age = action.payload.age
            state.phoneNumber = action.payload.phoneNumber
            state.status = action.payload.status
            state.password = action.payload.password
        }
    }
})


export const {setPartners} = PartnersSlice.actions;
export default PartnersSlice.reducer;
