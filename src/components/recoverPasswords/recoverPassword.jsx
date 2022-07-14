import React, {useState} from "react";
import {TextField} from "@mui/material";
import {Icon} from "../icon/icon";
import {iconsList} from "../../helpers/iconsList";
import mainIcon from "../../assets/main-logo.svg";
import './index.scss'
import {Button, Checkbox, message} from "antd";
import accountService from "../../services/accountService";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../constants/routeContants";

export const RecoverPassword = () => {
    const [remember, setRemember] = useState(false);
    const [passwordIsPoor, setPasswordIsPoor] = useState(false);
    const [passwordIsNormal, setPasswordIsNormal] = useState(false);
    const [passwordIsStrong, setPasswordIsStrong] = useState(false);
    const [disableSendButton, setDisableSendButton] = useState(true)
    const [passwordError, setPasswordErr] = useState("");
    const [newUserPassword, setNewUserPassword] = useState('');
    const [passwordIndicatorText, setPasswordIndicatorText] = useState('')
    const navigate = useNavigate()

    const setUserNewPassword = (passwordValue) => {
        try {
            setNewUserPassword(passwordValue)
            const poorPasswordRegExp = new RegExp(/[0-9]/g);
            const normalPasswordRegExp = new RegExp(/[a-zA-ZА-Я]/g)
            const strongPasswordRegExp = new RegExp(/[!@#$%^&*]/g)
            if (passwordValue.length < 4) {
                setDisableSendButton(true)
                setPasswordErr("Пароль должен быть минимум 4 символа");
            } else {
                setDisableSendButton(false)
                setPasswordErr("");
            }
            if (passwordValue.length > 3 && poorPasswordRegExp.test(passwordValue)) {
                setPasswordIsPoor(true)
                setPasswordIndicatorText('Пароль слабый')
            } else {
                setPasswordIsPoor(false)
                setPasswordIndicatorText('')
            }
            if (passwordValue.length > 6 && (passwordIsPoor && (normalPasswordRegExp.test(passwordValue)))) {
                setPasswordIsNormal(true)
                setPasswordIndicatorText('Пароль средний')
            } else {
                setPasswordIsNormal(false)
                setPasswordIndicatorText('')
            }
            if (passwordValue.length > 8 && (normalPasswordRegExp.test(passwordValue) && strongPasswordRegExp.test(passwordValue))) {
                setPasswordIsStrong(true)
                setPasswordIndicatorText('Пароль надежный')
            } else {
                setPasswordIsStrong(false)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleKeyDown = e => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    const changePassword = async () => {
        try {
            const login = localStorage.getItem('userLogin')
            const key = localStorage.getItem('verificationCode');
            const newPassword = newUserPassword;
            const recoverPasswordData = {
                login,
                key,
                newPassword
            }
            const response = await accountService.recoverPassword(recoverPasswordData)
            if (response.data.success) {
                message.success('Пароль изменилась успешно');
                navigate(`/${LOGIN_ROUTE}`)
                localStorage.clear()
            }
        } catch (e) {
            console.log(e);
        }
    }

    const detectCopyPaste = (event) => {
        event.preventDefault();
        message.warning('Вы должны написать вручную!!!')
    }
    const detectCopy = (event) => {
        message.warning('Вы не можете копировать пароль!!!')
        event.preventDefault();
    }

    return (
        <div className='recover-password-component'>
            <div className='login-page__main-logo'>
                <Icon content={mainIcon}/>
            </div>
            <form action="" className='recover-password-component__confirm-recover-code'>
                <TextField
                    onKeyDown={handleKeyDown}
                    type={"password"}
                    label="Новый пароль"
                    color="primary"
                    focused
                    style={{width: '100%'}}
                    onChange={(e) => setUserNewPassword(e.target.value)}
                    defaultValue={newUserPassword}
                    onPaste={(e) => detectCopyPaste(e)}
                    onCopy={(e) => detectCopy(e)}
                    onCopyCapture={detectCopy}
                />
                {/*<span>{passwordError}</span>*/}
                <div className="recover-password-component__confirm-recover-code__password-checker">
                    <div className='recover-password-component__confirm-recover-code__password-checker__indicator'>
                        {passwordIsPoor ? <div className='password poor'></div> : ''}
                        {passwordIsNormal ? <div className='password normal'></div> : ''}
                        {passwordIsStrong ? <div className='password strong'></div> : ''}
                    </div>
                    <span
                        className='recover-password-component__confirm-recover-code__password-checker__indicator-message'>
                        {passwordIndicatorText}
                    </span>
                </div>
                <div>
                    <span
                        className='recover-password-component__confirm-recover-code__password-checker__length-error'>{passwordError}
                    </span>
                </div>
                <br/>
                <Checkbox
                    defaultChecked color="success"
                    className='recover-password-component__confirm-recover-code__remember'
                    onChange={(e) => setRemember(e.target.value)}
                >
                    Запомните меня
                </Checkbox>
                <Button
                    type={"primary"}
                    className='recover-password-component__confirm-recover-code__send-button'
                    size={"large"}
                    style={{borderRadius: '10px', width: '100%'}}
                    disabled={disableSendButton}
                    onClick={() => changePassword()}
                >
                    Отправить
                </Button>
            </form>
            <div></div>
            <div className='main-anorbank-logo'>
                <Icon content={iconsList.mainAnorbankLogo}/>
            </div>
        </div>
    )
}
