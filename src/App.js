import React from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import Colors from './components/Colors';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const secret = 'mKkmS5B1DfRVT3NHsGMQOfNJ2CQEnFJHQZRGjfR2LfxWKtUiMx2Mff0367JBIjcZ';

const client = new ApolloClient({
  uri: "https://easy-mite-79.hasura.app/v1/graphql",
  headers: {
    'x-hasura-access-key': `${secret}`
  }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    </ApolloProvider>
  );
}

export default App;
