import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '@graphql/queries/getbooks.query';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EachBookDetail from './EachBookDetail';


const BooksList = () => {
    const [page, setPage] = useState(1);
    const { data, loading, error, fetchMore } = useQuery(GET_ALL_BOOKS, {
        variables: { limit: 2, page },
    });
    const [hasMore, setHasMore] = useState(true);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (data?.getAllBooks) {
            setBooks((prevBooks) => [...prevBooks, ...data.getAllBooks.items]);
        }
    }, [data])

    const fetchMoreBooks = async () => {
        setPage((prevPage) => prevPage + 1);
        const result = await fetchMore({
            variables: { page },
        });



        if (result.data.getAllBooks.totalCount > books.length) {
            setHasMore(true);
        }
        else {
            setHasMore(false);
        }
    };

    if (error) return <div>Error loading books</div>;


    return (
        <InfiniteScroll
            dataLength={books.length}
            next={fetchMoreBooks}
            hasMore={hasMore}
            loader={<div className="text-center my-4">Loading more books...</div>}
        >
            {books.map((book) => (
                <EachBookDetail key={book.id} book={book} />
            ))}
            {loading && <div>
                loading...</div>}
        </InfiniteScroll>
    );
};

export default BooksList;
