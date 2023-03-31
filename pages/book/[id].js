import { useMutation, useQuery } from '@apollo/client';
import EachBookDetail from '@components/Book/EachBookDetail';
import BookForm from '@components/BookForm';
import { PAGE_URLS } from '@constants/urls';
import { withAuth } from '@context/AuthContext';
import { GET_BOOK, UPDATE_BOOK } from '@graphql/queries/getbook.query.js';
import { useRouter } from 'next/router';

const ModifyBook = () => {
    const router = useRouter();
    const bookId = router.query.id
    const { loading, error, data } = useQuery(GET_BOOK, { variables: { bookId } });
    const [updateBook] = useMutation(UPDATE_BOOK);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{JSON.stringify(error)}</p>;

    const onSubmit = async (data, uploadedImageUrl) => {
        try {
            await updateBook({ variables: { bookId, ...data, coverImage: uploadedImageUrl } });
            router.push(PAGE_URLS.HOME);
        }
        catch {
            console.log("UPDATE FAILED")
        }
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <EachBookDetail book={data?.getBook} />
        </div>
    );

}

export default withAuth(ModifyBook);
