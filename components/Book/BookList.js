import { useQuery } from '@apollo/client';
import Error from '@/components/common/Error';
import Spinner from '@/components/common/Spinner';
import { MAX_DESCRIPTION_LENGTH } from '@/constants/book';
import { GET_ALL_BOOKS } from '@/graphql/queries/getbooks.query';
import { getUniqueItemsByKey } from '@/lib/utils';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EachBook from './EachBook';



const BooksList = ({ data, error }) => {
    const [page, setPage] = useState(1);
    const { fetchMore, data: newData, error: newError } = useQuery(GET_ALL_BOOKS, {
        variables: page
    });
    const [hasMore, setHasMore] = useState(data?.getAllBooks?.hasMore || false);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const anyData = newData || data;
        if (anyData?.getAllBooks) {
            const allBooks = [...books, ...anyData.getAllBooks.books].map((book) => { return { ...book, description: book.description.substring(0, MAX_DESCRIPTION_LENGTH) } });

            const uniqueItems = getUniqueItemsByKey(allBooks, "id");
            setBooks(uniqueItems);
        }
    }, [data, newData])

    const fetchMoreBooks = async () => {
        setPage((prevPage) => prevPage + 1);
        const result = await fetchMore({
            variables: { page },
        });

        setHasMore(result.data.getAllBooks.hasMore)
    };

    if (error || newError) return <Error error={newError || error} />

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
