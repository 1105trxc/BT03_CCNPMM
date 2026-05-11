import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/header';
import { AuthContext } from './components/context/auth.context';
import { getAccountApi } from './util/api';
import { Spin } from 'antd';

const App = () => {
    const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

    useEffect(() => {
        const fetchAccount = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                const res = await getAccountApi();
                if (res && res.success === true) {
                    setAuth({
                        isAuthenticated: true,
                        user: res.data,
                    });
                }
            }
            setAppLoading(false);
        };
        fetchAccount();
    }, []);

    return (
        <>
            {appLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Header />
                    <Outlet />
                </>
            )}
        </>
    );
};

export default App;
