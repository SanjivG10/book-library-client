import { useQuery } from '@apollo/client';
import EachBookDetail from '@components/Book/EachBookDetail';
import Error from '@components/common/Error';
import Spinner from '@components/common/Spinner';
import { GET_BOOK } from '@graphql/queries/getbook.query.js';
import { useRouter } from 'next/router';

const EachBook = () => {
    const router = useRouter();
    const bookId = router.query.id
    const { loading, error, data } = useQuery(GET_BOOK, { variables: { bookId }, nextFetchPolicy: "no-cache" });

    if (loading) return <Spinner />
    if (error) return <Error error={error} />

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <EachBookDetail book={data?.getBook} />
        </div>
    );

}

export default EachBook;
