import { useQuery } from '@apollo/client';
import { BACKEND_URLS } from '@constants/urls';
import GET_BOOKS from '@graphql/queries/getbooks.query.js';
import { useEffect, useState } from 'react';
import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

const ViewBooks = () => {
    const [books, setBooks] = useState([]);
    const [activeTab, setActiveTab] = useState('WANT_TO_READ');
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
        if (data) {
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
            <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="mr-2">Sort by title</span>
                    <button
                        onClick={() => onSortChange('title')}
                        className="focus:outline-none"
                    >
                        {sortConfig.key === 'title' && sortConfig.direction === 'asc' ? (
                            <FaSortAlphaUp className="text-blue-500" />
                        ) : (
                            <FaSortAlphaDown className="text-blue-500" />
                        )}
                    </button>
                </div>
                <div>
                    <span className="mr-2">Sort by date</span>
                    <button
                        onClick={() => onSortChange('date')}
                        className="focus:outline-none"
                    >
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedBooks.map((book) => (
                    <div key={book.id} className="bg-white shadow-md rounded-lg p-6">
                        <img
                            src={BACKEND_URLS.IMAGE_URL + book.coverImage}
                            alt={book.title}
                            className="w-full h-48 object-cover object-center rounded-t-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold">{book.title}</h3>
                        <p className="text-gray-600">Author: {book.author}</p>
                        <p className="text-gray-600">Date: {book.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewBooks;

