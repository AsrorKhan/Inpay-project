import './App.scss';
import {Layout} from "antd";
import HeaderComponent from "./components/header/headerComponent";
import {ContentComponent} from "./components/content/contentComponent";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <div className="App">
            <Layout>
                <HeaderComponent/>
                <AppRoutes/>
            </Layout>
        </div>
    );
}

export default App;
