import React from 'react';
import {Button, Drawer, Form} from "antd";
import './changePartner.scss'
import {CheckOutlined, DeleteOutlined} from "@ant-design/icons";
import {TextField} from "@mui/material";
import InputMask from "react-input-mask";
import {Icon} from "../icon/icon";
import {iconsList} from "../../helpers/iconsList";



export const ChangePartner = ({visible, onClose}) => {
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
                            label='Наименования торговой точки'
                            focused
                            type='text'
                            style={{width: '100%', textAlign: 'center'}}
                            // onChange={(e) => setPartnerName(e.target.value)}
                            margin={"normal"}
                            color={'info'}
                            required={true}
                        />
                    </Form.Item>
                    <Form.Item className='add-partner-form__partner-phone-number'>
                        <InputMask
                            mask={'(+998) ## ### ## ##'}
                            // defaultValue={phoneNumber}
                            // onChange={(e) => setPhoneNumber(e.target.value)}
                            alwaysShowMask={true}

                            formatChars={{
                                '#': '[0-9]'
                            }}
                            placeholder='Номер телефона'>
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
                    <Form.Item>
                        <TextField
                            label='% вставка'
                            focused
                            type='text'
                            style={{width: '100%', textAlign: 'center'}}
                            // onChange={(e) => setPartnerName(e.target.value)}
                            margin={"normal"}
                            color={'info'}
                            required={true}
                        />
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
                    >
                        <CheckOutlined/>
                        Сохранить
                    </Button>
                </div>
            </form>
        </Drawer>
    );
};

