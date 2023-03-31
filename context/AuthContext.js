import React, { createContext, useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ME } from '@graphql/queries/me.query';
import { PAGE_URLS } from '@constants/urls';

export const AuthContext = createContext();

const AUTH_URLS = [PAGE_URLS.LOGIN, PAGE_URLS.SIGNUP]

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    const { loading, data, refetch } = useQuery(ME, {
        onError: () => {
            localStorage.removeItem('token');
            setUser(null);
            if (!AUTH_URLS.includes(router.pathname)) {
                router.push(PAGE_URLS.LOGIN);
            }
        }
    });

    useEffect(() => {
        refetch();
    }, [router.pathname])


    useEffect(() => {
        if (data && data.me) {
            setUser(data.me);
        }
        else {
            setUser(null);
        }
    }, [data, loading])

    if (loading) return <div>Loading...</div>;

    return <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};

export const withAuth = (Component) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push(PAGE_URLS.LOGIN);
            }
        }, []);


        return <Component {...props} />;
    };
};
