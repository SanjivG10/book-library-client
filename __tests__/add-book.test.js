
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';


import ADD_BOOK from '@/graphql/mutations/addBook.mutation';
import AddBook from '@/pages/add-book';

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

describe('Add Book', () => {

    const mocks = [
        {
            request: {
                query: ADD_BOOK,
                variables: { title: "TITLE", author: "AUTHOR", date: new Date().toISOString(), coverImage: "hello.jpg", description: "desc" },
                context: {
                    "Authorization": "Bearer token"
                }
            },
            result: {
                data: {
                    addBook: {
                        id: '1',
                    },
                },
            },
        },
    ];

    it('validate book form', async () => {
        const mockRouterPush = jest.fn();
        jest.mock('next/router', () => ({
            useRouter() {
                return {
                    push: mockRouterPush,
                };
            },
        }));

        render(
            <MockedProvider mocks={mocks}>
                <AddBook />
            </MockedProvider>
        )

        const title = await screen.findByTestId('title');
        const author = await screen.findByTestId('author');
        const date = await screen.findByTestId('date');
        const coverImage = await screen.findByTestId('coverImage');
        const description = await screen.findByTestId('description');
        const submitButton = await screen.findByTestId('submit');


        fireEvent.change(title, { target: { value: 'Harry Potter' } });
        fireEvent.change(author, { target: { value: 'JK Rawling' } });
        fireEvent.change(date, { target: { value: new Date().toISOString() } });
        fireEvent.change(description, { target: { value: 'JK Rawling written book harry Potter ...' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledTimes(0)
        })




    });
})