import { useEffect, useState } from "react";

import {
    FiBook,
    FiBookOpen,
    FiCheckCircle
} from "react-icons/fi";

import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from "@apollo/client";
import EachBook from "@components/Book/EachBook";
import EmptyBookList from "@components/Book/EmptyBookList";
import Error from "@components/common/Error";
import Spinner from "@components/common/Spinner";
import { MAX_DESCRIPTION_LENGTH } from "@constants/book";
import { GET_USER_BOOKS } from "@graphql/queries/getbooks.query";
import { useAuth } from "@hooks/useAuth.hook";
import { getUniqueItemsByKey } from "@lib/utils";
import { HiBuildingLibrary } from "react-icons/hi2";


const UserBookList = () => {

    const [collectionType, setCollectionType] = useState("WANT_TO_READ");
    const [activeSort, setActiveSort] = useState("title");
    const [page, setPage] = useState(1);
    const [books, setBooks] = useState([]);
    const { loading: userLoading } = useAuth();
    const [hasMore, setHasMore] = useState(false);

    const { data, error, loading, fetchMore, refetch } = useQuery(GET_USER_BOOKS, {
        variables: {
            collectionType,
            page,
            limit: 1
        }
    });

    useEffect(() => {
        refetch({ collectionType })
    }, [collectionType])

    useEffect(() => {
        if (data?.getUserBooks) {
            const allBooks = [...books, ...data.getUserBooks.books].map((book) => { return { ...book, description: book.description.substring(0, MAX_DESCRIPTION_LENGTH) } });

            const uniqueItems = getUniqueItemsByKey(allBooks, "id");
            setBooks(uniqueItems);
        }
    }, [data])

    const fetchMoreBooks = async () => {
        const newPage = page + 1;
        setPage(newPage);
        const result = await fetchMore({
            variables: { page: newPage },
        });

        setHasMore(result.data.getUserBooks.hasMore)
    };

    const sortBooks = (books, activeSort) => {
        const sortedBooks = [...books];
        if (activeSort === "title") {
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (activeSort === "date") {
            sortedBooks.sort((a, b) => a.date.localeCompare(b.date));
        }
        return sortedBooks;
    };

    const onTabChange = (type) => {
        setCollectionType(type);
    }

    const filteredBooks = books.filter((book) => book.collectionType === collectionType);

    const sortedBooks = sortBooks(filteredBooks, activeSort);

    if (loading || userLoading) return <Spinner />
    if (error) return <Error error={error} />

    return (
        <div className="flex flex-col md:flex-row h-full">
            <div className="flex-shrink-0 w-full md:w-48 border-r border-gray-200">
                <div className="flex flex-col h-full justify-between">
                    <nav className="flex-1">
                        <div className="px-2 space-y-1">
                            <button
                                onClick={() => onTabChange("WANT_TO_READ")}
                                className={`
                                    ${collectionType === "WANT_TO_READ"
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 "} 
                                        group flex items-center px-2 py-2 text-sm font-medium rounded-md
                                `}
                            >
                                <FiBookOpen className="mr-3 h-6 w-6" aria-hidden="true" />
                                Want to Read
                            </button>

                            <button
                                onClick={() => onTabChange("READING")}
                                className={`
                                    ${collectionType === "READING"
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 "} 
                                        group flex items-center px-2 py-2 text-sm font-medium rounded-md
                                `}
                            >
                                <FiBook className="mr-3 h-6 w-6" aria-hidden="true" />
                                Reading
                            </button>

                            <button
                                onClick={() => onTabChange("READ")}
                                className={`
                                    ${collectionType === "READ"
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 "} 
                                        group flex items-center px-2 py-2 text-sm font-medium rounded-md
                                `}
                            >
                                <FiCheckCircle className="mr-3 h-6 w-6" aria-hidden="true" />
                                Read
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="flex-1 my-2">
                <div className="flex items-center m-2">
                    <label htmlFor="sort" className="text-gray-500 font-medium">
                        Sort by:
                    </label>

                    <select
                        id="sort"
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={activeSort}
                        onChange={(e) => setActiveSort(e.target.value)}
                    >
                        <option value="title">Title</option>
                        <option value="publishedDate">Date</option>
                    </select>
                </div>

                <div className="mx-2 text-xl font-semibold flex items-center">
                    <HiBuildingLibrary className="inline-block mr-2" />
                    <div>
                        Bookshelf
                    </div>
                </div>


                <InfiniteScroll
                    dataLength={sortedBooks.length}
                    next={fetchMoreBooks}
                    hasMore={hasMore}
                    loader={<Spinner />}
                >
                    <div className='flex flex-col'>

                        {sortedBooks.length ? (
                            sortedBooks.map((book) => (<EachBook key={book.id} book={book} />))
                        ) : (
                            <EmptyBookList />
                        )}
                    </div>

                </InfiniteScroll>
            </div>
        </div>
    );
}

export default UserBookList;