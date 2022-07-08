import {
    ANALYSIS_ROUTE, CONFIRM_PHONE_NUMBER, CONFIRM_RECOVER_CODE, CONFIRM_RECOVER_PASSWORD,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PARTNERS_ROUTE,
} from "../constants/routeContants";
import {Home} from "../pages/home/home";
import {Analysis} from "../pages/analysis/analysis";
import {Partners} from "../pages/partners/partners";
import {Login} from "../pages/login/login";
import {SetPhoneNumber} from "../components/recoverPasswords/setPhoneNumber";
import {ConfirmCode} from "../components/recoverPasswords/confirmCode";
import {RecoverPassword} from "../components/recoverPasswords/recoverPassword";


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <Login/>,
        permissions: []
    },
]


export const recoverPasswordRoutes = [
    {
        path: CONFIRM_PHONE_NUMBER,
        component: <SetPhoneNumber/>,
        permissions: []
    },
    {
        path: CONFIRM_RECOVER_CODE,
        component: <ConfirmCode/>,
        permissions: []
    },
    {
        path: CONFIRM_RECOVER_PASSWORD,
        component: <RecoverPassword/>,
        permissions: []
    }
]

export const authRoutes = [
    {
        path: HOME_ROUTE,
        component: <Home/>,
        permission: []
    },
    {
        path: ANALYSIS_ROUTE,
        component: <Analysis/>,
        permission: []
    },
    {
        path: PARTNERS_ROUTE,
        component: <Partners/>,
        permission: []
    },
]
