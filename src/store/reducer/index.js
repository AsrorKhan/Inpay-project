import PartnerReducer from '../reducer/partners'
import UserReducer from '../reducer/users'
import AnalysisReducer from '../reducer/analysis'
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    user: UserReducer,
    partners: PartnerReducer,
    analysis: AnalysisReducer
})
