
import { gql } from '@apollo/client';

export const BOOK_UPDATE = gql`
  subscription BookUpdate {
    bookUpdate {
        id
        title
        date
        username
        rating
    }
  }
`;