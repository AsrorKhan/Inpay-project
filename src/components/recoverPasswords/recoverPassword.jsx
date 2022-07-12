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
    const navigate = useNavigate()

    const setUserNewPassword = (passwordValue) => {
        setNewUserPassword(passwordValue)
        if (passwordValue.length > 4) {
            setDisableSendButton(false)
        } else setDisableSendButton(true)
    }

    const passwordStrength = (event) => {
        const passwordValue = event.target.value;
        const passwordLength = passwordValue.length;
        const poorPasswordRegExp = new RegExp(/[a-z]/);
        const normalPasswordRegExp = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
        const strongPasswordRegExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        const whitespaceRegExp = /^$|\s+/;

        const poorPassword = poorPasswordRegExp.test(passwordValue);
        const weakPassword = normalPasswordRegExp.test(passwordValue);
        const strongPassword = strongPasswordRegExp.test(passwordValue);
        const whiteSpace = whitespaceRegExp.test(passwordValue);
        if (passwordValue === '') {
            setPasswordErr('Пароль не должен быть пустой')
        } else {
            if (whiteSpace) {
                setPasswordErr("Запрешено использовать пустое место")
            }
            if (passwordLength <= 5 && (poorPassword || weakPassword || strongPassword)) {
                setPasswordIsStrong(true)
                setPasswordErr("Бедный пароль");
            } else {
                setPasswordIsPoor(false)
            }
            if (passwordLength <= 6 && poorPassword && (weakPassword || strongPassword)) {
                setPasswordIsNormal(true)
                setPasswordErr("Слабый пароль");

            } else {
                setPasswordIsNormal(false)
            }
            if (passwordLength <= 8 && (poorPassword && weakPassword) && strongPassword) {
                setPasswordIsStrong(true)
                setPasswordErr("Надежный пароль");
            } else {
                setPasswordIsPoor(false)
            }
        }
    }


    const handleKeyDown = e => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    const changePassword = async () => {
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
                    onInput={passwordStrength}
                />
                {/*<span>{passwordError}</span>*/}
                <div className="recover-password-component__confirm-recover-code__password-checker">
                    {passwordIsPoor ? <div className='password poor'></div> : ''}
                    {passwordIsNormal ? <div className='password norman'></div> : ''}
                    {passwordIsStrong ? <div className='password strong'></div> : ''}

                </div>
                <br/>
                <Checkbox defaultChecked color="success"
                          className='recover-password-component__confirm-recover-code__remember'>
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
