import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./store/store";
import App from './App';
import './index.scss';
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ErrorBoundary>
            <Router>
                <App/>
            </Router>
        </ErrorBoundary>
    </Provider>
);
