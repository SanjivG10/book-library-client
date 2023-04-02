
import { useLazyQuery, useMutation } from '@apollo/client';
import Rating from '@components/common/Rating';
import ReadingDropdownOption from '@components/common/ReadingDropdownOption';
import { BACKEND_URLS } from '@constants/urls';
import { NotificationContext } from '@context/NotificationContext';
import FINISH_BOOK from '@graphql/mutations/finishBook.mutation';
import RATE_BOOK from '@graphql/mutations/rateBook.mutation';
import UPDATE_BOOK_SHELF from '@graphql/mutations/updateShelf.mutation';
import { USER_BOOK_STATUS } from '@graphql/queries/userBookStatus.query';
import { useAuth } from '@hooks/useAuth.hook';
import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';

const EachBookDetail = ({ book }) => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date(book?.date);
    const dateString = today.toLocaleDateString("en-US", options);

    const [finishBook] = useMutation(FINISH_BOOK);
    const [rateBook] = useMutation(RATE_BOOK);
    const [addOrUpdateBookshelf] = useMutation(UPDATE_BOOK_SHELF)

    const [getCurrentUserStatus] = useLazyQuery(USER_BOOK_STATUS);

    const [isBookFinished, setIsBookFinished] = useState(false);
    const [currentUserRating, setCurrentUserRating] = useState(0);
    const [userBookSelectedOption, setUserSelectedOption] = useState('');
    const { user } = useAuth();
    const { setShowAuthModal } = useContext(NotificationContext);
    const { t } = useTranslation();

    const fetchCurrentUserBookStatus = async () => {
        const response = await getCurrentUserStatus({
            variables: {
                bookId: book.id
            }
        });

        const { collectionType = "", finished = false, rating = 0 } = response?.data?.userBookStatus || {};
        setCurrentUserRating(rating);
        setUserSelectedOption(collectionType);
        setIsBookFinished(finished);

    }

    useEffect(() => {

        (async () => {
            if (user) {
                fetchCurrentUserBookStatus();
            }
        })()
    }, [user])

    const checkIfUserExistAndShowModalIfNot = () => {
        if (!user) {
            setShowAuthModal(true);
            return false;
        }
        return true;
    }

    const onFinish = async () => {
        const isUser = checkIfUserExistAndShowModalIfNot();
        if (!isUser) {
            return;
        }
        const bookFinishedResponse = await finishBook({
            variables: {
                bookId: book.id
            }
        });
        setIsBookFinished(bookFinishedResponse.data.finishBook.finished);
    }

    const onUserRating = async (rating = 5) => {
        const isUser = checkIfUserExistAndShowModalIfNot();
        if (!isUser) {
            return;
        }
        const currentUserRatingResponse = await rateBook({
            variables: {
                bookId: book.id,
                rating
            }
        });
        setCurrentUserRating(currentUserRatingResponse.data.addOrUpdateRating.rating);
    }

    const onBookReadOptionSelected = async (value) => {
        const isUser = checkIfUserExistAndShowModalIfNot();
        if (!isUser) {
            return;
        }
        setUserSelectedOption(value);
        await addOrUpdateBookshelf({
            variables: {
                bookId: book.id,
                collectionType: value
            }
        });
    };


    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <img
                        src={BACKEND_URLS.IMAGE_URL + book.coverImage}
                        alt={book.title}
                        className="object-cover object-center rounded-lg mb-4 h-96 w-full"
                    />

                    <ReadingDropdownOption selectedOption={userBookSelectedOption} onChange={onBookReadOptionSelected} />

                </div>
                <div className="md:w-2/3 md:pl-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold mb-2">{book.title}</h1>
                        <p className="text-gray-600 mb-4">By {book.author}</p>
                        <div className="flex items-center mb-4">

                            <button onClick={onFinish} className="bg-indigo-800 text-white py-2 px-4 mr-2 rounded-md">
                                {isBookFinished ? t("Finished") : t("Finish")}
                            </button>
                            <Rating value={currentUserRating} onClick={onUserRating} />
                        </div>
                        <p className="text-gray-800 text-lg mb-4">
                            {book.description}
                        </p>

                    </div>
                    <p className="text-gray-600 text-sm ml-auto">
                        {t("Published on")}
                        <span className='font-semibold mx-1'> {dateString}</span>
                    </p>
                </div>

            </div>
        </div>

    )
}

export default EachBookDetail