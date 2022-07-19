import React, {useRef, useState} from 'react';
import {Button, Drawer, Form, message} from "antd";
import {Icon} from "../icon/icon";
import {CheckOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import iconPlus from '../../assets/icons/icon-plus.svg'
import './addPartner.scss';
import {TextField} from "@mui/material";
import InputMask from "react-input-mask";
import {changeFormatPhoneNumber} from "../../helpers/changeFormatNumber";
import userService from "../../services/userService";
import {LottieAnimation} from "../animation/animation";
import {animationSettings} from "../../assets/animationSettings";


export const AddPartner = () => {
    const [visible, setVisible] = useState(false);
    const [partnerName, setPartnerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [percent, setPercent] = useState('');
    const [userLogo, setUserLogo] = useState(null);
    const [selectedLogo, setSelectedLogo] = useState(false)
    const filePicker = useRef(null);
    const phoneNumberRef = useRef('')
    const [successAnimate, setSuccessAnimate] = useState(false);
    const [errorAnimate, setErrorAnimate] = useState(false);
    const [validPhoneNumber, setValidPhoneNumber] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

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
            setUserLogo(value);
            setSelectedLogo(true)
        } catch (e) {
            console.log("catch: ", e);
        }
    }

    const setPartnerPhoneNumber = (value) => {
        if (!value.length && value.length < 19) {
            setValidPhoneNumber(false);
            setErrorMessage('Введите корректный номер телефона')
        } else {
            const formattedPartnerPhoneNumber = changeFormatPhoneNumber(value)
            setPhoneNumber(formattedPartnerPhoneNumber)
            setValidPhoneNumber(true)
            setErrorMessage('')
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
    const setPartnerPercent = (event) => {
        let value = event.target.value;
        if (value.length > 0) {
            setPercent(value);
        }
    }
    const handleUploadLogo = async () => {
        try {
            if (!userLogo) {
                return;
            }
            let formData = new FormData();
            formData.append('file', userLogo);
            await userService.uploadUserLogo(formData)
        } catch (e) {
            message.error('Пожалуйста выберите логотип');
        }
    }


    const createNewPartner = async () => {
        console.log(phoneNumber);
        console.log(phoneNumber.length);
        await handleUploadLogo();
        try {
            if (!selectedLogo || partnerName === '' || percent === '' || phoneNumber.length < 12) {
                message.error('Заполняйте правильно всех полей!')
            } else {
                const newPartnerData = {
                    login: phoneNumber,
                    firstName: partnerName,
                    percent: percent
                }
                const response = await userService.registerNewPartner(newPartnerData);
                if (response?.data?.success) {
                    message.success('Партнер создано успешно!!!');
                    setSuccessAnimate(true)
                    setTimeout(() => {
                        setSuccessAnimate(false)
                    }, 1500)
                    filePicker.current.value = null
                    setSelectedLogo(false)
                    setPartnerPhoneNumber('');
                    setPartnerName('')
                    setPercent('')
                } else {
                    message.error("При создание нового партнера произошло ошибка")
                    setErrorAnimate(true)
                    setTimeout(() => {
                        setErrorAnimate(false)
                    }, 2000)
                }
            }
        } catch (e) {
            console.log("catch: ", e);
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
                    {successAnimate ? <LottieAnimation animationData={animationSettings.successAnimation}/> : ''}
                    {errorAnimate ? <LottieAnimation animationData={animationSettings.errorAnimation}/> : ''}
                    <div>
                        <Form.Item className='add-partner__form__upload-photo'>
                            <div className='add-partner__form__upload-photo__selector-wrapper'>
                                <button
                                    className='add-partner__form__upload-photo__selector'
                                    onClick={handlePick}
                                    type={"button"}
                                >
                                    {selectedLogo ? <EditOutlined/> : <PlusOutlined/>}
                                </button>
                                <input
                                    type="file"
                                    className='hidden'
                                    accept='image/*, .png, .jpg, .gif, .web, .svg'
                                    onChange={handleChangeUpload}
                                    ref={filePicker}
                                    required={true}
                                />
                            </div>

                            {
                                selectedLogo ?
                                    <span>Файл выбран</span>
                                    :
                                    <div className="add-partner-form__upload-photo-text">
                                        <span
                                            className='add-partner-form__upload-photo-text__title'>
                                            Добавьте логотип партнера
                                        </span>
                                        <span className='add-partner-form__upload-photo-text__desc'>Макс.размер файла 5 MB - JPG, PNG</span>
                                    </div>

                            }
                        </Form.Item>
                        <Form.Item className='add-partner__form__partner-name'>
                            <TextField
                                label='Наименование торговой точки '
                                value={partnerName}
                                focused
                                type='text'
                                style={{width: '100%', textAlign: 'center'}}
                                onChange={(e) => setPartnerName(e.target.value)}
                                margin={"normal"}
                                color={'info'}
                                required={true}
                            />
                        </Form.Item>
                        <Form.Item className='add-partner__form__partner-phone-number'>
                            <InputMask
                                mask={'(+998) ## ### ## ##'}
                                value={phoneNumber}
                                onChange={(e) => setPartnerPhoneNumber(e.target.value)}
                                alwaysShowMask={true}
                                ref={phoneNumberRef}
                                required={true}
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
                            {validPhoneNumber ? <span
                                className='add-partner__form__partner-phone-number__error-message'>{errorMessage}</span> : ''}

                        </Form.Item>
                        <Form.Item className='add-partner__form__partner-percent'>
                            <TextField
                                required={true}
                                onKeyDown={handleKeyDown}
                                onKeyPress={handleKeyPress}
                                label='% Вставка по продукту'
                                focused
                                style={{width: '100%', textAlign: 'center'}}
                                onChange={(event) => setPartnerPercent(event)}
                                value={percent}
                            />
                            <span className='add-partner__form__partner-percent__error-message'>{errorMessage}</span>
                        </Form.Item>
                    </div>

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
