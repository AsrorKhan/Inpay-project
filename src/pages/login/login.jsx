import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';
import './login.scss'
import {Icon} from "../../components/icon/icon";
import mainIcon from '../../assets/main-logo.svg'
import authService from "../../services/authService";
import {iconsList} from "../../helpers/iconsList";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/reducer/users";
import {useNavigate} from 'react-router-dom'
import {LOGIN_ROUTE} from "../../constants/routeContants";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [userRemember, setUserRemember] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const checkUser = async () => {
        const response = await authService.login({username, password});
        console.log("response", response.data.id_token);
        if (response.data) {
            localStorage.setItem('auth_token', response.data.id_token);
            dispatch(setUser({
                ...response.data,
                isAuth: true
            }))
            navigate('/')
        }
    }


    const onFinish = (values) => {
        console.log('Success:', values);
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page">
            <div></div>
            <div>
                <div className='login-page__main-logo'>
                    <Icon content={mainIcon}/>
                </div>
                <Form
                    name="login"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='login-page__form'
                >
                    <Form.Item
                        label="Имя пользователя"
                        name="username"
                        rules={[
                            {required: true, message: 'Пожалуйста, введите имя пользователя!!!'},
                        ]}
                    >
                        <Input
                            allowClear={true}
                            className='login-page__form__input-login'
                            onChange={event => setUsername(event.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {required: true, message: 'Пожалуйста, введите  пароль!!!'},
                        ]}
                    >
                        <Input.Password
                            allowClear={true}
                            className='login-page__form__input-password'
                            onChange={event => setPassword(event.target.value)}
                        />
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    style={{textAlign: "left"}}*/}
                    {/*    name="remember"*/}
                    {/*    valuePropName="checked"*/}
                    {/*    wrapperCol={{span: 24,}}*/}
                    {/*>*/}
                    {/*    <Checkbox*/}
                    {/*        onChange={event => setUserRemember(event.target.value)}*/}
                    {/*    >*/}
                    {/*        Remember me*/}
                    {/*    </Checkbox>*/}
                    {/*</Form.Item>*/}
                    <Form.Item wrapperCol={{span: 24}} className='login-page__form__submit'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className='login-page__form__submit-button'
                            onClick={checkUser}
                        >
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className='main-anorbank-logo'>
                <Icon content={iconsList.mainAnorbankLogo}/>
            </div>
        </div>
    );
};


