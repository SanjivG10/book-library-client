import { gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $date: String!, $coverImage: String!,$description:String!) {
    addBook(title: $title, author: $author, date: $date, coverImage: $coverImage, description:$description) {
      id
    }
  }
`;

export default ADD_BOOK;
