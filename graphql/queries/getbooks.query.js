import { gql } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      id
      title
      author
      date
      coverImage
      collectionType
    }
  }
`;
export default GET_BOOKS;
