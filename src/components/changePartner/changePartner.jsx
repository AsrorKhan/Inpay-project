import React from 'react';
import {Button, Drawer, Form, Input} from "antd";
import './changePartner.scss'
import {CheckOutlined, DeleteOutlined} from "@ant-design/icons";


export const ChangePartner = ({visible, onClose}) => {
    return (
        <Drawer visible={visible} onClose={onClose} className='change-partner-component'>
            <div className="change-partner-component__header-logo">
                <div className="change-partner-component__header-logo-merchant-logo"></div>
            </div>
            <form action="" className='change-partner-component__form'>
                <div className="change-partner-component__form__form-elements">
                    <Form.Item>
                        <h2 className='change-partner-component__form__title'>Изменить данные</h2>
                    </Form.Item>
                    <Form.Item className='add-partner-form__partner-name'>
                        <label htmlFor="partnerName">Наименования торговой точки</label>
                        <Input placeholder='Введите наименования торговой точки' id='partnerName'/>
                    </Form.Item>
                    <Form.Item className='add-partner-form__partner-phone-number'>
                        <label htmlFor="partnerName">Номер телефона</label>
                        <Input placeholder='Введите номер телефона' id='partnerName'/>
                    </Form.Item>
                </div>
                <div className="change-partner-component__form__form-actions">
                    <Button type={"primary"} danger> <DeleteOutlined/>Удалить партнера</Button>
                    <Button type={"primary"}><CheckOutlined/> Сохранить</Button>
                </div>
            </form>
        </Drawer>
    );
};

