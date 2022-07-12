import React, {useRef, useState} from 'react';
import {Button, Drawer, Form, message} from "antd";
import {Icon} from "../icon/icon";
import {CheckOutlined, PlusOutlined} from '@ant-design/icons';
import iconPlus from '../../assets/icons/icon-plus.svg'
import './addPartner.scss';
import {TextField} from "@mui/material";
import InputMask from "react-input-mask";
import {changeFormatPhoneNumber} from "../../helpers/changeFormatNumber";
import userService from "../../services/userService";

export const AddPartner = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [imageUrl, setImageUrl] = useState();
    const [partnerName, setPartnerName] = useState('');
    const [partnerPhoneNumber, setPartnerPhoneNumber] = useState('');
    const [disableSendButton, setDisableSendButton] = useState(true)
    const [userLogo, setUserLogo] = useState({})
    const filePicker = useRef(null)
    const onClose = () => {
        setVisible(false);
    };
    const showDrawer = () => {
        setVisible(true);
    };
    const handlePick = () => {
        filePicker.current.click()
    }

    const handleChangeUpload = (event) => {
        try {
            let value = event.target.files[0];
            setUserLogo(value)
        } catch (e) {
            console.log(e);
        }
    }

    const handleUploadLogo = async () => {
        if (!userLogo) {
            message.error('Пожалуйста устоновите логотип')
            return;
        }
        let formData = new FormData();
        formData.append('file', userLogo);
        const response = await userService.uploadUserLogo(formData)
    }


    const createNewPartner = async () => {
        const formattedPartnerPhoneNumber = changeFormatPhoneNumber(partnerPhoneNumber)
        await handleUploadLogo();
        try {
            if (partnerName.length > 0) {
                const newPartnerData = {
                    login: formattedPartnerPhoneNumber,
                    firstName: partnerName
                }
                const response = await userService.registerNewPartner(newPartnerData);
                if (response.data.success) {
                    message.success('Партнер создано успешно!!!');
                }else {
                    message.error("При создание нового партнера произошло ошибка")
                }
            }

        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className='add-partner'>
            <Button className='add-partner__add-button' type={"primary"} size={"large"} onClick={showDrawer}>
                <Icon content={iconPlus}/>
                Добавить партнера
            </Button>

            <Drawer className='add-partner__drawer' placement="right" onClose={onClose} size={"412px"}
                    visible={visible}>
                <h3 className='add-partner__title'>Добавить нового партнера</h3>
                <form className="add-partner__form">
                    <div>
                        <Form.Item className='add-partner__form__upload-photo'>
                            <div className='add-partner__form__upload-photo__selector-wrapper'>
                                <button
                                    className='add-partner__form__upload-photo__selector'
                                    onClick={handlePick}
                                    type={"button"}
                                >
                                    <PlusOutlined/>
                                </button>
                                <input
                                    type="file"
                                    className='hidden'
                                    accept='image/*, .png, .jpg, .gif, .web, .svg'
                                    onChange={handleChangeUpload}
                                    ref={filePicker}
                                />
                            </div>

                            <div className="add-partner-form__upload-photo-text">
                            <span
                                className='add-partner-form__upload-photo-text__title'>Добавьте логотип партнера</span>
                                <span className='add-partner-form__upload-photo-text__desc'> Макс.размер файла 5 MB - JPG, PNG</span>
                            </div>
                        </Form.Item>
                        <Form.Item className='add-partner__form__partner-name'>
                            <TextField
                                label='Наименование торговой точки '
                                focused
                                type='text'
                                style={{width: '100%', textAlign: 'center'}}
                                onChange={(e) => setPartnerName(e.target.value)}
                                margin={"normal"}
                                color={'info'}
                            />
                        </Form.Item>
                        <Form.Item className='add-partner__form__partner-phone-number'>
                            <InputMask
                                mask={'(+998) ## ### ## ##'}
                                defaultValue={partnerPhoneNumber}
                                onChange={(e) => setPartnerPhoneNumber(e.target.value)}
                                alwaysShowMask={true}
                                formatChars={{
                                    '#': '[0-9]'
                                }}
                                placeholder='Введите ваш логин'>
                                {(inputProps) =>
                                    <TextField
                                        {...inputProps}
                                        color={'info'}
                                        label="Ваш логин"
                                        focused
                                        margin={"normal"}
                                        style={{width: '100%', textAlign: 'center'}}
                                    />
                                }
                            </InputMask>
                        </Form.Item>
                    </div>
                    {/*<Form.Item className='add-partner__form__title-security'>*/}
                    {/*    <span>Безопасность</span>*/}
                    {/*    <hr/>*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item className='add-partner__form__partner-login'>*/}
                    {/*    <label htmlFor="partnerName">Номер телефона</label>*/}
                    {/*    <Input placeholder='Введите номер телефона'  id='partnerName'/>*/}
                    {/*</Form.Item>*/}
                    <Form.Item className='add-partner__form__partner-data-submit'>
                        <Button
                            type={"primary"}
                            size={"large"}
                            onClick={() => createNewPartner()}
                        >
                            <CheckOutlined/>
                            Сохранить
                        </Button>
                    </Form.Item>
                </form>
            </Drawer>
        </div>
    );
};
