import React, { useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Divider } from 'antd';
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        const { name, email, password } = values;
        const res = await createUserApi(name, email, password);
        setLoading(false);

        if (res && res.success === true) {
            notification.success({
                message: 'Đăng ký thành công',
                description: 'Tài khoản đã được tạo. Vui lòng đăng nhập.',
            });
            navigate('/login');
        } else {
            notification.error({
                message: 'Đăng ký thất bại',
                description: res?.message ?? 'Có lỗi xảy ra',
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
                        <UserAddOutlined /> Đăng Ký Tài Khoản
                    </legend>
                    <Form name="register" onFinish={onFinish} layout="vertical" autoComplete="off">
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                            <Input placeholder="Nhập họ và tên" />
                        </Form.Item>

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
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Đăng Ký
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: 'center' }}>
                        Đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
};

export default RegisterPage;
