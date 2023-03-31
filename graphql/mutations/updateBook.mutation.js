

import { gql } from '@apollo/client';

export const UPDATE_BOOK = gql`
  mutation UpdateBook($bookId: ID!, $title: String!, $author: String!, $date: String!, $coverImage: String!, $collectionType: collectionType!) {
    updateBook(bookId: $bookId, title: $title, author: $author, date: $date, coverImage: $coverImage, collectionType: $collectionType) {
      id
      title
      author
      date
      coverImage
      collectionType
    }
  }
`;
