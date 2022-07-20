import React from 'react';
import './switcherActivator.scss'
import {Dropdown, Menu} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined,} from '@ant-design/icons';
import partnersService from "../../services/partnersService";
import {useDispatch} from "react-redux";
import {setPartners} from "../../store/reducer/partners";

export const SwitcherActivator = ({userData}) => {
    const dispatch = useDispatch();

    const deactivatePartner = async (e) => {
        e.stopPropagation()
        const requestData = {
            userId: userData?.id,
            statusId: 1
        }
        const response = await partnersService.activatorSwitcherPartner(requestData)
        const partnersList = await partnersService.loadPartnersList();
        dispatch(setPartners({content: partnersList?.data}))
        console.log(response.data);
    }
    const activatePartner = async (e) => {
        e.stopPropagation()
        const requestData = {
            userId: userData?.id,
            statusId: 0
        }
        const response = await partnersService.activatorSwitcherPartner(requestData)
        const partnersList = await partnersService.loadPartnersList();
        dispatch(setPartners({content: partnersList?.data}))
        console.log(response.data);
    }
    const menu = (
        <Menu
            theme={"dark"}
            items={[
                {
                    key: '1',
                    label: (
                        <span onClick={(e) => activatePartner(e)}>
                            <CheckCircleOutlined/>&nbsp;Активировать
                        </span>
                    )
                },
                {
                    key: '2',
                    label: (
                        <span onClick={(e) => deactivatePartner(e)}>
                            <CloseCircleOutlined/>&nbsp;Деактивировать партнера
                        </span>
                    ),
                },
            ]}
        />
    );
    return (
        <div className='status-activator-switcher'>

            <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                    <span
                        className={userData?.activated ? 'active-status' : 'inactive-status'}
                        onClick={e => e.stopPropagation()}
                    >
                        {userData?.activated ? 'Активный' : 'Отклонен'}
                    </span>
                </a>
            </Dropdown>
        </div>
    );
};

