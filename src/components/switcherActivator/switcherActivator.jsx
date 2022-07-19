import React from 'react';
import './switcherActivator.scss'
import {Button, Dropdown, Menu, Space} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined,} from '@ant-design/icons';

export const SwitcherActivator = ({activated}) => {
    const menu = (
        <Menu
            theme={"dark"}
            items={[
                {
                    key: '1',
                    label: (
                        <span>
                            <CheckCircleOutlined />&nbsp;Активировать
                        </span>
                    )
                },
                {
                    key: '2',
                    label: (
                        <span>
                            <CloseCircleOutlined />&nbsp;Деактивировать партнера
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
                    <span className={activated ? 'active-status' : 'inactive-status'}>
                        {activated ? 'Активный' : 'Отклонен'}
                    </span>
                </a>
            </Dropdown>
        </div>
    );
};

