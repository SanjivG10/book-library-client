import BooksList from "@/components/Book/BookList";
import { PAGE_URLS } from "@/constants/urls";
import { getAllBooksForHomePage } from "@/graphql/services";
import { useAuth } from "@/hooks/useAuth.hook";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from "next/link";


export async function getServerSideProps({ locale = "en" }) {
  let bookResponse = {
    data: null,
    error: {}
  }
  try {
    bookResponse = await getAllBooksForHomePage();
  }
  catch (error) {
    bookResponse.error = JSON.stringify(error);
    console.log("Error fetching books!");
  }
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
      <div data-testid="home" className="m-2 flex flex-wrap justify-center">
        <div className="flex flex-col items-center md:w-1/4 w-full my-2">
          <div className="max-h-fit">
            <Link href={PAGE_URLS.LIVE}>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-48">
                🚀 {t("live")}
              </button>
            </Link>
          </div>
          {user && (
            <>
              <Link href={PAGE_URLS.ADD_BOOK}>
                <button className="bg-blue-500 mx-2 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded my-2 w-48">
                  📖 {t("Add a Book")}
                </button>
              </Link>
              <Link href={PAGE_URLS.LIBRARY}>
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-48">
                  📚 {t("Your Shelf")}
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="w-full md:w-3/4 bg-gray-300  rounded-lg">
          <BooksList {...bookResponse} />
        </div>
      </div>


    </>
  )
}

export default Home;
