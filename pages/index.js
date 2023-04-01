import BooksList from "@components/Book/BookList";
import { PAGE_URLS } from "@constants/urls";
import { useAuth } from "@hooks/useAuth.hook";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      {user &&
        <div className='m-2 flex flex-col justify-around'>
          <Link href={PAGE_URLS.ADD_BOOK}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded my-2 w-48">
              <FaPlus className="inline-block mr-2" />
              Add a Book
            </button>
          </Link>

          <Link href={PAGE_URLS.LIBRARY}>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-48">
              <HiBuildingLibrary className="inline-block mr-2" />
              Your Shelf
            </button>
          </Link>

        </div>
      }
      <BooksList />
    </>
  )
}

export default Home;
