import PartnerReducer from '../reducer/partners'
import UserReducer from '../reducer/users'
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    user: UserReducer,
    partners: PartnerReducer
})
