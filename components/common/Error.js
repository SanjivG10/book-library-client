import { PAGE_URLS } from '@constants/urls';
import Link from 'next/link';
import { FaExclamationCircle } from 'react-icons/fa';

const Error = ({ error }) => {
    const errorMessage =
        (error.graphQLErrors && error.graphQLErrors.length
            ? error.graphQLErrors[0].message
            : error.message) || "Something went wrong. We apologize.";

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <div className="flex items-center">
                <div className="mr-3">
                    <FaExclamationCircle className="text-red-500" />
                </div>
                <div>
                    <p className="font-bold">Oops, something went wrong!</p>
                    <p className="text-sm">{errorMessage}</p>
                    <Link href={PAGE_URLS.HOME}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Go back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;
