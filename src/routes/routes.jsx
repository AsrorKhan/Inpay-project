import {ANALYSIS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PARTNERS_ROUTE} from "../constants/routeContants";
import {Home} from "../pages/home/home";
import {Analysis} from "../pages/analysis/analysis";
import {Partners} from "../pages/partners/partners";
import {Login} from "../pages/login/login";


export const authRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <Login/>
    }
]

export const publicRoutes = [
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
