import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    getBooks{
      id
      title
      author
      date
      coverImage
      user
    }
  }
`;


export const GET_ALL_BOOKS = gql`
  query GetAllBooks($limit:Int,$page:Int) {
    getAllBooks(limit:$limit,page:$page) {
       items {
        id
        title
        author
        date
        coverImage
      }
      totalCount
    }
  }
`;
