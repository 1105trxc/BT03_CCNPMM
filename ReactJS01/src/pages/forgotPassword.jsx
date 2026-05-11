import React, { useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Divider } from 'antd';
import { forgotPasswordApi } from '../util/api';
import { Link } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        const res = await forgotPasswordApi(values.email);
        setLoading(false);

        if (res && res.success === true) {
            notification.success({
                message: 'Gửi link thành công',
                description: 'Vui lòng kiểm tra email của bạn để lấy link đặt lại mật khẩu.',
            });
        } else {
            notification.error({
                message: 'Lỗi',
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
                        <LockOutlined /> Quên Mật Khẩu
                    </legend>
                    <Form name="forgot" onFinish={onFinish} layout="vertical" autoComplete="off">
                        <p style={{ marginBottom: '16px', color: '#555' }}>
                            Vui lòng nhập email tài khoản của bạn. Hệ thống sẽ gửi một đường dẫn an toàn để đặt lại mật khẩu.
                        </p>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' },
                            ]}
                        >
                            <Input placeholder="Nhập email đã đăng ký" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Gửi Link Đặt Lại Mật Khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/login">Quay lại Đăng nhập</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
};

export default ForgotPasswordPage;
