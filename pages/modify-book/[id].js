import { useQuery } from '@apollo/client';
import BookForm from '@components/BookForm';
import { withAuth } from '@context/AuthContext';
import { GET_BOOK } from '@graphql/queries/getbook.query.js';
import { useRouter } from 'next/router';

const ModifyBook = () => {
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_BOOK, { variables: { id: router.query.id } });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    const onCompletion = () => {
        console.log("UPDATED");
    }

    return (<BookForm onCompletion={onCompletion} defaultValues={data.getBook} />);

}

export default withAuth(ModifyBook);
