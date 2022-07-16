import {createSlice} from "@reduxjs/toolkit";

export const PartnersSlice = createSlice({
    name: 'partners',
    initialState: {
        id: '',
        login: '',
        firstName: '',
        lastName: '',
        percent: '',
        email: '',
        imageUrl: '',
        activated: false,
        langKey: '',
        createdBy: '',
        createdDate: '',
        lastModifiedBy: '',
        lastModifiedDate: '',
        authorities: []
    },
    reducers: {
        setPartners(state, action) {
            state.id = action.payload.id
            state.login = action.payload.login
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.percent = action.payload.percent
            state.email = action.payload.email
            state.imageUrl = action.payload.imageUrl
            state.activated = action.payload.activated
            state.langKey = action.payload.langKey
            state.createdBy = action.payload.createdBy
            state.createdDate = action.payload.createdDate
            state.lastModifiedBy = action.payload.lastModifiedBy
            state.lastModifiedDate = action.payload.lastModifiedDate
            state.authorities = action.payload.authorities
        }
    }
})


export const {setPartners} = PartnersSlice.actions;
export default PartnersSlice.reducer;
