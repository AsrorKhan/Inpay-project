import React from "react";
import './App.scss';
import {Layout} from "antd";
import HeaderComponent from "./components/header/headerComponent";
import AppRoutes from "./routes/AppRoutes";
import {useSelector} from "react-redux";
import {ContentComponent} from "./components/content/contentComponent";

function App() {
    const user = useSelector(state => state.user);
    return (
        <Layout className="App">
            <HeaderComponent/>
            <ContentComponent/>
        </Layout>
    );
}

export default App;
