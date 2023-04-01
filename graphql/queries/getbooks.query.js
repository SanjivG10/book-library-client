import { gql } from '@apollo/client';

export const GET_USER_BOOKS = gql`
  query GetUserBooks($collectionType:collectionType!, $limit:Int,$page:Int) {
    getUserBooks(collectionType:$collectionType, limit:$limit,page:$page){
       books {
          id
          title
          author
          date
          coverImage
          description
          collectionType
      }
      hasMore
    }
  }
`;


export const GET_ALL_BOOKS = gql`
  query GetAllBooks($limit:Int,$page:Int) {
    getAllBooks(limit:$limit,page:$page) {
       books {
        id
        title
        author
        date
        coverImage
        description
      }
      hasMore
    }
  }
`;
