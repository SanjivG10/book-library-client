
import { gql } from '@apollo/client';

export const USER_BOOK_STATUS = gql`
  query GetUserBookStatus($bookId:ID!){
    userBookStatus(bookId:$bookId){
        collectionType 
        rating 
        finished 
    }
  }
`;

