

import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';


import '@testing-library/jest-dom';
import { BOOK_UPDATE } from '@/graphql/subscriptions/bookUpdate.subscription';
import LiveBookUpdate from '@/pages/live';

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

describe('Live Page', () => {

    const mocks = [
        {
            request: {
                query: BOOK_UPDATE,
            },
            result: {
                data: {
                    bookUpdate: {
                        title: "Hello",
                        date: new Date().toISOString(),
                        username: "sanjiv",
                        rating: 5
                    },
                },
            },
        },
    ];

    it('renders empty live page', async () => {
        render(
            <MockedProvider mocks={[]}>
                <LiveBookUpdate />
            </MockedProvider>
        )
        const noNotiticationContainer = await screen.findByTestId("no-notification");
        expect(noNotiticationContainer).toBeInTheDocument();
    });

    it('renders live notification', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <LiveBookUpdate />
            </MockedProvider>
        )

        const eachNotification = await screen.findByTestId("notification");
        expect(eachNotification).toBeInTheDocument();
    });


})