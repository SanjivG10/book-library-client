
import { gql } from '@apollo/client';

export const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    getBook(bookId: $bookId) {
      id
      title
      author
      date
      coverImage
      description
    }
  }
`;