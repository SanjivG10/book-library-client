
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';


import LOGIN from '@/graphql/mutations/login.mutation';
import Login from '@/pages/login';
import '@testing-library/jest-dom';
import { AuthProvider } from '@/contexts/AuthContext';

jest.mock('next/router', () => ({
    useRouter() {
        return ({
            route: '/',
            pathname: '',
            query: '',
            locale: "en",
            asPath: '',
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn()
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null)
        });
    },
}));
jest.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        };
    },
}));

describe('Login page', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const mocks = [
        {
            request: {
                query: LOGIN,
                variables: { username: 'sanjiv', password: 'sanjiv' },
            },
            result: {
                data: {
                    login: {
                        token: 'testtoken',
                    },
                },
            },
        },
    ];

    it('logs in user', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MockedProvider>
        )

        const usernameInput = await screen.findByTestId('username');
        const passwordInput = await screen.findByTestId('password');
        const submitbutton = await screen.findByTestId('submit');


        fireEvent.change(usernameInput, { target: { value: 'sanjiv' } });
        fireEvent.change(passwordInput, { target: { value: 'sanjiv' } });
        fireEvent.click(submitbutton);

        await waitFor(() => {
            expect(localStorage.getItem('token')).toEqual('testtoken');
        })




    });
})