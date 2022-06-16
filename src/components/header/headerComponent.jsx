import React from 'react';
import {menuLinks} from "../../constants/menuLinks";
import { NavLink} from "react-router-dom";
import {Header} from "antd/es/layout/layout";
import {Icon} from "../icon/icon";
import './headerComponent.scss';
import mainLogo from '../../assets/main-logo.svg';
import notificationLogo from '../../assets/icons/icon_notification.svg'
import avatar from '../../assets/avatar.png'
import {Avatar, Badge, Select} from "antd";

const {Option} = Select;
const HeaderComponent = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };


    return (
        <Header className='header-component' style={{background: '#fff'}}>
            <div className="header-component__logo">
                <Icon content={mainLogo} alt={'main-logo'}/>
            </div>
            <div className='header-component__nav-links'>
                {menuLinks?.map((item) => {
                        if (item.link !== null) {
                            return (
                                <NavLink
                                    className={({isActive}) => isActive ? 'active-link' : 'inActive-link'}
                                    key={item.label}
                                    to={item.link}
                                >
                                    {item.label}
                                </NavLink>
                            )
                        }
                    }
                )}
            </div>
            <div className='header-component__user-notification'>
                <Badge className='notification' dot={true} size={"default"}>
                    <Avatar shape="square" size="small" src={notificationLogo}/>
                </Badge>
                <div className="user">
                    <Avatar shape={"circle"} src={avatar}/>&nbsp;
                    <Select
                        bordered={false}
                        // mode={"multiple"}
                        defaultValue="lucy"
                        size={"large"}
                        onChange={handleChange}
                    >
                        <Option value="lucy">
                            <ul className='user__user-data' style={{padding: 0, margin: 0, listStyle: "none"}}>
                                <li className='user__username'>Abdullayev Alisher</li>
                                <li className='user__user-role'>Super admin</li>
                            </ul>
                        </Option>
                        <Option value="exit"> Sign out</Option>

                    </Select>
                </div>
            </div>
        </Header>
    )
};

export default HeaderComponent;
