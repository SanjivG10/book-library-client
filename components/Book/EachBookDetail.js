
import Rating from '@components/common/Rating'
import { BACKEND_URLS } from '@constants/urls'
import { useRouter } from 'next/router'

const EachBookDetail = ({ book }) => {
    const router = useRouter();

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date(book?.date);
    const dateString = today.toLocaleDateString("en-US", options)

    return (
        <div className="bg-white rounded-lg flex flex-col md:flex-row  m-2 sm:p-2 border-2">
            <div>
                <img
                    src={BACKEND_URLS.IMAGE_URL + book.coverImage}
                    alt={book.title}
                    className="object-cover object-center rounded-t-lg mb-4"
                    width={300}
                    height={600}
                />

                <select
                    defaultValue={book.collectionType}
                    name="collectionType"
                    className={`border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                >
                    <option value="">Select a collection</option>
                    <option value="WANT_TO_READ">Want to read</option>
                    <option value="READING">Reading</option>
                    <option value="READ">Read</option>
                </select>

            </div>
            <div className='flex flex-col sm:mx-1 lg:md-10 my-2 w-full m-2'>
                <div className='flex flex-col justify-between'>
                    <div>
                        <h1 className="text-4xl font-semibold">{book.title}</h1>
                        <p className="text-gray-600">{book.author}</p>
                        <Rating value={book.rating} />
                    </div>

                    <p className="text-gray-600"><span className='mr-1 font-semibold'>Published</span> {dateString}</p>
                </div>

                <button className='bg-purple-800 text-white max-w-fit p-2 my-2'>
                    Finish
                </button>
            </div>
        </div>
    )
}

export default EachBookDetail