import React, {useState} from "react";
import InputMask from 'react-input-mask';
import {Icon} from "../icon/icon";
import {iconsList} from "../../helpers/iconsList";
import mainIcon from "../../assets/main-logo.svg";
import './index.scss'
import {TextField} from "@mui/material";
import {Button, Form, message} from "antd";
import accountService from "../../services/accountService";
import {useNavigate} from "react-router-dom";
import {CONFIRM_RECOVER_CODE} from "../../constants/routeContants";
import {changeFormatPhoneNumber} from "../../helpers/changeFormatNumber";


export const SetPhoneNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const navigate = useNavigate();

    const sendPhoneNumber = async () => {
        try {
            if (phoneNumber.length > 0) {
                const formattedValue = changeFormatPhoneNumber(phoneNumber)
                const accountData = {
                    login: formattedValue,
                    langKey: 'ru'
                }
                const response = await accountService.resetPassword(accountData)
                if (response?.data?.success) {
                    localStorage.setItem('userLogin', formattedValue)
                    message.success('Запрос успешно отправлен')
                    navigate(`/${CONFIRM_RECOVER_CODE}`)
                } else {
                    console.log("response.data", response.data);
                }

            }

        } catch (e) {
            console.log("catch: ",e);
        }
    }


    return (
        <div className='recover-password-component'>

            <div className='login-page__main-logo'>
                <Icon content={mainIcon}/>
            </div>
            <form action="" className='recover-password-component__set-phone-number'>
                <Form.Item>
                    <h4 className='recover-password-component__title'>Восстановление пароля</h4>
                    <span className='recover-password-component__desc'>Укажите номер телефона для того чтобы получить проверочный код</span>
                    <br/>
                    <InputMask
                        mask={'(+998) ## ### ## ##'}
                        defaultValue={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        alwaysShowMask={true}

                        formatChars={{
                            '#': '[0-9]'
                        }}
                        placeholder='Введите ваш логин'>
                        {(inputProps) =>
                            <TextField
                                {...inputProps}
                                color={"primary"}
                                label="Ваш логин"
                                focused
                                style={{width: '100%', textAlign: 'center'}}
                                required={true}
                            />
                        }
                    </InputMask>
                </Form.Item>
                <Button
                    type={"primary"}
                    onClick={() => sendPhoneNumber()}
                    className='recover-password-component__set-phone-number__send-button'
                    size={"large"}
                    style={{borderRadius: '10px', width: '100%'}}
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
