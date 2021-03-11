import React from 'react'
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import apolloClient from './apolloSetup'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    </ApolloProvider>
  );
}

export default App;
