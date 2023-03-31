
import BookForm from '@components/BookForm';
import { PAGE_URLS } from '@constants/urls';
import { withAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';

const AddBook = () => {

    const router = useRouter();
    const onCompletion = () => {
        router.push(PAGE_URLS.HOME);
    }

    return (
        <BookForm onCompletion={onCompletion} />
    );
};

export default withAuth(AddBook);


