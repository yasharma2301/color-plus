import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-boost';

const secret = process.env.REACT_APP_SECRET_KEY;

// web socket link for apollo stream subscription
const wsLink = new WebSocketLink({
  uri: 'wss://easy-mite-79.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
        headers: {
            'x-hasura-access-key': `${secret}`
        }
      }
  }
});

// apollo http link for mutations and queries
const httpLink = new HttpLink({
  uri: 'https://easy-mite-79.hasura.app/v1/graphql',
  headers: {
    'x-hasura-access-key': `${secret}`
  }
});

// split based on the request passed {webSocket/http}
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// instantiate a client 
// use in memory cache so that client can respond to repeated query without sending unnecessary requests
export default new ApolloClient({
  cache: new InMemoryCache(),
  link
});
