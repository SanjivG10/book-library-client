import { useQuery } from '@apollo/client';
import Error from '@components/common/Error';
import Spinner from '@components/common/Spinner';
import { MAX_DESCRIPTION_LENGTH } from '@constants/book';
import { GET_ALL_BOOKS } from '@graphql/queries/getbooks.query';
import { getUniqueItemsByKey } from '@lib/utils';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EachBook from './EachBook';



const BooksList = () => {
    const [page, setPage] = useState(1);
    const { data, error, fetchMore } = useQuery(GET_ALL_BOOKS, {
        variables: { limit: 2, page },
    });
    const [hasMore, setHasMore] = useState(false);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (data?.getAllBooks) {
            const allBooks = [...books, ...data.getAllBooks.books].map((book) => { return { ...book, description: book.description.substring(0, MAX_DESCRIPTION_LENGTH) } });

            const uniqueItems = getUniqueItemsByKey(allBooks, "id");
            setBooks(uniqueItems);
        }
    }, [data])

    const fetchMoreBooks = async () => {
        setPage((prevPage) => prevPage + 1);
        const result = await fetchMore({
            variables: { page },
        });

        setHasMore(result.data.getAllBooks.hasMore)
    };

    if (error) return <Error error={error} />

    return (
        <>
            <InfiniteScroll
                dataLength={books.length}
                next={fetchMoreBooks}
                hasMore={hasMore}
                loader={<Spinner />}
            >
                <div className='flex flex-col'>
                    {books.map((book) => (
                        <div key={book.id} className='my-1'>
                            <EachBook key={book.id} book={book} />
                        </div>
                    ))}
                </div>

            </InfiniteScroll>
        </>
    );
};

export default BooksList;
