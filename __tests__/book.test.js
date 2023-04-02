
import EachBookDetail from '@/components/Book/EachBookDetail';
import Navbar from '@/components/common/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { getServerSideProps } from '@/pages/book/[id].js';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

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


const mockResult = {
    data: {
        getBook: {
            id: "1",
            description: "hello",
            title: "Test Book",
            author: "Test Author",
            date: new Date().toISOString(),
            coverImage: "test.jpg"
        }
    }
};

jest.mock('../pages/book/[id]', () => ({

    getServerSideProps: jest.fn().mockImplementation(() => ({
        props: {
            data: mockResult.data
        }
    }))
}));

describe('Each Book', () => {

    it('renders one book page correctly', async () => {
        const { props } = await getServerSideProps();
        act(() => {
            render(
                <MockedProvider mocks={[]}>
                    <AuthProvider>
                        <NotificationProvider>
                            <Navbar />
                            <EachBookDetail book={props.data.getBook} />
                        </NotificationProvider>
                    </AuthProvider>
                </MockedProvider>
            )
        })

        await waitFor(async () => {
            const title = await screen.findByTestId('book-title');
            expect(title).toBeInTheDocument();
            expect(title.textContent).toBe("Test Book");
        })

    });
})