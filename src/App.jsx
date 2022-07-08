import React, {useEffect} from "react";
import './App.scss';
import {Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import {resetUserData, setUser} from "./store/reducer/users";
import eventBus from "./helpers/eventBus";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "./constants/routeContants";

function App() {
    const dispatch = useDispatch();
    const auth_token = localStorage.getItem('auth_token')
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        eventBus.on('logout', () => {
            localStorage.clear();
            dispatch(resetUserData());
        });
        return () => {
            eventBus.remove('logout', () => {
            });
        };
        const endDate = new Date(`${localStorage.getItem('token_expires_in')}`);
        const currentDate = new Date();
        if (currentDate.getDate() === endDate.getDate()) {
            navigate(`/${LOGIN_ROUTE}`)
        }
    }, [])

    if (auth_token && !user.isAuth) {
        dispatch(
            setUser({
                ...auth_token,
                isAuth: true,
            })
        );
    }
    return (
        <Layout className="App">
            <AppRoutes/>
        </Layout>
    );
}

export default App;
