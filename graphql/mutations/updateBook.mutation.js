

import { gql } from '@apollo/client';

export const UPDATE_BOOK = gql`
  mutation UpdateBook($bookId: ID!, $title: String!, $author: String!, $date: String!, $coverImage: String!, ) {
    updateBook(title: $title, author: $author, date: $date, coverImage: $coverImage, description:$description) {
      id
      title
      author
      date
      coverImage
      description
    }
  }
`;
