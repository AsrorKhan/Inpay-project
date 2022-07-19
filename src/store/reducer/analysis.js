import {createSlice} from "@reduxjs/toolkit";

export const AnalysisSlice = createSlice({
    name: 'analysis',
    initialState: {
        content: [],
    },
    reducers: {
        setAnalysis(state, action) {
            state.content = action.payload.content
        }
    }
})


export const {setAnalysis} = AnalysisSlice.actions;
export default AnalysisSlice.reducer;
