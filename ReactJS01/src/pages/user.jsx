import React, { useEffect, useState } from 'react';
import { Table, Card, Typography } from 'antd';
import { getUserApi } from '../util/api';
import { TeamOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        const res = await getUserApi();
        if (res && res.success === true) {
            setUsers(res.data);
        }
        setLoading(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Card
                style={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
            >
                <Title level={3}>
                    <TeamOutlined /> Quản lý Users
                </Title>
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    loading={loading}
                    bordered
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default UserPage;
