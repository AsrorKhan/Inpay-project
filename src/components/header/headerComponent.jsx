import React from 'react';
import {menuLinks} from "../../constants/menuLinks";
import {NavLink} from "react-router-dom";
import {Header} from "antd/es/layout/layout";
import {Icon} from "../icon/icon";
import './headerComponent.scss';
import mainLogo from '../../assets/main-logo.svg';
import notificationLogo from '../../assets/icons/icon_notification.svg';
import avatar from '../../assets/avatar.png';
import {Avatar, Badge, Dropdown, Menu, Select} from "antd";
import authService from "../../services/authService";
import {UserOutlined} from '@ant-design/icons';
import {checkAccountRole} from "../permissionProvider/permissionProvider";

const {Option} = Select;
const HeaderComponent = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const menu = (
        <Menu>
            <Menu.Item
                key="1"
                icon={<UserOutlined/>}
                onClick={() => {
                    authService.logOut();
                }}
            >
                Выйти
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className='header-component' style={{background: '#fff'}}>
            <div className="header-component__logo">
                <Icon content={mainLogo} alt={'main-logo'}/>
            </div>
            <div className='header-component__nav-links'>
                {menuLinks?.map((item) => {
                        if (item.link !== null) {
                            return (
                                (checkAccountRole(item.permissions) &&
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-link' : 'inActive-link'}
                                        key={item.label}
                                        to={item.link}
                                    >
                                        {item.label}
                                    </NavLink>
                                )
                            );
                        }
                    }
                )}
            </div>
            <div className='header-component__user-notification'>
                <Badge className='notification' dot={true} size={"default"}>
                    <Avatar shape="square" size="small" src={notificationLogo}/>
                </Badge>
                <div className="user">
                    <div className="user__avatar-wrapper">
                        <Dropdown overlay={menu}>
                            <span className='user__avatar-wrapper__dropdown-elements'>
                                <Avatar size={44} src={<img src={avatar} alt="avatar"/>}/>
                                <ul className='user__user-data' style={{padding: 0, margin: 0, listStyle: "none"}}>
                                    <li className='user__user-data__username'>{localStorage.getItem('username')}</li>
                                    {/*<li className='user__user-data__user-role'>Super admin</li>*/}
                                </ul>
                            </span>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </Header>
    )
};

export default HeaderComponent;
