
import { gql } from '@apollo/client';

const FINISH_BOOK = gql`
  mutation FinishBook($bookId:ID!) {
    finishBook(bookId:$bookId) {
      id
      finished
    }
  }
`;

export default FINISH_BOOK;
