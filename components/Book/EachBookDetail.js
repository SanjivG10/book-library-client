
import Rating from '@components/common/Rating';
import { BACKEND_URLS } from '@constants/urls';

const EachBookDetail = ({ book }) => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date(book?.date);
    const dateString = today.toLocaleDateString("en-US", options)

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <img
                        src={BACKEND_URLS.IMAGE_URL + book.coverImage}
                        alt={book.title}
                        className="object-cover object-center rounded-lg mb-4 h-96 w-full"
                    />
                </div>
                <div className="md:w-2/3 md:pl-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold mb-2">{book.title}</h1>
                        <p className="text-gray-600 mb-4">By {book.author}</p>
                        <div className="flex items-center mb-4">
                            <button className="bg-green-800 text-white py-2 px-4 mr-2 rounded-md">
                                Want to read
                            </button>
                            <Rating />
                        </div>
                        <p className="text-gray-800 text-lg mb-4">
                            {book.description}
                        </p>

                    </div>
                    <p className="text-gray-600 text-sm ml-auto">
                        Published on <span className='font-semibold'> {dateString}</span>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default EachBookDetail