import React, {useState} from 'react';
import ReactCodeInput from 'react-verification-code-input';
import './index.scss'
import {Icon} from "../icon/icon";
import mainIcon from "../../assets/main-logo.svg";
import {iconsList} from "../../helpers/iconsList";
import {Button} from "antd";
import accountService from "../../services/accountService";
import {useNavigate} from "react-router-dom";
import {CONFIRM_RECOVER_PASSWORD} from "../../constants/routeContants";

export const ConfirmCode = () => {
    const verificationCodeLength = 5;
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate()
    const sendVerificationCode = async () => {
        try {
            const login = localStorage.getItem('login');
            const verificationData = {
                login,
                key: verificationCode
            }
            const response = await accountService.checkRecoverCode(verificationData)
            if(response.data.success) {
                localStorage.setItem('verificationCode', verificationCode)
                navigate(`/${CONFIRM_RECOVER_PASSWORD}`)
            }
        } catch (e) {
            console.log(e);
        }
    }
    console.log("verificationCode", verificationCode);

    return (
        <div className='recover-password-component'>
            <div className='login-page__main-logo'>
                <Icon content={mainIcon}/>
            </div>
            <div className="recover-password-component__set-phone-number">
                <div>
                    <h4 className='recover-password-component__title'>Восстановление пароля</h4>
                    <span className='recover-password-component__desc'>
                        Мы отправили код подтверждения на указанный вами номер телефона
                    </span>
                </div>
                <ReactCodeInput
                    fields={verificationCodeLength}
                    values={verificationCode}
                    onChange={(e) => setVerificationCode(e)}
                />
                <Button
                    type={"primary"}
                    style={{borderRadius: '10px', width: '100%'}}
                    className='recover-password-component__set-phone-number__send-button'
                    size={"large"}
                    onClick={() => sendVerificationCode()}
                >
                    Отправить
                </Button>
            </div>
            <div></div>
            <div className='main-anorbank-logo'>
                <Icon content={iconsList.mainAnorbankLogo}/>
            </div>
        </div>
    );
};

