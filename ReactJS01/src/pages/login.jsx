import React, { useContext } from 'react';
import { Button, Col, Form, Input, notification, Row, Divider } from 'antd';
import { loginApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await loginApi(email, password);

        if (res && res.success === true) {
            localStorage.setItem('access_token', res.data.token);
            setAuth({
                isAuthenticated: true,
                user: res.data.user,
            });
            notification.success({
                message: 'Đăng nhập thành công',
                description: `Chào mừng ${res.data.user.name}!`,
            });
            navigate('/');
        } else {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: res?.message ?? 'Email hoặc mật khẩu không đúng',
            });
        }
    };

    return (
        <Row justify="center" style={{ marginTop: '40px' }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset
                    style={{
                        padding: '25px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '8px',
                        background: '#fff',
                    }}
                >
                    <legend style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        <LoginOutlined /> Đăng Nhập
                    </legend>
                    <Form name="login" onFinish={onFinish} layout="vertical" autoComplete="off">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' },
                            ]}
                        >
                            <Input placeholder="Nhập email" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                        {' | '}
                        <Link to="/register">Đăng ký tài khoản mới</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
};

export default LoginPage;
