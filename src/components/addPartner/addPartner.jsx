import React, {useState} from 'react';
import {Button, Drawer, Form, Input, message, Upload} from "antd";
import {Icon} from "../icon/icon";
import {LoadingOutlined, PlusOutlined, CheckOutlined} from '@ant-design/icons';
import iconPlus from '../../assets/icons/icon-plus.svg'
import './addPartner.scss';

export const AddPartner = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

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

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };


    return (
        <div className='add-partner'>
            <Button className='add-partner__add-button' type={"primary"} size={"large"} onClick={showDrawer}>
                <Icon content={iconPlus}/>
                Добавить партнера
            </Button>

            <Drawer className='add-partner__drawer' placement="right" onClose={onClose} size={"412px"}
                    visible={visible}>
                <h3 className='add-partner__title'>Добавить нового партнера</h3>
                <Form className="add-partner-form">
                    <Form.Item className='add-partner-form__upload-photo'>
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
                            <span className='add-partner-form__upload-photo-text__desc'>Макс.размер файла 5 MB - JPG, PNG</span>
                        </div>
                    </Form.Item>
                    <Form.Item className='add-partner-form__partner-name'>
                        <label htmlFor="partnerName">Наименования торговой точки</label>
                        <Input placeholder='Введите наименования торговой точки'  id='partnerName'/>
                    </Form.Item>
                    <Form.Item className='add-partner-form__partner-phone-number'>
                        <label htmlFor="partnerName">Номер телефона</label>
                        <Input placeholder='Введите номер телефона'  id='partnerName'/>
                    </Form.Item>
                    <Form.Item className='add-partner-form__title-security'>
                        <span>Безопасность</span>
                        <hr/>
                    </Form.Item>
                    <Form.Item className='add-partner-form__partner-login'>
                        <label htmlFor="partnerName">Номер телефона</label>
                        <Input placeholder='Введите номер телефона'  id='partnerName'/>
                    </Form.Item>
                    <Form.Item className='add-partner-form__partner-data-submit'>
                        <Button type={"primary"} size={"large"}><CheckOutlined />Сохранить</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};
