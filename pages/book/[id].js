import EachBookDetail from '@components/Book/EachBookDetail';
import Error from '@components/common/Error';
import Spinner from '@components/common/Spinner';
import { getSingleBook } from '@graphql/services';


export async function getServerSideProps(context) {

    const bookId = context.query.id
    const bookResponse = await getSingleBook(bookId);
    return {
        props: {
            ...bookResponse
        },
    }
}

const EachBook = ({ loading, error, data }) => {

    if (loading) return <Spinner />
    if (error) return <Error error={error} />

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <EachBookDetail book={data?.getBook} />
        </div>
    );

}

export default EachBook;
