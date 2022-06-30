import {useSelector} from "react-redux";
import {authRoutes, publicRoutes} from "./routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {
    CONFIRM_RECOVER_CODE,
    CONFIRM_RECOVER_PASSWORD,
    LOGIN_ROUTE,
    RECOVER_PASSWORD_MAIN_ROUTE
} from "../constants/routeContants";
import {SetPhoneNumber} from "../components/recoverPasswords/setPhoneNumber";
import {ConfirmCode} from "../components/recoverPasswords/confirmCode";
import {RecoverPassword} from "../components/recoverPasswords/recoverPassword";


function AppRoutes() {
    const user = useSelector(state => state.user)
    return (
        <div>
            <Routes>
                {user.isAuth &&
                    <Route path={RECOVER_PASSWORD_MAIN_ROUTE} element={<SetPhoneNumber/>}>
                        <Route path={CONFIRM_RECOVER_CODE} element={<ConfirmCode/>}/>
                        <Route path={CONFIRM_RECOVER_PASSWORD} element={<RecoverPassword/>}/>
                    </Route>
                }
                {user.isAuth &&
                    authRoutes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component}/>
                    ))
                }
                {!user.isAuth &&
                    publicRoutes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component}/>
                    ))}
                {!user.isAuth && (
                    <Route path="*" element={<Navigate to={`/${LOGIN_ROUTE}`}/>}/>
                )}


                {/*{user.isAuth &&*/}
                {/*    recoverPasswordRoutes?.map((route)=> (*/}
                {/*        <Route key={route.path} path={route.path} element={route.component}>*/}
                {/*            {recoverPasswordRoutes?.childRoutes?.map((childRoute)=> (*/}
                {/*                <Route key={childRoute.path} path={childRoute.path} element={childRoute.component}/>*/}
                {/*            ))}*/}
                {/*        </Route>*/}
                {/*    ))*/}
                {/*}*/}
            </Routes>
        </div>

    )
}

export default AppRoutes
