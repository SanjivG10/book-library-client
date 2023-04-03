import { useQuery } from '@apollo/client';
import Error from '@/components/common/Error';
import Spinner from '@/components/common/Spinner';
import { MAX_DESCRIPTION_LENGTH } from '@/constants/book';
import { GET_ALL_BOOKS } from '@/graphql/queries/getbooks.query';
import { getUniqueItemsByKey } from '@/lib/utils';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EachBook from './EachBook';
import { useRouter } from 'next/router';



const BooksList = ({ data, error }) => {
    const [page, setPage] = useState(1);
    const { fetchMore, data: newData, error: newError, refetch } = useQuery(GET_ALL_BOOKS, {
        variables: page
    });
    const [hasMore, setHasMore] = useState(data?.getAllBooks?.hasMore || false);

    const [books, setBooks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        refetch();
    }, [router.pathname])

    useEffect(() => {
        const anyData = newData || data;
        if (anyData?.getAllBooks) {
            const allBooks = [...anyData.getAllBooks.books, ...books].map((book) => { return { ...book, description: book.description.substring(0, MAX_DESCRIPTION_LENGTH) } });

            const uniqueItems = getUniqueItemsByKey(allBooks, "id");
            setBooks(uniqueItems);
        }
    }, [data, newData])

    const fetchMoreBooks = async () => {
        try {
            setPage((prevPage) => prevPage + 1);
            const result = await fetchMore({
                variables: { page },
            });

            setHasMore(result.data.getAllBooks.hasMore)
        }
        catch {
            console.log("Fetch more error");
        }
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
                <div data-testid="booklist-container" className='flex flex-col'>
                    {books.map((book) => (
                        <div data-testid="each-book" key={book.id} className='my-1'>
                            <EachBook key={book.id} book={book} />
                        </div>
                    ))}
                </div>

            </InfiniteScroll>
        </>
    );
};

export default BooksList;
