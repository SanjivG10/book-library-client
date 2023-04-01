import { BACKEND_URLS, PAGE_URLS } from '@constants/urls'
import Link from 'next/link'

const EachBook = ({ book }) => {

    return (
        <div className='bg-white shadow-md rounded-lg p-1 m-2'>
            <div className='flex flex-col sm:flex-row'>
                <div className='flex-shrink-0'>
                    <Link href={PAGE_URLS.EACH_BOOK + "/" + book.id}>
                        <img
                            src={BACKEND_URLS.IMAGE_URL + book.coverImage}
                            alt={book.title}
                            className="object-cover object-center rounded-t-lg mb-4 sm:mb-0 h-48 w-full sm:w-36"
                        />
                    </Link>
                </div>
                <div className='flex-grow p-4'>

                    <Link href={PAGE_URLS.EACH_BOOK + "/" + book.id}>
                        <h4 className='text-2xl mb-2 font-semibold'>{book.title}</h4>
                    </Link>
                    <p className='text-gray-600 mb-2'>By <span className='font-extrabold'>{book.author}</span></p>
                    <div className='flex flex-col'>
                        <div className="pr-4">
                            <p className="text-gray-600">{book.description} ...</p>
                        </div>
                        <Link href={PAGE_URLS.EACH_BOOK + "/" + book.id}>
                            <button className='bg-gray-800 hover:bg-gray-700 my-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white py-2 px-4 rounded-md'>
                                Read more
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default EachBook