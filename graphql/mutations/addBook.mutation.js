import { gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $date: String, $coverImage: String, $collection: String!) {
    addBook(title: $title, author: $author, date: $date, coverImage: $coverImage, collection: $collection) {
      id
      title
      author
      date
      coverImage
      collection
    }
  }
`;

export default ADD_BOOK;
