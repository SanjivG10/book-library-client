import { client } from "@/graphql/client"
import { GET_ALL_BOOKS } from "./queries/getbooks.query"
import { GET_BOOK } from "./queries/getbook.query";

export const getAllBooksForHomePage = async (page = 1, limit = 10) => {
    const response = await client.query({
        query: GET_ALL_BOOKS,
        variables: {
            page,
            limit
        }
    });

    return response;
}

export const getSingleBook = async (bookId) => {
    const response = await client.query({
        query: GET_BOOK,
        variables: {
            bookId,
        },
        fetchPolicy: "no-cache"
    });

    return response;
}