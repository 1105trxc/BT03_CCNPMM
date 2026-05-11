import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    auth: {
        isAuthenticated: false,
        user: {
            id: '',
            name: '',
            email: '',
            role: '',
        },
    },
    setAuth: () => {},
    appLoading: true,
    setAppLoading: () => {},
});

export const AuthWrapper = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            id: '',
            name: '',
            email: '',
            role: '',
        },
    });
    const [appLoading, setAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
