import React, { createContext, useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ME } from '@graphql/queries/me.query';
import { PAGE_URLS } from '@constants/urls';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { loading, data, refetch } = useQuery(ME);
    const router = useRouter();

    useEffect(() => {
        refetch();
    }, [router.pathname]);

    useEffect(() => {
        if (data && data.me) {
            const token = data.me.token;
            localStorage.setItem("token", token);
        }
    }, [data]);

    if (loading) return <div>Loading...</div>;

    return <AuthContext.Provider value={{ user: data?.me, loading }}>{children}</AuthContext.Provider>;
};

export const withAuth = (Component) => {
    return (props) => {
        const { user, loading } = useContext(AuthContext);

        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                if (router.pathname !== PAGE_URLS.SIGNUP) {
                    router.push(PAGE_URLS.LOGIN);
                }
            }
        }, [user, loading]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return <Component {...props} />;
    };
};
