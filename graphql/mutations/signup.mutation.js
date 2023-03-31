

import { gql } from '@apollo/client';

const SIGNUP = gql`
    mutation Signup($username: String!, $password: String!,$email:String!) {
    register(username: $username, password: $password,email:$email) {
        token
  }
}
`;

export default SIGNUP;
