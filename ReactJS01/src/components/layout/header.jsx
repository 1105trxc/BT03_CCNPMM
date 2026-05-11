import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { HomeOutlined, UserOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setAuth({
            isAuthenticated: false,
            user: { id: '', name: '', email: '', role: '' },
        });
        message.success('Đăng xuất thành công');
        navigate('/login');
    };

    const items = [
        {
            label: <Link to="/">Trang chủ</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
    ];

    if (auth.isAuthenticated) {
        items.push(
            {
                label: <Link to="/user">Quản lý Users</Link>,
                key: 'user',
                icon: <UserOutlined />,
            },
            {
                label: `Xin chào, ${auth.user.name}`,
                key: 'account',
                children: [
                    {
                        label: <span onClick={handleLogout}>Đăng xuất</span>,
                        key: 'logout',
                        icon: <LogoutOutlined />,
                    },
                ],
            }
        );
    } else {
        items.push(
            {
                label: <Link to="/login">Đăng nhập</Link>,
                key: 'login',
                icon: <LoginOutlined />,
            },
            {
                label: <Link to="/register">Đăng ký</Link>,
                key: 'register',
                icon: <UserAddOutlined />,
            }
        );
    }

    return (
        <Menu
            mode="horizontal"
            items={items}
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                fontSize: '15px',
            }}
        />
    );
};

export default Header;
