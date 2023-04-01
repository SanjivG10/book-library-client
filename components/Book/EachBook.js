import Rating from '@components/common/Rating'
import { BACKEND_URLS, PAGE_URLS } from '@constants/urls'
import Link from 'next/link'

const EachBook = ({ book }) => {

    return (
        <div className='bg-white shadow-md rounded-lg p-1 m-2 w-full'>
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
                    <div className='flex items-center mb-2'>
                        <button className='bg-green-800 text-white p-2 border-r-2 rounded-md'>
                            Want to read
                        </button>
                        <Rating />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EachBook