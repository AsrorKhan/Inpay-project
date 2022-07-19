import React, {useState} from 'react';
import {Button, Drawer, Form} from "antd";
import './changePartner.scss'
import {CheckOutlined, DeleteOutlined} from "@ant-design/icons";
import {TextField} from "@mui/material";
import InputMask from "react-input-mask";
import {Icon} from "../icon/icon";
import {iconsList} from "../../helpers/iconsList";
import partnersService from "../../services/partnersService";


export const ChangePartner = ({visible, onClose, moreInformation}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [modifiedPartnerName, setModifiedPartnerName] = useState('');
    const [modifiedPartnerPercent, setModifiedPartnerPercent] = useState('');


    const changePartnerData = async () => {
        let modifiedPartnerData = {
            userId: moreInformation?.id,
            fullName: modifiedPartnerName,
            percent: modifiedPartnerPercent
        }
        const response = await partnersService.changePartnerData(modifiedPartnerData)
        console.log(response.data);

    }

    const setPartnerPercent = (event) => {
        let value = event.target.value;
        if (value.length > 0) {
            setModifiedPartnerPercent(value);
        }
    }
    const handleKeyDown = event => {
        if (event.key === " ") {
            event.preventDefault();
        }
    };
    const handleKeyPress = event => {
        let withoutString = new RegExp(/[^\d\.]/g)
        let key = String.fromCharCode(!event.charCode ? event.which : event.charCode)
        if (withoutString.test(key)) {
            event.preventDefault();
            setErrorMessage('Пример: 12, 17.5, 20.0')
        } else {
            setErrorMessage('');
        }
    }
    return (
        <Drawer visible={visible} onClose={onClose} className='change-partner-component'>
            <div className="change-partner-component__logo">
                <Icon content={iconsList.moreInformationHeaderLogo} alt='partner-logo'/>
            </div>
            <form action="" className='change-partner-component__form'>

                <div className="change-partner-component__form__form-elements">
                    <Form.Item>
                        <h2 className='change-partner-component__form__title'>Изменить данные</h2>
                    </Form.Item>
                    <Form.Item className='add-partner-form__partner-name'>
                        <TextField
                            label='Наименование торговой точки '
                            value={modifiedPartnerName}
                            focused
                            type='text'
                            style={{width: '100%', textAlign: 'center'}}
                            onChange={(e) => setModifiedPartnerName(e.target.value)}
                            margin={"normal"}
                            color={'info'}
                            required={true}
                        />
                    </Form.Item>
                    <Form.Item className='add-partner-form__partner-phone-number'>
                        {/*<InputMask*/}
                        {/*    mask={'(+998) ## ### ## ##'}*/}
                        {/*    // defaultValue={phoneNumber}*/}
                        {/*    // onChange={(e) => setPhoneNumber(e.target.value)}*/}
                        {/*    alwaysShowMask={true}*/}

                        {/*    formatChars={{*/}
                        {/*        '#': '[0-9]'*/}
                        {/*    }}*/}
                        {/*    placeholder='Номер телефона'>*/}
                        {/*    {(inputProps) =>*/}
                        {/*        <TextField*/}
                        {/*            {...inputProps}*/}
                        {/*            color={"primary"}*/}
                        {/*            label="Ваш логин"*/}
                        {/*            focused*/}
                        {/*            style={{width: '100%', textAlign: 'center'}}*/}
                        {/*            required={true}*/}
                        {/*        />*/}
                        {/*    }*/}
                        {/*</InputMask>*/}
                        <TextField
                            aria-readonly={true}
                            label="Ваш логин"
                            style={{width: '100%', textAlign: 'center'}}
                            value={`+${moreInformation?.login}`}
                            disabled={true}
                            focused
                            required={true}
                        />
                    </Form.Item>
                    <Form.Item>
                        <TextField
                            required={true}
                            onKeyDown={handleKeyDown}
                            onKeyPress={handleKeyPress}
                            label='% Вставка по продукту'
                            focused
                            style={{width: '100%', textAlign: 'center'}}
                            onChange={(event) => setPartnerPercent(event)}
                            value={modifiedPartnerPercent}
                        />
                        <span className='add-partner__form__partner-percent__error-message'>{errorMessage}</span>
                    </Form.Item>
                </div>
                <div className="change-partner-component__form__form-actions">
                    <Button
                        type={"primary"}
                        className='change-partner-component__form-actions__buttons__delete'
                        danger
                    >
                        <DeleteOutlined/>
                        Удалить партнера
                    </Button>
                    <Button
                        type={"primary"}
                        className='change-partner-component__form-actions-buttons__save'
                        onClick={() => changePartnerData()}
                    >
                        <CheckOutlined/>
                        Сохранить
                    </Button>
                </div>
            </form>
        </Drawer>
    );
};

