

import { gql } from '@apollo/client';

const RATE_BOOK = gql`
  mutation RateBook($bookId:ID!,$rating:Int!) {
    addOrUpdateRating(bookId:$bookId,rating:$rating) {
      id
      rating
    }
  }
`;

export default RATE_BOOK;
