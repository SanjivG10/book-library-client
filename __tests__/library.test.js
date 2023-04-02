


import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';


import BookShelfPage from "@/pages/library"
import '@testing-library/jest-dom';
import { GET_USER_BOOKS } from '@/graphql/queries/getbooks.query';
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

describe('Book Shelf Page', () => {
    beforeEach(() => {
        localStorage.setItem("token", "my token")
    });

    const mocks = [
        {
            request: {
                query: GET_USER_BOOKS,
                variables: {
                    collectionType: "WANT_TO_READ",
                    page: 1,
                    limit: 1
                },
            },
            result: {
                data: {
                    getUserBooks: {
                        books: [
                            {
                                id: "1",
                                title: "Test Title",
                                author: "Test Author",
                                date: new Date().toISOString(),
                                coverImage: "Cover Image",
                                description: "description",
                                collectionType: "WANT_TO_READ"
                            }
                        ],
                        hasMore: false
                    }
                },
            },
        },
    ];

    it('no books fetched', async () => {
        const mocks = [
            {
                request: {
                    query: GET_USER_BOOKS,
                    variables: {
                        collectionType: "WANT_TO_READ",
                        page: 1,
                        limit: 1
                    },
                },
                result: {
                    data: {
                        getUserBooks: {
                            books: [],
                            hasMore: false
                        }
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={mocks}>
                <AuthProvider>
                    <BookShelfPage />
                </AuthProvider>
            </MockedProvider>
        )

        await waitFor(async () => {
            const emptyBookContainer = await screen.findByTestId("empty-book");
            expect(emptyBookContainer).toBeInTheDocument();
        }, { timeout: 3000 })
    });

    it('fetches user data', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <AuthProvider>
                    <BookShelfPage />
                </AuthProvider>
            </MockedProvider>
        )

        await waitFor(async () => {
            const eachBookBrief = await screen.findAllByTestId("each-book-brief");
            expect(eachBookBrief).toHaveLength(1)
        })
    });
})