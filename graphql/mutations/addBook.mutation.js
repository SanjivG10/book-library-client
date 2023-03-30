import { gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $date: String!, $coverImage: String!, $collectionType: collectionType!) {
    addBook(title: $title, author: $author, date: $date, coverImage: $coverImage, collectionType: $collectionType) {
      id
    }
  }
`;

export default ADD_BOOK;
