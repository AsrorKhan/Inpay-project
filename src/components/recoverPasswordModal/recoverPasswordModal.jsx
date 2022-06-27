import React, {useState} from 'react';
import {Button, Modal} from "antd";
import {Icon} from "../icon/icon";
import {iconsList} from "../../helpers/iconsList";
import './recoverPasswordModal.scss'
import {CheckOutlined} from "@ant-design/icons";

export const RecoverPasswordModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (e) => {
        setIsModalVisible(true);
        e.stopPropagation()
    };

    const handleOk = (e) => {
        setIsModalVisible(false);
        e.stopPropagation()
    };

    const handleCancel = (e) => {
        setIsModalVisible(false);
        e.stopPropagation()
    };
    return (
        <div className='recover-password'>
            <Modal
                className='recover-password__recover-modal'
                title="Сброс пароля"
                visible={isModalVisible}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className='recover-password__recover-modal-image'>
                    <Icon content={iconsList.iconRecoverPassword} alt={'recover-password-image'}/>
                </div>
                <div className='recover-password__recover-modal-text'>
                    Вы точно уверены что хотите отправить
                    запрос на восстановление пароля
                </div>
                <div className="recover-password__recover-modal__btns">
                    <Button type={"primary"} danger className='recover-password__recover-modal__btns__cancel'>
                        Отмена
                    </Button>
                    <Button type={"primary"} className='recover-password__recover-modal__btns__send'>
                        <CheckOutlined/> &nbsp;
                        Отправить
                    </Button>
                </div>
            </Modal>


            <Button type="primary" ghost className='recover-password__button' onClick={showModal}>
                <Icon content={iconsList.iconLock} alt={'icon-lock'}/>
                Сменить пароль
            </Button>
        </div>
    );
};

