import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '@graphql/queries/getbooks.query';
import { useEffect, useState } from 'react';
import EachBook from './EachBook';


const getUniqueItemsByKey = (items, key) => {
    const arrayUniqueByKey = [...new Map(items.map(item =>
        [item[key], item])).values()];
    return arrayUniqueByKey;
}


const BooksList = () => {
    const [page, setPage] = useState(1);
    const { data, loading, error, fetchMore } = useQuery(GET_ALL_BOOKS, {
        variables: { limit: 2, page },
    });
    const [hasMore, setHasMore] = useState(true);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (data?.getAllBooks) {
            const uniqueItems = getUniqueItemsByKey([...books, ...data.getAllBooks.items], "id");
            setBooks(uniqueItems);
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
        <div className='flex flex-col flex-wrap md:flex-row'>
            {books.map((book) => (
                <EachBook key={book.id} book={book} />
            ))}
            {loading && <div>
                loading...</div>}
        </div>
    );
};

export default BooksList;
