import { useQuery } from '@apollo/client';
import EachBook from '@components/Book/EachBook';
import { useAuth } from "@context/AuthContext";
import { GET_BOOKS } from '@graphql/queries/getbooks.query.js';
import { useEffect, useState } from 'react';
import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

const ViewBooks = () => {
    const [books, setBooks] = useState([]);
    const [activeTab, setActiveTab] = useState('WANT_TO_READ');
    const { user } = useAuth();

    const { loading, error, data, refetch } = useQuery(GET_BOOKS, {
        variables: {
            collectionType: activeTab
        }
    });
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });

    useEffect(() => {
        refetch();
    }, [activeTab])

    useEffect(() => {
        if (data?.getBooks) {
            setBooks(data.getBooks);
        }
    }, [data]);

    const filteredBooks = books.filter(book => book.collectionType === activeTab);
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (sortConfig.key === 'title') {
            return sortConfig.direction === 'asc'
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
        } else {
            return sortConfig.direction === 'asc'
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
        }
    });

    const onTabChange = (tab) => {
        setActiveTab(tab);
    };

    const onSortChange = (key) => {
        setSortConfig(prevConfig => {
            if (prevConfig.key === key) {
                return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'asc' };
            }
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center mt-4 mb-6">
                <button
                    onClick={() => onTabChange('WANT_TO_READ')}
                    className={`${activeTab === 'WANT_TO_READ' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                        } px-4 py-2 border-2 border-blue-500 rounded-l-lg font-semibold focus:outline-none`}
                >
                    Want to read
                </button>
                <button
                    onClick={() => onTabChange('READING')}
                    className={`${activeTab === 'READING' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                        } px-4 py-2 border-t-2 border-b-2 border-blue-500 font-semibold focus:outline-none`}
                >
                    Reading
                </button>
                <button
                    onClick={() => onTabChange('READ')}
                    className={`${activeTab === 'READ' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                        } px-4 py-2 border-2 border-blue-500 rounded-r-lg font-semibold focus:outline-none`}
                >
                    Read
                </button>
            </div>
            <div className="flex items-center mb-4">
                <div className='border-2 rounded p-1 cursor-pointer '>
                    <button
                        onClick={() => onSortChange('title')}
                        className="focus:outline-none flex items-center justify-center"
                    >
                        <span className="mr-2">Sort by title</span>
                        {sortConfig.key === 'title' && sortConfig.direction === 'asc' ? (
                            <FaSortAlphaUp className="text-blue-500" />
                        ) : (
                            <FaSortAlphaDown className="text-blue-500" />
                        )}
                    </button>
                </div>
                <div className='border-2 rounded p-1 cursor-pointer mx-2'>
                    <button
                        onClick={() => onSortChange('date')}
                        className="focus:outline-none flex items-center justify-center"
                    >
                        <span className="mr-2">Sort by date</span>
                        {sortConfig.key === 'date' && sortConfig.direction === 'asc' ? (
                            <FaSortNumericUp className="text-blue-500" />
                        ) : (
                            <FaSortNumericDown className="text-blue-500" />
                        )}
                    </button>
                </div>
            </div>
            {sortedBooks.length === 0 && <div className='text-center text-xl font-weight-bold'>
                No books for this category!
            </div>}
            <div className="flex flex-wrap items-center justify-start">
                {sortedBooks.map((book) => (
                    <EachBook key={book.id} book={book} isOwner={user?.id === book.user} />
                ))}
            </div>
        </div>
    );
}

export default ViewBooks;

