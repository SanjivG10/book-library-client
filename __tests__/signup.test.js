

import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';


import SIGNUP from '@/graphql/mutations/signup.mutation';
import SignupPage from '@/pages/signup';
import '@testing-library/jest-dom';

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

describe('Sign up page', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const mocks = [
        {
            request: {
                query: SIGNUP,
                variables: { username: 'sanjiv123', password: 'sanjiv123', email: "sanjiv123@gmail.com" },
            },
            result: {
                data: {
                    register: {
                        token: 'testtoken',
                    },
                },
            },
        },
    ];

    it('logs in user', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <SignupPage />
            </MockedProvider>
        )

        const usernameInput = await screen.findByTestId('username');
        const emailInput = await screen.findByTestId('email');
        const passwordInput = await screen.findByTestId('password');
        const submitbutton = await screen.findByTestId('submit');


        fireEvent.change(usernameInput, { target: { value: 'sanjiv123' } });
        fireEvent.change(passwordInput, { target: { value: 'sanjiv123' } });
        fireEvent.change(emailInput, { target: { value: 'sanjiv123@gmail.com' } });
        fireEvent.click(submitbutton);

        await waitFor(() => {
            expect(localStorage.getItem('token')).toEqual('testtoken');
        })




    });
})