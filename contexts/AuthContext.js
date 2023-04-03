import { useQuery } from '@apollo/client';
import Spinner from '@/components/common/Spinner';
import { PAGE_URLS } from '@/constants/urls';
import { ME } from '@/graphql/queries/me.query';
import { UNPROTECTED_ROUTES } from '@/lib/routes/urls';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    const { loading, data, refetch } = useQuery(ME, {
        onError: () => {
            localStorage.removeItem('token');
            setUser(null);
            if (!UNPROTECTED_ROUTES.includes(router.pathname)) {
                router.push(PAGE_URLS.LOGIN);
            }
        }
    });

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            if (token) {
                await refetch();
            }
            else {
                setUser(null);
            }
        })();
    }, [router.pathname])


    useEffect(() => {
        if (data && !loading && data.me) {
            setUser(data.me);
        }
        else {
            setUser(null);
        }
    }, [data, loading])

    if (loading) return <Spinner />;

    return <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>;
};

export const withAuth = (Component) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem("token");
            const isRoutingAllowed = UNPROTECTED_ROUTES.includes(router.pathname);
            if (!token && !isRoutingAllowed) {
                router.push(PAGE_URLS.LOGIN);
            }
        }, [router.pathname]);


        return <Component {...props} />;
    };
};
