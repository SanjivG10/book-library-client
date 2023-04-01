


import { gql } from '@apollo/client';

const UPDATE_BOOK_SHELF = gql`
  mutation addOrUpdateBookshelf($bookId:ID!,$collectionType:collectionType!) {
    addOrUpdateBookshelf(bookId:$bookId,collectionType:$collectionType) {
      id
    }
  }
`;

export default UPDATE_BOOK_SHELF;
