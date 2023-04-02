import BooksList from "@/components/Book/BookList";
import { PAGE_URLS } from "@/constants/urls";
import { useAuth } from "@/hooks/useAuth.hook";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";
import { BsRocketFill } from "react-icons/bs";
import { getAllBooksForHomePage } from "@/graphql/services";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";


export async function getServerSideProps({ locale = "en" }) {

  const bookResponse = await getAllBooksForHomePage();
  return {
    props: {
      bookResponse,
      ...(await serverSideTranslations(locale)),
    },
  }
}

const Home = ({ bookResponse }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  return (
    <>

      <div className='m-2 flex items-center'>
        <Link href={PAGE_URLS.LIVE}>
          <button className="bg-red-500 ml-2 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-48">
            <BsRocketFill className="inline-block mr-2" />
            {t("live")}
          </button>
        </Link>
        {user &&
          <>
            <Link href={PAGE_URLS.ADD_BOOK}>
              <button className="bg-blue-500 mx-2 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded my-2 w-48">
                <FaPlus className="inline-block mr-2" />
                {t("Add a Book")}
              </button>
            </Link>

            <Link href={PAGE_URLS.LIBRARY}>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-48">
                <HiBuildingLibrary className="inline-block mr-2" />
                {t("Your Shelf")}
              </button>
            </Link>
          </>

        }

      </div>
      <BooksList {...bookResponse} />
    </>
  )
}

export default Home;
