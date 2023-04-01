import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import Navbar from '@components/common/Navbar';
import { AuthProvider } from '@context/AuthContext';
import { NotificationProvider } from '@context/NotificationContext';
import { createClient } from 'graphql-ws';

import { BACKEND_URL } from '@constants/urls';
import '@styles/globals.css';


const httpLink = createHttpLink({
  uri: `${BACKEND_URL}/graphql`,
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
      createClient({
        url: 'ws://localhost:4000/subscriptions',
      })
    )
    : null;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const splitLink =
  typeof window !== "undefined" && wsLink != null ?
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      authLink.concat(httpLink),
    ) :
    authLink.concat(httpLink)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return <ApolloProvider client={client}>
    <AuthProvider>
      <NotificationProvider>
        <Navbar />
        <Component {...pageProps} />
      </NotificationProvider>
    </AuthProvider>
  </ApolloProvider>
}
