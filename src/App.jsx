import React from "react";
import './App.scss';
import {Layout} from "antd";
import HeaderComponent from "./components/header/headerComponent";
import {useSelector} from "react-redux";
import {ContentComponent} from "./components/content/contentComponent";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const user = useSelector(state => state.user);
    return (
        <>
            <Layout className="App">
                {user.isAuth && <HeaderComponent/>}
                <AppRoutes/>
            </Layout>
        </>
    );
}

export default App;
