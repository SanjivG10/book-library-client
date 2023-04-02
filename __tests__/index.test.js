import Navbar from '@/components/common/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { GET_ALL_BOOKS } from '@/graphql/queries/getbooks.query';
import Home from '@/pages/index';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

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

describe('Home', () => {
    it('renders home page correctly', async () => {
        render(
            <MockedProvider>
                <AuthProvider>
                    <NotificationProvider>
                        <Navbar />
                        <Home />
                    </NotificationProvider>
                </AuthProvider>
            </MockedProvider >
        )

        const homeContainer = await screen.findByTestId('home');
        expect(homeContainer).toBeInTheDocument()
    });

    it('renders book list properly', async () => {

        const mocks = [
            {
                request: {
                    query: GET_ALL_BOOKS,
                },
                result: {
                    data: {
                        getAllBooks: {
                            books: [{
                                id: "1", description: "hello",
                                title: "",
                                author: "",
                                date: "",
                                coverImage: ""
                            }],
                            hasMore: false
                        }
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={mocks}>
                <AuthProvider>
                    <NotificationProvider>
                        <Navbar />
                        <Home />
                    </NotificationProvider>
                </AuthProvider>
            </MockedProvider >
        )

        const bookListContainer = await screen.findByTestId('booklist-container');
        expect(bookListContainer).toBeInTheDocument();
        await waitFor(async () => {
            const eachBook = await screen.findAllByTestId('each-book');
            expect(eachBook).toHaveLength(1);
        })
    });


})