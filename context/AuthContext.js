import React, { createContext, useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ME } from '@graphql/queries/me.query';
import { PAGE_URLS } from '@constants/urls';

export const AuthContext = createContext();

const AUTH_URLS = [PAGE_URLS.LOGIN, PAGE_URLS.SIGNUP]

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const { loading, data, refetch } = useQuery(ME, {
        onError: () => {
            if (!AUTH_URLS.includes(router.pathname)) {
                router.push(PAGE_URLS.LOGIN);
            }
        }
    });

    useEffect(() => {
        refetch();
    }, [router.pathname]);

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
