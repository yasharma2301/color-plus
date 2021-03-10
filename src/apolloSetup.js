import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-boost';

const secret = 'mKkmS5B1DfRVT3NHsGMQOfNJ2CQEnFJHQZRGjfR2LfxWKtUiMx2Mff0367JBIjcZ';

const wsLink = new WebSocketLink({
  uri: 'ws://easy-mite-79.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
        headers: {
            'x-hasura-access-key': `${secret}`
        }
      }
  }
});

const httpLink = new HttpLink({
  uri: 'https://easy-mite-79.hasura.app/v1/graphql',
  headers: {
    'x-hasura-access-key': `${secret}`
  }
});

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

export default new ApolloClient({
  cache: new InMemoryCache(),
  link
});
