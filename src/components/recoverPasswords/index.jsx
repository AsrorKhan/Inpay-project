import React from 'react';
import {Outlet} from "react-router-dom";
import './index.scss'
import {Icon} from "../icon/icon";
import mainIcon from "../../assets/main-logo.svg";
import {iconsList} from "../../helpers/iconsList";
const RecoverPasswordComponent = () => {
    return (
        <div className='recover-password-component'>
            <div></div>
            <div className='login-page__main-logo'>
                <Icon content={mainIcon}/>
            </div>

            <Outlet/>

            <div className='main-anorbank-logo'>
                <Icon content={iconsList.mainAnorbankLogo}/>
            </div>
        </div>
    );
};

export default RecoverPasswordComponent;
