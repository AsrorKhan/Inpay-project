import {useSelector} from "react-redux";
import {authRoutes, publicRoutes, recoverPasswordRoutes} from "./routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {CONFIRM_PHONE_NUMBER, LOGIN_ROUTE,} from "../constants/routeContants";


function AppRoutes() {
    const user = useSelector(state => state.user)
    const forgotPassword = useSelector(state => state.user)
    return (
        <div>
            <Routes>
                {user.isAuth &&
                    authRoutes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component}/>
                    ))
                }
                {
                    recoverPasswordRoutes.map((route)=> (
                        <Route key={route.path} path={route.path} element={route.component}>
                        </Route>
                    ))
                }
                {!user.isAuth &&
                    publicRoutes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component}/>
                    ))}
                {!user.isAuth &&
                    (<Route path="*" element={<Navigate to={`/${LOGIN_ROUTE}`}/>}/>)
                }
            </Routes>
        </div>

    )
}

export default AppRoutes
