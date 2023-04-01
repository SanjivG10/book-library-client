import { useMutation, useQuery } from '@apollo/client';
import EachBookDetail from '@components/Book/EachBookDetail';
import Error from '@components/common/Error';
import Spinner from '@components/common/Spinner';
import { PAGE_URLS } from '@constants/urls';
import { withAuth } from '@context/AuthContext';
import { UPDATE_BOOK } from '@graphql/mutations/updateBook.mutation';
import { GET_BOOK } from '@graphql/queries/getbook.query.js';
import { useRouter } from 'next/router';

const EachBook = () => {
    const router = useRouter();
    const bookId = router.query.id
    const { loading, error, data } = useQuery(GET_BOOK, { variables: { bookId } });
    const [updateBook] = useMutation(UPDATE_BOOK);



    const onSubmit = async (data, uploadedImageUrl) => {
        try {
            await updateBook({ variables: { bookId, ...data, coverImage: uploadedImageUrl } });
            router.push(PAGE_URLS.HOME);
        }
        catch {
            console.log("UPDATE FAILED")
        }
    }

    if (loading) return <Spinner />
    if (error) return <Error error={error} />

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <EachBookDetail book={data?.getBook} />
        </div>
    );

}

export default withAuth(EachBook);
