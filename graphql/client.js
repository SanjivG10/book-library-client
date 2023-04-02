import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { BACKEND_URL } from '@/constants/urls';


const httpLink = createHttpLink({
    uri: `${BACKEND_URL}/graphql`,
});

const isBrowser = typeof window !== "undefined"

const wsLink =
    isBrowser
        ? new GraphQLWsLink(
            createClient({
                url: 'ws://localhost:4000/subscriptions',
            })
        )
        : null;

const authLink = setContext((_, { headers }) => {
    const token = isBrowser ? localStorage?.getItem('token') : "";
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const splitLink =
    isBrowser && wsLink != null ?
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

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});