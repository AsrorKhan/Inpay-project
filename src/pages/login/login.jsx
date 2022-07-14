import React, {useState} from 'react';
import {Alert, Button, Checkbox, Form, Input, message} from 'antd';
import './login.scss'
import {Icon} from "../../components/icon/icon";
import mainIcon from '../../assets/main-logo.svg'
import authService from "../../services/authService";
import {iconsList} from "../../helpers/iconsList";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/reducer/users";
import {NavLink, useNavigate} from 'react-router-dom'
import jwtDecode from "jwt-decode";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [authToken, setAuthToken] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log(values);
        try {
            const response = await authService.login({username, password});
            const userData = response?.data
            if (userData?.id_token) {
                const decodeToken = jwtDecode(userData?.id_token)
                localStorage.setItem('auth_token', userData.id_token);
                localStorage.setItem('username', decodeToken?.sub)
                const token_expire = String(new Date(userData?.expires_in).getTime());
                localStorage.setItem('token_expire', token_expire)
                dispatch(setUser({
                    id_token: response.data.id_token,
                    username: username,
                    remember: remember,
                    isAuth: true
                }))
                setAuthToken(true)
                navigate('/')
                message.success('Добро пожаловать', 1.5)
            }
        } catch (e) {
            message.error(e.message)
        }
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
                    {authToken ? <Alert message="Неверный логин или пароль" type="error" showIcon/> : ''}
                    <Form.Item
                        label="Имя пользователя"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите имя пользователя!!!',
                            },
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
                    <Form.Item
                        className='login-page__form__remember-forget'
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{span: 24,}}
                    >
                        <Checkbox onChange={event => setRemember(event.target.value)}>
                            Запомните меня
                        </Checkbox>
                        <NavLink to='/confirmPhoneNumber' className='login-page__form__remember-forget__nav-link'>Забыли пароль? </NavLink>
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 24}} className='login-page__form__submit'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className='login-page__form__submit-button'
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


