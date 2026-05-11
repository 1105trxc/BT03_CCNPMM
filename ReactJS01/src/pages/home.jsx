import React, { useContext } from 'react';
import { AuthContext } from '../components/context/auth.context';
import { Typography, Card, Row, Col } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const HomePage = () => {
    const { auth } = useContext(AuthContext);

    return (
        <Row justify="center" style={{ marginTop: '50px' }}>
            <Col xs={24} md={16} lg={12}>
                <Card
                    style={{
                        textAlign: 'center',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                >
                    <SmileOutlined style={{ fontSize: '48px', color: '#1677ff', marginBottom: '16px' }} />
                    <Title level={2}>
                        FullStack App - ExpressJS + ReactJS + MySQL
                    </Title>
                    <Paragraph style={{ fontSize: '16px' }}>
                        {auth.isAuthenticated
                            ? `Chào mừng ${auth.user.name}! Bạn đã đăng nhập thành công.`
                            : 'Vui lòng đăng nhập hoặc đăng ký để sử dụng hệ thống.'}
                    </Paragraph>
                </Card>
            </Col>
        </Row>
    );
};

export default HomePage;
