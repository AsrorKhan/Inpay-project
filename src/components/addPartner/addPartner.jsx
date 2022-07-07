import React, {useState} from 'react';
import {Button, Drawer, Form, message, Upload} from "antd";
import {Icon} from "../icon/icon";
import {CheckOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
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
    const onClose = () => {
        setVisible(false);
    };
    const showDrawer = () => {
        setVisible(true);
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
            </div>
        </div>
    );
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        console.log(file);
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };



    const createNewPartner = async () => {
        const formattedPartnerPhoneNumber = changeFormatPhoneNumber(partnerPhoneNumber)

        try {
            if (partnerName.length > 0) {
                const newPartnerData = {
                    login: formattedPartnerPhoneNumber,
                    firstName: partnerName
                }
                const response = await userService.registerNewPartner(newPartnerData);
                if (response.data.success) {
                    message.success('Партнер создано успешно!!!');
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
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
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
