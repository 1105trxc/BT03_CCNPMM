import React, { useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Divider } from 'antd';
import { resetPasswordApi } from '../util/api';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SafetyCertificateOutlined } from '@ant-design/icons';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        if (!token) {
            notification.error({
                message: 'Lỗi',
                description: 'Link đặt lại mật khẩu không hợp lệ',
            });
            return;
        }

        setLoading(true);
        const res = await resetPasswordApi(token, values.newPassword);
        setLoading(false);

        if (res && res.success === true) {
            notification.success({
                message: 'Thành công',
                description: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.',
            });
            navigate('/login');
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
                        <SafetyCertificateOutlined /> Đặt Lại Mật Khẩu
                    </legend>
                    {!token ? (
                        <div style={{ textAlign: 'center', color: '#ff4d4f' }}>
                            <p>Đường dẫn không hợp lệ hoặc thiếu Token bảo mật.</p>
                        </div>
                    ) : (
                        <Form name="reset_password" onFinish={onFinish} layout="vertical" autoComplete="off">
                            <Form.Item
                                label="Mật khẩu mới"
                                name="newPassword"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu mới" />
                            </Form.Item>

                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="confirmPassword"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Nhập lại mật khẩu mới" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} block>
                                    Cập Nhật Mật Khẩu Mới
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                    <Divider />
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/login">Quay lại Đăng nhập</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
};

export default ResetPasswordPage;
