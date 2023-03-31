import Rating from '@components/common/Rating'
import { BACKEND_URLS, PAGE_URLS } from '@constants/urls'
import Link from 'next/link'

const EachBook = ({ book }) => {
    return (
        <div>
            <div className='bg-white shadow-md rounded-lg p-1 flex flex-col m-2 h-[200px]'>
                <Link href={PAGE_URLS.EACH_BOOK + "/" + book.id} >
                    <img
                        src={BACKEND_URLS.IMAGE_URL + book.coverImage}
                        alt={book.title}
                        className="object-cover object-center rounded-t-lg mb-4 h-48 w-36"
                    />
                </Link>
                <button className='bg-green-800 text-white'>
                    Want to read
                </button>
                <Rating />
            </div>
        </div>
    )
}

export default EachBook