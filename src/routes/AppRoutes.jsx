import {useSelector} from "react-redux";
import {authRoutes, publicRoutes} from "./routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {LOGIN_ROUTE} from "../constants/routeContants";


function AppRoutes() {
    const user = useSelector(state => state.user)
    console.log(user);
    return (
        <Routes>
            {user.isAuth &&
                authRoutes.map((route) => (
                    <Route key={route.path} component={route.component}/>
                ))}
            {!user.isAuth && publicRoutes.map((route) => (
                <Route key={route.path} component={route.component}/>
            ))}
            {!user.isAuth && (
                <Route path="*" element={<Navigate to={`/${LOGIN_ROUTE}`}/>}/>
            )}
        </Routes>
    )
}

export default AppRoutes
