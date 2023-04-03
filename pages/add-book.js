
import { useMutation } from '@apollo/client';
import BookForm from '@/components/forms/BookForm';
import { PAGE_URLS } from '@/constants/urls';
import { withAuth } from '@/contexts/AuthContext';
import ADD_BOOK from '@/graphql/mutations/addBook.mutation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

export async function getStaticProps({ locale = "en" }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}

const AddBook = () => {

    const router = useRouter();
    const [addBook] = useMutation(ADD_BOOK);

    const onSubmit = async (data, image) => {
        const { title, author, date, description } = data;
        const bookResult = await addBook({
            variables: { title, author, date: date.toISOString(), coverImage: image, description }
        });

        router.push(PAGE_URLS.EACH_BOOK + "/" + bookResult.data.addBook.id);
    }

    return (
        <BookForm onSubmit={onSubmit} />
    );
};

export default withAuth(AddBook);


