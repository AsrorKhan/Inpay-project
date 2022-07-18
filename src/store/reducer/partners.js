import {createSlice} from "@reduxjs/toolkit";

export const PartnersSlice = createSlice({
    name: 'partners',
    initialState: {
        content: [],
    },
    reducers: {
        setPartners(state, action) {
            state.content = action.payload.content
        }
    }
})


export const {setPartners} = PartnersSlice.actions;
export default PartnersSlice.reducer;
